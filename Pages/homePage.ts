import { Locator, Page, expect } from "@playwright/test";

export class HomePage{
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(path = undefined){ // path example "auth/register"
        await this.page.goto((path === undefined) ? '/' : '/' + path);
    }
}