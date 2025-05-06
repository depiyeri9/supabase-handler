import { supabase } from './client';
import { initArticles } from './queries/articles';
import { initAuth } from './queries/auth';
import { initGallery } from './queries/gallery';
import { initProducts } from './queries/products';
import { initTestimonials } from './queries/testimonials';

export function initDB(projectId: string) {
  if (!projectId) throw new Error('projectId is required');

  return {
    articles: initArticles(supabase, projectId),
    gallery: initGallery(supabase, projectId),
    products: initProducts(supabase, projectId),
    testimonials: initTestimonials(supabase, projectId),
    auth: initAuth(supabase, projectId),
  };
}
