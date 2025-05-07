import { Database } from './types';
export declare function initDB(projectId: string, SUPABASE_URL?: string, SUPABASE_PUBLISHABLE_KEY?: string): {
    articles: {
        getArticles: () => Promise<{
            data: any[];
            error: null;
        } | {
            data: null;
            error: unknown;
        }>;
        getArticleBySlug: (slug: string) => Promise<{
            data: any;
            error: null;
        } | {
            data: null;
            error: unknown;
        }>;
        getArticlesByCategory: (category: string) => Promise<{
            data: any[];
            error: null;
        } | {
            data: null;
            error: unknown;
        }>;
        getAllArticles: () => Promise<{
            data: any[];
            error: null;
        } | {
            data: null;
            error: unknown;
        }>;
        createArticle: (article: Omit<{
            author_name: string;
            category?: string | null;
            content: string;
            cover_image: string;
            created_at?: string | null;
            excerpt: string;
            id?: string;
            project_id: string;
            slug: string;
            status: string;
            title: string;
        }, "project_id">) => Promise<{
            data: any;
            error: null;
        } | {
            data: null;
            error: unknown;
        }>;
        updateArticle: (id: string, updates: {
            author_name?: string;
            category?: string | null;
            content?: string;
            cover_image?: string;
            created_at?: string | null;
            excerpt?: string;
            id?: string;
            project_id?: string;
            slug?: string;
            status?: string;
            title?: string;
        }) => Promise<{
            data: any;
            error: null;
        } | {
            data: null;
            error: unknown;
        }>;
        updateArticleStatus: (id: string, status: "draft" | "published") => Promise<{
            data: any;
            error: null;
        } | {
            data: null;
            error: unknown;
        }>;
        deleteArticle: (id: string) => Promise<{
            data: any;
            error: null;
        } | {
            data: null;
            error: unknown;
        }>;
    };
    gallery: {
        getGalleryItems: () => Promise<{
            data: any[];
            error: null;
        } | {
            data: null;
            error: unknown;
        }>;
        getFeaturedGalleryItems: () => Promise<{
            data: any[];
            error: null;
        } | {
            data: null;
            error: unknown;
        }>;
        getGalleryItemsByCategory: (category: string) => Promise<{
            data: any[];
            error: null;
        } | {
            data: null;
            error: unknown;
        }>;
        createGalleryItem: (item: Omit<{
            category: string;
            created_at?: string | null;
            id?: string;
            image_url: string;
            is_featured?: boolean | null;
            project_id: string;
            title: string;
        }, "project_id">) => Promise<{
            data: any;
            error: null;
        } | {
            data: null;
            error: unknown;
        }>;
        updateGalleryItem: (id: string, updates: {
            category?: string;
            created_at?: string | null;
            id?: string;
            image_url?: string;
            is_featured?: boolean | null;
            project_id?: string;
            title?: string;
        }) => Promise<{
            data: any;
            error: null;
        } | {
            data: null;
            error: unknown;
        }>;
        deleteGalleryItem: (id: string) => Promise<{
            data: any;
            error: null;
        } | {
            data: null;
            error: unknown;
        }>;
    };
    products: {
        getProducts: () => Promise<{
            data: any[];
            error: null;
        } | {
            data: null;
            error: unknown;
        }>;
        getProductById: (productId: string) => Promise<{
            data: any;
            error: null;
        } | {
            data: null;
            error: unknown;
        }>;
        getAllProducts: () => Promise<{
            data: any[];
            error: null;
        } | {
            data: null;
            error: unknown;
        }>;
        createProduct: (product: Omit<{
            created_at?: string | null;
            description?: string | null;
            id?: string;
            images?: string[] | null;
            is_active?: boolean | null;
            name: string;
            price: number;
            project_id: string;
        }, "project_id">) => Promise<{
            data: any;
            error: null;
        } | {
            data: null;
            error: unknown;
        }>;
        updateProduct: (id: string, updates: {
            created_at?: string | null;
            description?: string | null;
            id?: string;
            images?: string[] | null;
            is_active?: boolean | null;
            name?: string;
            price?: number;
            project_id?: string;
        }) => Promise<{
            data: any;
            error: null;
        } | {
            data: null;
            error: unknown;
        }>;
        deleteProduct: (id: string) => Promise<{
            data: any;
            error: null;
        } | {
            data: null;
            error: unknown;
        }>;
    };
    testimonials: {
        getTestimonials: () => Promise<{
            data: any[];
            error: null;
        } | {
            data: null;
            error: unknown;
        }>;
        getFeaturedTestimonials: () => Promise<{
            data: any[];
            error: null;
        } | {
            data: null;
            error: unknown;
        }>;
        createTestimonial: (testimonial: Omit<{
            avatar_url?: string | null;
            child_age?: number | null;
            child_name?: string | null;
            created_at?: string | null;
            id?: string;
            is_featured?: boolean | null;
            parent_name: string;
            project_id: string;
            rating: number;
            testimonial: string;
        }, "project_id">) => Promise<{
            data: any;
            error: null;
        } | {
            data: null;
            error: unknown;
        }>;
        updateTestimonial: (id: string, updates: {
            avatar_url?: string | null;
            child_age?: number | null;
            child_name?: string | null;
            created_at?: string | null;
            id?: string;
            is_featured?: boolean | null;
            parent_name?: string;
            project_id?: string;
            rating?: number;
            testimonial?: string;
        }) => Promise<{
            data: any;
            error: null;
        } | {
            data: null;
            error: unknown;
        }>;
        deleteTestimonial: (id: string) => Promise<{
            data: any;
            error: null;
        } | {
            data: null;
            error: unknown;
        }>;
    };
    auth: {
        loginWithEmailPassword: (email: string, password: string) => Promise<{
            data: {
                user: import("@supabase/auth-js").User;
                session: import("@supabase/auth-js").Session;
                weakPassword?: import("@supabase/auth-js").WeakPassword;
            };
            error: null;
        } | {
            data: null;
            error: unknown;
        }>;
        logout: () => Promise<{
            error: unknown;
        }>;
        getCurrentSession: () => Promise<{
            data: {
                session: import("@supabase/auth-js").Session;
            } | {
                session: null;
            };
            error: null;
        } | {
            data: null;
            error: unknown;
        }>;
        getCurrentUser: () => Promise<{
            data: import("@supabase/auth-js").User;
            error: null;
        } | {
            data: null;
            error: unknown;
        }>;
    };
};
export type Tables = Database["public"]["Tables"];
