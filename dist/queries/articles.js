"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initArticles = void 0;
const api_client_1 = require("@/api-client");
const initArticles = (supabase, projectId) => {
    // 🔓 Public Query - Get Articles
    const getArticles = async () => {
        try {
            const { data, error } = await supabase
                .from("articles")
                .select("*")
                .eq("project_id", projectId)
                .eq("status", "published") // Only show published articles to the public
                .order("created_at", { ascending: false });
            if (error)
                throw error;
            return { data, error: null };
        }
        catch (error) {
            return { data: null, error };
        }
    };
    // 🔓 Public Query - Get Article by Slug
    const getArticleBySlug = async (slug) => {
        try {
            const { data, error } = await supabase
                .from("articles")
                .select("*")
                .eq("project_id", projectId)
                .eq("slug", slug)
                .eq("status", "published") // Only show published articles to the public
                .single();
            if (error)
                throw error;
            return { data, error: null };
        }
        catch (error) {
            return { data: null, error };
        }
    };
    // 🔓 Public Query - Get Articles by Category
    const getArticlesByCategory = async (category) => {
        try {
            const { data, error } = await supabase
                .from("articles")
                .select("*")
                .eq("project_id", projectId)
                .eq("category", category)
                .eq("status", "published") // Only show published articles to the public
                .order("created_at", { ascending: false });
            if (error)
                throw error;
            return { data, error: null };
        }
        catch (error) {
            return { data: null, error };
        }
    };
    // 🔐 Admin Function - Get ALL Articles (including drafts)
    const getAllArticles = async () => {
        try {
            const auth = await (0, api_client_1.checkProjectAuthorization)();
            if (!auth.isAuthorized) {
                return { data: null, error: auth.error };
            }
            const { data, error } = await supabase
                .from("articles")
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
    // 🔐 Admin Function - Create Article
    const createArticle = async (article) => {
        try {
            const auth = await (0, api_client_1.checkProjectAuthorization)();
            if (!auth.isAuthorized) {
                return { data: null, error: auth.error };
            }
            const { data, error } = await supabase
                .from("articles")
                .insert({ ...article, project_id: projectId })
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
    // 🔐 Admin Function - Update Article
    const updateArticle = async (id, updates) => {
        try {
            const auth = await (0, api_client_1.checkProjectAuthorization)();
            if (!auth.isAuthorized) {
                return { data: null, error: auth.error };
            }
            const { data, error } = await supabase
                .from("articles")
                .update(updates)
                .eq("id", id)
                .eq("project_id", projectId) // Ensure article belongs to current project
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
    // 🔐 Admin Function - Update Article Status
    const updateArticleStatus = async (id, status) => {
        try {
            const auth = await (0, api_client_1.checkProjectAuthorization)();
            if (!auth.isAuthorized) {
                return { data: null, error: auth.error };
            }
            const { data, error } = await supabase
                .from("articles")
                .update({ status })
                .eq("id", id)
                .eq("project_id", projectId)
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
    // 🔐 Admin Function - Delete Article
    const deleteArticle = async (id) => {
        try {
            const auth = await (0, api_client_1.checkProjectAuthorization)();
            if (!auth.isAuthorized) {
                return { data: null, error: auth.error };
            }
            const { data, error } = await supabase
                .from("articles")
                .delete()
                .eq("id", id)
                .eq("project_id", projectId) // Ensure article belongs to current project
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
        getArticles,
        getArticleBySlug,
        getArticlesByCategory,
        getAllArticles,
        createArticle,
        updateArticle,
        updateArticleStatus,
        deleteArticle,
    };
};
exports.initArticles = initArticles;
