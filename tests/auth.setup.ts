import { HomePage } from '../Pages/homePage.ts';
import { DashboardPage } from '../Pages/dashboardPage.ts';
import { LoginPage } from '../Pages/loginPage.ts';
import { chromium } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config({quiet: true});

export default async function globalSetup() {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const homePage = new HomePage(page);

    // Save admin
    await page.goto("https://dev.delekhomes.com");
    await homePage.clickLoginButton();
    await loginPage.fillLoginForm(process.env.VALID_ADMIN_EMAIL ?? "", process.env.VALID_ADMIN_PASSWORD ?? "");
    await loginPage.verifyLoginFormInput(process.env.VALID_ADMIN_EMAIL ?? "", process.env.VALID_ADMIN_PASSWORD ?? "");
    await loginPage.clickLoginButton();
    await dashboardPage.verifyAccountInformation(process.env.VALID_ADMIN_ROLE ?? "", process.env.VALID_ADMIN_FIRSTNAME ?? "", process.env.VALID_ADMIN_LASTNAME ?? "");
    await loginPage.storeLogin("admin");

    // Save realtor
    await dashboardPage.clickProfileIcon();
    await dashboardPage.clickLogoutButton();
    await loginPage.fillLoginForm(process.env.VALID_REALTOR_EMAIL ?? "", process.env.VALID_REALTTOR_PASSWORD ?? "");
    await loginPage.verifyLoginFormInput(process.env.VALID_REALTOR_EMAIL ?? "", process.env.VALID_REALTTOR_PASSWORD ?? "");
    await loginPage.clickLoginButton();
    await dashboardPage.verifyAccountInformation(process.env.VALID_REALTTOR_ROLE ?? "", process.env.VALID_REALTTOR_FIRSTNAME ?? "", process.env.VALID_REALTTOR_LASTNAME ?? "");
    await loginPage.storeLogin("realtor");

    // Save user
    await dashboardPage.clickProfileIcon();
    await dashboardPage.clickLogoutButton();
    await loginPage.fillLoginForm(process.env.VALID_USER_EMAIL ?? "", process.env.VALID_USER_PASSWORD ?? "");
    await loginPage.verifyLoginFormInput(process.env.VALID_USER_EMAIL ?? "", process.env.VALID_USER_PASSWORD ?? "");
    await loginPage.clickLoginButton();
    await dashboardPage.verifyAccountInformation(process.env.VALID_USER_ROLE ?? "", process.env.VALID_USER_FIRSTNAME ?? "", process.env.VALID_USER_LASTNAME ?? "");
    await loginPage.storeLogin("user");

    await browser.close();
}