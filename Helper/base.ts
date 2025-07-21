import {test as baseTest} from '@playwright/test';
import { HomePage } from '../Pages/homePage.ts';
import { RegisterPage } from '../Pages/registerPage.ts';
import { DashboardPage } from '../Pages/dashboardPage.ts';
import { LoginPage } from '../Pages/loginPage.ts';
import dotenv from 'dotenv';
dotenv.config();

export const registerData = {
    FirstName: "Joe",
    LastName: "Smith",
    Role: "user",
    Password: "123456"
}

type MyFixtures = {
    homePage: HomePage;
    registerPage: RegisterPage;
    dashboardPage: DashboardPage;
    loginPage: LoginPage;
}

export const test = baseTest.extend<MyFixtures>({
    homePage: async ({page}, use) => {
        await use(new HomePage(page));
    },
    registerPage: async ({page}, use) => {
        await use(new RegisterPage(page));
    },
    loginPage: async ({page}, use) => {
        await use(new LoginPage(page));
    },
    dashboardPage: async ({page}, use) => {
        await use(new DashboardPage(page));
    },
});