import { getKeys } from "../keys";
import dotenv from 'dotenv';

describe("Test server methods", () => {

    beforeAll(() => {
        dotenv.config();
    });

    test("Test if getKeys returns value", () => {
        const keys = getKeys();
        expect(keys.weatherBitAPIKey).toBeDefined();
    });
});