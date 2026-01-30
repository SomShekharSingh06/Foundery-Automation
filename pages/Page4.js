import { authSelectors } from "../Selectors/auth";
import { HandlePrompt } from "../Selectors/handleSavePrompt.js";

export class YourEdgePage{
    constructor(page){
        this.page = page;
        this.inputField1 = page.locator('//textarea[@id="whatDrivesYou"]');
        this.inputField2 = page.locator('//textarea[@id="coolestThingDone"]');
        this.inputField3 = page.locator('//textarea[@id="whatDrivesYou"]');
        this.inputField4 = page.locator('//textarea[@id="aiUsage"]');
        this.dropdown = page.getByRole('button', { name: 'Select founder type' })
    }

    async FillYourEdgePage(inputField1, inputField2, inputField3, inputField4){


        await this.page.waitForLoadState('load');

        // await this.page.locator(authSelectors.completeApplicationBtn).click();
        // await this.page.locator(authSelectors.startApplicationBtn).click();

    //Handling dashboard and the page
    // await this.page.locator(authSelectors.nextPagebtn).first().click();
    // await this.page.locator(authSelectors.nextPagebtn).first().click();
    // await this.page.locator(authSelectors.nextPagebtn).first().click();

        //Fill input fields
        await this.inputField1.fill(inputField1);
        await this.inputField2.fill(inputField2);
        await this.inputField3.fill(inputField3);
        await this.inputField4.fill(inputField4);
        //Handling dropdown
        await this.dropdown.click();
        await this.page.getByRole('button', { name: 'The Failed Founder — rebounding with new grit and perspective' }).click(); 

        await this.page.waitForTimeout(3000); // Wait to observe filled data (optional)

        await this.page.locator(authSelectors.nextPagebtn).first().click();

        //Handling the save prompt if it appears
        const changesPrompt = new HandlePrompt(this.page);
        await changesPrompt.handleSaveChangesPrompt();
    }
}