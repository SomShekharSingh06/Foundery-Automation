import { authSelectors } from "../Selectors/auth";
import { HandlePrompt } from "../Selectors/handleSavePrompt.js";

export class WorkSnapshotPage {

    constructor(page) {
        this.page = page;
        this.workExp = page.locator('//input[@id="totalExperience"]');
        this.currentDesignation = page.locator('//textarea[@id="dailyWork"]');
        this.portfolioLink = page.locator('//input[@id="portfolioLink"]');
    }

    async fillWorkSnapshotPage(workExp, currentDesignation, portfolioLink) {

        await this.page.waitForLoadState('load');

        //Handling dashboard and the page
        // await this.page.locator(authSelectors.completeApplicationBtn).click();
        // await this.page.locator(authSelectors.startApplicationBtn).click();

        //Navigate to Work Snapshot Page - target the first next page button each time
        // await this.page.locator(authSelectors.nextPagebtn).first().click();
        // await this.page.locator(authSelectors.nextPagebtn).first().click();


        //Fill Total Work Experience
        await this.workExp.fill(workExp);

        //Fill Current Designation
        await this.currentDesignation.fill(currentDesignation);

        const inputFiles = this.page.locator('input[type="file"]');
        await inputFiles.setInputFiles('/home/driftking/Downloads/Karan_Shah_Foundery_Application[1].pdf');

        //Fill Portfolio Link
        await this.portfolioLink.fill(portfolioLink);

        await this.page.waitForTimeout(3000); // Wait to observe filled data (optional)

        await this.page.locator(authSelectors.nextPagebtn).first().click();

        //Handling the save prompt if it appears
        const changesPrompt = new HandlePrompt(this.page);
        await changesPrompt.handleSaveChangesPrompt();
    }
}