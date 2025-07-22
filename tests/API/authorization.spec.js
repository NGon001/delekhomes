import { apiTest as test , registerData, Admin, Status} from '../../Helper/base.ts';
import { generateRandomEmail } from '../../Helper/tools.js';


test.describe("API Registration tests", () => {

    test("Should register a new account", async ({ authorizationAPI }) => {
        const email = await generateRandomEmail();
        const token =`Bearer ${Admin.origins[0].localStorage[0].value}`;
        const response = await authorizationAPI.createUser(
            token,
            registerData.FirstName,
            registerData.LastName,
            email,
            (registerData.Role === "realtor") ? true : false, 
            registerData.Password
        );
        await authorizationAPI.verifyCreateAccountAPISchema(
            response,
            Status.resourceCreated,
            registerData.FirstName,
            registerData.LastName,
            email,
            registerData.Role,
            (registerData.Role === "realtor") ? true : false
        );
    });
});