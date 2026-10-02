import {createElement as h} from 'react'
import {PortableText} from '@portabletext/react'
import {createClient} from '@sanity/client'
import {createImageUrlBuilder} from '@sanity/image-url'
import {renderToStaticMarkup} from 'react-dom/server'
import {mkdir, readFile, writeFile} from 'node:fs/promises'
import {dirname, join, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const siteUrl = 'https://www.rentafleet.host'
const projectId = process.env.VITE_SANITY_PROJECT_ID || 'mgczplu2'
const dataset = process.env.VITE_SANITY_DATASET || 'production'
const client = createClient({projectId, dataset, apiVersion: '2025-02-19', useCdn: false})
const imageBuilder = createImageUrlBuilder(client)

const postsQuery = `*[_type == "post" && defined(slug.current) && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc) {
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  _updatedAt,
  body,
  coverImage,
  "authorName": coalesce(authorProfile->name, select(author._type == "reference" => author->name, author), "Renta Fleet"),
  "authorBio": coalesce(authorProfile->bio, author->bio),
  "authorImage": coalesce(authorProfile->image{asset, alt}, author->image{asset, alt})
}`

const staticRoutes = [
  {path: '/', changefreq: 'weekly', priority: '1.0'},
  {path: '/fleet/', changefreq: 'weekly', priority: '0.9'},
  {path: '/about/', changefreq: 'yearly', priority: '0.6'},
  {path: '/contact/', changefreq: 'yearly', priority: '0.6'},
  {path: '/blog/', changefreq: 'weekly', priority: '0.8'},
]

const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}[char]))

const safeSlug = (slug) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug || '')
const formatDate = (value) => new Intl.DateTimeFormat('en-US', {dateStyle: 'long'}).format(new Date(value))

const portableTextComponents = {
  block: {
    normal: ({children}) => h('p', {className: 'my-5 leading-8 text-foreground/90'}, children),
    h2: ({children}) => h('h2', {className: 'mt-10 text-2xl'}, children),
    h3: ({children}) => h('h3', {className: 'mt-8 text-xl'}, children),
    blockquote: ({children}) => h('blockquote', {className: 'my-8 border-l-2 border-primary pl-5 text-lg text-muted-foreground'}, children),
  },
  list: {
    bullet: ({children}) => h('ul', {className: 'my-5 list-disc space-y-2 pl-6'}, children),
    number: ({children}) => h('ol', {className: 'my-5 list-decimal space-y-2 pl-6'}, children),
  },
  marks: {
    link: ({children, value}) => {
      const href = /^(https?:\/\/|\/)/i.test(value?.href || '') ? value.href : '#'
      return h('a', {href, className: 'text-primary underline underline-offset-4'}, children)
    },
  },
  types: {
    image: ({value}) => h('figure', {className: 'my-10'},
      h('img', {src: imageBuilder.image(value).width(1200).url(), alt: value.alt || '', className: 'w-full rounded-md object-cover'}),
      value.caption ? h('figcaption', {className: 'mt-2 text-sm text-muted-foreground'}, value.caption) : null,
    ),
  },
}

function renderPostBody(body) {
  return renderToStaticMarkup(h(PortableText, {value: body || [], components: portableTextComponents}))
}

