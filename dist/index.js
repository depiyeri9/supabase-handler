"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDB = initDB;
const client_1 = require("src/client");
const articles_1 = require("./queries/articles");
const auth_1 = require("./queries/auth");
const gallery_1 = require("./queries/gallery");
const products_1 = require("./queries/products");
const testimonials_1 = require("./queries/testimonials");
function initDB(projectId, SUPABASE_URL = process.env.SUPABASE_URL || '', SUPABASE_PUBLISHABLE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY || '') {
    if (!projectId)
        throw new Error('projectId is required');
    const supabase = (0, client_1.createSupabaseClient)(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
    return {
        articles: (0, articles_1.initArticles)(supabase, projectId),
        gallery: (0, gallery_1.initGallery)(supabase, projectId),
        products: (0, products_1.initProducts)(supabase, projectId),
        testimonials: (0, testimonials_1.initTestimonials)(supabase, projectId),
        auth: (0, auth_1.initAuth)(supabase, projectId),
    };
}
