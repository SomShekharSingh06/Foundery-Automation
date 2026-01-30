export class CommitmentPage {
  constructor(page) {
    this.page = page;

    //  Grouped dropdown containers by purpose
    this.dropdowns = {
      currentStatus: page.locator('[data-dropdown="workStatus"]'),
      availability: page.locator('[data-dropdown="availableBootcamp"]'),
      bootcamp: page.locator('[data-dropdown="availableSprint"]'),
      commitment: page.locator('[data-dropdown="buildBusiness"]'),
      englishFluency: page.locator('[data-dropdown="englishFluency"]'),
      hindiFluency: page.locator('[data-dropdown="hindiFluency"]'),
      incubator: page.locator('[data-dropdown="previousIncubator"]'),
      coFounder: page.getByLabel('I’m exploring an idea but open to refining or pivoting it.')
    };

    //  Input fields for text and numbers
    this.inputs = {
      conflicts: page.locator('#conflicts'),
      otherLanguages: page.locator('#otherLanguages'),
      monthlyNeeds: page.getByPlaceholder('Enter Amount'),
      founderyRecommendation: page.locator('#founderyRecommendation'),
      programRecommendation: page.locator('#programRecommendation'),
    };

    //  Checkboxes at the bottom of the form
    this.checkboxes = [
      page.getByLabel('I’m exploring an idea but open to refining or pivoting it.'),
      page.getByLabel('I consent to photos and video being captured during the program.'),
      page.getByLabel("I confirm the information I've shared is truthful."),
      page.getByLabel('I consent to my data being stored and used for evaluation.'),
    ];

    //  Final submit button (currently commented out)
    this.submitButton = page.locator('button:has-text("Submit Application")');
  }

  /**
   * Selects an option from a dropdown by scoping the search inside the container
   * @param {Locator} container - The dropdown container
   * @param {string} optionText - The visible text of the option to select
   */
  async selectDropdownOption(container, optionText) {
    // Open the dropdown
    await container.locator('button').first().click();

    // Scoped search: only look for the option inside the dropdown container
    const option = container.locator(`button:has-text("${optionText}")`).first();
    await option.waitFor({ state: 'visible', timeout: 3000 });
    await option.click({ timeout: 3000 });
  }

  /**
   *  Fills out the entire Commitment page step by step
   * @param {string} conflicts - Availability conflicts
   * @param {string} languages - Other languages spoken
   * @param {string} monthly - Monthly financial needs
   * @param {string} founderyRec - Recommendation for Foundery
   * @param {string} programRec - Recommendation for others
   */
  async fillCommitmentPage(conflicts, languages, monthly, founderyRec, programRec) {
    await this.page.waitForLoadState('load');

    //  Select dropdown options
    await this.selectDropdownOption(this.dropdowns.currentStatus, "Student");
    await this.selectDropdownOption(this.dropdowns.availability, "Yes");
    await this.selectDropdownOption(this.dropdowns.bootcamp, "Yes");

    //  Fill text inputs
    await this.inputs.conflicts.fill(conflicts);
    await this.selectDropdownOption(this.dropdowns.commitment, "Yes");
    await this.selectDropdownOption(this.dropdowns.englishFluency, "Fluent (read, write, speak comfortably)");
    await this.selectDropdownOption(this.dropdowns.hindiFluency, "Fluent (read, write, speak comfortably)");
    await this.inputs.otherLanguages.fill(languages);
    await this.selectDropdownOption(this.dropdowns.incubator, "No");
    await this.selectDropdownOption(this.dropdowns.coFounder, "No");

    await this.inputs.monthlyNeeds.fill(monthly);
    await this.inputs.founderyRecommendation.fill(founderyRec);
    await this.inputs.programRecommendation.fill(programRec);
    

    //  Check all required checkboxes
    await this.page.waitForTimeout(3000); // Optional delay for realism
    for (const checkbox of this.checkboxes) {
      await checkbox.click();
    }

    //  Submit the form (uncomment when ready)
     await this.submitButton.click();
     await this.page.waitForTimeout(5000); // Wait to observe submission (optional)
  }
}
