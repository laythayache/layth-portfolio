export interface Section {
  key: string
  title: string
  href: string
  navLabel: string
  seoTitle: string
  seoDescription: string
  intro: string
  landingBlurb: string
}

export const sections: Section[] = [
  {
    key: 'completed',
    title: 'Completed',
    href: '/completed',
    navLabel: 'Completed',
    seoTitle: 'Completed Projects | Layth Ayache',
    seoDescription: 'Personal projects that are done and have demos available.',
    intro: 'Projects that are finished and have working demos. These represent completed work and learning outcomes.',
    landingBlurb: 'Personal projects that are done and have demos available.',
  },
  {
    key: 'ongoing',
    title: 'Ongoing',
    href: '/ongoing',
    navLabel: 'Ongoing',
    seoTitle: 'Ongoing Projects | Layth Ayache',
    seoDescription: 'Personal projects currently in progress, open for discussion and collaboration.',
    intro: 'Projects currently in development. Open for discussion, feedback, and potential collaboration.',
    landingBlurb: 'Personal projects currently in progress, open for discussion.',
  },
  {
    key: 'friends',
    title: 'Friends',
    href: '/friends',
    navLabel: 'Friends',
    seoTitle: 'Friends\' Projects | Layth Ayache',
    seoDescription: 'Projects from friends seeking funding, help, or collaboration.',
    intro: 'Projects from friends and collaborators seeking funding, help, or partnership opportunities.',
    landingBlurb: 'Projects from friends seeking funding or help.',
  },
  {
    key: 'ideas',
    title: 'Ideas',
    href: '/ideas',
    navLabel: 'Ideas',
    seoTitle: 'Ideas & Concepts | Layth Ayache',
    seoDescription: 'An idea space and concept reservoir for future exploration.',
    intro: 'A space for ideas and concepts. Early-stage thinking, experiments, and potential directions.',
    landingBlurb: 'An idea space and concept reservoir for exploration.',
  },
  {
    key: 'about',
    title: 'About',
    href: '/about',
    navLabel: 'About me',
    seoTitle: 'About | Layth Ayache',
    seoDescription: 'Vision, mission, and approach to building software and learning in public.',
    intro: 'Vision, mission, and approach. This platform reflects a commitment to student/public learning, embracing failures, documenting process, and playing the community long game.',
    landingBlurb: 'Vision, mission, and approach to building and learning.',
  },
]

export function getSectionByKey(key: string): Section | undefined {
  return sections.find(s => s.key === key)
}

export function getSectionByHref(href: string): Section | undefined {
  return sections.find(s => s.href === href)
}

