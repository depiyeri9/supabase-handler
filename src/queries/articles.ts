import { Tables, TablesInsert, TablesUpdate } from "../types";
import { checkProjectAuthorization } from "../utils";
import { SupabaseClient } from "@supabase/supabase-js";


// Types
export type Article = Tables<"articles">;
export type ArticleInsert = TablesInsert<"articles">;
export type ArticleUpdate = TablesUpdate<"articles">;

export type getArticlesDTO = () => Promise<{ data: Article[] | null; error: any }>;
export type getArticleBySlugDTO = (slug: string) => Promise<{ data: Article | null; error: any }>;
export type getArticlesByCategoryDTO = (category: string) => Promise<{ data: Article[] | null; error: any }>;
export type getAllArticlesDTO = () => Promise<{ data: Article[] | null; error: any }>;
export type createArticleDTO = (article: Omit<ArticleInsert, "project_id">) => Promise<{ data: Article | null; error: any }>;
export type updateArticleDTO = (id: string, updates: ArticleUpdate) => Promise<{ data: Article | null; error: any }>;
export type updateArticleStatusDTO = (id: string, status: "draft" | "published") => Promise<{ data: Article | null; error: any }>;
export type deleteArticleDTO = (id: string) => Promise<{ data: Article | null; error: any }>;

// Define a type for all query methods
export type ArticlesQueries = {
  getArticles: getArticlesDTO;
  getArticleBySlug: getArticleBySlugDTO;
  getArticlesByCategory: getArticlesByCategoryDTO;
  getAllArticles: getAllArticlesDTO;
  createArticle: createArticleDTO;
  updateArticle: updateArticleDTO;
  updateArticleStatus: updateArticleStatusDTO;
  deleteArticle: deleteArticleDTO;
};

export const initArticles = (supabase: SupabaseClient, projectId: string): ArticlesQueries => {

  // 🔓 Public Query - Get Articles
  const getArticles = async (): Promise<{ data: Article[] | null; error: any }> => {
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
      return { data: null, error };
    }
  };

  // 🔓 Public Query - Get Article by Slug
  const getArticleBySlug = async (slug: string): Promise<{ data: Article | null; error: any }> => {
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
      return { data: null, error };
    }
  };

  // 🔓 Public Query - Get Articles by Category
  const getArticlesByCategory = async (category: string): Promise<{ data: Article[] | null; error: any }> => {
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
      return { data: null, error };
    }
  };

  // 🔐 Admin Function - Get ALL Articles (including drafts)
  const getAllArticles = async (): Promise<{ data: Article[] | null; error: any }> => {
    try {
      const auth = await checkProjectAuthorization(supabase, projectId);
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
      return { data: null, error };
    }
  };

  // 🔐 Admin Function - Create Article
  const createArticle = async (article: Omit<ArticleInsert, "project_id">): Promise<{ data: Article | null; error: any }> => {
    try {
      const auth = await checkProjectAuthorization(supabase, projectId);
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
      return { data: null, error };
    }
  };

  // 🔐 Admin Function - Update Article
  const updateArticle = async (id: string, updates: ArticleUpdate): Promise<{ data: Article | null; error: any }> => {
    try {
      const auth = await checkProjectAuthorization(supabase, projectId);
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
      return { data: null, error };
    }
  };

  // 🔐 Admin Function - Update Article Status
  const updateArticleStatus = async (id: string, status: "draft" | "published"): Promise<{ data: Article | null; error: any }> => {
    try {
      const auth = await checkProjectAuthorization(supabase, projectId);
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
      return { data: null, error };
    }
  };

  // 🔐 Admin Function - Delete Article
  const deleteArticle = async (id: string): Promise<{ data: Article | null; error: any }> => {
    try {
      const auth = await checkProjectAuthorization(supabase, projectId);
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