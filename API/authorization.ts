import { APIRequestContext, APIResponse,expect } from '@playwright/test';
import { Roles } from '../Helper/base';
import { verifyResponseSchema } from '../Helper/tools';
import { z } from 'zod';


export class AuthorizationAPI{
    readonly request: APIRequestContext;
    readonly POST_CreateUser: (authorization: string, firstName: string, lastName: string, email: string, isRealtor: boolean, password: string)  => Promise<APIResponse>;

    constructor(request: APIRequestContext){
        this.request = request;
        this.POST_CreateUser = (authorization: string, firstName: string, lastName: string, email: string, isRealtor: boolean, password: string) => {
            const form: Record<string, string | boolean> = {};
            if (firstName !== undefined) form.username = firstName;
            if (firstName !== undefined) form.user_surname = lastName;
            if (firstName !== undefined) form.email = email;
            if (firstName !== undefined) form.isRealtor = isRealtor;
            if (firstName !== undefined) form.password = password;
            if (firstName !== undefined) form.check_password = password;
            return request.post("/api/users", { 
                form, 
                headers: {
                    "authorization": authorization //'Bearer your_token_here'
                } 
            });
        };
    };

    async verifyCreateAccountAPISchema(response, expectedCode: number, firstName: string, lastName: string, email: string, role: string){
        await expect(response.ok()).toBeTruthy();
        const schema = z.object({
            user: z.object({
                username: z.literal(firstName),
                email: z.literal(email),
                password: z.string(),
                user_surname: z.literal(lastName),
                avatarUrl: z.string(),
                user_role: z.array(z.object({
                    id: z.number(),
                    description: z.string(),
                    type: z.literal(role)
                })),
                isRealtor: z.boolean(),
                phoneNumber: z.literal(null),
                address: z.literal(null),
                country: z.literal(null),
                stateOrRegion:z.literal(null),
                city: z.literal(null),
                zipCode: z.literal(null),
                about: z.literal(null),
                id: z.number(),
                bio: z.string(),
                isPublic: z.literal(false),
                accessToken: z.string(),
            }),
            accessToken: z.string(),
        });
        await verifyResponseSchema(response, schema);
    }

    async createUser(authorization: string, firstName: string, lastName: string, email: string, role: string, password: string, expectedCode: number, updateUserRole){
        const isRealtor = (role === Roles.REALTOR || role === Roles.ADMIN) ? true : false;
        const response =  await this.POST_CreateUser(authorization,firstName,lastName,email,isRealtor,password);
        if(isRealtor){
            const responseBody = await response.json();
            await updateUserRole(authorization, Number(responseBody.user.id), role, expectedCode);
        }  
        await this.verifyCreateAccountAPISchema(response,expectedCode, firstName, lastName,email,Roles.USER);
    }
};