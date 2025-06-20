import { Tables, TablesInsert, TablesUpdate } from "../types";
import { SupabaseClient } from "@supabase/supabase-js";
export type Article = Tables<"articles">;
export type ArticleInsert = TablesInsert<"articles">;
export type ArticleUpdate = TablesUpdate<"articles">;
export type getArticlesDTO = () => Promise<{
    data: Article[] | null;
    error: any;
}>;
export type getArticleBySlugDTO = (slug: string) => Promise<{
    data: Article | null;
    error: any;
}>;
export type getArticlesByCategoryDTO = (category: string) => Promise<{
    data: Article[] | null;
    error: any;
}>;
export type getAllArticlesDTO = () => Promise<{
    data: Article[] | null;
    error: any;
}>;
export type createArticleDTO = (article: Omit<ArticleInsert, "project_id">) => Promise<{
    data: Article | null;
    error: any;
}>;
export type updateArticleDTO = (id: string, updates: ArticleUpdate) => Promise<{
    data: Article | null;
    error: any;
}>;
export type updateArticleStatusDTO = (id: string, status: "draft" | "published") => Promise<{
    data: Article | null;
    error: any;
}>;
export type deleteArticleDTO = (id: string) => Promise<{
    data: Article | null;
    error: any;
}>;
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
export declare const initArticles: (supabase: SupabaseClient, projectId: string) => ArticlesQueries;
