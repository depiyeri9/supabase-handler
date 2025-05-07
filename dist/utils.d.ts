import { SupabaseClient } from "@supabase/supabase-js";
export type AuthCheckResult = {
    isAuthorized: boolean;
    userId?: string;
    error?: string;
};
export declare const checkProjectAuthorization: (supabase: SupabaseClient, projectId: string) => Promise<AuthCheckResult>;
