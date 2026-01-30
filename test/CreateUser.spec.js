import {test} from "@playwright/test";
import { StartFilling1 } from "./../pages/StartFilling-1.js";
import { firstpage } from "../pages/Page1.js";
import { getAISuggestion } from "../aihelper.js";


test("Sign in to foundery-dev",async ({page})=> {
    //test.skip();
    const SignInObject = new firstpage(page);
    await SignInObject.SignUp("Som Shekhar Singh","foundery@example.com","9336884878");

})