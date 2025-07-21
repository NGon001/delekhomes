import { test } from '../../Helper/base.ts';

test.describe("E2E Login tests", () => {

    test.beforeEach(async ({ homePage, loginPage }) => {
        await homePage.goto();
        await homePage.clickLoginButton();
        await loginPage.verifyPageLoaded();
    });

    /*
        1) Navigate to the homepage.
            Expected result
            The homepage is displayed.
    
        2) Click on the 'Login' in the header.
            Expected result
            The login page is displayed.
    
        3) Enter the email address in the email field of the registered user from the precondition.
            Input data
            Email: [precondition user's email]
    
        4) Enter the password in the password field of the registered user from the precondition.
            Input data
            Password: [precondition user's password]
    
        5) Click on the "Login" button.
            Expected result
            The user is redirected to the dashboard page.
            The First Name, Last Name, and Role in the upper left corner should match the registered user from the precondition.
    
        6) Click on the profile icon in the upper-right corner.
            Expected result
            A dropdown menu with four options: Home, Profile, Settings, and Logout is displayed.
    
        7) Click on the 'Logout' in the dropdown menu.
            Expected result
            The user is logged out and returned to the /auth/login page.
    */


    test('Should log out', async ({ loginPage, dashboardPage }) => {
        await loginPage.fillLoginForm(process.env.VALID_REALTOR_EMAIL, process.env.VALID_REALTTOR_PASSWORD);
        await loginPage.verifyLoginFormInput(process.env.VALID_REALTOR_EMAIL, process.env.VALID_REALTTOR_PASSWORD);
        await loginPage.clickLoginButton();
        await dashboardPage.verifyAccountInformation(process.env.VALID_REALTTOR_ROLE, process.env.VALID_REALTTOR_FIRSTNAME, process.env.VALID_REALTTOR_LASTNAME);
        await dashboardPage.clickProfileIcon();
        await dashboardPage.clickLogoutButton();
        await loginPage.verifyPageLoaded();
    });

    /*
    1) Navigate to the homepage.
        Expected result
        The homepage is displayed.

    2) Click on the 'Login' in the header.
        Expected result
        The login page is displayed.

    3) Enter an invalid email in the email field.
        Input data
        Email: nonexistent@example.com

    4) Enter an invalid password in the password field.
        Input data
        Password: WrongPassword123

    5) Click on the "Login" button.
        Expected result
        An error message, 'Wrong email or password,' is displayed above the email address field.
    */


    test("Should not log in with invalid credentials", async ({ loginPage }) => {
        await loginPage.fillLoginForm("nonexistent@example.com", "WrongPassword123");
        await loginPage.verifyLoginFormInput("nonexistent@example.com", "WrongPassword123");
        await loginPage.clickLoginButton();
        await loginPage.verifyWrongEmailOrPasswordMessage();
    });

    /*
    1) Navigate to the homepage.
        Expected result
        The homepage is displayed.

    2) Click on the 'Login' in the header.
        Expected result
        The login page is displayed.

    3) Enter the email address in the email field of the registered user from the precondition.
        Input data
        Email: [email from precondition]

    4) Enter the password in the password field of the registered user from the precondition.
        Input data
        Password: [password from precondition]

    5) Click on the "Login" button.
        Expected result
        The user is redirected to the dashboard page.
        The First Name, Last Name, and Role in the upper left corner should match the registered user from the precondition.
    */


    test("Should log in with an existing User account", async ({ loginPage, dashboardPage }) => {
        await loginPage.fillLoginForm(process.env.VALID_REALTOR_EMAIL, process.env.VALID_REALTTOR_PASSWORD);
        await loginPage.verifyLoginFormInput(process.env.VALID_REALTOR_EMAIL, process.env.VALID_REALTTOR_PASSWORD);
        await loginPage.clickLoginButton();
        await dashboardPage.verifyAccountInformation(process.env.VALID_REALTTOR_ROLE, process.env.VALID_REALTTOR_FIRSTNAME, process.env.VALID_REALTTOR_LASTNAME);
    });

    /*
    1) Navigate to the homepage.
        Expected result
        The homepage is displayed.

    2) Click on the 'Login' in the header.
        Expected result
        The login page is displayed.

    3) Leave the email address and password input fields blank.

    4) Click on the "Login" button.
        Expected result
        The email address and password input fields are highlighted in red with error messages:
        "Email is required."
        "Password is required."
    */


    test("Should not login without email and password", async ({ loginPage }) => {
        await loginPage.verifyLoginFormInput("", "");
        await loginPage.clickLoginButton();
        await loginPage.verifyFormReqErrors();
    });
});