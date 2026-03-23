/**
 * Migrates packaging and print sub-page projects to Sanity.
 * Downloads images from Weebly and uploads them, then creates project documents.
 *
 * Usage: SANITY_TOKEN="<token>" node scripts/migrate-projects.mjs
 */

import { createClient } from '@sanity/client';
import https from 'https';
import http from 'http';

const client = createClient({
  projectId: '3ta2u9fb',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const BASE = 'https://my-site-103496-100818.weebly.com/uploads/1/3/2/1/132156171/';

const projects = [
  // ─── Packaging ───────────────────────────────────────────────────────────────
  {
    id: 'project-couch-vote',
    title: 'Couch Vote',
    slug: 'couch-vote',
    parentPage: 'packaging',
    thumbnailFile: 'dsc-0604.jpg',
    slideFiles: ['dsc-0598.jpg', 'dsc-0600.jpg', 'dsc-0601.jpg', 'dsc-0602.jpg', 'dsc-0603.jpg', 'poster-frame-mockup-couch.png'],
  },
  {
    id: 'project-quillin',
    title: "Just Quillin' Pen Store",
    slug: 'quillin',
    parentPage: 'packaging',
    thumbnailFile: 'dsc-0669.jpg',
    slideFiles: ['quillinsample.jpg', 'bag-and-ink.jpg', 'pen.jpg'],
  },
  {
    id: 'project-beer-belly',
    title: 'Beer Belly',
    slug: 'beer-belly',
    parentPage: 'packaging',
    thumbnailFile: 'dsc-0258.jpg',
    slideFiles: ['dsc-0249.jpg', 'dsc-0252.jpg', 'dsc-0248.jpg', 'dsc-0251.jpg', 'closeup-beer.jpg', 'closeup-beer2.jpg', 'closeup-beer3.jpg', 'closeup-beer4.jpg'],
  },
  {
    id: 'project-better-beginnings',
    title: 'Better Beginnings',
    slug: 'better-beginnings',
    parentPage: 'packaging',
    thumbnailFile: 'healthnutmockup.jpg',
    slideFiles: ['fitnessfreakmockup.jpg', 'healthnutmockup.jpg'],
  },
  // ─── Print ───────────────────────────────────────────────────────────────────
  {
    id: 'project-bo-rebranding',
    title: 'B&O Museum',
    slug: 'bo-rebranding',
    parentPage: 'print',
    thumbnailFile: 'b-oinvitephotoshoot.jpg',
    slideFiles: ['invitecover-copy.jpg', 'b-oinvitephotoshoot.jpg', 'b-orsvpcardshoot.jpg', 'bando-mock-up.png'],
  },
  {
    id: 'project-violence-in-film',
    title: 'Violence in Film',
    slug: 'violence-in-film',
    parentPage: 'print',
    thumbnailFile: 'bookcoverphotshoot.jpg',
    slideFiles: ['bookcoverphotshoot.jpg', 'book1photoshoot.jpg', 'book2photoshoot.jpg', 'book3photoshoot.jpg', 'book4photoshoot.jpg', 'bookbackcoverphotshoot.jpg'],
  },
  {
    id: 'project-animal-report',
    title: 'Animal Report',
    slug: 'animal-report',
    parentPage: 'print',
    thumbnailFile: 'barcs1.jpg',
    slideFiles: ['barcs1.jpg', 'barcs2.jpg'],
  },
  {
    id: 'project-memoirs-asylum',
    title: 'Memoirs from the Asylum',
    slug: 'memoirs-from-the-asylum',
    parentPage: 'print',
    thumbnailFile: '54.jpg',
    slideFiles: ['54.jpg', '53.jpg', 'girlinterruptedshoot.jpg', 'prozacnationshoot.jpg', 'unquietmindshoot.jpg'],
  },
  {
    id: 'project-maximum-rr',
    title: 'Maximum R&R',
    slug: 'maximum-rock-and-roll',
    parentPage: 'print',
    thumbnailFile: 'mrrlayout2.jpg',
    slideFiles: ['mrrcover.jpg', 'mrrlayout2.jpg', 'mrrlayout3.jpg', 'mrrlayout1.jpg'],
  },
  {
    id: 'project-now-and-then',
    title: 'Now & Then',
    slug: 'now-and-then',
    parentPage: 'print',
    thumbnailFile: 'menuontable.jpg',
    slideFiles: ['asset-1-4x.png', 'nowandthencomp.jpg', 'menuontable.jpg'],
  },
  {
    id: 'project-accessory-man',
    title: 'Accessory Man',
    slug: 'accessory-man',
    parentPage: 'print',
    thumbnailFile: 'headphonereviewlayout.jpg',
    slideFiles: ['headphonereviewlayout.jpg', 'speakerreviewlayout.jpg'],
  },
  {
    id: 'project-posters',
    title: 'Posters',
    slug: 'posters',
    parentPage: 'print',
    thumbnailFile: 'sleepdeprivedmikehung.jpg',
    slideFiles: ['sleepdeprivedmikehung.jpg', 'film-festival-poster.jpg', 'mff-poster-mockup.jpg', 'mffposter2.png', 'poster-frame-mockup-couch.png'],
  },
  {
    id: 'project-change-your-view',
    title: 'Change Your View',
    slug: 'change-your-view',
    parentPage: 'print',
    thumbnailFile: 'mallbannersmithsonian.jpg',
    slideFiles: ['bus-stop-smithsonian.jpg', 'smithsonianfinal-1.jpg', 'mallbannersmithsonian.jpg', 'smithsonianfinal-2.jpg', 'pollbannersmithsonian.jpg', 'smithsonianfinal-3.jpg'],
  },
  {
    id: 'project-tv-handouts',
    title: 'TV Sales Sheets',
    slug: 'tv-handouts',
    parentPage: 'print',
    thumbnailFile: 'opportiunities-copy.jpg',
    slideFiles: ['opportiunities-copy.jpg', 'rocky.jpg', 'burtreynolds.jpg', 'highest-month-ever.jpg', 'kick-butt.jpg', 'spring-into-action.jpg', 'spring-into-action-back.jpg'],
  },
];

function downloadBuffer(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    mod.get(url, (res) => {
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

const assetCache = new Map();

async function uploadImage(filename) {
  if (assetCache.has(filename)) return assetCache.get(filename);
  const url = BASE + filename;
  console.log(`  ↓ ${filename}`);
  try {
    const buffer = await downloadBuffer(url);
    const ext = filename.split('.').pop().toLowerCase();
    const contentType = ext === 'png' ? 'image/png' : 'image/jpeg';
    const asset = await client.assets.upload('image', buffer, { filename, contentType });
    assetCache.set(filename, asset._id);
    return asset._id;
  } catch (err) {
    console.error(`  ✗ Failed to upload ${filename}: ${err.message}`);
    return null;
  }
}

async function migrate() {
  if (!process.env.SANITY_TOKEN) {
    console.error('Error: SANITY_TOKEN is required.');
    process.exit(1);
  }

  for (const project of projects) {
    console.log(`\nProcessing: ${project.title}`);

    // Upload thumbnail
    const thumbId = await uploadImage(project.thumbnailFile);

    // Upload all unique slide images
    const uniqueSlides = [...new Set(project.slideFiles)];
    const slideIds = [];
    for (const file of uniqueSlides) {
      const id = await uploadImage(file);
      if (id) slideIds.push({ file, id });
    }

    // Build slides array (preserve original order, allow duplicates)
    const slides = project.slideFiles
      .map((file, i) => {
        const found = slideIds.find((s) => s.file === file);
        if (!found) return null;
        return {
          _key: `slide-${i}`,
          _type: 'object',
          image: { _type: 'image', asset: { _type: 'reference', _ref: found.id } },
          alt: project.title,
        };
      })
      .filter(Boolean);

    const doc = {
      _id: project.id,
      _type: 'project',
      title: project.title,
      slug: { _type: 'slug', current: project.slug },
      parentPage: project.parentPage,
      ...(thumbId ? { thumbnail: { _type: 'image', asset: { _type: 'reference', _ref: thumbId } } } : {}),
      slides,
    };

    try {
      await client.createOrReplace(doc);
      console.log(`  ✓ Created project: ${project.title}`);
    } catch (err) {
      console.error(`  ✗ Failed to create project: ${err.message}`);
    }
  }

  console.log('\nDone! All projects migrated.');
}

migrate();
