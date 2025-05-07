"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initTestimonials = void 0;
const api_client_1 = require("@/api-client");
const initTestimonials = (supabase, projectId) => {
    // 🔓 Public Query - Get Testimonials
    const getTestimonials = async () => {
        try {
            const { data, error } = await supabase
                .from("testimonials")
                .select("*")
                .eq("project_id", projectId)
                .order("created_at", { ascending: false });
            if (error)
                throw error;
            return { data, error: null };
        }
        catch (error) {
            (0, api_client_1.handleError)(error, "Failed to fetch testimonials");
            return { data: null, error };
        }
    };
    // 🔓 Public Query - Get Featured Testimonials
    const getFeaturedTestimonials = async () => {
        try {
            const { data, error } = await supabase
                .from("testimonials")
                .select("*")
                .eq("project_id", projectId)
                .eq("is_featured", true)
                .order("rating", { ascending: false });
            if (error)
                throw error;
            return { data, error: null };
        }
        catch (error) {
            (0, api_client_1.handleError)(error, "Failed to fetch featured testimonials");
            return { data: null, error };
        }
    };
    // 🔐 Admin Function - Create Testimonial
    const createTestimonial = async (testimonial) => {
        try {
            const auth = await (0, api_client_1.checkProjectAuthorization)();
            if (!auth.isAuthorized) {
                return { data: null, error: auth.error };
            }
            const { data, error } = await supabase
                .from("testimonials")
                .insert({ ...testimonial, project_id: projectId })
                .select()
                .single();
            if (error)
                throw error;
            return { data, error: null };
        }
        catch (error) {
            (0, api_client_1.handleError)(error, "Failed to create testimonial");
            return { data: null, error };
        }
    };
    // 🔐 Admin Function - Update Testimonial
    const updateTestimonial = async (id, updates) => {
        try {
            const auth = await (0, api_client_1.checkProjectAuthorization)();
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
            if (error)
                throw error;
            return { data, error: null };
        }
        catch (error) {
            (0, api_client_1.handleError)(error, "Failed to update testimonial");
            return { data: null, error };
        }
    };
    // 🔐 Admin Function - Delete Testimonial
    const deleteTestimonial = async (id) => {
        try {
            const auth = await (0, api_client_1.checkProjectAuthorization)();
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
            if (error)
                throw error;
            return { data, error: null };
        }
        catch (error) {
            (0, api_client_1.handleError)(error, "Failed to delete testimonial");
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
exports.initTestimonials = initTestimonials;
