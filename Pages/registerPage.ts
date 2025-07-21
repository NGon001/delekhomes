import { Locator, Page, expect } from "@playwright/test";

export class RegisterPage{
    readonly page: Page;
    readonly registerRealtorText: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly registerButton: Locator;
    readonly emailValidErrorMessage: Locator;
    readonly realtorCheckBoxLocator: Locator;
    readonly firstNameReqErrorMessage: Locator;
    readonly lastNameReqErrorMessage: Locator;
    readonly emailReqErrorMessage: Locator;
    readonly passwordReqErrorMessage: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.registerRealtorText = this.page.getByText("Register as Realtor");
        this.firstNameInput = this.page.locator('input[name="firstName"]');
        this.lastNameInput = this.page.locator('input[name="lastName"]');
        this.emailInput = this.page.locator('input[name="email"]');
        this.passwordInput = this.page.locator('input[name="password"]');
        this.registerButton = this.page.getByRole("button", {name: "Register"});
        this.emailValidErrorMessage = this.page.getByText("Email must be a valid email address");
        this.realtorCheckBoxLocator = this.page.locator(`input[name="isRealtor"]`);
        this.firstNameReqErrorMessage = this.page.getByText("First name required");
        this.lastNameReqErrorMessage = this.page.getByText("Last name required");
        this.emailReqErrorMessage = this.page.getByText("Email is required");
        this.passwordReqErrorMessage = this.page.getByText("Password is required");
    }

    async verifyPageLoaded(){
        await this.page.waitForLoadState("domcontentloaded");
        await expect(await this.registerRealtorText).toBeVisible();
    }

    async clickRegisterButton(){
        await this.registerButton.click();
    }

    async fillRegestrationForm(firstName: string, lastName: string, email: string, password: string, realtorRegister = false){
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        if(realtorRegister) await this.realtorCheckBoxLocator.check();
    }

    async verifyRegistrationFormFields(firstName: string, lastName: string, email: string, password: string, realtorRegister = false){
        await expect(await this.firstNameInput.getAttribute("value")).toBe(firstName);
        await expect(await this.lastNameInput.getAttribute("value")).toBe(lastName);
        await expect(await this.emailInput.getAttribute("value")).toBe(email);
        await expect(await this.passwordInput.getAttribute("value")).toBe(password);
        await expect(await this.realtorCheckBoxLocator.isChecked()).toBe(realtorRegister);
    }

    async verifyEmailValidError(){
        await expect(await this.emailValidErrorMessage).toBeVisible();
    }

    async verifyFormReqErrors(firstName = true, lastName = true, email = true, password = true){
        await expect(await this.firstNameReqErrorMessage.isVisible()).toBe(firstName);
        await expect(await this.lastNameReqErrorMessage.isVisible()).toBe(lastName);
        await expect(await this.emailReqErrorMessage.isVisible()).toBe(email);
        await expect(await this.passwordReqErrorMessage.isVisible()).toBe(password);
    }
}