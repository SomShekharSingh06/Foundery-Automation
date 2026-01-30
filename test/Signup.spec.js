import { test, expect } from "@playwright/test";
import { firstpage } from "../pages/Page1.js";

test("Signup to Foundery", async ({ page }) => {
    // Initialize the signup page object
    const signupPage = new firstpage(page);

    // Define test data
    // Note: Ensure this email is accessible via the Gmail API credentials configured in OtpValidation
    const email = "foundery@example.com";
    const name = "Test User";
    const phone = "9876543210";

    console.log(`Starting signup for ${email}`);

    // Perform signup action
    await signupPage.SignUp(name, email, phone);

    // Optional: Add assertions to verify successful signup
    // Currently Page1.js SignUp ends with verifying email.
    // Ensure that the user is logged in or redirected appropriately.
    // For example:
    // await expect(page).toHaveURL(/.*dashboard/);
});
