import { SupabaseClient } from "@supabase/supabase-js";



export const initAuth = (supabase: SupabaseClient, projectId: string) => {
  // Login with email and password
  const loginWithEmailPassword = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

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
    } catch (error) {
      return { data: null, error };
    }
  };

  // Logout
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  // Get current session
  const getCurrentSession = async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  // Get current user
  const getCurrentUser = async () => {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      return { data: data.user, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };


  return {
    loginWithEmailPassword,
    logout,
    getCurrentSession,
    getCurrentUser,
  }

}