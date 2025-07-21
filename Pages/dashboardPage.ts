import { Locator, Page, expect } from "@playwright/test";

export class DashboardPage{
    readonly page: Page;
    readonly profileIcon: Locator;
    readonly profileSettingsButton: Locator;
    readonly accountSettingsText: Locator;
    readonly accountFirstName: Locator;
    readonly accountLastName: Locator;
    readonly accountEmail: Locator;
    readonly profileSectionLocator: Locator;
    readonly realtorWelcomeMessage: Locator;
    readonly realtorCloseButton: Locator;
    readonly accountRoleText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.profileIcon = this.page.locator(`button:has(svg[data-testid="PersonIcon"])`);
        this.profileSettingsButton = this.page.getByRole("menuitem", {name: "Settings"});
        this.accountSettingsText = this.page.getByText("Account Settings");
        this.accountFirstName = this.page.locator(`input[name="username"]`);
        this.accountLastName = this.page.locator(`input[name="user_surname"]`);
        this.accountEmail = this.page.locator(`input[name="email"]`);
        this.realtorWelcomeMessage = this.page.getByText("Thank you for registering with DelekHomes. Our realtor verification team will reach out to you shortly over email.");
        this.realtorCloseButton = this.page.getByRole("button", {name: "Close"});
        this.accountRoleText = this.page.getByText("role: ");
    }

    async verifyPageLoaded(){
        await this.page.waitForLoadState("domcontentloaded");
        await this.page.waitForURL('/' + "dashboard/user/profile");
    }

    async clickProfileIcon(){
        await this.profileIcon.click();
    }

    async clickProfileSettingsButton(){
        await this.profileSettingsButton.click();
    }

    async verifyAccountSettingsSection(){
        await this.page.waitForLoadState("domcontentloaded");
        await this.page.waitForURL('/' + "dashboard/user/account");
        await expect(await this.accountSettingsText).toBeVisible();
    }

    async verifyAccountSettingsInformation(firstName: string, lastName: string, email: string){
        await expect(await this.accountFirstName.getAttribute("value")).toBe(firstName);
        await expect(await this.accountLastName.getAttribute("value")).toBe(lastName);
        await expect(await this.accountEmail.getAttribute("value")).toBe(email);
    }

    async verifyRealtorMessage(){
        await expect(await this.realtorWelcomeMessage).toBeVisible();
    }

    async closeRealtorMessage(){
        await this.realtorCloseButton.click();
    }

    async verifyAccountRole(role: string){
        await expect(await this.accountRoleText.textContent()).toBe(`role: ${role}`);
    }
}