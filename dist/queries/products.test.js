"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("src/client");
const products_1 = require("./products");
const assert = require('assert');
const PROJECT_ID = process.env.PROJECT_ID || 'test-project-id';
const supabase = (0, client_1.createSupabaseClient)(process.env.SUPABASE_URL || '', process.env.SUPABASE_PUBLISHABLE_KEY || '');
describe('getProducts', () => {
    it('should return a list of products', async () => {
        const db = (0, products_1.initProducts)(supabase, PROJECT_ID);
        const { data, error } = await db.getProducts();
        if (error) {
            assert.fail(`Error fetching products: ${error}`);
        }
        assert(Array.isArray(data));
    });
    it('should handle errors', async () => {
        try {
            const db = (0, products_1.initProducts)(supabase, 'test-project-id');
            await db.getProducts();
        }
        catch (error) {
            assert(error instanceof Error);
        }
    });
});
