import { isValidCity } from "../validation";

describe("City Validation", () => {
    test("Test if Empty city gives false", () => {
        expect(isValidCity('')).toBe(false);
    });

    test("Test if numberic values for city gives false", () => {
        expect(isValidCity(12345)).toBe(false);
    })
});