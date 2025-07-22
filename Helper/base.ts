import {test as baseTest} from '@playwright/test';
import {test as apiBaseTest} from '@playwright/test';
import { HomePage } from '../Pages/homePage.ts';
import { RegisterPage } from '../Pages/registerPage.ts';
import { DashboardPage } from '../Pages/dashboardPage.ts';
import { LoginPage } from '../Pages/loginPage.ts';
import { AuthorizationAPI } from '../API/authorization.ts';
import fs from 'fs';
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
    authorizationAPI: AuthorizationAPI;
}

// To not open browser
export const apiTest = apiBaseTest.extend<MyFixtures>({
    authorizationAPI: async({request},use) => {
        await use(new AuthorizationAPI(request));
    },
});

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

export const rawAdmin = fs.readFileSync('./playwright/.auth/admin.json', 'utf-8');
export const Admin = JSON.parse(rawAdmin);

export const Status = { success: 200, resourceCreated: 201, badReq: 400, notFound: 404, methodNotAllowed: 405, serverError: 500};
export const Methods = { GET: 'GET', POST: 'POST', PUT: 'PUT', DELETE: 'DELETE'};