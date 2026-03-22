import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '3ta2u9fb',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

async function uploadImage(url) {
  console.log('  Uploading:', url.split('/').pop())
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`)
  const buffer = await res.arrayBuffer()
  const filename = url.split('/').pop()
  const asset = await client.assets.upload('image', Buffer.from(buffer), { filename })
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
}

const iframeCodes = [
  `<iframe src="//cdn.bannersnack.com/banners/bzul6j9mz/embed/index.html?userId=37877821&t=1576265943" width="300" height="250" scrolling="no" frameborder="0" allowtransparency="true" allow="autoplay" allowfullscreen="true"></iframe>`,
  `<iframe src="//cdn.bannersnack.com/banners/bc5qbsa0n/embed/index.html?userId=37877821&t=1576516287" width="300" height="250" scrolling="no" frameborder="0" allowtransparency="true" allow="autoplay" allowfullscreen="true"></iframe>`,
  `<iframe src="//cdn.bannersnack.com/banners/btniyckpr/embed/index.html?userId=37877821&t=1576273593" width="300" height="250" scrolling="no" frameborder="0" allowtransparency="true" allow="autoplay" allowfullscreen="true"></iframe>`,
  `<iframe src="//cdn.bannersnack.com/banners/bhciq9m3x/embed/index.html?userId=37877821&t=1576516775" width="300" height="250" scrolling="no" frameborder="0" allowtransparency="true" allow="autoplay" allowfullscreen="true"></iframe>`,
  `<iframe src="//cdn.bannersnack.com/banners/bvc8yjico/embed/index.html?userId=37877821&t=1582207953" width="300" height="250" scrolling="no" frameborder="0" allowtransparency="true" allow="autoplay" allowfullscreen="true"></iframe>`,
  `<iframe src="//cdn.bannersnack.com/banners/b1ki4j9ko/embed/index.html?userId=37877821&t=1562090796" width="300" height="250" scrolling="no" frameborder="0" allowtransparency="true" allow="autoplay" allowfullscreen="true"></iframe>`,
  `<iframe src="//cdn.bannersnack.com/banners/b13wt0yym/embed/index.html?userId=37877821&t=1573764148" width="300" height="250" scrolling="no" frameborder="0" allowtransparency="true" allow="autoplay" allowfullscreen="true"></iframe>`,
  `<iframe src="//cdn.bannersnack.com/banners/bu5yu6ggf/embed/index.html?userId=37877821&t=1572970959" width="300" height="250" scrolling="no" frameborder="0" allowtransparency="true" allow="autoplay" allowfullscreen="true"></iframe>`,
  `<iframe src="//cdn.bannersnack.com/banners/b7cs6p9nv/embed/index.html?userId=37877821&t=1564427831" width="300" height="250" scrolling="no" frameborder="0" allowtransparency="true" allow="autoplay" allowfullscreen="true"></iframe>`,
  `<iframe src="//cdn.bannersnack.com/banners/bzpfo5aap/embed/index.html?userId=37877821&t=1574176060" width="300" height="250" scrolling="no" frameborder="0" allowtransparency="true" allow="autoplay" allowfullscreen="true"></iframe>`,
  `<iframe src="//cdn.bannersnack.com/banners/bhpa7fssk/embed/index.html?userId=37877821&t=1573063238" width="300" height="250" scrolling="no" frameborder="0" allowtransparency="true" allow="autoplay" allowfullscreen="true"></iframe>`,
  `<iframe src="//cdn.bannersnack.com/banners/b1m8o3i5t/embed/index.html?userId=37877821&t=1576179181" width="300" height="250" scrolling="no" frameborder="0" allowtransparency="true" allow="autoplay" allowfullscreen="true"></iframe>`,
  `<iframe src="//cdn.bannersnack.com/banners/bz9f2n33x/embed/index.html?userId=37877821&t=1573753452" width="300" height="250" scrolling="no" frameborder="0" allowtransparency="true" allow="autoplay" allowfullscreen="true"></iframe>`,
  `<iframe src="//cdn.bannersnack.com/banners/b71nw3f3x/embed/index.html?userId=37877821&t=1555007654" width="300" height="250" scrolling="no" frameborder="0" allowtransparency="true" allow="autoplay" allowfullscreen="true"></iframe>`,
  `<iframe src="//cdn.bannersnack.com/banners/bz1iwi53x/embed/index.html?userId=37877821&t=1582644259" width="300" height="250" scrolling="no" frameborder="0" allowtransparency="true" allow="autoplay" allowfullscreen="true"></iframe>`,
  `<iframe src="//cdn.bannersnack.com/banners/bhp30xdw5/embed/index.html?userId=37877821&t=1581694607" width="300" height="250" scrolling="no" frameborder="0" allowtransparency="true" allow="autoplay" allowfullscreen="true"></iframe>`,
  `<iframe src="//cdn.bannersnack.com/banners/bu9a7y645/embed/index.html?userId=37877821&t=1582668208" width="300" height="250" scrolling="no" frameborder="0" allowtransparency="true" allow="autoplay" allowfullscreen="true"></iframe>`,
  `<iframe src="//cdn.bannersnack.com/banners/bh5edfqap/embed/index.html?userId=37877821&t=1565636331" width="300" height="250" scrolling="no" frameborder="0" allowtransparency="true" allow="autoplay" allowfullscreen="true"></iframe>`,
  `<iframe src="//cdn.bannersnack.com/banners/bvp54i5i1/embed/index.html?userId=37877821&t=1568731944" width="300" height="250" scrolling="no" frameborder="0" allowtransparency="true" allow="autoplay" allowfullscreen="true"></iframe>`,
  `<iframe src="//cdn.bannersnack.com/banners/bxtjquhr0/embed/index.html?userId=37877821&t=1582668367" width="300" height="250" scrolling="no" frameborder="0" allowtransparency="true" allow="autoplay" allowfullscreen="true"></iframe>`,
]

async function main() {
  // 1. Add missing HPTO image to the slideshow
  console.log('Uploading missing HPTO image...')
  const missingImage = await uploadImage('https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/kentucky-new2019-hpto.png')
  const newImageEntry = {
    _key: 'kentucky-hpto',
    image: missingImage,
    alt: 'Digital Ad',
  }

  // 2. Build embeds array
  const embeds = iframeCodes.map((code, i) => ({
    _key: `embed-${i + 1}`,
    label: `Banner Ad ${i + 1}`,
    code,
    width: 300,
    height: 250,
  }))

  // 3. Patch the digital document
  console.log('Patching digital portfolio page...')
  await client
    .patch('portfolio-digital')
    .setIfMissing({ images: [], embeds: [] })
    .append('images', [newImageEntry])
    .set({ embeds })
    .commit()

  console.log('✅ Done! Added 1 HPTO image + 20 banner ad embeds to digital page.')
}

main().catch(err => {
  console.error('Failed:', err)
  process.exit(1)
})
