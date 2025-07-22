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

    /*
    1) Navigate to the dashboard page.
        Expected result
        The dashboard page is displayed.

    2) Click on User > List in the left sidebar menu.
        Expected result
        The "User List" page is displayed.

    3) Click on the "Three dots" button on the right side of the data table next to the user from the precondition.
        Expected result
        The two options are displayed: Delete and Edit.

    4) Click on the "Delete" option.
        Expected result
        The user with the Realtor role is removed from the data table.
    */

    test('The admin should be able to delete a realtor', async ({ dashboardPage }) => {
        await dashboardPage.clickUserList();
        await dashboardPage.verifyUserListPage();

        //CREATE A REALTOR USER


        //FIND THE REALTOR USER IN THE LIST


        //DELETE THE REALTOR USER
    });

    /*
    1) Navigate to the dashboard page.
        Expected result
        The dashboard page is displayed.

    2) Click on User > List in the left sidebar menu.
        Expected result
        The "User List" page is displayed.

    3) Click on the "Three dots" button on the right side of the data table next to the user from the precondition.
        Expected result
        The two options are displayed: Delete and Edit.

    4) Click on the "Edit" option.
        Expected result
        The 'Edit user' page is displayed.

    5) Enter new values for the name, surname, and email address.
        Input data
        Example of valid data:
        Name: Emma  
        Surname: Willson  
        Email address (should be unique): emmawillson@gmail.com  
        Password: 123456  
        Check Password: 123456 (must match the password)

    6) Upload a new photo.
        Input data
        Allowed formats: .jpeg, .jpg, .png, .gif  
        Maximum size: 3.1 MB  
        Expected result
        The uploaded photo is displayed in the designated preview area within the upload section, replacing the placeholder icon.

    7) Click on the "Save Changes" button.
        Expected result
        A popup message "Update success!" appears in the upper-right corner.  
        The admin is redirected to the "User List" page.

    8) Search for the edited user in the "User List" (by email, first name, or last name).
        Expected result
        The user is displayed in the table.

    9) Click on the "Three dots" button on the right side of the data table next to the user → Click on "Edit".
        Expected result
        The name, surname, and email address should match the data entered in Step 5.
    */

    test('The admin should be able to edit a user', async ({ dashboardPage }) => {

    });

    
});