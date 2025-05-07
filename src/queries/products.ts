import { SupabaseClient } from '@supabase/supabase-js';
import { checkProjectAuthorization } from "../utils";
import { Tables, TablesInsert, TablesUpdate } from "../types";


// Types
type Product = Tables<"products">;
type ProductInsert = TablesInsert<"products">;
type ProductUpdate = TablesUpdate<"products">;


export const initProducts = (supabase: SupabaseClient, projectId: string) => {
  // 🔓 Public Query - Get Products
  const getProducts = async () => {
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
  const getProductById = async (productId: string) => {
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
  const getAllProducts = async () => {
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
  const createProduct = async (product: Omit<ProductInsert, "project_id">) => {
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
  const updateProduct = async (id: string, updates: ProductUpdate) => {
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
  const deleteProduct = async (id: string) => {
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
}