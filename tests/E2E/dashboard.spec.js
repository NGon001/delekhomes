import { test, registerData } from '../../Helper/base.ts';
import { generateRandomEmail } from '../../Helper/tools.ts';

test.use({storageState: 'playwright/.auth/admin.json'});
test.describe("E2E Dashboard tests", () => {

    test.beforeEach(async ({ homePage, dashboardPage }) => {
        await homePage.goto("dashboard/user/profile");
        await dashboardPage.verifyAccountInformation(process.env.VALID_ADMIN_ROLE, process.env.VALID_ADMIN_FIRSTNAME, process.env.VALID_ADMIN_LASTNAME);
    });

    /*
    1) Navigate to the dashboard page.
        Expected result
        The dashboard page is displayed.

    2) Click on User > List in the left sidebar menu.
        Expected result
        The "User List" page is displayed.

    3) Click on the "+ New User" button.
        Expected result
        The "Create a new user" page is displayed.

    4) Enter the name, surname, email address, password, and check password.
        Input data
        Example of valid data:
        Name: Joe
        Surname: Smith
        Email address (should be unique): joesmith@gmail.com
        Password: 123456
        Check Password: 123456 (must match the password)

    5) Upload a photo.
        Input data
        File type: *.jpeg, *.jpg, *.png, *.gif
        Max size: 3.1 MB
        Expected result
        The uploaded photo is displayed in the designated preview area within the upload section, replacing the placeholder icon.

    6) Click on the "Create User" button.
        Expected result
        A toast message "Create success!" is displayed in the upper-right corner.
        The admin is redirected to the "User List" page.
    */


    test('The admin should be able to create a new user', async ({ dashboardPage }) => {
        const email = await generateRandomEmail();
        await dashboardPage.clickUserList();
        await dashboardPage.verifyUserListPage();
        await dashboardPage.clickUserCreate();
        await dashboardPage.verifyCreateUserPage();
        await dashboardPage.fillCreateUser(registerData.FirstName,registerData.LastName,email,registerData.Password,dashboardPage.imagePath);
        await dashboardPage.verifyCreateUserFields(registerData.FirstName,registerData.LastName,email,registerData.Password);
        await dashboardPage.clickCreateUserButton();
        await dashboardPage.verifyCreateSuccessMessage();
        await dashboardPage.verifyUserListPage();
    });

});