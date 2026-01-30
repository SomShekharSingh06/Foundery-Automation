import { authSelectors } from "../Selectors/auth";
import { HandlePrompt } from "../Selectors/handleSavePrompt.js";

export class SparkCheck{
    constructor(page){
        this.page = page;
        this.inputField1 = page.locator('//textarea[@id="toughestChallenge"]');
        this.inputField2 = page.locator('//textarea[@id="influence"]');
        this.inputField3 = page.locator('//textarea[@id="ideal_speaker"]');

    }

    async fillSparkCheckPage(inputField1, inputField2, inputField3){
        await this.page.waitForLoadState('load');

        // await this.page.locator(authSelectors.completeApplicationBtn).click();
        // await this.page.locator(authSelectors.startApplicationBtn).click();

        //Handling dashboard and the page
    // await this.page.locator(authSelectors.nextPagebtn).first().click();
    // await this.page.locator(authSelectors.nextPagebtn).first().click();
    // await this.page.locator(authSelectors.nextPagebtn).first().click();
    // await this.page.locator(authSelectors.nextPagebtn).first().click();
    // await this.page.locator(authSelectors.nextPagebtn).first().click();
    // await this.page.locator(authSelectors.nextPagebtn).first().click();

        //Fill input fields
        await this.inputField1.fill(inputField1);
        await this.inputField2.fill(inputField2);
        await this.inputField3.fill(inputField3);
        const inputVideo = this.page.locator('input[type="file"]');
        await inputVideo.setInputFiles('/home/driftking/Videos/Screencasts/Screencast from 2025-10-10 14-44-40.mp4');
    
        await this.page.waitForTimeout(3000); // Wait to observe filled data (optional)

        await this.page.locator(authSelectors.nextPagebtn).first().click();

        //Handling the save prompt if it appears
        const changesPrompt = new HandlePrompt(this.page);
        await changesPrompt.handleSaveChangesPrompt();
    }
}