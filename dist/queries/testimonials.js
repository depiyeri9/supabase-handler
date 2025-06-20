import { checkProjectAuthorization } from "../utils";
export const initTestimonials = (supabase, projectId) => {
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
            return { data: null, error };
        }
    };
    // 🔐 Admin Function - Create Testimonial
    const createTestimonial = async (testimonial) => {
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
            if (error)
                throw error;
            return { data, error: null };
        }
        catch (error) {
            return { data: null, error };
        }
    };
    // 🔐 Admin Function - Update Testimonial
    const updateTestimonial = async (id, updates) => {
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
            if (error)
                throw error;
            return { data, error: null };
        }
        catch (error) {
            return { data: null, error };
        }
    };
    // 🔐 Admin Function - Delete Testimonial
    const deleteTestimonial = async (id) => {
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
            if (error)
                throw error;
            return { data, error: null };
        }
        catch (error) {
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
