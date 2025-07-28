import { apiTest as test , registerData, AdminAuthJson, Status, Roles} from '../../Helper/base.ts';
import { generateRandomEmail } from '../../Helper/tools.js';


test.describe("API Registration tests", () => {

    test("Should register a new account", async ({ authorizationAPI, dashboardAPI }) => {
        const UserEmail = await generateRandomEmail();
        const token =`Bearer ${AdminAuthJson.origins[0].localStorage[0].value}`;
        await authorizationAPI.createUser(
            token,
            registerData.FirstName,
            registerData.LastName,
            UserEmail,
            Roles.USER,
            registerData.Password,
            Status.resourceCreated,
            dashboardAPI.updateUserRole.bind(dashboardAPI)
        );

        const RealtorEmail = await generateRandomEmail();
        await authorizationAPI.createUser(
            token,
            registerData.FirstName,
            registerData.LastName,
            RealtorEmail,
            Roles.REALTOR,
            registerData.Password,
            Status.resourceCreated,
            dashboardAPI.updateUserRole.bind(dashboardAPI)
        );
    });
});