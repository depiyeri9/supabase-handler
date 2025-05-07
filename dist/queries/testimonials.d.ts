import { TablesInsert, TablesUpdate } from "../types";
import { SupabaseClient } from "@supabase/supabase-js";
type TestimonialInsert = TablesInsert<"testimonials">;
type TestimonialUpdate = TablesUpdate<"testimonials">;
export declare const initTestimonials: (supabase: SupabaseClient, projectId: string) => {
    getTestimonials: () => Promise<{
        data: any[];
        error: null;
    } | {
        data: null;
        error: unknown;
    }>;
    getFeaturedTestimonials: () => Promise<{
        data: any[];
        error: null;
    } | {
        data: null;
        error: unknown;
    }>;
    createTestimonial: (testimonial: Omit<TestimonialInsert, "project_id">) => Promise<{
        data: any;
        error: null;
    } | {
        data: null;
        error: unknown;
    }>;
    updateTestimonial: (id: string, updates: TestimonialUpdate) => Promise<{
        data: any;
        error: null;
    } | {
        data: null;
        error: unknown;
    }>;
    deleteTestimonial: (id: string) => Promise<{
        data: any;
        error: null;
    } | {
        data: null;
        error: unknown;
    }>;
};
export {};
