'use client'

// ─────────────────────────────────────────────────────────────
//  Needs & Offers Board — the core B2B matching feature
//  Owner: Amahle Axola
//
//  TODO (Amahle):
//  1. "Post a Need/Offer" modal — save to Supabase
//  2. "Respond" button — opens a deal request
//  3. Filter by category and zone
// ─────────────────────────────────────────────────────────────

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import { boardPosts } from '@/data/mock-businesses'
import { relativeTime } from '@/lib/utils'
import { CATEGORIES } from '@/lib/types'
import type { PostType } from '@/lib/types'

export default function BoardPage() {
  const [filter, setFilter] = useState<PostType | 'all'>('all')
  const [showPostForm, setShowPostForm] = useState(false)
  const [newPost, setNewPost] = useState({ type: 'need' as PostType, title: '', description: '', budget: '' })
  const [posted, setPosted] = useState(false)

  const visible = filter === 'all' ? boardPosts : boardPosts.filter((p) => p.type === filter)

  function handlePost(e: React.FormEvent) {
    e.preventDefault()
    // TODO: save to Supabase
    console.log('New post:', newPost)
    setPosted(true)
    setShowPostForm(false)
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">

        {/* Header */}
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <nav className="text-xs text-[var(--text-muted)] mb-2">
              <Link href="/network" className="hover:text-brand-800">Network</Link> / Board
            </nav>
            <h1 className="font-syne text-3xl font-extrabold text-[var(--text)]">Needs & Offers</h1>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              Post what you need. Post what you offer. Connect with Mdantsane businesses.
            </p>
          </div>
          <button
            onClick={() => setShowPostForm(!showPostForm)}
            className="btn-amber px-5 py-2.5"
          >
            {showPostForm ? '✕ Cancel' : '+ Post on Board'}
          </button>
        </div>

        {/* Post form */}
        {showPostForm && (
          <form onSubmit={handlePost} className="card mb-6 border-amber/40">
            <h2 className="font-syne font-bold text-[var(--text)] mb-4">New Post</h2>
            <div className="space-y-3">
              <div className="flex gap-2">
                {(['need', 'offer'] as PostType[]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setNewPost((p) => ({ ...p, type: t }))}
                    className={`flex-1 rounded-lg border py-2 text-sm font-medium transition ${
                      newPost.type === t
                        ? 'border-brand-800 bg-brand-800 text-white'
                        : 'border-[var(--border)] text-[var(--text-muted)] hover:border-brand-400'
                    }`}
                  >
                    {t === 'need' ? '🙋 I Need Something' : '💼 I Can Offer'}
                  </button>
                ))}
              </div>
              <input
                required
                value={newPost.title}
                onChange={(e) => setNewPost((p) => ({ ...p, title: e.target.value }))}
                placeholder={newPost.type === 'need' ? 'e.g. Looking for a reliable meat supplier' : 'e.g. Offering bulk plumbing rates for property managers'}
                className="input"
              />
              <textarea
                value={newPost.description}
                onChange={(e) => setNewPost((p) => ({ ...p, description: e.target.value }))}
                placeholder="Give more detail — quantity, timing, what matters to you…"
                rows={3}
                className="input resize-none"
              />
              <input
                value={newPost.budget}
                onChange={(e) => setNewPost((p) => ({ ...p, budget: e.target.value }))}
                placeholder="Budget / price range (optional) e.g. R200–R500"
                className="input"
              />
              <button type="submit" className="btn-primary w-full justify-center py-2.5">
                Post to Board
              </button>
            </div>
          </form>
        )}

        {posted && (
          <div className="mb-4 rounded-xl bg-brand-50 border border-brand-200 px-4 py-3 text-sm text-brand-800">
            ✅ Your post is live! Other businesses can now see and respond to it.
          </div>
        )}

        {/* Filter tabs */}
        <div className="mb-4 flex gap-2">
          {(['all', 'need', 'offer'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                filter === f ? 'bg-brand-800 text-white' : 'bg-[var(--surface-2)] text-[var(--text-muted)] hover:text-brand-800'
              }`}
            >
              {f === 'all' ? 'All Posts' : f === 'need' ? '🙋 Needs' : '💼 Offers'}
              {f !== 'all' && (
                <span className="ml-1.5 text-xs opacity-70">
                  ({boardPosts.filter((p) => p.type === f).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Posts */}
        <div className="space-y-4">
          {visible.map((post) => (
            <div key={post.id} className="card-hover">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`badge text-xs font-semibold px-3 py-1 ${
                    post.type === 'need' ? 'bg-amber-light text-amber-800' : 'badge-green'
                  }`}>
                    {post.type === 'need' ? '🙋 NEED' : '💼 OFFER'}
                  </span>
                  {post.urgent && <span className="badge-urgent">🔥 Urgent</span>}
                </div>
                <span className="flex-shrink-0 text-xs text-[var(--text-muted)]">
                  {relativeTime(post.postedAt)}
                </span>
              </div>

              <h3 className="mt-2 font-syne font-bold text-[var(--text)]">{post.title}</h3>
              <p className="mt-1 text-sm text-[var(--text-2)]">{post.description}</p>

              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-[var(--text-muted)]">
                <span>📍 {post.zone}</span>
                <span>🗂️ {CATEGORIES.find((c) => c.slug === post.category)?.label}</span>
                {post.budget && <span>💰 {post.budget}</span>}
                <span>💬 {post.responses} response{post.responses !== 1 ? 's' : ''}</span>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-[var(--border)] pt-3">
                <span className="text-xs text-[var(--text-muted)]">
                  Posted by <strong>{post.businessName}</strong>
                </span>
                <button className="btn-primary px-4 py-1.5 text-xs">
                  Respond →
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
