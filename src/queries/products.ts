import { SupabaseClient } from '@supabase/supabase-js';
import { checkProjectAuthorization } from "../utils";
import { Tables, TablesInsert, TablesUpdate } from "../types";


// Types
export type Product = Tables<"products">;
export type ProductInsert = TablesInsert<"products">;
export type ProductUpdate = TablesUpdate<"products">;

export type getProductsDTO = () => Promise<{ data: Product[] | null; error: any }>;
export type getProductByIdDTO = (productId: string) => Promise<{ data: Product | null; error: any }>;
export type getAllProductsDTO = () => Promise<{ data: Product[] | null; error: any }>;
export type createProductDTO = (product: Omit<ProductInsert, "project_id">) => Promise<{ data: Product | null; error: any }>;
export type updateProductDTO = (id: string, updates: ProductUpdate) => Promise<{ data: Product | null; error: any }>;
export type deleteProductDTO = (id: string) => Promise<{ data: Product | null; error: any }>;


// Define a type for all query methods
export type ProductsQueries = {
  getProducts: getProductsDTO;
  getProductById: getProductByIdDTO;
  getAllProducts: getAllProductsDTO;
  createProduct: createProductDTO;
  updateProduct: updateProductDTO;
  deleteProduct: deleteProductDTO;
};

export const initProducts = (supabase: SupabaseClient, projectId: string): ProductsQueries => {
  // 🔓 Public Query - Get Products
  const getProducts = async (): Promise<{ data: Product[] | null; error: any }> => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("project_id", projectId)
        .eq("is_active", true) // Only show active products to the public
        .order("name", { ascending: true });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  // 🔓 Public Query - Get Product by ID
  const getProductById = async (productId: string): Promise<{ data: Product | null; error: any }> => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("project_id", projectId)
        .eq("id", productId)
        .eq("is_active", true) // Only show active products to the public
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  // 🔐 Admin Function - Get ALL Products (including inactive)
  const getAllProducts = async (): Promise<{ data: Product[] | null; error: any }> => {
    try {
      const auth = await checkProjectAuthorization(supabase, projectId);
      if (!auth.isAuthorized) {
        return { data: null, error: auth.error };
      }

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("project_id", projectId)
        .order("name", { ascending: true });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  // 🔐 Admin Function - Create Product
  const createProduct = async (product: Omit<ProductInsert, "project_id">): Promise<{ data: Product | null; error: any }> => {
    try {
      const auth = await checkProjectAuthorization(supabase, projectId);
      if (!auth.isAuthorized) {
        return { data: null, error: auth.error };
      }

      const { data, error } = await supabase
        .from("products")
        .insert({ ...product, project_id: projectId })
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  // 🔐 Admin Function - Update Product
  const updateProduct = async (id: string, updates: ProductUpdate): Promise<{ data: Product | null; error: any }> => {
    try {
      const auth = await checkProjectAuthorization(supabase, projectId);
      if (!auth.isAuthorized) {
        return { data: null, error: auth.error };
      }

      const { data, error } = await supabase
        .from("products")
        .update(updates)
        .eq("id", id)
        .eq("project_id", projectId) // Ensure product belongs to current project
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  // 🔐 Admin Function - Delete Product
  const deleteProduct = async (id: string): Promise<{ data: Product | null; error: any }> => {
    try {
      const auth = await checkProjectAuthorization(supabase, projectId);
      if (!auth.isAuthorized) {
        return { data: null, error: auth.error };
      }

      const { data, error } = await supabase
        .from("products")
        .delete()
        .eq("id", id)
        .eq("project_id", projectId) // Ensure product belongs to current project
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  return {
    getProducts,
    getProductById,
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};