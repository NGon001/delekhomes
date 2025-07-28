import { APIRequestContext, APIResponse,expect } from '@playwright/test';
import { Roles } from '../Helper/base';
import { verifyResponseSchema } from '../Helper/tools';
import { z } from 'zod';


export class DashboardAPI{
    readonly request: APIRequestContext;
    readonly PUT_Role: (authorization: string, userId: number, newRole: string) => Promise<APIResponse>;

    constructor(request: APIRequestContext){
        this.request = request;
        this.PUT_Role = (authorization: string, userId: number, newRole: string) => {
            const payload = {
                userId: Number(userId),
                newRoleTypes: newRole
            };
            return request.put("/api/user/roles", { 
                data: payload, 
                headers: {
                    "authorization": authorization //'Bearer your_token_here'
                } 
            });
        };
    }

    async verifyRoleUpdateAPISchema(response, userId: number, role: string, expectedCode){
        await expect(response.ok()).toBeTruthy();
        const schema = z.object({
            id: z.literal(Number(userId)),
            username: z.string(),
            user_surname: z.string(),
            email: z.string(),
            bio: z.string(),
            avatarUrl: z.string(),
            phoneNumber: z.literal(null),
            address: z.literal(null),
            country: z.literal(null),
            stateOrRegion:z.literal(null),
            city: z.literal(null),
            zipCode: z.literal(null),
            about: z.literal(null),
            isPublic: z.literal(false),
            isRealtor: z.boolean(),
            password: z.string(),
            user_role: z.array(z.object({
                id: z.number(),
                description: z.string(),
                type: z.literal(role)
            })),
        });
        await verifyResponseSchema(response, schema);
    }

    async updateUserRole(authorization: string, userId: number, newRole, expectedCode: number){
        const response =  await this.PUT_Role(authorization,userId,newRole);
        await this.verifyRoleUpdateAPISchema(response,userId,newRole,expectedCode);
    }
}