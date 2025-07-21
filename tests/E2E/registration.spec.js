import { test, registerData } from '../../Helper/base.ts';
import { generateRandomEmail } from '../../Helper/tools.ts';

test.describe("E2E Registration tests", () => {

    test.beforeEach(async ({ homePage }) => {
        await homePage.goto("auth/register");
    });



    /*
        1) Navigate to the registration page.
            Expected result
            Registration page is displayed.

        2) Enter first name, last name, email address (without @ sign), and password
            Input data
            Example of data

            First name: Joe
            Last name: Smith
            Email address (should be unique): joesmith.gmail.com
            Password: 123456

        3) Click on the "Register" button.
            Expected result
            A validation message should be displayed below the email input: 'Email must be a valid email address.'
            The email field should be highlighted in red.
    */

    test('Should not register with invalid email (No @ Sign)', async ({  registerPage }) => {
        const email = await generateRandomEmail(".");
        await registerPage.verifyPageLoaded();
        await registerPage.fillRegestrationForm(registerData.FirstName, registerData.LastName, email, registerData.Password);
        await registerPage.verifyRegistrationFormFields(registerData.FirstName, registerData.LastName, email, registerData.Password);
        await registerPage.clickRegisterButton();
        await registerPage.verifyEmailValidError();
    });

    /*
    1) Navigate to the registration page
        Expected result
        Registration page is displayed

    2) Enter first name, last name, email address, password
        Input data
        Any valid data

        Example of valid data
        First name: Joe
        Last name: Smith
        Email address follows the format (should be unique): joesmith@gmail.com
        Password: 123456

    3) Click on the "Register" button
        Expected result
        The dashboard page is displayed.

    4) Click on the profile icon in the upper-right corner
        Expected result
        A dropdown menu with four options (Home, Profile, Settings, and Logout) is displayed.

    5) Click on the 'Settings' in the dropdown menu.
        Expected result
        The 'Account' page is displayed.

    6) Verify the user information entered during registration
        Expected result
        First Name, Last Name, and Email should match the data ​entered in step 2
    */

    test('Should register a new account', async ({  registerPage, dashboardPage }) => {
        const email = await generateRandomEmail();
        await registerPage.verifyPageLoaded();
        await registerPage.fillRegestrationForm(registerData.FirstName, registerData.LastName, email, registerData.Password);
        await registerPage.verifyRegistrationFormFields(registerData.FirstName, registerData.LastName, email, registerData.Password);
        await registerPage.clickRegisterButton();
        await dashboardPage.verifyPageLoaded();
        await dashboardPage.clickProfileIcon();
        await dashboardPage.clickProfileSettingsButton();
        await dashboardPage.verifyAccountSettingsSection();
        await dashboardPage.verifyAccountSettingsInformation(registerData.FirstName, registerData.LastName, email);
    });

    /*
    1) Navigate to the registration page
        Expected result
        Registration page is displayed

    2) Enter first name, last name, email address, password
        Input data
        Any valid data

        Example of valid data
        First name: Joe
        Last name: Smith
        Email address follows the format (should be unique): joesmith@gmail.com
        Password: 123456

    3) Check the checkbox "Register as Realtor"

    4) Click on the "Register" button
        Expected result
        User is redirected to the dashboard page.

        A success message: "Thank you for registering with DelekHomes. Our realtor verification team will reach out to you shortly over email" is displayed.

    5) Click the 'Close' button and check the role displayed in the top left corner under the name.
        Expected result
        The default role displayed is "User".
    */

    test(`Should register as a Realtor with the default role "User"`, async ({  registerPage, dashboardPage }) => {
        const email = await generateRandomEmail();
        await registerPage.verifyPageLoaded();
        await registerPage.fillRegestrationForm(registerData.FirstName, registerData.LastName, email, registerData.Password, true);
        await registerPage.verifyRegistrationFormFields(registerData.FirstName, registerData.LastName, email, registerData.Password, true);
        await registerPage.clickRegisterButton();
        await dashboardPage.verifyPageLoaded();
        await dashboardPage.verifyRealtorMessage();
        await dashboardPage.closeRealtorMessage();
        await dashboardPage.verifyAccountRole(registerData.Role);
    });

    /*
    Navigate to the registration page.
        Expected result
        Registration page is displayed.

    Click on the Register button
        Expected result
        Validation messages are displaying:

        First name required

        Last name required

        Email is required

        Password is required   
    */

    test(`Should not register without entering all required details`, async ({ registerPage }) => {
        await registerPage.clickRegisterButton();
        await registerPage.verifyFormReqErrors();
    });
});