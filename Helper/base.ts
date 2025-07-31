import {test as baseTest} from '@playwright/test';
import {test as apiBaseTest} from '@playwright/test';
import { HomePage } from '../Pages/homePage.ts';
import { RegisterPage } from '../Pages/registerPage.ts';
import { DashboardPage } from '../Pages/dashboardPage.ts';
import { LoginPage } from '../Pages/loginPage.ts';
import { AuthorizationAPI } from '../API/authorization.ts';
import { DashboardAPI } from '../API/dashboard.ts';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config({quiet: true});

export const registerData = {
    FirstName: "Joe",
    LastName: "Smith",
    Password: "123456"
}

type MyFixtures = {
    homePage: HomePage;
    registerPage: RegisterPage;
    dashboardPage: DashboardPage;
    loginPage: LoginPage;
    authorizationAPI: AuthorizationAPI;
    dashboardAPI: DashboardAPI;
}

// To not open browser
export const apiTest = apiBaseTest.extend<MyFixtures>({
    authorizationAPI: async({request},use) => {
        await use(new AuthorizationAPI(request));
    },
    dashboardAPI: async({request},use) => {
        await use(new DashboardAPI(request));
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
    authorizationAPI: async({request},use) => {
        await use(new AuthorizationAPI(request));
    },
    dashboardAPI: async({request},use) => {
        await use(new DashboardAPI(request));
    },
});

export const AdminAuthPath = './playwright/.auth/admin.json';
export const RealtorAuthPath = './playwright/.auth/realtor.json';
export const UserAuthPath = './playwright/.auth/user.json';

export const AdminAuthJson = JSON.parse(fs.readFileSync(AdminAuthPath, 'utf-8'));
export const RealtorAuthJson = JSON.parse(fs.readFileSync(RealtorAuthPath, 'utf-8'));
export const UserAuthJson = JSON.parse(fs.readFileSync(UserAuthPath, 'utf-8'));

export const Status = { success: 200, resourceCreated: 201, badReq: 400, notFound: 404, methodNotAllowed: 405, serverError: 500};
export const Methods = { GET: 'GET', POST: 'POST', PUT: 'PUT', DELETE: 'DELETE'};
export const Roles = {REALTOR: "realtor", USER: "user", ADMIN: "admin"}