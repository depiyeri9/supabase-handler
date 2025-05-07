import { TablesInsert, TablesUpdate } from "../types";
import { SupabaseClient } from "@supabase/supabase-js";
type ArticleInsert = TablesInsert<"articles">;
type ArticleUpdate = TablesUpdate<"articles">;
export declare const initArticles: (supabase: SupabaseClient, projectId: string) => {
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
    createArticle: (article: Omit<ArticleInsert, "project_id">) => Promise<{
        data: any;
        error: null;
    } | {
        data: null;
        error: unknown;
    }>;
    updateArticle: (id: string, updates: ArticleUpdate) => Promise<{
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
export {};
