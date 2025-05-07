export declare const PROJECT_ID = "591d7992-2b29-43e0-b2a1-8c1ea29de3ff";
export type AuthCheckResult = {
    isAuthorized: boolean;
    userId?: string;
    error?: string;
};
export declare const checkProjectAuthorization: () => Promise<AuthCheckResult>;
