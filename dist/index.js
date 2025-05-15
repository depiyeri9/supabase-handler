import { initArticles } from './queries/articles';
import { initAuth } from './queries/auth';
import { initGallery } from './queries/gallery';
import { initProducts } from './queries/products';
import { initTestimonials } from './queries/testimonials';
import { createSupabaseClient } from './client';
export function initDB(projectId, SUPABASE_URL = '', SUPABASE_PUBLISHABLE_KEY = '') {
    if (!projectId)
        throw new Error('projectId is required');
    const supabase = createSupabaseClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
    return {
        articles: initArticles(supabase, projectId),
        gallery: initGallery(supabase, projectId),
        products: initProducts(supabase, projectId),
        testimonials: initTestimonials(supabase, projectId),
        auth: initAuth(supabase, projectId),
    };
}
