/**
 * Downloads stylized page header images from Weebly and uploads them to Sanity,
 * then patches the headerImage field on each portfolioPage document.
 *
 * Usage: SANITY_TOKEN="<token>" node scripts/migrate-headers.mjs
 */

import { createClient } from '@sanity/client';
import https from 'https';

const client = createClient({
  projectId: '3ta2u9fb',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const BASE = 'https://my-site-103496-100818.weebly.com/uploads/1/3/2/1/132156171/published/';

const headers = [
  { slug: 'packaging', file: 'packaging.png' },
  { slug: 'print',     file: 'print.png' },
  { slug: 'digital',   file: 'digital.png' },
  { slug: 'photo',     file: 'photo.png' },
  { slug: 'fine-art',  file: 'fine-art.png' },
];

function downloadBuffer(url) {
  return new Promise((resolve, reject) => {
    const opts = new URL(url);
    opts.headers = { 'User-Agent': UA };
    https.get(opts, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadBuffer(res.headers.location).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function run() {
  if (!process.env.SANITY_TOKEN) {
    console.error('Error: SANITY_TOKEN is required.');
    process.exit(1);
  }

  for (const { slug, file } of headers) {
    console.log(`\nProcessing: ${slug}`);

    // Download image
    console.log(`  ↓ ${file}`);
    let assetId;
    try {
      const buffer = await downloadBuffer(BASE + file);
      const asset = await client.assets.upload('image', buffer, { filename: file, contentType: 'image/png' });
      assetId = asset._id;
      console.log(`  ✓ Uploaded: ${assetId}`);
    } catch (err) {
      console.error(`  ✗ Upload failed: ${err.message}`);
      continue;
    }

    // Find the portfolioPage document by slug
    const doc = await client.fetch(`*[_type == "portfolioPage" && slug.current == $slug][0]`, { slug });
    if (!doc) {
      console.warn(`  ⚠ No portfolioPage found with slug "${slug}" — skipping patch`);
      continue;
    }

    // Patch headerImage
    try {
      await client.patch(doc._id).set({
        headerImage: { _type: 'image', asset: { _type: 'reference', _ref: assetId } },
      }).commit();
      console.log(`  ✓ Patched portfolioPage: ${doc._id}`);
    } catch (err) {
      console.error(`  ✗ Patch failed: ${err.message}`);
    }
  }

  console.log('\nDone!');
}

run();
