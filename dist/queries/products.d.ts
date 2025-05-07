import { SupabaseClient } from '@supabase/supabase-js';
import { TablesInsert, TablesUpdate } from "@/types";
type ProductInsert = TablesInsert<"products">;
type ProductUpdate = TablesUpdate<"products">;
export declare const initProducts: (supabase: SupabaseClient, projectId: string) => {
    getProducts: () => Promise<{
        data: any[];
        error: null;
    } | {
        data: null;
        error: unknown;
    }>;
    getProductById: (productId: string) => Promise<{
        data: any;
        error: null;
    } | {
        data: null;
        error: unknown;
    }>;
    getAllProducts: () => Promise<{
        data: any[];
        error: null;
    } | {
        data: null;
        error: unknown;
    }>;
    createProduct: (product: Omit<ProductInsert, "project_id">) => Promise<{
        data: any;
        error: null;
    } | {
        data: null;
        error: unknown;
    }>;
    updateProduct: (id: string, updates: ProductUpdate) => Promise<{
        data: any;
        error: null;
    } | {
        data: null;
        error: unknown;
    }>;
    deleteProduct: (id: string) => Promise<{
        data: any;
        error: null;
    } | {
        data: null;
        error: unknown;
    }>;
};
export {};
