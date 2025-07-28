import { apiTest as test , registerData, AdminAuthJson, Status, Roles} from '../../Helper/base.ts';

test.describe("API Dashboard tests", () => {

    test("Should update role", async ({ dashboardAPI }) => {
        const token =`Bearer ${AdminAuthJson.origins[0].localStorage[0].value}`;
        await dashboardAPI.updateUserRole(
            token,
            process.env.VALID_USER_ID,
            Roles.USER,
            Status.success
        );
    });
});