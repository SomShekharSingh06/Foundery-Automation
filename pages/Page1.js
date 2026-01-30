import { authSelectors } from "../Selectors/auth";


import { OtpValidation } from "../Selectors/OtpValidation";

export class firstpage {

    constructor(page) {
        this.page = page;

        this.Email = page.getByRole('textbox', { name: 'Email*' });
        this.signupbtn = page.locator(authSelectors.signupbtn);
        this.LoginCodebtn = page.getByRole('button', { name: 'Send Login Code' });
        this.LoginCode = page.locator(authSelectors.fillOtp || 'input[id*="emailOtp"]');
        this.SignIn = page.locator(authSelectors.signinbtn);

    }

    //Sign into Foundery with registered User
    async SignInFoundery(email) {
        await this.page.goto("https://app-dev.thefoundery.in/");
        await this.page.getByRole('button', { name: '✕' }).click();
        await this.page.getByRole('button', { name: /LOGIN/i }).first().click();
        await this.page.locator('//input[@placeholder="Enter your email"]').fill(email);
        await this.LoginCodebtn.click();


        const otpHelper = new OtpValidation({ timeout: 20000 });
        const fill_otp = await otpHelper.getOtp(email);
        const digits = fill_otp.split("");

        if (digits.length !== 6) throw new Error("OTP is not 6 digits");

        for (let i = 0; i < digits.length; i++) {
            const selector = `//input[@aria-label="Digit ${i + 1}"]`;
            await this.page.locator(selector).fill(digits[i]);
        }

        await this.SignIn.click();
    }

    async SignUp(name, email, number) {

        const otpHelper = new OtpValidation();

        await this.page.goto("https://app-dev.thefoundery.in/");
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(authSelectors.appllyNowBtn).click();
        await this.page.locator(authSelectors.singuplink).click();
        await this.page.getByPlaceholder('Enter your full name').fill(name);
        await this.page.locator('//input[@placeholder="Enter your email"]').fill(email);
        await this.page.locator(authSelectors.number).fill(number);
        const since = Date.now();
        await this.signupbtn.click();

        const frame = this.page.frameLocator("//iframe[@title='Terms and Conditions']");
        const div = frame.locator("//p[normalize-space()='***']");
        await div.waitFor({ state: 'visible', timeout: 10000 });
        await div.click({ timeout: 5000 });
        await div.scrollIntoViewIfNeeded({ timeout: 10000 });
        await this.page.locator(authSelectors.termsCheckbox).check({ timeout: 5000 });
        await this.page.locator(authSelectors.termsContinueBtn).click();
        await this.page.waitForLoadState('networkidle', { timeout: 10000 });

        // ✅ FIXED OTP HANDLING SECTION
        const targetEmail = email || "foundery@example.com";
        // Simplified: extract options manually and pass correctly

        const fill_otp = await otpHelper.getOtp(targetEmail, 60000);

        if (!fill_otp) {
            throw new Error("OTP is undefined! Check if it was fetched correctly.");
        }

        const EmailotpInput = this.page.locator(authSelectors.fillOtp);
        await EmailotpInput.fill(fill_otp, { timeout: 15000 });

        await this.page.locator(authSelectors.verifyEmailbtn).click({ timeout: 15000 });
        await this.page.waitForTimeout(8000);
    }


}
