import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '3ta2u9fb',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

// Upload an image from a URL to Sanity
async function uploadImage(url) {
  console.log('  Uploading image:', url.split('/').pop())
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`)
  const buffer = await res.arrayBuffer()
  const filename = url.split('/').pop()
  const asset = await client.assets.upload('image', Buffer.from(buffer), { filename })
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
}

// Upload a file from a URL to Sanity
async function uploadFile(url) {
  console.log('  Uploading file:', url.split('/').pop())
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`)
  const buffer = await res.arrayBuffer()
  const filename = url.split('/').pop()
  const asset = await client.assets.upload('file', Buffer.from(buffer), { filename })
  return { _type: 'file', asset: { _type: 'reference', _ref: asset._id } }
}

async function createOrReplace(doc) {
  return client.createOrReplace(doc)
}

async function main() {
  console.log('\n=== Migrating Home Page ===')
  const bannerImage = await uploadImage('https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/background-images/2022559524.jpg')

  const portfolioItemImages = [
    { url: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/editor/beerbelly4.jpg', label: 'Packaging Projects', href: '/packaging' },
    { url: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/editor/bookcoverphotshoot.jpg', label: 'Print Projects', href: '/print' },
    { url: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/editor/3-hpto-mock-up-taxday2020.png', label: 'Digital Projects', href: '/digital' },
    { url: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/editor/hovercar.jpg', label: 'Photo Projects', href: '/photo' },
    { url: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/cardboard-daredevil_orig.jpg', label: 'Logo Designs', href: '/logos' },
    { url: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/3d-project_orig.jpg', label: 'Fine Art', href: '/fine-art' },
  ]

  const portfolioItems = []
  for (const item of portfolioItemImages) {
    const img = await uploadImage(item.url)
    portfolioItems.push({
      _key: item.href.replace('/', ''),
      label: item.label,
      href: item.href,
      image: img,
      alt: item.label,
    })
  }

  await createOrReplace({
    _id: 'homePage',
    _type: 'homePage',
    title: 'Ben Betts Design',
    heroHeading: "Hi, I'm Ben.",
    heroSubtitle: 'Good Friend. Great Designer.',
    bannerImage,
    portfolioItems,
  })
  console.log('✓ Home page created')

  console.log('\n=== Migrating About Page ===')
  const photo = await uploadImage('https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/me_orig.jpg')
  const resumeImage = await uploadImage('https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/benbettsresume_orig.jpg')
  // Resume PDF lives in the public dir of the old project — skip or use local file
  // We'll skip the PDF upload for now since we can't fetch it from an external URL easily

  await createOrReplace({
    _id: 'aboutPage',
    _type: 'aboutPage',
    title: 'About - Ben Betts Design',
    photo,
    bio: [
      "As a designer, you never forget the moment you decided to turn your passion into a career. I was in high school when I started designing t-shirts with my friend's silk screening press. When I wore those shirts in school, the attention that they received made me realize that design is what I wanted to do.",
      "My father is an interior designer, and his passion for design was passed down to me. Even though design had been a part of my life for as long as I can remember, it wasn't until I was in my late 20s that I committed to obtaining a degree in a design field. Graphic design was recommended to me by a friend after a conversation we had about logos and their importance in branding. Within the week, I had registered in the next semester of classes at my local community college (I am aware how trite and convenient that story is for a cover letter, but I swear it's true).",
      "On paper, it seems as though I'm a newer designer. But because I've been immersed in the world of design my entire life, I've seen design trends come and go—from the infamous designs of Paul Rand to the Hipster Logo Generator. Understanding design trends was never really something that I needed training in. It was something that was instilled in me at a young age. My training simply a matter of learning how to take my creative vision for my clients and putting it into action.",
      "Within the last 20 years, I've also been absorbing people (not in a cannibalistic way, but how to read and understand people—that would be strange if I admitted to eating people in a cover letter). I love watching how people move, learning their habits, consuming their processes, and implementing that \"research\" into my designs. You can learn so much about people by selling them retail products, empathizing with their frustrations, and listening to their stories. Working with people is an art form as complex and beautiful as design itself.",
      "Having both a keen eye and ear, makes me the perfect candidate for the position of graphic designer. I look forward to meeting with you to discuss what I can bring to your team.",
    ],
    resumeImage,
  })
  console.log('✓ About page created')

  console.log('\n=== Migrating Contact Page ===')
  await createOrReplace({
    _id: 'contactPage',
    _type: 'contactPage',
    title: 'Contact - Ben Betts Design',
    email: 'benbettsdesign@gmail.com',
    phone: '703.340.0060',
  })
  console.log('✓ Contact page created')

  // Portfolio pages
  const portfolioPages = [
    {
      id: 'portfolio-digital',
      slug: 'digital',
      title: 'Digital - Ben Betts Design',
      bannerTitle: 'DIGITAL',
      bannerImage: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/background-images/1331242195.jpg',
      headerImage: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/published/digital.png',
      displayType: 'slideshow',
      images: [
        { url: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/hpto-mock-up-church-2020.png', alt: 'Digital Ad' },
        { url: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/1-hpto-mock-up-new2019.png', alt: 'Digital Ad' },
        { url: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/3-hpto-mock-up-baseball-2020.png', alt: 'Digital Ad' },
        { url: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/3-hpto-mock-up-memorialday-2020.png', alt: 'Digital Ad' },
        { url: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/3-hpto-mock-up-new2019.png', alt: 'Digital Ad' },
        { url: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/3-hpto-mock-up-taxday2020.png', alt: 'Digital Ad' },
        { url: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/3-hpto-mock-up-teacherday2020.png', alt: 'Digital Ad' },
      ],
    },
    {
      id: 'portfolio-fine-art',
      slug: 'fine-art',
      title: 'Fine Art - Ben Betts Design',
      bannerTitle: '',
      bannerImage: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/background-images/1984223914.jpg',
      displayType: 'grid2',
      images: [
        { url: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/3d-project.jpg', alt: 'Fine Art' },
        { url: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/brokeltrpress.jpg', alt: 'Fine Art' },
      ],
    },
    {
      id: 'portfolio-logos',
      slug: 'logos',
      title: 'Logos - Ben Betts Design',
      bannerTitle: 'LOGOS',
      bannerSubtitle: 'MISCELLANEOUS COMMISIONED LOGOS',
      bannerImage: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/background-images/1771076914.jpg',
      displayType: 'slideshow',
      images: [
        { url: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/cardboard-daredevil.jpg', alt: 'Logo Design' },
        { url: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/cyber-squared-final-logo.jpg', alt: 'Logo Design' },
        { url: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/wiiha.png', alt: 'Logo Design' },
        { url: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/toilet5-copy.jpg', alt: 'Logo Design' },
        { url: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/candycake.jpg', alt: 'Logo Design' },
        { url: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/frushdentist.jpg', alt: 'Logo Design' },
        { url: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/graceful.jpg', alt: 'Logo Design' },
        { url: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/jeffs.jpg', alt: 'Logo Design' },
        { url: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/oyster.jpg', alt: 'Logo Design' },
      ],
    },
    {
      id: 'portfolio-packaging',
      slug: 'packaging',
      title: 'Packaging - Ben Betts Design',
      bannerTitle: 'PACKAGING',
      bannerImage: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/background-images/554666463.jpg',
      headerImage: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/published/packaging.png',
      displayType: 'grid2',
      images: [
        { url: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/dsc-0604.jpg', alt: 'Packaging Design' },
        { url: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/healthnutmockup.jpg', alt: 'Packaging Design' },
      ],
    },
    {
      id: 'portfolio-photo',
      slug: 'photo',
      title: 'Photo - Ben Betts Design',
      bannerTitle: 'PHOTO',
      bannerImage: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/background-images/85986249.jpg',
      headerImage: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/published/photo.png',
      displayType: 'grid3',
      images: [
        { url: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/adamballs.jpg', alt: 'Photography' },
        { url: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/adamlift.jpg', alt: 'Photography' },
        { url: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/cyarm.jpg', alt: 'Photography' },
        { url: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/handinsky.jpg', alt: 'Photography' },
        { url: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/hovercar.jpg', alt: 'Photography' },
        { url: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/nattyboh.jpg', alt: 'Photography' },
        { url: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/toomany.jpg', alt: 'Photography' },
        { url: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/bacon.jpg', alt: 'Photography' },
        { url: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/donut.jpg', alt: 'Photography' },
        { url: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/egg.jpg', alt: 'Photography' },
        { url: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/grapefriut.jpg', alt: 'Photography' },
        { url: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/kiwi.jpg', alt: 'Photography' },
        { url: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/toast.jpg', alt: 'Photography' },
        { url: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/tomato.jpg', alt: 'Photography' },
        { url: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/img-0078.jpg', alt: 'Photography' },
        { url: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/img-0106.jpg', alt: 'Photography' },
      ],
    },
    {
      id: 'portfolio-print',
      slug: 'print',
      title: 'Print - Ben Betts Design',
      bannerTitle: 'PRINT',
      bannerImage: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/background-images/215704858.jpg',
      headerImage: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/published/print.png',
      displayType: 'grid2',
      images: [
        { url: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/b-oinvitephotoshoot.jpg', alt: 'Print Design' },
        { url: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/bookcoverphotshoot.jpg', alt: 'Print Design' },
        { url: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/barcs1.jpg', alt: 'Print Design' },
        { url: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/54.jpg', alt: 'Print Design' },
        { url: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/mrrlayout2.jpg', alt: 'Print Design' },
        { url: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/menuontable.jpg', alt: 'Print Design' },
        { url: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/headphonereviewlayout.jpg', alt: 'Print Design' },
        { url: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/sleepdeprivedmikehung.jpg', alt: 'Print Design' },
        { url: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/mallbannersmithsonian.jpg', alt: 'Print Design' },
        { url: 'https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/opportiunities-copy.jpg', alt: 'Print Design' },
      ],
    },
  ]

  for (const page of portfolioPages) {
    console.log(`\n=== Migrating Portfolio: ${page.slug} ===`)

    const bannerImage = await uploadImage(page.bannerImage)
    const headerImage = page.headerImage ? await uploadImage(page.headerImage) : undefined

    const images = []
    for (const img of page.images) {
      const uploaded = await uploadImage(img.url)
      images.push({ _key: Math.random().toString(36).slice(2), image: uploaded, alt: img.alt })
    }

    const doc = {
      _id: page.id,
      _type: 'portfolioPage',
      title: page.title,
      slug: { _type: 'slug', current: page.slug },
      bannerTitle: page.bannerTitle || '',
      bannerImage,
      displayType: page.displayType,
      images,
    }
    if (page.bannerSubtitle) doc.bannerSubtitle = page.bannerSubtitle
    if (headerImage) doc.headerImage = headerImage

    await createOrReplace(doc)
    console.log(`✓ ${page.slug} created`)
  }

  console.log('\n✅ Migration complete!')
}

main().catch(err => {
  console.error('Migration failed:', err)
  process.exit(1)
})
