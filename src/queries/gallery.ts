import { checkProjectAuthorization } from "../utils.js";
import { Tables, TablesInsert, TablesUpdate } from "../types.js";
import { SupabaseClient } from "@supabase/supabase-js";


// Types
export type GalleryItem = Tables<"gallery_items">;
export type GalleryItemInsert = TablesInsert<"gallery_items">;
export type GalleryItemUpdate = TablesUpdate<"gallery_items">;

export type getGalleryItemsDTO = () => Promise<{ data: GalleryItem[] | null; error: any }>;
export type getFeaturedGalleryItemsDTO = () => Promise<{ data: GalleryItem[] | null; error: any }>;
export type getGalleryItemsByCategoryDTO = (category: string) => Promise<{ data: GalleryItem[] | null; error: any }>;
export type createGalleryItemDTO = (item: Omit<GalleryItemInsert, "project_id">) => Promise<{ data: GalleryItem | null; error: any }>;
export type updateGalleryItemDTO = (id: string, updates: GalleryItemUpdate) => Promise<{ data: GalleryItem | null; error: any }>;
export type deleteGalleryItemDTO = (id: string) => Promise<{ data: GalleryItem | null; error: any }>;

// Define a type for all query methods
export type GalleryQueries = {
  getGalleryItems: getGalleryItemsDTO;
  getFeaturedGalleryItems: getFeaturedGalleryItemsDTO;
  getGalleryItemsByCategory: getGalleryItemsByCategoryDTO;
  createGalleryItem: createGalleryItemDTO;
  updateGalleryItem: updateGalleryItemDTO;
  deleteGalleryItem: deleteGalleryItemDTO;
};

export const initGallery = (supabase: SupabaseClient, projectId: string): GalleryQueries => {
  // 🔓 Public Query - Get Gallery Items
  const getGalleryItems = async (): Promise<{ data: GalleryItem[] | null; error: any }> => {
    try {
      const { data, error } = await supabase
        .from("gallery_items")
        .select("*")
        .eq("project_id", projectId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  // 🔓 Public Query - Get Featured Gallery Items
  const getFeaturedGalleryItems = async (): Promise<{ data: GalleryItem[] | null; error: any }> => {
    try {
      const { data, error } = await supabase
        .from("gallery_items")
        .select("*")
        .eq("project_id", projectId)
        .eq("is_featured", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  // 🔓 Public Query - Get Gallery Items by Category
  const getGalleryItemsByCategory = async (category: string): Promise<{ data: GalleryItem[] | null; error: any }> => {
    try {
      const { data, error } = await supabase
        .from("gallery_items")
        .select("*")
        .eq("project_id", projectId)
        .eq("category", category)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  // 🔐 Admin Function - Create Gallery Item
  const createGalleryItem = async (item: Omit<GalleryItemInsert, "project_id">): Promise<{ data: GalleryItem | null; error: any }> => {
    try {
      const auth = await checkProjectAuthorization(supabase, projectId);
      if (!auth.isAuthorized) {
        return { data: null, error: auth.error };
      }

      const { data, error } = await supabase
        .from("gallery_items")
        .insert({ ...item, project_id: projectId })
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  // 🔐 Admin Function - Update Gallery Item
  const updateGalleryItem = async (id: string, updates: GalleryItemUpdate): Promise<{ data: GalleryItem | null; error: any }> => {
    try {
      const auth = await checkProjectAuthorization(supabase, projectId);
      if (!auth.isAuthorized) {
        return { data: null, error: auth.error };
      }

      // First, verify the item belongs to the current project
      const { data: existingItem, error: fetchError } = await supabase
        .from("gallery_items")
        .select("project_id")
        .eq("id", id)
        .eq("project_id", projectId)
        .single();

      if (fetchError || !existingItem) {
        return { data: null, error: "Item not found or not authorized to modify" };
      }

      const { data, error } = await supabase
        .from("gallery_items")
        .update(updates)
        .eq("id", id)
        .eq("project_id", projectId) // For added security
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  // 🔐 Admin Function - Delete Gallery Item
  const deleteGalleryItem = async (id: string): Promise<{ data: GalleryItem | null; error: any }> => {
    try {
      const auth = await checkProjectAuthorization(supabase, projectId);
      if (!auth.isAuthorized) {
        return { data: null, error: auth.error };
      }

      const { data, error } = await supabase
        .from("gallery_items")
        .delete()
        .eq("id", id)
        .eq("project_id", projectId) // Ensure item belongs to current project
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  return {
    getGalleryItems,
    getFeaturedGalleryItems,
    getGalleryItemsByCategory,
    createGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
  };
};