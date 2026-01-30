

export class HandlePrompt{
    constructor(page){
        this.page = page;
    }


     async handleSaveChangesPrompt() {

        //Can import save cahanges button from auth selectors if needed.
        const promptBtn = this.page.locator('//button[normalize-space()="Continue Without Saving"]');

        try {
            const isVisible = await promptBtn.isVisible({ timeout: 3000 });
            if (isVisible) {
                console.log('[Prompt Detected] Clicking "Continue Without Saving"...');
                await promptBtn.click();
                console.log('[Prompt Handled] Navigation resumed.');
            } else {
                console.log('[No Prompt] Proceeding without interruption.');
            }
        } catch (error) {
            console.log('[Prompt Check Failed] Likely not present. Error:', error.message);
        }
    }
}
