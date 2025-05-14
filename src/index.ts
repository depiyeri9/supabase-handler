import { Database } from './types.js';
import { initArticles } from './queries/articles.js';
import { initAuth } from './queries/auth.js';
import { initGallery } from './queries/gallery.js';
import { initProducts } from './queries/products.js';
import { initTestimonials } from './queries/testimonials.js';
import { createSupabaseClient } from './client.js';

type DBHelper = {
  articles: ReturnType<typeof initArticles>;
  gallery: ReturnType<typeof initGallery>;
  products: ReturnType<typeof initProducts>;
  testimonials: ReturnType<typeof initTestimonials>;
  auth: ReturnType<typeof initAuth>;
};

export function initDB(projectId: string,
  SUPABASE_URL: string = process.env.SUPABASE_URL || '',
  SUPABASE_PUBLISHABLE_KEY: string = process.env.SUPABASE_PUBLISHABLE_KEY || ''
): DBHelper {
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

export {
  Article,
  ArticleInsert,
  ArticleUpdate,
  getArticlesDTO,
  getArticleBySlugDTO,
  getArticlesByCategoryDTO,
  getAllArticlesDTO,
  createArticleDTO,
  updateArticleDTO,
  updateArticleStatusDTO,
  deleteArticleDTO,
  ArticlesQueries,
} from './queries/articles.js';

export {
  GalleryItem,
  GalleryItemInsert,
  GalleryItemUpdate,
  getGalleryItemsDTO,
  getFeaturedGalleryItemsDTO,
  getGalleryItemsByCategoryDTO,
  createGalleryItemDTO,
  updateGalleryItemDTO,
  deleteGalleryItemDTO,
  GalleryQueries,
} from './queries/gallery.js';

export {
  Product,
  ProductInsert,
  ProductUpdate,
  getProductsDTO,
  getProductByIdDTO,
  getAllProductsDTO,
  createProductDTO,
  updateProductDTO,
  deleteProductDTO,
  ProductsQueries,
} from './queries/products.js';

export {
  Testimonial,
  TestimonialInsert,
  TestimonialUpdate,
  getTestimonialsDTO,
  getFeaturedTestimonialsDTO,
  createTestimonialDTO,
  updateTestimonialDTO,
  deleteTestimonialDTO,
  TestimonialsQueries,
} from './queries/testimonials.js';
