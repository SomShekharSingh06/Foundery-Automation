import { authSelectors } from '../Selectors/auth';
import { getAISuggestion } from '../aihelper';
import { HandlePrompt } from "../Selectors/handleSavePrompt.js";


export class StartFilling1 {
    constructor(page) {
        this.page = page;
        this.whatsappInput = page.locator(authSelectors.number); // CHANGED: locator instead of selector string
        this.nationalityDropdown = page.locator('[data-dropdown="nationality"] button[type="button"]');
        this.birthDateInput = page.locator('//input[@id="birthDate"]');
        this.socialLinksInput = page.locator('input[placeholder="e.g LinkedIn"]');
        this.fillSocialLinksInput = page.locator("input[placeholder='e.g. @yourhandle']");
        this.stateDropdownBtn = page.locator('//div[contains(@data-dropdown,"currentState")]//button[contains(@type,"button")]');
        this.rltnDropdownBtn = page.locator('//div[contains(@data-dropdown,"maritalStatus")]//button[contains(@type,"button")]');
        this.cityDropdownBtn = page.locator('//div[contains(@data-dropdown,"currentCity")]//button[contains(@type,"button")]');
        this.countryDropdownBtn = page.getByRole('button', { name: /Select a country/i});
    }

    // CHANGED: parameter names made distinct from property names
    async fillYOUPage(whatsappNumber) {
        // //Signing up into dev foundery
        // const SignIn = new SignInFoundery();
        // await SignIn.SignInFoundery();

        // CHANGED: use this.* for instance properties
        await this.page.waitForLoadState('load');
        //await this.page.locator(authSelectors.completeApplicationBtn).click();
        await this.page.locator('//h3[normalize-space()="Round 1"]').click();
        await this.page.locator(authSelectors.startApplicationBtn).waitFor({ state: 'visible', timeout: 5000 });

        await this.page.locator(authSelectors.startApplicationBtn).click();
        // Fill WhatsApp number
        //await this.whatsappInput.fill(whatsappNumber);
        //Fill address
        // const addressField = this.page.locator('#address');
        // await addressField.waitFor({ state: 'visible' });
        // await addressField.fill('ABC Street, Gurugram, Haryana 122001');
        
        // await this.page.waitForSelector('#address', { state: 'attached' });
        // console.log(await this.page.locator('#address').count());

        // Handling dropdowns (custom widgets)
        await this.nationalityDropdown.click();
        await this.page.getByRole('button', { name: 'Indian' }).click();
        // await this.page.locator('button:has-text("Indian")').first().click({force : true});

        //Handling country dropdown
        await this.countryDropdownBtn.click();
        await this.page.getByText('🇮🇳 India', { exact: true }).click();
        
        // Fill birthdate (adjust selector to actual widget)
        await this.birthDateInput.click();
        await this.page.getByRole('button', { name: '2002' }).click();
        //await this.page.getByRole('gridcell', { name: 'Choose Friday, Deecember 6th,' }).click();

        await this.page.locator('//button[normalize-space()="1"]').click();
       

        // Handling state dropdown (custom widget)
        await this.stateDropdownBtn.click();
        await this.page.locator('//button[contains(.,"Haryana")]').click();

        // Handling relationship dropdown
        await this.rltnDropdownBtn.click();
        await this.page.locator('//button[contains(.,"Single")]').click();

        // Handling city dropdown
        await this.cityDropdownBtn.click();
        await this.page.locator('//button[contains(.,"Gurgaon")]').click();

        // Handling file upload. 
        const fileInput = this.page.locator('input[type="file"]');
        await fileInput.setInputFiles('/home/driftking/Downloads/GptImage.png');

        // Handling LinkedIn social link

        const suggestion = await getAISuggestion("pages/StartFilling-1.js", 67);
        console.log("AI Suggestion for LinkedIn field:", suggestion);
        await this.page.locator('//button[contains(.,"Gurgaon")]').click()

        //await this.page.locator('input[placeholder="e.g LinkedIn"]').waitFor({ state: 'visible' });
        // await this.page.locator('input[placeholder="e.g LinkedIn"]').first().fill(socialLink);

        // await this.page.locator("input[placeholder='e.g. @yourhandle']").first().fill("www.github.com");
        //await this.page.waitForTimeout(3000); // Wait to observe filled data (optional)

        // Click the first next-page button to avoid hitting SVG control buttons
        await this.page.locator(authSelectors.nextPagebtn).first().click();

        //Handling the save prompt if it appears
        // const changesPrompt = new HandlePrompt(this.page);
        // await changesPrompt.handleSaveChangesPrompt();
    }
}


//to select and handle dropdowns

// const dropDownList = page.locator('#month');
// dropDownList.selectOption('Aug');

//for the html written in <select> tag for the dropdowns

//to upload files 
//  await page.click('button:has-text("Upload")');

// Wait for the file input to appear (if it's dynamically rendered)
//   const fileInput = await page.locator('input[type="file"]');
//   await fileInput.setInputFiles('path/to/your/file.pdf');