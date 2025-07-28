import { Locator, Page, expect } from "@playwright/test";
import path from "path";

export class DashboardPage {
    readonly page: Page;
    readonly imagePath: string;
    readonly profileIcon: Locator;
    readonly profileSettingsButton: Locator;
    readonly accountSettingsText: Locator;
    readonly accountFirstName: Locator;
    readonly accountLastName: Locator;
    readonly accountEmail: Locator;
    readonly profileSectionLocator: Locator;
    readonly realtorWelcomeMessage: Locator;
    readonly realtorCloseButton: Locator;
    readonly simplebarLocator: Locator;
    readonly accountRoleText: (simpleBar: Locator) => Locator;
    readonly accountNameText: (simpleBar: Locator) => Locator;
    readonly logoutButtonLocator: Locator;
    readonly muiBoxLocator: Locator;
    readonly userListLocator:  Locator;
    readonly userCreateLocator:  Locator;
    readonly userListText: Locator;
    readonly newUserButton: Locator;
    readonly createUserText: Locator;
    readonly emailInputLocator: Locator;
    readonly passwordInputLocator: Locator;
    readonly checkPasswordInputLocator: Locator;
    readonly firstNameInputLocator: Locator;
    readonly lastNameInputLocator: Locator;
    readonly uploadImageLocator: Locator;
    readonly createSuccessMessage: Locator;
    readonly createUserButton: Locator;
    readonly adminUserSearchInput: Locator;
    readonly allUsersLocator: Locator;
    readonly specificUserLocatorByEmail: (email: string) => Locator;
    readonly treeDotsButtonLocator: (user: Locator) => Locator;
    readonly deleteUserButtonLocator: Locator;

    constructor(page: Page) {
        this.imagePath = path.resolve('image.jfif')
        this.page = page;
        this.profileIcon = this.page.locator(`.css-1x4nai button`);
        this.profileSettingsButton = this.page.getByRole("menuitem", { name: "Settings" });
        this.accountSettingsText = this.page.getByText("Account Settings");
        this.accountFirstName = this.page.locator(`input[name="username"]`);
        this.accountLastName = this.page.locator(`input[name="user_surname"]`);
        this.accountEmail = this.page.locator(`input[name="email"]`);
        this.realtorWelcomeMessage = this.page.getByText("Thank you for registering with DelekHomes. Our realtor verification team will reach out to you shortly over email.");
        this.realtorCloseButton = this.page.getByRole("button", { name: "Close" });
        this.simplebarLocator = this.page.locator(".simplebar-content");
        this.accountRoleText = (simpleBar) => simpleBar.getByText("role: ");
        this.accountNameText = (simpleBar) => simpleBar.locator("h6");
        this.logoutButtonLocator = this.page.getByRole("menuitem", { name: "Logout" });
        this.muiBoxLocator = this.page.locator(".MuiList-root.css-13cr43y");
        this.userListLocator = this.page.locator('#root span', { hasText: 'list' });
        this.userCreateLocator = this.page.locator('#root span', { hasText: 'create' });
        this.userListText = this.page.getByText("User List");
        this.newUserButton = this.page.getByRole("link",{name: "New User"});
        this.createUserText = this.page.getByText("Create a new user");
        this.emailInputLocator = this.page.locator(`input[name="email"]`);
        this.passwordInputLocator = this.page.locator(`input[name="password"]`);
        this.checkPasswordInputLocator = this.page.locator(`input[name="check_password"]`);
        this.firstNameInputLocator = this.page.locator(`input[name="username"]`);
        this.lastNameInputLocator = this.page.locator(`input[name="user_surname"]`);
        this.uploadImageLocator = this.page.locator(`input[type="file"]`);
        this.createSuccessMessage = this.page.getByText("Create success!");
        this.createUserButton = this.page.getByRole("button",{name: "Create User"});
        this.adminUserSearchInput = this.page.getByPlaceholder("Search user...");
        this.allUsersLocator = this.page.locator(".MuiTableRow-root.MuiTableRow-hover.css-uim1rd");
        this.specificUserLocatorByEmail = (email: string) => this.page.locator(`tr:has(td:has-text("${email}"))`);
        this.treeDotsButtonLocator = (user: Locator) => user.getByRole("button");
        this.deleteUserButtonLocator = this.page.getByRole("menuitem", {name: "Delete"});
    }

