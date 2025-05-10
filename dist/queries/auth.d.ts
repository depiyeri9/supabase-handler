import { SupabaseClient } from "@supabase/supabase-js";
export declare const initAuth: (supabase: SupabaseClient, projectId: string) => {
    loginWithEmailPassword: (email: string, password: string) => Promise<{
        data: {
            user: import("@supabase/supabase-js").AuthUser;
            session: import("@supabase/supabase-js").AuthSession;
            weakPassword?: import("@supabase/supabase-js").WeakPassword;
        };
        error: null;
    } | {
        data: null;
        error: unknown;
    }>;
    logout: () => Promise<{
        error: unknown;
    }>;
    getCurrentSession: () => Promise<{
        data: {
            session: import("@supabase/supabase-js").AuthSession;
        } | {
            session: null;
        };
        error: null;
    } | {
        data: null;
        error: unknown;
    }>;
    getCurrentUser: () => Promise<{
        data: import("@supabase/supabase-js").AuthUser;
        error: null;
    } | {
        data: null;
        error: unknown;
    }>;
};
