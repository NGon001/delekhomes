import {test as baseTest} from '@playwright/test';
import { HomePage } from '../Pages/homePage.ts';
import { RegisterPage } from '../Pages/registerPage.ts';
import { DashboardPage } from '../Pages/dashboardPage.ts';
import dotenv from 'dotenv';
dotenv.config();

type MyFixtures = {
    homePage: HomePage;
    registerPage: RegisterPage;
    dashboardPage: DashboardPage;
}

export const test = baseTest.extend<MyFixtures>({
    homePage: async ({page}, use) => {
        await use(new HomePage(page));
    },
    registerPage: async ({page}, use) => {
        await use(new RegisterPage(page));
    },
    dashboardPage: async ({page}, use) => {
        await use(new DashboardPage(page));
    },
});