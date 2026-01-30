import { OtpValidation } from "./OtpValidation.js";

(async () => {
  const otpValidator = new OtpValidation({ timeout: 60000 });
  try {
    const otp = await otpValidator.getOtp("your-email@example.com");
    console.log("✅ OTP found:", otp);
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
})();
