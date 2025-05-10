import { Tables, TablesInsert, TablesUpdate } from "../types";
import { SupabaseClient } from "@supabase/supabase-js";
export type GalleryItem = Tables<"gallery_items">;
export type GalleryItemInsert = TablesInsert<"gallery_items">;
export type GalleryItemUpdate = TablesUpdate<"gallery_items">;
export type getGalleryItemsDTO = () => Promise<{
    data: GalleryItem[] | null;
    error: any;
}>;
export type getFeaturedGalleryItemsDTO = () => Promise<{
    data: GalleryItem[] | null;
    error: any;
}>;
export type getGalleryItemsByCategoryDTO = (category: string) => Promise<{
    data: GalleryItem[] | null;
    error: any;
}>;
export type createGalleryItemDTO = (item: Omit<GalleryItemInsert, "project_id">) => Promise<{
    data: GalleryItem | null;
    error: any;
}>;
export type updateGalleryItemDTO = (id: string, updates: GalleryItemUpdate) => Promise<{
    data: GalleryItem | null;
    error: any;
}>;
export type deleteGalleryItemDTO = (id: string) => Promise<{
    data: GalleryItem | null;
    error: any;
}>;
export type GalleryQueries = {
    getGalleryItems: getGalleryItemsDTO;
    getFeaturedGalleryItems: getFeaturedGalleryItemsDTO;
    getGalleryItemsByCategory: getGalleryItemsByCategoryDTO;
    createGalleryItem: createGalleryItemDTO;
    updateGalleryItem: updateGalleryItemDTO;
    deleteGalleryItem: deleteGalleryItemDTO;
};
export declare const initGallery: (supabase: SupabaseClient, projectId: string) => GalleryQueries;
