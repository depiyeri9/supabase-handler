import { TablesInsert, TablesUpdate } from "../types";
import { SupabaseClient } from "@supabase/supabase-js";
type GalleryItemInsert = TablesInsert<"gallery_items">;
type GalleryItemUpdate = TablesUpdate<"gallery_items">;
export declare const initGallery: (supabase: SupabaseClient, projectId: string) => {
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
    createGalleryItem: (item: GalleryItemInsert) => Promise<{
        data: any;
        error: null;
    } | {
        data: null;
        error: unknown;
    }>;
    updateGalleryItem: (id: string, updates: GalleryItemUpdate) => Promise<{
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
export {};
