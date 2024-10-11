import type { IJwtToken } from "@/interfaces/IJwtToken.interface";
import type ILoginData from "@/interfaces/ILoginData.interface";
import type ISignupData from "@/interfaces/ISignupData.interface";
import type { IUserAuthData } from "@/interfaces/IUserAuthData.interface";
import axiosInstance from "@/services/api.service";
import { jwtDecode } from "jwt-decode";

// Login
export const loginUtil = async(credentials: ILoginData): Promise<IJwtToken | void> => {
    try {
        console.log(`credentials from util: ${credentials.username}, ${credentials.password}`)
        const jwtToken = await axiosInstance.post('/auth/login', credentials);
        return jwtToken.data;
    } catch (e) {
        console.error(`Login failed due to error: ${e}`);
    }
}

// Signup
export const signupUtil = async (credentials: ISignupData): Promise<IJwtToken | void> => {
    try {
        const userCreated = await axiosInstance.post('/users', credentials);
        if (!userCreated) throw new Error('User creation in the database failed.');
        // login after user is created
        const jwtTokenData = await loginUtil({
            username: credentials.username,
            password: credentials.password
        });
        return jwtTokenData;
    } catch (e) {
        console.error(`Signup failed due to error: ${e}`);
    }
};

export const getUserAuthUtil = async (): Promise<IUserAuthData | undefined> => {
    try {
        const userToken = localStorage.getItem('authenticatedUser');
        if (!userToken) {
            throw new Error(`You cannot get user auth without a jwt token`);
        }
        const decodedToken: IUserAuthData = jwtDecode<IUserAuthData>(userToken);
        const user = await axiosInstance.get(`/users/${decodedToken._id}`);
        if (!user) {
            throw new Error(`User with id ${decodedToken} was not found.`);
        }
        return user.data;
    } catch (e) {
        console.error(`Could not load user data with authentification token ${localStorage.getItem('authenticatedUser')}: ${e}`);
    }
};
