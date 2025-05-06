import { supabase } from './client';
// import { initArticles } from './queries/articles';
// import { initGallery } from './queries/gallery';
// import { initProducts } from './queries/products';

export function initDB(projectId: string) {
  if (!projectId) throw new Error('projectId is required');

  return {
    // articles: initArticles(supabase, projectId),
    // gallery: initGallery(supabase, projectId),
    // products: initProducts(supabase, projectId),
  };
}
