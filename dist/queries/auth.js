"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initAuth = void 0;
const api_client_1 = require("@/api-client");
const initAuth = (supabase, projectId) => {
    // Login with email and password
    const loginWithEmailPassword = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error)
                throw error;
            // After login, check if user is authorized for this project
            const { data: project, error: projectError } = await supabase
                .from("projects")
                .select("user_id")
                .eq("id", projectId)
                .single();
            if (projectError) {
                await supabase.auth.signOut();
                return {
                    data: null,
                    error: "Project not found"
                };
            }
            if (project.user_id !== data.user?.id) {
                await supabase.auth.signOut();
                return {
                    data: null,
                    error: "You are not authorized for this project"
                };
            }
            return { data, error: null };
        }
        catch (error) {
            (0, api_client_1.handleError)(error, "Login failed");
            return { data: null, error };
        }
    };
    // Logout
    const logout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error)
                throw error;
            return { error: null };
        }
        catch (error) {
            (0, api_client_1.handleError)(error, "Logout failed");
            return { error };
        }
    };
    // Get current session
    const getCurrentSession = async () => {
        try {
            const { data, error } = await supabase.auth.getSession();
            if (error)
                throw error;
            return { data, error: null };
        }
        catch (error) {
            (0, api_client_1.handleError)(error, "Failed to get session");
            return { data: null, error };
        }
    };
    // Get current user
    const getCurrentUser = async () => {
        try {
            const { data, error } = await supabase.auth.getUser();
            if (error)
                throw error;
            return { data: data.user, error: null };
        }
        catch (error) {
            (0, api_client_1.handleError)(error, "Failed to get user");
            return { data: null, error };
        }
    };
    return {
        loginWithEmailPassword,
        logout,
        getCurrentSession,
        getCurrentUser,
    };
};
exports.initAuth = initAuth;
