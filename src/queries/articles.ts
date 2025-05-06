import { Tables, TablesInsert, TablesUpdate } from "@/types";
import { checkProjectAuthorization, handleError } from "@/api-client";
import { SupabaseClient } from "@supabase/supabase-js";


// Types
type Article = Tables<"articles">;
type ArticleInsert = TablesInsert<"articles">;
type ArticleUpdate = TablesUpdate<"articles">;



export const initArticles = (supabase: SupabaseClient, projectId: string) => {

  // 🔓 Public Query - Get Articles
  const getArticles = async () => {
    try {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("project_id", projectId)
        .eq("status", "published") // Only show published articles to the public
        .order("created_at", { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      handleError(error, "Failed to fetch articles");
      return { data: null, error };
    }
  };

  // 🔓 Public Query - Get Article by Slug
  const getArticleBySlug = async (slug: string) => {
    try {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("project_id", projectId)
        .eq("slug", slug)
        .eq("status", "published") // Only show published articles to the public
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      handleError(error, "Failed to fetch article");
      return { data: null, error };
    }
  };

  // 🔓 Public Query - Get Articles by Category
  const getArticlesByCategory = async (category: string) => {
    try {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("project_id", projectId)
        .eq("category", category)
        .eq("status", "published") // Only show published articles to the public
        .order("created_at", { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      handleError(error, "Failed to fetch articles by category");
      return { data: null, error };
    }
  };

  // 🔐 Admin Function - Get ALL Articles (including drafts)
  const getAllArticles = async () => {
    try {
      const auth = await checkProjectAuthorization();
      if (!auth.isAuthorized) {
        return { data: null, error: auth.error };
      }

      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("project_id", projectId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      handleError(error, "Failed to fetch all articles");
      return { data: null, error };
    }
  };

  // 🔐 Admin Function - Create Article
  const createArticle = async (article: Omit<ArticleInsert, "project_id">) => {
    try {
      const auth = await checkProjectAuthorization();
      if (!auth.isAuthorized) {
        return { data: null, error: auth.error };
      }

      const { data, error } = await supabase
        .from("articles")
        .insert({ ...article, project_id: projectId })
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      handleError(error, "Failed to create article");
      return { data: null, error };
    }
  };

  // 🔐 Admin Function - Update Article
  const updateArticle = async (id: string, updates: ArticleUpdate) => {
    try {
      const auth = await checkProjectAuthorization();
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

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      handleError(error, "Failed to update article");
      return { data: null, error };
    }
  };

  // 🔐 Admin Function - Update Article Status
  const updateArticleStatus = async (id: string, status: "draft" | "published") => {
    try {
      const auth = await checkProjectAuthorization();
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

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      handleError(error, "Failed to update article status");
      return { data: null, error };
    }
  };

  // 🔐 Admin Function - Delete Article
  const deleteArticle = async (id: string) => {
    try {
      const auth = await checkProjectAuthorization();
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

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      handleError(error, "Failed to delete article");
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
}