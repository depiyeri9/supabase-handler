"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("src/client");
const products_1 = require("./products");
const assert = require('assert');
describe('getProducts', () => {
    it('should return a list of products', async () => {
        const db = (0, products_1.initProducts)(client_1.supabase, '63cc9789-6cb0-4e85-8fd9-2fc97eb51543');
        const { data, error } = await db.getProducts();
        console.log('Data:', data);
        console.log('Error:', error);
        assert(Array.isArray(data));
    });
    it('should handle errors', async () => {
        try {
            const db = (0, products_1.initProducts)(client_1.supabase, 'test-project-id');
            await db.getProducts();
        }
        catch (error) {
            assert(error instanceof Error);
        }
    });
});
