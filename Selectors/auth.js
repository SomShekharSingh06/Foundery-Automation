export const authSelectors = {
    //Google Signle Sign In
    gssobtn: 'button: has-text("Continue with Google")',

    //Sign up selectors.

    singuplink: '//a[normalize-space()="Sign up"]',
    fullname: "input[placeholder = 'Enter your full name']",
    email: 'input[placeholder = "Enter your email"]',
    countrydropdown: "(//button[contains(@type,'button')])[2]",
    number: '//input[@placeholder="Enter your WhatsApp number"]',
    signupbtn: '//button[normalize-space()="Send Login Code"]',
    signinbtn: 'button:has-text("Confirm")',
    completeApplicationBtn: 'button:has-text("Complete Application")',
    startApplicationBtn: 'button:has-text("Start My Application")',
    saveChangesBtn: 'button:has-text("Continue Without Saving")',
    appllyNowBtn: '//button[contains(@class,"bg-[#32AC5D] text-white py-[10px] pr-[16px] pl-[20px] rounded-full transition-colors duration-200 flex items-center gap-[4px] font-nunito-sans font-bold")]',


    //Sign in Selectors
    loginbtn: 'div.text-\\[\\#28B463\\].font-bold',
    loginCodebtn: 'button :has-text("Send Login Code")',
    fillOtp: 'input[id*="emailOtp"]',

    //OTP input fields

    
    startbtn: 'button :has-text("Start My Application") ',
    terms: 'role=checkbox[name*="I have read and agree to the"]',

    //continuebtn: 'role=button[name="Agree & Continue"]',
    otpNotification: 'text=Otp has been send your',
    verifyEmailbtn: 'button:has-text("Verify Email")',

    //Handling iframe

    termsIframe: 'iframe[title="Terms and Conditions"]',
    termsIframeContent: 'html',
    termsScrollable: 'div.flex-1.overflow-y-auto',
    termsCheckbox: 'role=checkbox[name*="I have read and agree to the"]',
    termsContinueBtn: '//button[normalize-space()="Agree and Continue"]',
    continuetologinbtn: 'role=button[name="Continue to Login"]',

    nextPagebtn: ' //button[@class="w-10 h-10 rounded-full text-[#333333] gap-[10px] hover:bg-theme-accent transition-all disabled:opacity-50 flex items-center justify-center cursor-pointer flex-shrink-0"]',


   














}