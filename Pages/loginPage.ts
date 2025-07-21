import { Locator, Page, expect } from "@playwright/test";
import path from "path";

export class LoginPage{
    readonly page: Page;
    readonly AdminAuthFile: string;
    readonly RealtorAuthFile: string;
    readonly UserAuthFile: string;
    readonly dontHaveAccountText: Locator;
    readonly emailInputLocator: Locator;
    readonly passwordInputLocator: Locator;
    readonly loginButtonLocator: Locator;
    readonly wrongEmailOrPasswordMessage: Locator;
    readonly emailReqErrorMessage: Locator;
    readonly passwordReqErrorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.AdminAuthFile = path.join(__dirname, '../playwright/.auth/admin.json');
        this.UserAuthFile = path.join(__dirname, '../playwright/.auth/user.json');
        this.RealtorAuthFile = path.join(__dirname, '../playwright/.auth/realtor.json');
        this.dontHaveAccountText = this.page.getByText("Don’t have an account?");
        this.emailInputLocator = this.page.locator(`input[name="email"]`);
        this.passwordInputLocator = this.page.locator(`input[name="password"]`);
        this.loginButtonLocator = this.page.getByRole("button",{name: "Login"});
        this.wrongEmailOrPasswordMessage = this.page.getByText("Wrong email or password");
        this.emailReqErrorMessage = this.page.getByText("Email is required");
        this.passwordReqErrorMessage = this.page.getByText("Password is required");
    }

    async verifyPageLoaded(){
        await this.page.waitForLoadState("domcontentloaded");
        await this.page.waitForURL('/' + "auth/login");
        await expect(await this.dontHaveAccountText).toBeVisible();
    }

    async fillLoginForm(email: string, password: string){
        await this.emailInputLocator.fill(email);
        await this.passwordInputLocator.fill(password);
    }

    async verifyLoginFormInput(email: string, password: string){
        await expect(await this.emailInputLocator.getAttribute("value")).toBe(email);
        await expect(await this.passwordInputLocator.getAttribute("value")).toBe(password);
    }

    async clickLoginButton(){
        await this.loginButtonLocator.click();
    }

    async verifyWrongEmailOrPasswordMessage(){
        await expect(await this.wrongEmailOrPasswordMessage).toBeVisible();
    }

    async verifyFormReqErrors(email = true, password = true){
        await expect(await this.emailReqErrorMessage.isVisible()).toBe(email);
        await expect(await this.passwordReqErrorMessage.isVisible()).toBe(password);
    }

    async storeLogin(role: string) {
        if(role === 'realtor'){
            await this.page.context().storageState({ path: this.RealtorAuthFile });
        }
        if (role === 'admin') {
            await this.page.context().storageState({ path: this.AdminAuthFile });
        } else {
            await this.page.context().storageState({ path: this.UserAuthFile });
        }  
    }
}