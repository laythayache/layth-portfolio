'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

type AchievementStatus =
  | 'Success'
  | 'Failure'
  | 'Partial failure'
  | 'There exists a better way'
  | 'Ongoing'
  | 'Finished'
  | 'Paused'
  | 'Archived'

type Achievement = {
  id: string
  title: string
  subtitle?: string
  description: string
  status: AchievementStatus
  tags: string[]
  links?: { label: string; href: string }[]
  details?: string[]
}

const achievements: Achievement[] = [
  {
    id: 'omnisign',
    title: 'Omnisign',
    subtitle: 'Lebanese sign language translator',
    description: 'A Lebanese sign language translator using computer vision. Created the first Lebanese dataset.',
    status: 'Finished',
    tags: ['Computer Vision', 'Sign Language', 'Dataset'],
    links: [],
    details: ['TODO: Add postmortem notes (success/failure/what changed).'],
  },
  {
    id: 'autoimmune-paper',
    title: 'Autoimmune and Autoinflammatory Disease Research',
    subtitle: 'AI design and implementation',
    description: 'Published a paper on Autoimmune and Autoinflammatory disease where I designed all AI parts.',
    status: 'Finished',
    tags: ['AI', 'Research', 'Medical'],
    links: [
      {
        label: 'Read the paper (PDF) →',
        href: '/papers/autoimmune-autoinflammatory-ai.pdf',
      },
    ],
    details: ['TODO: Add postmortem notes (success/failure/what changed).'],
  },
  {
    id: 'gaza-clothes',
    title: 'Gaza Clothing Drive',
    subtitle: 'Multi-NGO cooperation',
    description: 'Raised over 100,000 pieces of clothes and delivered them to the children of Gaza through multi-NGO cooperation.',
    status: 'Finished',
    tags: ['Humanitarian', 'Coordination', 'Logistics'],
    links: [],
    details: ['TODO: Add postmortem notes (success/failure/what changed).'],
  },
]

const statusStyles: Record<
  AchievementStatus,
  { ring: string; shadow: string }
> = {
  Success: {
    ring: 'hover:ring-2 hover:ring-emerald-400/30',
    shadow: 'hover:shadow-[0_0_0.75rem_rgba(16,185,129,0.20)]',
  },
  Failure: {
    ring: 'hover:ring-2 hover:ring-red-400/30',
    shadow: 'hover:shadow-[0_0_0.75rem_rgba(248,113,113,0.20)]',
  },
  'Partial failure': {
    ring: 'hover:ring-2 hover:ring-amber-400/30',
    shadow: 'hover:shadow-[0_0_0.75rem_rgba(251,191,36,0.20)]',
  },
  'There exists a better way': {
    ring: 'hover:ring-2 hover:ring-violet-400/30',
    shadow: 'hover:shadow-[0_0_0.75rem_rgba(167,139,250,0.20)]',
  },
  Ongoing: {
    ring: 'hover:ring-2 hover:ring-cyan-400/30',
    shadow: 'hover:shadow-[0_0_0.75rem_rgba(34,211,238,0.20)]',
  },
  Finished: {
    ring: 'hover:ring-2 hover:ring-blue-400/30',
    shadow: 'hover:shadow-[0_0_0.75rem_rgba(96,165,250,0.20)]',
  },
  Paused: {
    ring: 'hover:ring-2 hover:ring-rose-400/30',
    shadow: 'hover:shadow-[0_0_0.75rem_rgba(251,113,133,0.20)]',
  },
  Archived: {
    ring: 'hover:ring-2 hover:ring-gray-400/30',
    shadow: 'hover:shadow-[0_0_0.75rem_rgba(156,163,175,0.20)]',
  },
}

const allStatuses: (AchievementStatus | 'All')[] = [
  'All',
  'Finished',
  'Ongoing',
  'Success',
  'Failure',
  'Partial failure',
  'There exists a better way',
  'Paused',
  'Archived',
]

