import { Tables, TablesInsert, TablesUpdate } from "../types";
import { SupabaseClient } from "@supabase/supabase-js";
export type Testimonial = Tables<"testimonials">;
export type TestimonialInsert = TablesInsert<"testimonials">;
export type TestimonialUpdate = TablesUpdate<"testimonials">;
export type getTestimonialsDTO = () => Promise<{
    data: Testimonial[] | null;
    error: any;
}>;
export type getFeaturedTestimonialsDTO = () => Promise<{
    data: Testimonial[] | null;
    error: any;
}>;
export type createTestimonialDTO = (testimonial: Omit<TestimonialInsert, "project_id">) => Promise<{
    data: Testimonial | null;
    error: any;
}>;
export type updateTestimonialDTO = (id: string, updates: TestimonialUpdate) => Promise<{
    data: Testimonial | null;
    error: any;
}>;
export type deleteTestimonialDTO = (id: string) => Promise<{
    data: Testimonial | null;
    error: any;
}>;
export type TestimonialsQueries = {
    getTestimonials: getTestimonialsDTO;
    getFeaturedTestimonials: getFeaturedTestimonialsDTO;
    createTestimonial: createTestimonialDTO;
    updateTestimonial: updateTestimonialDTO;
    deleteTestimonial: deleteTestimonialDTO;
};
export declare const initTestimonials: (supabase: SupabaseClient, projectId: string) => TestimonialsQueries;