function articleHtml(template, post) {
  const canonical = `${siteUrl}/blog/${post.slug}/`
  const title = `${post.title} | Renta Fleet`
  const description = post.excerpt || ''
  const authorName = post.authorName || 'Renta Fleet'
  const image = post.coverImage ? imageBuilder.image(post.coverImage).width(1200).url() : undefined
  const authorImage = post.authorImage ? imageBuilder.image(post.authorImage).width(160).height(160).fit('crop').url() : undefined
  const initials = authorName.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase()
  const readMinutes = Math.max(1, Math.ceil((renderToStaticMarkup(h(PortableText, {value: post.body || []})).replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length) / 200))
  const authorCard = `<aside class="mx-auto mt-14 flex max-w-3xl items-start gap-4 border-t border-border pt-8">${authorImage ? `<img src="${escapeHtml(authorImage)}" alt="${escapeHtml(post.authorImage.alt || '')}" class="size-16 shrink-0 rounded-full object-cover" />` : `<span aria-hidden="true" class="flex size-16 shrink-0 items-center justify-center rounded-full bg-secondary font-heading text-lg font-semibold text-primary">${escapeHtml(initials)}</span>`}<div><p class="font-heading text-xs uppercase tracking-[0.15em] text-primary">About the author</p><h2 class="mt-1 text-lg">${escapeHtml(authorName)}</h2>${post.authorBio ? `<p class="mt-2 text-sm leading-6 text-muted-foreground">${escapeHtml(post.authorBio)}</p>` : ''}</div></aside>`
  const main = `<main><article class="mx-auto max-w-4xl px-6 py-16"><a href="/blog/" class="inline-flex items-center gap-2 font-heading text-sm uppercase text-primary">← The Journal</a><header class="mx-auto max-w-3xl py-10"><div class="flex flex-wrap items-center gap-2 text-sm text-muted-foreground"><time datetime="${escapeHtml(post.publishedAt)}">${escapeHtml(formatDate(post.publishedAt))}</time><span aria-hidden="true">·</span><span>${readMinutes} min read</span>${post.authorName ? `<span aria-hidden="true">·</span><span>${escapeHtml(authorName)}</span>` : ''}</div><h1 class="mt-4 text-4xl leading-tight md:text-5xl">${escapeHtml(post.title)}</h1>${description ? `<p class="mt-5 text-lg text-muted-foreground">${escapeHtml(description)}</p>` : ''}</header>${image ? `<img src="${escapeHtml(image)}" alt="${escapeHtml(post.coverImage.alt || '')}" class="aspect-video w-full rounded-md object-cover" />` : ''}<div class="mx-auto mt-10 max-w-3xl">${renderPostBody(post.body)}</div>${authorCard}</article></main>`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description,
    datePublished: post.publishedAt,
    dateModified: post._updatedAt || post.publishedAt,
    author: { '@type': 'Person', name: authorName },
    mainEntityOfPage: canonical,
    ...(image ? {image} : {}),
  }
  const metadata = [
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:type" content="article" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    ...(image ? [`<meta property="og:image" content="${escapeHtml(image)}" />`] : []),
    `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`,
  ].join('\n    ')

  return template
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta name="description"[^>]*\/>/, '')
    .replace('</head>', `    ${metadata}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${main}</div>`)
}

function sitemapXml(posts) {
  const today = new Date().toISOString().slice(0, 10)
  const entries = [
    ...staticRoutes.map((route) => ({...route, lastmod: today})),
    ...posts.filter((post) => safeSlug(post.slug)).map((post) => ({
      path: `/blog/${post.slug}/`,
      changefreq: 'monthly',
      priority: '0.7',
      lastmod: (post._updatedAt || post.publishedAt || today).slice(0, 10),
    })),
  ]
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.map((entry) => `  <url><loc>${escapeHtml(`${siteUrl}${entry.path}`)}</loc><lastmod>${escapeHtml(entry.lastmod)}</lastmod><changefreq>${entry.changefreq}</changefreq><priority>${entry.priority}</priority></url>`).join('\n')}\n</urlset>\n`
}

const posts = await client.fetch(postsQuery)
const template = await readFile(join(dist, 'index.html'), 'utf8')
await writeFile(join(dist, 'sitemap.xml'), sitemapXml(posts), 'utf8')

let prerendered = 0
for (const post of posts) {
  if (!safeSlug(post.slug)) continue
  const outputPath = join(dist, 'blog', post.slug, 'index.html')
  await mkdir(dirname(outputPath), {recursive: true})
  await writeFile(outputPath, articleHtml(template, post), 'utf8')
  prerendered++
}
console.log(`[seo] sitemap includes ${staticRoutes.length} static route(s) and ${posts.length} published post(s); prerendered ${prerendered} article page(s)`)
