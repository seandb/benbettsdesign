export default {
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    { name: 'title', title: 'Page Title', type: 'string' },
    { name: 'heroHeading', title: 'Hero Heading', type: 'string' },
    { name: 'heroSubtitle', title: 'Hero Subtitle', type: 'string' },
    { name: 'bannerImage', title: 'Banner Image', type: 'image', options: { hotspot: true } },
    {
      name: 'portfolioItems',
      title: 'Portfolio Items',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', title: 'Label', type: 'string' },
          { name: 'href', title: 'Link URL', type: 'string' },
          { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
          { name: 'alt', title: 'Alt Text', type: 'string' },
        ]
      }]
    },
  ],
}
