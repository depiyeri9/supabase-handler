import { createSupabaseClient } from 'src/client';
import { Database } from './types';
import { initArticles } from './queries/articles';
import { initAuth } from './queries/auth';
import { initGallery } from './queries/gallery';
import { initProducts } from './queries/products';
import { initTestimonials } from './queries/testimonials';

export function initDB(projectId: string,
  SUPABASE_URL: string = process.env.SUPABASE_URL || '',
  SUPABASE_PUBLISHABLE_KEY: string = process.env.SUPABASE_PUBLISHABLE_KEY || ''
) {
  if (!projectId) throw new Error('projectId is required');

  const supabase = createSupabaseClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
  );

  return {
    articles: initArticles(supabase, projectId),
    gallery: initGallery(supabase, projectId),
    products: initProducts(supabase, projectId),
    testimonials: initTestimonials(supabase, projectId),
    auth: initAuth(supabase, projectId),
  };
}

export type Tables = Database["public"]["Tables"];
