"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initGallery = void 0;
const api_client_1 = require("@/api-client");
const initGallery = (supabase, projectId) => {
    // 🔓 Public Query - Get Gallery Items
    const getGalleryItems = async () => {
        try {
            const { data, error } = await supabase
                .from("gallery_items")
                .select("*")
                .eq("project_id", projectId)
                .order("created_at", { ascending: false });
            if (error)
                throw error;
            return { data, error: null };
        }
        catch (error) {
            return { data: null, error };
        }
    };
    // 🔓 Public Query - Get Featured Gallery Items
    const getFeaturedGalleryItems = async () => {
        try {
            const { data, error } = await supabase
                .from("gallery_items")
                .select("*")
                .eq("project_id", projectId)
                .eq("is_featured", true)
                .order("created_at", { ascending: false });
            if (error)
                throw error;
            return { data, error: null };
        }
        catch (error) {
            return { data: null, error };
        }
    };
    // 🔓 Public Query - Get Gallery Items by Category
    const getGalleryItemsByCategory = async (category) => {
        try {
            const { data, error } = await supabase
                .from("gallery_items")
                .select("*")
                .eq("project_id", projectId)
                .eq("category", category)
                .order("created_at", { ascending: false });
            if (error)
                throw error;
            return { data, error: null };
        }
        catch (error) {
            return { data: null, error };
        }
    };
    // 🔐 Admin Function - Create Gallery Item
    const createGalleryItem = async (item) => {
        try {
            const auth = await (0, api_client_1.checkProjectAuthorization)();
            if (!auth.isAuthorized) {
                return { data: null, error: auth.error };
            }
            const { data, error } = await supabase
                .from("gallery_items")
                .insert({ ...item, project_id: projectId })
                .select()
                .single();
            if (error)
                throw error;
            return { data, error: null };
        }
        catch (error) {
            return { data: null, error };
        }
    };
    // 🔐 Admin Function - Update Gallery Item
    const updateGalleryItem = async (id, updates) => {
        try {
            const auth = await (0, api_client_1.checkProjectAuthorization)();
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
            if (error)
                throw error;
            return { data, error: null };
        }
        catch (error) {
            return { data: null, error };
        }
    };
    // 🔐 Admin Function - Delete Gallery Item
    const deleteGalleryItem = async (id) => {
        try {
            const auth = await (0, api_client_1.checkProjectAuthorization)();
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
            if (error)
                throw error;
            return { data, error: null };
        }
        catch (error) {
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
exports.initGallery = initGallery;
