import { authSelectors } from "../Selectors/auth";
import { HandlePrompt } from "../Selectors/handleSavePrompt.js";

export class India$Customers{
    constructor(page){
        this.page = page;
        this.inputField1 = page.locator('//textarea[@id="consumerLandscape"]');
        this.inputField2 = page.locator('//textarea[@id="painPoint"]');
    }

    async fillIndia$CustomersPage(inputField1, inputField2){
        await this.page.waitForLoadState('load');

        // await this.page.locator(authSelectors.completeApplicationBtn).click();
        // await this.page.locator(authSelectors.startApplicationBtn).click();

        //Handling dashboard and the page
    // await this.page.locator(authSelectors.nextPagebtn).first().click();
    // await this.page.locator(authSelectors.nextPagebtn).first().click();
    // await this.page.locator(authSelectors.nextPagebtn).first().click();
    // await this.page.locator(authSelectors.nextPagebtn).first().click();
    // await this.page.locator(authSelectors.nextPagebtn).first().click();

        //Fill input fields
        await this.inputField1.fill(inputField1);
        await this.inputField2.fill(inputField2);
    
        await this.page.waitForTimeout(3000); // Wait to observe filled data (optional)

        await this.page.locator(authSelectors.nextPagebtn).first().click();

        //Handling the save prompt if it appears
        const changesPrompt = new HandlePrompt(this.page);
        await changesPrompt.handleSaveChangesPrompt();
    }
}