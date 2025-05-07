import { supabase } from "./client";


// Current project ID - this would be set based on deployment environment
export const PROJECT_ID = "591d7992-2b29-43e0-b2a1-8c1ea29de3ff";

// Type for auth checks
export type AuthCheckResult = {
  isAuthorized: boolean;
  userId?: string;
  error?: string;
};

// Check if the user is authorized for this project
export const checkProjectAuthorization = async (): Promise<AuthCheckResult> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { isAuthorized: false, error: "Not authenticated" };
    }

    const { data: project, error } = await supabase
      .from("projects")
      .select("user_id")
      .eq("id", PROJECT_ID)
      .single();

    if (error) {
      return { isAuthorized: false, error: "Project not found" };
    }

    const isAuthorized = project.user_id === user.id;
    
    return { 
      isAuthorized, 
      userId: user.id,
      error: isAuthorized ? undefined : "Not authorized for this project" 
    };
  } catch (error) {
    return { isAuthorized: false, error: "Authorization check failed" };
  }
};
