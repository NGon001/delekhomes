# Playwright E2E Tests for delekhomes

This is a **personal project** created to **practice automation testing** contains end-to-end (E2E) tests for [delekhomes](http://dev.delekhomes.com) using [Playwright](https://playwright.dev/).

## 🧰 Tech Stack

- [Playwright 1.53.0 ](https://playwright.dev/) (JavaScript / TypeScript)
- [dotenv](https://www.npmjs.com/package/dotenv) for managing environment variables (  ```VALID_EMAIL, VALID_PASSWORD```)
- GitHub Actions for CI/CD

---
## 🛠 Setup & Configuration

To run the API and E2E tests locally, follow these steps:
### 1. Install Dependencies

``` 
    "@playwright/test": "^1.53.0",
    "@types/node": "^22.15.29",
    "dotenv": "^16.5.0",
```


### 3. Run tests using the following command:
```npx playwright test``` - 


## 🚀 Features Covered
### E2E
| Test Case | Summary |
|-----------|-------------|
| ✅ TC1 | Should not register with invalid email (No @ Sign) |
| ✅ TC2 | Should register a new account |
| ✅ TC3 | Should register as a Realtor with the default role "User" |
| ✅ TC4 | Should not register without entering all required details |

## Test Case 1: Should not register with invalid email (No @ Sign)
1. Navigate to the registration page.
   
   Expected result:
   - Registration page is displayed.

3. Enter first name, last name, email address (without @ sign), and password.
   
   Example of data:

   - First name: Joe
   - Last name: Smith
   - Email address (should be unique): joesmith.gmail.com
   - Password: 123456

4. Click on the "Register" button.

   Expected result
   - A validation message should be displayed below the email input: 'Email must be a valid email address.'
   The email field should be highlighted in red.

## Test Case 2: Should register a new account
  1. Navigate to the registration page

     Expected result
        - Registration page is displayed

  3. Enter first name, last name, email address, password
     
     Example of valid data
        - First name: Joe
        - Last name: Smith
        - Email address follows the format (should be unique): joesmith@gmail.com
        - Password: 123456

  5. Click on the "Register" button

     Expected result
        - The dashboard page is displayed.

  7. Click on the profile icon in the upper-right corner

     Expected result
        - A dropdown menu with four options (Home, Profile, Settings, and Logout) is displayed.

  9. Click on the 'Settings' in the dropdown menu.

     Expected result
        - The 'Account' page is displayed.

  11. Verify the user information entered during registration

      Expected result
        - First Name, Last Name, and Email should match the data ​entered in step 2

## Test Case 3: Should register as a Realtor with the default role "User"
1. Navigate to the registration page.

   Expected result:
   - Registration page is displayed.

3. Enter first name, last name, email address, password

   Example of data:
   - First name: Joe
   - Last name: Smith
   - Email address follows the format (should be unique): joesmith@gmail.com
   - Password: 123456

5. Check the checkbox "Register as Realtor"

6. Click on the "Register" button
   
   Expected result:
   - User is redirected to the dashboard page.
    - A success message: "Thank you for registering with DelekHomes. Our realtor verification team will reach out to you shortly over email" is displayed.
      
7. Click the 'Close' button and check the role displayed in the top left corner under the name.

    Expected result:
   - The default role displayed is "User".

## Test Case 4: Should not register without entering all required details
1. Navigate to the registration page.
   
   Expected result:
   - Registration page is displayed.

2. Click on the Register button

   Expected result:
   - First name required
   - Last name required
   - Email is required
   - Password is required


---

## Author

- [@NGon001](https://github.com/NGon001)
