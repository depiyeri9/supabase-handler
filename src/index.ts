import { Database } from './types';
import { initArticles } from './queries/articles';
import { initAuth } from './queries/auth';
import { initGallery } from './queries/gallery';
import { initProducts } from './queries/products';
import { initTestimonials } from './queries/testimonials';
import { createSupabaseClient } from './client';

export type DBHelper = {
  articles: ReturnType<typeof initArticles>;
  gallery: ReturnType<typeof initGallery>;
  products: ReturnType<typeof initProducts>;
  testimonials: ReturnType<typeof initTestimonials>;
  auth: ReturnType<typeof initAuth>;
};

export function initDB(projectId: string,
  SUPABASE_URL: string = '',
  SUPABASE_PUBLISHABLE_KEY: string = ''
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
} from './queries/articles';

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
} from './queries/gallery';

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
} from './queries/products';

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
} from './queries/testimonials';
