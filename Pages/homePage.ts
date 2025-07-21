import { Locator, Page, expect } from "@playwright/test";

export class HomePage{
    readonly page: Page;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginButton = this.page.getByRole("link",{name: "Login"});
    }

    async goto(path = undefined){ // path example "auth/register"
        await this.page.goto((path === undefined) ? '/' : '/' + path);
    }

    async clickLoginButton(){
        await this.loginButton.click();
    }
}