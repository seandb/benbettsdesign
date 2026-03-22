export default {
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    { name: 'title', title: 'Page Title', type: 'string' },
    { name: 'photo', title: 'Profile Photo', type: 'image', options: { hotspot: true } },
    {
      name: 'bio',
      title: 'Bio Paragraphs',
      type: 'array',
      of: [{ type: 'text' }],
    },
    { name: 'resumeImage', title: 'Resume Image', type: 'image', options: { hotspot: true } },
    { name: 'resumePdf', title: 'Resume PDF', type: 'file' },
  ],
}
