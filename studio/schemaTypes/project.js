export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (Rule) => Rule.required() },
    { name: 'parentPage', title: 'Parent Page', type: 'string', description: 'e.g. packaging or print', options: { list: ['packaging', 'print'] } },
    { name: 'thumbnail', title: 'Thumbnail', type: 'image', options: { hotspot: true } },
    {
      name: 'slides',
      title: 'Slideshow Images',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
          { name: 'alt', title: 'Alt Text', type: 'string' },
        ],
        preview: { select: { media: 'image', title: 'alt' } },
      }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'parentPage', media: 'thumbnail' },
  },
};
