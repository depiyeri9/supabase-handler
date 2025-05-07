import type { Database } from './types';
export declare const supabase: import("@supabase/supabase-js").SupabaseClient<Database, "public", {
    Tables: {
        articles: {
            Row: {
                author_name: string;
                category: string | null;
                content: string;
                cover_image: string;
                created_at: string | null;
                excerpt: string;
                id: string;
                project_id: string;
                slug: string;
                status: string;
                title: string;
            };
            Insert: {
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
            };
            Update: {
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
            };
            Relationships: [{
                foreignKeyName: "articles_project_id_fkey";
                columns: ["project_id"];
                isOneToOne: false;
                referencedRelation: "projects";
                referencedColumns: ["id"];
            }];
        };
        gallery_items: {
            Row: {
                category: string;
                created_at: string | null;
                id: string;
                image_url: string;
                is_featured: boolean | null;
                project_id: string;
                title: string;
            };
            Insert: {
                category: string;
                created_at?: string | null;
                id?: string;
                image_url: string;
                is_featured?: boolean | null;
                project_id: string;
                title: string;
            };
            Update: {
                category?: string;
                created_at?: string | null;
                id?: string;
                image_url?: string;
                is_featured?: boolean | null;
                project_id?: string;
                title?: string;
            };
            Relationships: [{
                foreignKeyName: "gallery_items_project_id_fkey";
                columns: ["project_id"];
                isOneToOne: false;
                referencedRelation: "projects";
                referencedColumns: ["id"];
            }];
        };
        products: {
            Row: {
                created_at: string | null;
                description: string | null;
                id: string;
                images: string[] | null;
                is_active: boolean | null;
                name: string;
                price: number;
                project_id: string;
            };
            Insert: {
                created_at?: string | null;
                description?: string | null;
                id?: string;
                images?: string[] | null;
                is_active?: boolean | null;
                name: string;
                price: number;
                project_id: string;
            };
            Update: {
                created_at?: string | null;
                description?: string | null;
                id?: string;
                images?: string[] | null;
                is_active?: boolean | null;
                name?: string;
                price?: number;
                project_id?: string;
            };
            Relationships: [{
                foreignKeyName: "products_project_id_fkey";
                columns: ["project_id"];
                isOneToOne: false;
                referencedRelation: "projects";
                referencedColumns: ["id"];
            }];
        };
        projects: {
            Row: {
                created_at: string | null;
                description: string | null;
                id: string;
                name: string;
                slug: string;
                user_id: string;
            };
            Insert: {
                created_at?: string | null;
                description?: string | null;
                id?: string;
                name: string;
                slug: string;
                user_id: string;
            };
            Update: {
                created_at?: string | null;
                description?: string | null;
                id?: string;
                name?: string;
                slug?: string;
                user_id?: string;
            };
            Relationships: [];
        };
        testimonials: {
            Row: {
                avatar_url: string | null;
                child_age: number | null;
                child_name: string | null;
                created_at: string | null;
                id: string;
                is_featured: boolean | null;
                parent_name: string;
                project_id: string;
                rating: number;
                testimonial: string;
            };
            Insert: {
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
            };
            Update: {
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
            };
            Relationships: [{
                foreignKeyName: "testimonials_project_id_fkey";
                columns: ["project_id"];
                isOneToOne: false;
                referencedRelation: "projects";
                referencedColumns: ["id"];
            }];
        };
    };
    Views: { [_ in never]: never; };
    Functions: { [_ in never]: never; };
    Enums: { [_ in never]: never; };
    CompositeTypes: { [_ in never]: never; };
}>;
