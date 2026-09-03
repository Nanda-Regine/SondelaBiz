-- ─────────────────────────────────────────────────────────────
--  SondelaBiz — MySQL Schema
--  Run: mysql -u root -p sondela_biz < server/db/schema.sql
-- ─────────────────────────────────────────────────────────────

CREATE DATABASE IF NOT EXISTS sondela_biz CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE sondela_biz;

-- ── 1. Categories (lookup) ────────────────────────────────────
CREATE TABLE IF NOT EXISTS categories (
  id    INT           UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  slug  VARCHAR(40)   NOT NULL UNIQUE,
  name  VARCHAR(80)   NOT NULL,
  icon  VARCHAR(10)   DEFAULT NULL,
  color VARCHAR(20)   DEFAULT 'fuchsia'
);

INSERT IGNORE INTO categories (slug, name, icon, color) VALUES
  ('salon',       'Hair & Beauty',   '✂️',  'fuchsia'),
  ('plumber',     'Plumbing',         '🔧',  'cobalt'),
  ('electrician', 'Electrical',       '⚡',  'volt'),
  ('mechanic',    'Auto & Mechanics', '🚗',  'cobalt'),
  ('vendor',      'Fresh Produce',    '🌽',  'lime'),
  ('catering',    'Catering',         '🍖',  'crimson'),
  ('retail',      'Retail & Spaza',   '🏪',  'sienna'),
  ('transport',   'Transport',        '🚐',  'fuchsia');

-- ── 2. Businesses ─────────────────────────────────────────────
--  Handles both auth (password_hash) and public profile.
CREATE TABLE IF NOT EXISTS businesses (
  id               INT          UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name             VARCHAR(120) NOT NULL,
  category         VARCHAR(40)  NOT NULL,          -- matches categories.slug
  zone             VARCHAR(80)  DEFAULT NULL,       -- Mdantsane unit/area
  tagline          VARCHAR(200) DEFAULT NULL,
  description      TEXT         DEFAULT NULL,

  -- Contact
  whatsapp         VARCHAR(20)  NOT NULL UNIQUE,    -- 27XXXXXXXXX format
  phone            VARCHAR(20)  DEFAULT NULL,
  email            VARCHAR(120) DEFAULT NULL,
  address          VARCHAR(200) DEFAULT NULL,

  -- Auth
  password_hash    VARCHAR(72)  NOT NULL,

  -- Trusted Trader
  trader_tier      ENUM('new','bronze','silver','gold') NOT NULL DEFAULT 'new',
  completed_deals  INT          UNSIGNED NOT NULL DEFAULT 0,
  rating           DECIMAL(3,2) NOT NULL DEFAULT 0.00,
  review_count     INT          UNSIGNED NOT NULL DEFAULT 0,

  -- Visibility & plan
  is_public        BOOLEAN      NOT NULL DEFAULT TRUE,
  verified         BOOLEAN      NOT NULL DEFAULT FALSE,
  pricing_tier     ENUM('free','boost','premium','featured') NOT NULL DEFAULT 'free',

  -- Soft-delete (NEVER hard-delete per project rules)
  deleted_at       DATETIME     DEFAULT NULL,

  created_at       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FULLTEXT INDEX ft_biz (name, tagline, description)
);

-- ── 3. Users ──────────────────────────────────────────────────
--  Thin auth layer — one user per business (for future: staff accounts).
CREATE TABLE IF NOT EXISTS users (
  id           INT          UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  business_id  INT          UNSIGNED NOT NULL,
  role         ENUM('owner','staff','admin') NOT NULL DEFAULT 'owner',
  created_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (business_id) REFERENCES businesses(id) ON DELETE CASCADE,
  UNIQUE KEY uq_user_biz (business_id, role)
);

-- ── 4. Business services (what you offer) ─────────────────────
CREATE TABLE IF NOT EXISTS offers (
  id           INT          UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  business_id  INT          UNSIGNED NOT NULL,
  offer_text   VARCHAR(200) NOT NULL,
  created_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (business_id) REFERENCES businesses(id) ON DELETE CASCADE
);

-- ── 5. Business needs (what you need to buy/source) ──────────
CREATE TABLE IF NOT EXISTS requests (
  id            INT          UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  business_id   INT          UNSIGNED NOT NULL,

  -- Board post fields
  title         VARCHAR(200) NOT NULL,
  description   TEXT         DEFAULT NULL,
  budget        DECIMAL(10,2) DEFAULT NULL,          -- R amount
  is_urgent     BOOLEAN      NOT NULL DEFAULT FALSE,
  response_count INT         UNSIGNED NOT NULL DEFAULT 0,
  is_active     BOOLEAN      NOT NULL DEFAULT TRUE,
  deleted_at    DATETIME     DEFAULT NULL,           -- soft-delete

  created_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (business_id) REFERENCES businesses(id) ON DELETE CASCADE
);

