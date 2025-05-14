import { checkProjectAuthorization } from "../utils.js";
import { Tables, TablesInsert, TablesUpdate } from "../types.js";
import { SupabaseClient } from "@supabase/supabase-js";

// Types
export type Testimonial = Tables<"testimonials">;
export type TestimonialInsert = TablesInsert<"testimonials">;
export type TestimonialUpdate = TablesUpdate<"testimonials">;

export type getTestimonialsDTO = () => Promise<{ data: Testimonial[] | null; error: any }>;
export type getFeaturedTestimonialsDTO = () => Promise<{ data: Testimonial[] | null; error: any }>;
export type createTestimonialDTO = (testimonial: Omit<TestimonialInsert, "project_id">) => Promise<{ data: Testimonial | null; error: any }>;
export type updateTestimonialDTO = (id: string, updates: TestimonialUpdate) => Promise<{ data: Testimonial | null; error: any }>;
export type deleteTestimonialDTO = (id: string) => Promise<{ data: Testimonial | null; error: any }>;

// Define a type for all query methods
export type TestimonialsQueries = {
  getTestimonials: getTestimonialsDTO;
  getFeaturedTestimonials: getFeaturedTestimonialsDTO;
  createTestimonial: createTestimonialDTO;
  updateTestimonial: updateTestimonialDTO;
  deleteTestimonial: deleteTestimonialDTO;
};

export const initTestimonials = (supabase: SupabaseClient, projectId: string): TestimonialsQueries => {
  // 🔓 Public Query - Get Testimonials
  const getTestimonials = async (): Promise<{ data: Testimonial[] | null; error: any }> => {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("project_id", projectId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  // 🔓 Public Query - Get Featured Testimonials
  const getFeaturedTestimonials = async (): Promise<{ data: Testimonial[] | null; error: any }> => {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("project_id", projectId)
        .eq("is_featured", true)
        .order("rating", { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  // 🔐 Admin Function - Create Testimonial
  const createTestimonial = async (testimonial: Omit<TestimonialInsert, "project_id">): Promise<{ data: Testimonial | null; error: any }> => {
    try {
      const auth = await checkProjectAuthorization(supabase, projectId);
      if (!auth.isAuthorized) {
        return { data: null, error: auth.error };
      }

      const { data, error } = await supabase
        .from("testimonials")
        .insert({ ...testimonial, project_id: projectId })
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  // 🔐 Admin Function - Update Testimonial
  const updateTestimonial = async (id: string, updates: TestimonialUpdate): Promise<{ data: Testimonial | null; error: any }> => {
    try {
      const auth = await checkProjectAuthorization(supabase, projectId);
      if (!auth.isAuthorized) {
        return { data: null, error: auth.error };
      }

      const { data, error } = await supabase
        .from("testimonials")
        .update(updates)
        .eq("id", id)
        .eq("project_id", projectId) // Ensure testimonial belongs to current project
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  // 🔐 Admin Function - Delete Testimonial
  const deleteTestimonial = async (id: string): Promise<{ data: Testimonial | null; error: any }> => {
    try {
      const auth = await checkProjectAuthorization(supabase, projectId);
      if (!auth.isAuthorized) {
        return { data: null, error: auth.error };
      }

      const { data, error } = await supabase
        .from("testimonials")
        .delete()
        .eq("id", id)
        .eq("project_id", projectId) // Ensure testimonial belongs to current project
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  return {
    getTestimonials,
    getFeaturedTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
  };
};