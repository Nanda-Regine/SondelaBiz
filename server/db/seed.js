// ─────────────────────────────────────────────────────────────
//  Database seed — fills DB with Mdantsane demo businesses
//  Run: npm run seed
// ─────────────────────────────────────────────────────────────

require('dotenv').config()
const bcrypt = require('bcryptjs')
const db     = require('./connection')

const DEMO_PASSWORD = 'sondela123'

const businesses = [
  {
    name: "Mama Thandiwe's Salon", category: 'salon', zone: 'Unit 4',
    tagline: '10 years of beautiful hair in Mdantsane',
    whatsapp: '27641234567', phone: '064 123 4567', address: 'Unit 4, near Spar',
    tier: 'gold', deals: 74, rating: 4.9, reviews: 62,
    offers: ['Hair styling','Braiding','Nails','Relaxer','Weaves'],
    needs:  ['Quality hair extensions','Part-time nail technician'],
  },
  {
    name: 'Mthembeni Plumbing', category: 'plumber', zone: 'Unit 2',
    tagline: 'Fast, reliable — any zone, same day',
    whatsapp: '27714567890', phone: '071 456 7890', address: 'Unit 2, township-wide',
    tier: 'silver', deals: 41, rating: 4.7, reviews: 38,
    offers: ['Leak repairs','Pipe installations','Toilet & basin','Geyser service'],
    needs:  ['Pipe fittings supplier','Helper/apprentice'],
  },
  {
    name: 'Bright Sparks Electrical', category: 'electrician', zone: 'Unit 5',
    tagline: 'COC certificates, DB boards, fault finding',
    whatsapp: '27827890123', phone: '082 789 0123', address: 'Unit 5',
    tier: 'silver', deals: 35, rating: 4.8, reviews: 29,
    offers: ['COC certificates','DB board upgrades','Rewiring','Fault finding'],
    needs:  ['Reliable cable supplier'],
  },
  {
    name: 'KasiGarage — Luvo Motors', category: 'mechanic', zone: 'Unit 3',
    tagline: 'Full mechanical service, no dealership prices',
    whatsapp: '27603216543', phone: '060 321 6543', address: 'Unit 3, behind school',
    tier: 'gold', deals: 91, rating: 4.6, reviews: 55,
    offers: ['Engine repairs','Brake pads & discs','Clutch kits','OBD diagnostics'],
    needs:  ['Spare parts supplier'],
  },
  {
    name: "Mama Ntombi's Fresh Produce", category: 'vendor', zone: 'Unit 2 Hi-Way',
    tagline: 'Daily fresh veg, fruits & spices at the Hi-Way',
    whatsapp: '27786543210', phone: '078 654 3210', address: 'Hi-Way market stall 14',
    tier: 'gold', deals: 58, rating: 4.5, reviews: 103,
    offers: ['Fresh vegetables','Seasonal fruits','Traditional spices','Bulk orders'],
    needs:  ['Reliable transport','Refrigeration unit'],
  },
  {
    name: 'Xhosa Flavours Catering', category: 'catering', zone: 'Unit 12',
    tagline: 'Traditional Xhosa cuisine for any occasion',
    whatsapp: '27649998877', phone: '064 999 8877', email: 'xhosaflavours@gmail.com', address: 'Unit 12',
    tier: 'silver', deals: 27, rating: 4.7, reviews: 34,
    offers: ['Full event catering','Traditional meals','Equipment hire','Waitstaff'],
    needs:  ['Reliable meat supplier','Large pots'],
  },
]

async function seed() {
  const hash = await bcrypt.hash(DEMO_PASSWORD, 10)
  console.log('\n🌱  Seeding SondelaBiz demo data...\n')

  for (const b of businesses) {
    try {
      const [r] = await db.execute(
        `INSERT IGNORE INTO businesses
          (name,category,zone,tagline,whatsapp,phone,email,address,password_hash,
           trader_tier,is_public,verified,completed_deals,rating,review_count)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [b.name, b.category, b.zone, b.tagline, b.whatsapp,
         b.phone || null, b.email || null, b.address, hash,
         b.tier, true, true, b.deals, b.rating, b.reviews]
      )
      const id = r.insertId
      if (!id) { console.log(`  ⏭  Skipped (exists): ${b.name}`); continue }

      // Insert into `offers` table (services this business provides)
      for (const o of b.offers) {
        await db.execute('INSERT INTO offers (business_id, offer_text) VALUES (?,?)', [id, o])
      }
      // Insert into `requests` table (things this business needs to source)
      for (const n of b.needs) {
        await db.execute('INSERT INTO requests (business_id, title) VALUES (?,?)', [id, n])
      }
      console.log(`  ✓  ${b.name}`)
    } catch (e) {
      console.log(`  ⚠  Error on ${b.name}: ${e.message}`)
    }
  }

  // Seed some board posts
  const [[salon]] = await db.execute(`SELECT id FROM businesses WHERE whatsapp='27641234567' LIMIT 1`)
  const [[plumb]] = await db.execute(`SELECT id FROM businesses WHERE whatsapp='27714567890' LIMIT 1`)
  const [[cater]] = await db.execute(`SELECT id FROM businesses WHERE whatsapp='27649998877' LIMIT 1`)
  const [[prod]]  = await db.execute(`SELECT id FROM businesses WHERE whatsapp='27786543210' LIMIT 1`)

  if (salon) {
    await db.execute(
      `INSERT IGNORE INTO board_posts (business_id,type,title,description,is_urgent) VALUES (?,?,?,?,?)`,
      [salon.id,'need','Need 50+ braiding client referrals this month','Running a special — R80 braids. Referral fee R15 per client sent.',true]
    ).catch(() => {})
  }
  if (plumb) {
    await db.execute(
      `INSERT IGNORE INTO board_posts (business_id,type,title,description) VALUES (?,?,?,?)`,
      [plumb.id,'offer','Geyser specials — bulk booking discount','3+ geyser services: R800 per unit includes parts. Same-day run available.']
    ).catch(() => {})
  }
  if (cater) {
    await db.execute(
      `INSERT IGNORE INTO board_posts (business_id,type,title,description,is_urgent) VALUES (?,?,?,?,?)`,
      [cater.id,'need','Looking for Friday/Saturday event staff','Mdantsane Civic Centre next month. 4 waitstaff + 1 chef assistant. Day rate negotiable.',true]
    ).catch(() => {})
  }
  if (prod) {
    await db.execute(
      `INSERT IGNORE INTO board_posts (business_id,type,title,description) VALUES (?,?,?,?)`,
      [prod.id,'offer','Wholesale fresh produce — min R500 order','Potatoes, onions, tomatoes, spinach. Delivery within Mdantsane.']
    ).catch(() => {})
  }

  console.log('\n✅  Seed complete.')
  console.log('    Demo password for all accounts:', DEMO_PASSWORD)
  process.exit(0)
}

seed().catch(e => { console.error(e); process.exit(1) })