    async verifyPageLoaded() {
        await this.page.waitForLoadState("domcontentloaded");
        await this.page.waitForURL('/' + "dashboard/user/profile");
    }

    async clickProfileIcon() {
        await this.profileIcon.click();
    }

    async clickLogoutButton() {
        await this.logoutButtonLocator.click();
    }

    async clickProfileSettingsButton() {
        await this.profileSettingsButton.click();
    }

    async verifyAccountSettingsSection() {
        await this.page.waitForLoadState("domcontentloaded");
        await this.page.waitForURL('/' + "dashboard/user/account");
        await expect(await this.accountSettingsText).toBeVisible();
    }

    async verifyAccountSettingsInformation(firstName: string, lastName: string, email: string) {
        await expect(await this.accountFirstName.getAttribute("value")).toBe(firstName);
        await expect(await this.accountLastName.getAttribute("value")).toBe(lastName);
        await expect(await this.accountEmail.getAttribute("value")).toBe(email);
    }

    async verifyRealtorMessage() {
        await expect(await this.realtorWelcomeMessage).toBeVisible();
    }

    async closeRealtorMessage() {
        await this.realtorCloseButton.click();
    }

    async verifyAccountRole(role: string) {
        await expect(await this.accountRoleText(await this.simplebarLocator).textContent()).toBe(`role: ${role}`);
    }

    async verifyAccountName(firstName: string, lastName: string) {
        const text = await this.accountNameText(await this.simplebarLocator).textContent();
        await expect(text).toBe(`${firstName}  ${lastName}`);
    }

    async verifyAccountInformation(role: string, firstName: string, lastName: string) {
        await this.verifyAccountRole(role);
        await this.verifyAccountName(firstName, lastName);
    }

    async clickUserList() {
        await this.userListLocator.click();
    }

    async clickUserCreate() {
        await this.userCreateLocator.click();
    }

    async verifyUserListPage() {
        await this.page.waitForLoadState("domcontentloaded");
        await this.page.waitForURL('/' + "dashboard/user/list");
        await expect(await this.userListText).toBeVisible({timeout: 20000});
    }

    async clickNewUserButton(){
        await this.newUserButton.click();
    }

    async verifyCreateUserPage() {
        await this.page.waitForLoadState("domcontentloaded");
        await this.page.waitForURL('/' + "dashboard/user/new");
        await expect(await this.createUserText).toBeVisible();
    }

    async fillCreateUser(firstName: string, lastName: string, email: string, password: string, image = undefined){
        await this.firstNameInputLocator.fill(firstName);
        await this.lastNameInputLocator.fill(lastName);
        await this.emailInputLocator.fill(email);
        await this.passwordInputLocator.fill(password);
        await this.checkPasswordInputLocator.fill(password);
        if(image){
            await this.uploadImageLocator.setInputFiles(image);
        }
    }

    async verifyCreateUserFields(firstName: string, lastName: string, email: string, password: string){
        await expect(await this.firstNameInputLocator.getAttribute("value")).toBe(firstName);
        await expect(await this.lastNameInputLocator.getAttribute("value")).toBe(lastName);
        await expect(await this.emailInputLocator.getAttribute("value")).toBe(email);
        await expect(await this.passwordInputLocator.getAttribute("value")).toBe(password);
        await expect(await this.checkPasswordInputLocator.getAttribute("value")).toBe(password);
    }

    async clickCreateUserButton(){
        await this.createUserButton.click();
    }

    async verifyCreateSuccessMessage(){
        await expect(await this.createSuccessMessage).toBeVisible();
    }

    async searchUserByEmail(email: string){
        await this.adminUserSearchInput.fill(email);
        return await this.specificUserLocatorByEmail(email);
    }

    async clickDeleteUserButton(user: Locator){
        await this.treeDotsButtonLocator(user).click();
        await this.deleteUserButtonLocator.click();
        await expect(await this.allUsersLocator).toHaveCount(0);
    }
}