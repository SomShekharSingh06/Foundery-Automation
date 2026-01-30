import { test, expect } from '@playwright/test';
import { authSelectors } from "../Selectors/auth";
import { OtpValidation } from '../Selectors/OtpValidation';

const Mailosaur_Serverid = 'xfhn8al4';
const Mailosaur_ApiKey = 'lm2ZbC3CJjgL7P6Opdj9yj6tNaT9M2WP';

// Create an instance of otpValidation
const otpHelper = new OtpValidation(Mailosaur_ApiKey, Mailosaur_Serverid);

test("Sign Up Foundery application form", async ({ page }) => {

  // Navigate to the Foundery webpage
  await page.goto('https://app-dev.thefoundery.in/', { waitUntil: "load" });
  
  // Fill sign-up form
  await page.locator(authSelectors.singuplink).click();
  await page.locator(authSelectors.fullname).fill("Som Shekhar Singh");
  await page.locator(authSelectors.email).fill("foundery@xfhn8al4.mailosaur.net");
  await page.locator(authSelectors.number).fill("9336884878");
  await page.locator(authSelectors.signupbtn).click({timeout: 5000});
  
  //page.pause()

  // --- IFRAME HANDLING ---//
  const frame = page.frameLocator("//iframe[@title='Terms and Conditions']")
  const div = frame.locator("//p[normalize-space()='***']");
  
  await div.waitFor({ state: 'visible', timeout: 5000 });
  await div.click({timeout:5000})
  await div.scrollIntoViewIfNeeded({timeout:7000});
  await page.locator(authSelectors.termsCheckbox).check({timeout:5000});
  await page.locator(authSelectors.termsContinueBtn).click();
  await page.waitForLoadState('load',{timeout:5000});

  // Fetch OTP from Mailosaur
  const fill_otp = await otpHelper.getOtp("foundery@xfhn8al4.mailosaur.net");
  
  // Fill OTP and continue

   if (!fill_otp) 
    {
     throw new Error("OTP is undefined! Check if it was fetched correctly.");
    }

  
  const EmailotpInput =  page.locator(authSelectors.fillOtp)
  await EmailotpInput.fill(fill_otp,{timeout:10000});
  await page.locator(authSelectors.verifyEmailbtn).click({timeout:10000});
});
