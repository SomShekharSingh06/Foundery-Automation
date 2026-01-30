import {test} from "@playwright/test";
import { StartFilling1 } from "../pages/StartFilling-1.js";
import { firstpage } from "../pages/Page1.js";
import { getAISuggestion } from "../aihelper.js";
import { StartFilling2 } from "../pages/Page2.js";
import { WorkSnapshotPage } from "../pages/Page3.js";
import { YourEdgePage } from "../pages/Page4.js";
import { TrialByFire } from "../pages/Page5.js";
import { India$Customers } from "../pages/Page6.js";
import { SparkCheck } from "../pages/Page7.js";
import { CommitmentPage } from "../pages/Page8.js";



test("Sign in to foundery-dev",async ({page})=> {
    test.skip();
    const SignInObject = new firstpage(page);
    await SignInObject.SignUp("Som Shekhar Singh","foundery@example.com","9653091770");

})

test("Fill You Page", { timeout: 20 * 1000 }, async({page})=>{
    // This flow involves OTP delivery and external services.
    // Timeout is set in the test options so it applies before hooks/fixtures.

    const bypassSignin = new firstpage(page);
    await bypassSignin.SignInFoundery("foundery@example.com");
    const StartFilling = new StartFilling1(page);
    await getAISuggestion("pages/Page1.js",67);
    page.pause()
    await StartFilling.fillYOUPage('9336884878');

})

test("Fill Education Page",async({page})=>{
    const bypassSignin = new firstpage(page);
    await bypassSignin.SignInFoundery("foundery@xfhn8al4.mailosaur.net");
    const fillpage2 = new StartFilling2(page);
    await fillpage2.fillEducationPage('Delhi University','Bachelors in Technology','2022','Masters in Technology','IIT Delhi');
});

test("Fill WorkSnapshot Page",async({page})=>{
    const bypassSignin = new firstpage(page);
    await bypassSignin.SignInFoundery("foundery@xfhn8al4.mailosaur.net");
    const fillpage3 = new WorkSnapshotPage(page);
    await fillpage3.fillWorkSnapshotPage('5','QA Engineer','www.github.com');
});

test("Fill YourEdge Page",async({page})=>{  
    const bypassSignin = new firstpage(page);
    await bypassSignin.SignInFoundery("foundery@xfhn8al4.mailosaur.net");

    const fillpage4 = new YourEdgePage(page);
    await fillpage4.FillYourEdgePage('Lorem Ispum','Lorem Ispum','Lorem Ispum','Lorem Ispum','Lorem Ispum');

});

test('Fill TrialByFire Page', async ({ page }) => {
    const bypassSignin = new firstpage(page);
    await bypassSignin.SignInFoundery("foundery@xfhn8al4.mailosaur.net");
    const fillpage5 = new TrialByFire(page);
    await fillpage5.fillTrialByFirePage('Lorem Ispum','Lorem Ispum','Lorem Ispum','Lorem Ispum');

});

test('Fill India & Customers Page', async ({ page }) => {
    const bypassSignin = new firstpage(page);
    await bypassSignin.SignInFoundery("foundery@xfhn8al4.mailosaur.net");
    const fillpage6 = new India$Customers(page);
    await fillpage6.fillIndia$CustomersPage('Lorem Ispum','Lorem Ispum');
});

test('Fill SparkCheck Page', async ({ page }) => {
    const bypassSignin = new firstpage(page);
    await bypassSignin.SignInFoundery("foundery@xfhn8al4.mailosaur.net");
    const fillpage7 = new SparkCheck(page);
    await fillpage7.fillSparkCheckPage('Lorem Ispum','Lorem Ispum','Lorem Ispum');
});

test('Fill Commitment Page', async ({ page }) => {
    const bypassSignin = new firstpage(page);
    await bypassSignin.SignInFoundery("foundery@xfhn8al4.mailosaur.net");
    const fillpage8 = new CommitmentPage(page);
    await fillpage8.fillCommitmentPage('Lorem Ispum','Lorem Ispum','Lorem Ispum','Lorem Ispum','Lorem Ispum');
});
