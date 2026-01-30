import { getAISuggestion } from '../aihelper.js';
import { StartFilling1 } from './StartFilling-1.js';
import { authSelectors } from '../Selectors/auth.js';
import { HandlePrompt } from "../Selectors/handleSavePrompt.js";

export class StartFilling2 {
    constructor(page) {
        this.page = page;
        this.SchoolName = page.locator('//input[@id="schoolAttended"]');
        this.undergrad = page.locator('//input[@id="undergraduateDegree"]');
        this.yoGradbtn = page.getByRole('button', { name: 'Select graduation year' });
        this.inputGradYear = page.locator('//input[@placeholder="Search..."]');
        this.postGrad = page.locator('//input[@id="postGraduateDegree"]');
        this.pgClgName = page.locator('//textarea[@id="postGraduateCollege"]');

   }

   async fillEducationPage(schoolName, undergradDegree, graduationYear, postGradDegree, pgCollegeName) {

        await this.page.waitForLoadState('load');

        //Handling dashboard
     //    await this.page.locator(authSelectors.completeApplicationBtn).click();
     //    await this.page.locator(authSelectors.startApplicationBtn).click();
     // Navigate to the next page - click the first instance to avoid SVG buttons
      //await this.page.locator(authSelectors.nextPagebtn).first().click();

        //Fill School Name
       // this.page.pause()
        await this.SchoolName.fill(schoolName);

        //Fill UnderGraduate Details
        await this.undergrad.fill(undergradDegree);

        //Handle year of graduation dropdown
        const suggestion = await getAISuggestion("pages/StartFilling-1.js",26);
        await this.yoGradbtn.click();
        await this.inputGradYear.fill(graduationYear);
        await this.page.getByRole('button', { name: '2022' }).click();

        //Fill Post Graduate Details
        await this.postGrad.fill(postGradDegree);
        await this.pgClgName.fill(pgCollegeName);

        await this.page.waitForTimeout(3000); // Wait to observe filled data (optional)
        
        await this.page.locator(authSelectors.nextPagebtn).first().click();

        //Handling the save prompt if it appears
        const changesPrompt = new HandlePrompt(this.page);
        await changesPrompt.handleSaveChangesPrompt();
   }
}