-- ── 6. Board posts (I NEED / I OFFER — unified feed) ─────────
--  Kept for the public B2B board. type discriminates need vs offer.
CREATE TABLE IF NOT EXISTS board_posts (
  id             INT          UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  business_id    INT          UNSIGNED NOT NULL,
  type           ENUM('need','offer') NOT NULL,
  title          VARCHAR(200) NOT NULL,
  description    TEXT         DEFAULT NULL,
  budget         DECIMAL(10,2) DEFAULT NULL,
  is_urgent      BOOLEAN      NOT NULL DEFAULT FALSE,
  response_count INT          UNSIGNED NOT NULL DEFAULT 0,
  is_active      BOOLEAN      NOT NULL DEFAULT TRUE,
  deleted_at     DATETIME     DEFAULT NULL,

  created_at     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (business_id) REFERENCES businesses(id) ON DELETE CASCADE
);

-- ── 7. Board responses ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS board_responses (
  id           INT          UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  post_id      INT          UNSIGNED NOT NULL,
  business_id  INT          UNSIGNED NOT NULL,
  message      TEXT         NOT NULL,
  created_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (post_id)     REFERENCES board_posts(id)  ON DELETE CASCADE,
  FOREIGN KEY (business_id) REFERENCES businesses(id)   ON DELETE CASCADE
);

-- ── 8. Transactions (completed / in-progress trades) ─────────
--  Created automatically when a business responds to a board post.
CREATE TABLE IF NOT EXISTS transactions (
  id                INT          UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  post_id           INT          UNSIGNED DEFAULT NULL,    -- originating board post
  from_business_id  INT          UNSIGNED NOT NULL,        -- the responder
  to_business_id    INT          UNSIGNED NOT NULL,        -- the post owner
  title             VARCHAR(200) NOT NULL,
  amount            DECIMAL(10,2) DEFAULT NULL,            -- agreed amount in ZAR
  status            ENUM('pending','negotiating','agreed','complete','cancelled') NOT NULL DEFAULT 'pending',
  deleted_at        DATETIME     DEFAULT NULL,

  created_at        DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at        DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (post_id)          REFERENCES board_posts(id)  ON DELETE SET NULL,
  FOREIGN KEY (from_business_id) REFERENCES businesses(id)   ON DELETE CASCADE,
  FOREIGN KEY (to_business_id)   REFERENCES businesses(id)   ON DELETE CASCADE
);

-- ── 9. Reviews ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reviews (
  id                  INT          UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  business_id         INT          UNSIGNED NOT NULL,    -- who is being reviewed
  author_business_id  INT          UNSIGNED NOT NULL,    -- who wrote the review
  transaction_id      INT          UNSIGNED DEFAULT NULL,
  rating              TINYINT      UNSIGNED NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment             TEXT         DEFAULT NULL,
  created_at          DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (business_id)        REFERENCES businesses(id) ON DELETE CASCADE,
  FOREIGN KEY (author_business_id) REFERENCES businesses(id) ON DELETE CASCADE,
  FOREIGN KEY (transaction_id)     REFERENCES transactions(id) ON DELETE SET NULL,
  UNIQUE KEY uq_one_review_per_transaction (author_business_id, transaction_id)
);

-- ── Trigger: auto-update rating + tier on new review ─────────
DROP TRIGGER IF EXISTS after_review_insert;

DELIMITER $$
CREATE TRIGGER after_review_insert
AFTER INSERT ON reviews
FOR EACH ROW
BEGIN
  DECLARE avg_rating  DECIMAL(3,2);
  DECLARE total_count INT;
  DECLARE total_deals INT;
  DECLARE new_tier    ENUM('new','bronze','silver','gold');

  SELECT AVG(rating), COUNT(*) INTO avg_rating, total_count
  FROM reviews WHERE business_id = NEW.business_id;

  SELECT completed_deals INTO total_deals
  FROM businesses WHERE id = NEW.business_id;

  -- Trusted Trader tier logic
  IF    total_deals >= 50 AND avg_rating >= 4.5 THEN SET new_tier = 'gold';
  ELSEIF total_deals >= 20 AND avg_rating >= 4.0 THEN SET new_tier = 'silver';
  ELSEIF total_deals >= 5  AND avg_rating >= 3.5 THEN SET new_tier = 'bronze';
  ELSE                                                 SET new_tier = 'new';
  END IF;

  UPDATE businesses
  SET rating       = avg_rating,
      review_count = total_count,
      trader_tier  = new_tier
  WHERE id = NEW.business_id;
END$$
DELIMITER ;
