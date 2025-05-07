"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkProjectAuthorization = exports.handleError = exports.PROJECT_ID = void 0;
const client_1 = require("./client");
// Current project ID - this would be set based on deployment environment
exports.PROJECT_ID = "591d7992-2b29-43e0-b2a1-8c1ea29de3ff";
// Error handling helper
const handleError = (error, message = "An error occurred") => {
    console.error("API Error:", error);
    // toast({
    //   variant: "destructive",
    //   title: "Error",
    //   description: message,
    // });
};
exports.handleError = handleError;
// Check if the user is authorized for this project
const checkProjectAuthorization = async () => {
    try {
        const { data: { user } } = await client_1.supabase.auth.getUser();
        if (!user) {
            return { isAuthorized: false, error: "Not authenticated" };
        }
        const { data: project, error } = await client_1.supabase
            .from("projects")
            .select("user_id")
            .eq("id", exports.PROJECT_ID)
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
    }
    catch (error) {
        (0, exports.handleError)(error, "Authorization check failed");
        return { isAuthorized: false, error: "Authorization check failed" };
    }
};
exports.checkProjectAuthorization = checkProjectAuthorization;
