import { test, expect } from "@playwright/test";
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


const delay = (ms) => new Promise(res => setTimeout(res, ms));


const waitAfterFill = async (locator, value, ms = 1500) => {
    await locator.waitFor({ status: 'visible' });
    await locator.fill(value);
    await delay(ms);
};


test.describe("Foundery Application", () => {

    test("R1", { timeout: 120 * 1000 }, async ({ page }) => {

        // STEP 1: LOGIN SignInFoundery
        await test.step("Login to Foundery application", async () => {
            const bypassSignin = new firstpage(page);
            await bypassSignin.SignInFoundery("som.singh@primathon.in");

            //await expect(page).toHaveURL(/dashboard|start/i);
            //await expect(page.locator("text=Start Filling")).toBeVisible();
        });

        // STEP 2: FILL YOU PAGE
        await test.step("Fill 'You' page with personal information", async () => {
            const StartFilling = new StartFilling1(page);
            await getAISuggestion("./../pages/StartFilling-1.js", 30);
            await StartFilling.fillYOUPage('9336884878', waitAfterFill);

            //await expect(StartFilling.whatsappInput).toContainText("9336884878"); // or use regex
        });

        // STEP 3: FILL EDUCATION PAGE
        await test.step("Fill Education page with academic details", async () => {
            const fillpage2 = new StartFilling2(page);
            await fillpage2.fillEducationPage(
                'Delhi University',
                'Bachelors in Technology',
                '2022',
                'Masters in Technology',
                'IIT Delhi',
                waitAfterFill
            );

            //await expect(fillEducationPage.schoolName).toBeVisible();
            //await expect(page.locator("input[value='IIT Delhi']")).toBeVisible();
        });

        // STEP 4: FILL WORK SNAPSHOT PAGE
        await test.step("Fill WorkSnapshot page with professional experience", async () => {
            const fillpage3 = new WorkSnapshotPage(page);
            await fillpage3.fillWorkSnapshotPage(
                '5',
                'QA Engineer',
                'www.github.com',
                waitAfterFill
            );

            // await expect(page.locator("input[value='QA Engineer']")).toBeVisible();
            // await expect(page.locator("text=Work Snapshot")).toBeVisible();
        });

        // STEP 5: FILL YOUR EDGE PAGE
        await test.step("Fill YourEdge page with unique differentiators", async () => {
            const fillpage4 = new YourEdgePage(page);
            await fillpage4.FillYourEdgePage(
                'Lorem Ipsum',
                'Lorem Ipsum',
                'Lorem Ipsum',
                'Lorem Ipsum',
                'Lorem Ipsum',
                waitAfterFill
            );

            // await expect(page.locator("text=Your Edge")).toBeVisible();
            // await expect(page.locator("textarea")).toHaveCount(5);
        });

        // STEP 6: FILL TRIAL BY FIRE PAGE
        await test.step("Fill TrialByFire page with challenge responses", async () => {
            const fillpage5 = new TrialByFire(page);
            await fillpage5.fillTrialByFirePage(
                'Lorem Ipsum',
                'Lorem Ipsum',
                'Lorem Ipsum',
                'Lorem Ipsum',
                waitAfterFill
            );

            // await expect(page.locator("text=Trial by Fire")).toBeVisible();
            // await expect(page.locator("textarea")).toHaveCount(4);
        });

        // STEP 7: FILL INDIA & CUSTOMERS PAGE
        await test.step("Fill India & Customers page with market insights", async () => {
            const fillpage6 = new India$Customers(page);
            await fillpage6.fillIndia$CustomersPage(
                'Lorem Ipsum',
                'Lorem Ipsum',
                waitAfterFill
            );

            // await expect(page.locator("text=India & Customers")).toBeVisible();
            // await expect(page.locator("textarea")).toHaveCount(2);
        });

        // STEP 8: FILL SPARK CHECK PAGE
        await test.step("Fill SparkCheck page with innovation metrics", async () => {
            const fillpage7 = new SparkCheck(page);
            await fillpage7.fillSparkCheckPage(
                'Lorem Ipsum',
                'Lorem Ipsum',
                'Lorem Ipsum',
                waitAfterFill
            );

            // await expect(page.locator("text=Spark Check")).toBeVisible();
            // await expect(page.locator("textarea")).toHaveCount(3);
        });

        // STEP 9: FILL COMMITMENT PAGE & COMPLETE
        await test.step("Fill Commitment page and complete entire journey", async () => {
            const fillpage8 = new CommitmentPage(page);
            await fillpage8.fillCommitmentPage(
                'Lorem Ipsum',
                'Lorem Ipsum',
                '50000',
                'Lorem Ipsum',
                'Lorem Ipsum',
                waitAfterFill
            );

            // await expect(page.locator("text=Commitment")).toBeVisible();
            // await expect(page.locator("button:has-text('Submit')")).toBeVisible();
        });

        console.log("✅ Complete form journey executed successfully in single session!");
    });
});
