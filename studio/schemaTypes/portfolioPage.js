export default {
  name: 'portfolioPage',
  title: 'Portfolio Page',
  type: 'document',
  fields: [
    { name: 'title', title: 'Page Title', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'bannerTitle', title: 'Banner Title', type: 'string' },
    { name: 'bannerSubtitle', title: 'Banner Subtitle', type: 'string' },
    { name: 'bannerImage', title: 'Banner Image', type: 'image', options: { hotspot: true } },
    { name: 'headerImage', title: 'Header Image', type: 'image', options: { hotspot: true } },
    {
      name: 'displayType',
      title: 'Display Type',
      type: 'string',
      options: {
        list: [
          { title: 'Slideshow', value: 'slideshow' },
          { title: 'Grid (3 columns)', value: 'grid3' },
          { title: 'Grid (2 columns)', value: 'grid2' },
        ]
      }
    },
    {
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
          { name: 'alt', title: 'Alt Text', type: 'string' },
        ],
        preview: {
          select: { media: 'image', title: 'alt' },
        }
      }]
    },
    {
      name: 'embeds',
      title: 'Embedded Ads',
      description: 'HTML embed codes for animated banner ads (iframes, scripts, etc.)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', title: 'Label', type: 'string' },
          { name: 'code', title: 'Embed Code (HTML)', type: 'text' },
          { name: 'width', title: 'Width (px)', type: 'number' },
          { name: 'height', title: 'Height (px)', type: 'number' },
        ],
        preview: {
          select: { title: 'label' },
        }
      }]
    },
  ],
}