export default function AboutContent() {
  const [selectedStatus, setSelectedStatus] = useState<AchievementStatus | 'All'>('All')
  const [expandedDetails, setExpandedDetails] = useState<Set<string>>(new Set())

  const filteredAchievements = useMemo(() => {
    if (selectedStatus === 'All') return achievements
    return achievements.filter((a) => a.status === selectedStatus)
  }, [selectedStatus])

  const toggleDetails = (id: string) => {
    const newExpanded = new Set(expandedDetails)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedDetails(newExpanded)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Left Column: Quote, Doctrine, Contact */}
      <div className="space-y-8">
        {/* Quote */}
        <div className="border border-[#d1d5db] rounded-lg p-6">
          <blockquote className="text-lg md:text-xl leading-relaxed mb-3" style={{ color: '#2b2e34' }}>
            "We shape our tools, and thereafter our tools shape us."
          </blockquote>
          <p className="text-sm" style={{ color: '#6b7280' }}>
            — John M. Culkin
          </p>
        </div>

        {/* Doctrine Paragraph */}
        <div className="border border-[#d1d5db] rounded-lg p-6">
          <p className="text-base leading-relaxed" style={{ color: '#6b7280' }}>
            This site is a record of building in public: what I tried, what broke, and what changed my thinking. The goal is a serious community—local and international—that learns by doing and improves through critique.
          </p>
        </div>

        {/* Contact Card */}
        <div className="border border-[#d1d5db] rounded-lg p-6">
          {/* TODO: Replace with UIverse/21dev 'fascinating code' contact component. */}
          <h2 className="text-lg font-semibold mb-4" style={{ color: '#2b2e34' }}>
            Contact
          </h2>
          <p className="text-sm mb-4 leading-relaxed" style={{ color: '#6b7280' }}>
            I explain process and critique systems. If you want a second set of eyes, you can reach me—no pressure, high-signal only.
          </p>
          <div className="space-y-2">
            <div>
              <a
                href="mailto:laythayache5@gmail.com"
                className="text-sm hover:underline transition-colors"
                style={{ color: '#2b2e34' }}
              >
                laythayache5@gmail.com
              </a>
            </div>
            <div>
              <a
                href="https://www.linkedin.com/in/laythayache"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:underline transition-colors"
                style={{ color: '#2b2e34' }}
              >
                LinkedIn: laythayache
              </a>
            </div>
            <div>
              <a
                href="https://github.com/laythayache"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:underline transition-colors"
                style={{ color: '#2b2e34' }}
              >
                GitHub: laythayache
              </a>
            </div>
          </div>
        </div>

        {/* Skills Placeholder */}
        <div className="border border-[#d1d5db] rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-2" style={{ color: '#2b2e34' }}>
            Skills
          </h2>
          <p className="text-sm" style={{ color: '#6b7280' }}>
            TODO: Build a fascinating skills UI (UIverse/21dev).
          </p>
        </div>
      </div>

      {/* Right Column: Achievements */}
      <div className="space-y-6">
        {/* Filter Chips */}
        <div className="flex flex-wrap gap-2">
          {allStatuses.map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
                selectedStatus === status
                  ? 'border-[#2b2e34] bg-[#2b2e34] text-[#ede7dd]'
                  : 'border-[#d1d5db] bg-transparent text-[#6b7280] hover:border-[#9ca3af]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Achievements List */}
        <div className="space-y-4">
          {filteredAchievements.length === 0 ? (
            <div className="border border-[#d1d5db] rounded-lg p-8 text-center">
              <p className="text-sm" style={{ color: '#6b7280' }}>
                No achievements match this filter.
              </p>
            </div>
          ) : (
            filteredAchievements.map((achievement) => {
              const statusStyle = statusStyles[achievement.status]
              const isExpanded = expandedDetails.has(achievement.id)

              return (
                <div
                  key={achievement.id}
                  className="border border-[#d1d5db] rounded-lg p-6 hover:border-[#9ca3af] transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1" style={{ color: '#2b2e34' }}>
                        {achievement.title}
                      </h3>
                      {achievement.subtitle && (
                        <p className="text-sm mb-2" style={{ color: '#6b7280' }}>
                          {achievement.subtitle}
                        </p>
                      )}
                    </div>
                    <span
                      className={`px-2.5 py-1 text-xs font-medium rounded-full border border-[#d1d5db] bg-transparent transition-all ${statusStyle.ring} ${statusStyle.shadow}`}
                      style={{ color: '#6b7280' }}
                    >
                      {achievement.status}
                    </span>
                  </div>

                  <p className="text-sm mb-4 leading-relaxed" style={{ color: '#6b7280' }}>
                    {achievement.description}
                  </p>

                  {achievement.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {achievement.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-xs rounded border border-[#d1d5db]"
                          style={{ color: '#6b7280' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {achievement.links && achievement.links.length > 0 && (
                    <div className="mb-4">
                      {achievement.links.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.href}
                          target={link.href.startsWith('http') ? '_blank' : undefined}
                          rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-sm font-medium hover:underline transition-colors inline-block"
                          style={{ color: '#2b2e34' }}
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}

                  {achievement.details && achievement.details.length > 0 && (
                    <div>
                      <button
                        onClick={() => toggleDetails(achievement.id)}
                        className="text-xs font-medium hover:underline transition-colors mb-2"
                        style={{ color: '#6b7280' }}
                      >
                        {isExpanded ? 'Hide details' : 'Show details'}
                      </button>
                      {isExpanded && (
                        <ul className="list-disc list-inside space-y-1 text-xs mt-2" style={{ color: '#6b7280' }}>
                          {achievement.details.map((detail, idx) => (
                            <li key={idx}>{detail}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

