import { SupabaseClient } from '@supabase/supabase-js';
import { Tables, TablesInsert, TablesUpdate } from "../types";
export type Product = Tables<"products">;
export type ProductInsert = TablesInsert<"products">;
export type ProductUpdate = TablesUpdate<"products">;
export type getProductsDTO = () => Promise<{
    data: Product[] | null;
    error: any;
}>;
export type getProductByIdDTO = (productId: string) => Promise<{
    data: Product | null;
    error: any;
}>;
export type getAllProductsDTO = () => Promise<{
    data: Product[] | null;
    error: any;
}>;
export type createProductDTO = (product: Omit<ProductInsert, "project_id">) => Promise<{
    data: Product | null;
    error: any;
}>;
export type updateProductDTO = (id: string, updates: ProductUpdate) => Promise<{
    data: Product | null;
    error: any;
}>;
export type deleteProductDTO = (id: string) => Promise<{
    data: Product | null;
    error: any;
}>;
export type ProductsQueries = {
    getProducts: getProductsDTO;
    getProductById: getProductByIdDTO;
    getAllProducts: getAllProductsDTO;
    createProduct: createProductDTO;
    updateProduct: updateProductDTO;
    deleteProduct: deleteProductDTO;
};
export declare const initProducts: (supabase: SupabaseClient, projectId: string) => ProductsQueries;
