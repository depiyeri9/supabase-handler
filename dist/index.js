"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDB = initDB;
const client_1 = require("./client");
const articles_1 = require("./queries/articles");
const auth_1 = require("./queries/auth");
const gallery_1 = require("./queries/gallery");
const products_1 = require("./queries/products");
const testimonials_1 = require("./queries/testimonials");
function initDB(projectId) {
    if (!projectId)
        throw new Error('projectId is required');
    return {
        articles: (0, articles_1.initArticles)(client_1.supabase, projectId),
        gallery: (0, gallery_1.initGallery)(client_1.supabase, projectId),
        products: (0, products_1.initProducts)(client_1.supabase, projectId),
        testimonials: (0, testimonials_1.initTestimonials)(client_1.supabase, projectId),
        auth: (0, auth_1.initAuth)(client_1.supabase, projectId),
    };
}
