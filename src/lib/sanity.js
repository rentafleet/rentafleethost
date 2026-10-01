import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'mgczplu2',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2025-02-19',
  useCdn: true,
})

const imageBuilder = createImageUrlBuilder(sanityClient)

export function sanityImage(source) {
  return imageBuilder.image(source)
}