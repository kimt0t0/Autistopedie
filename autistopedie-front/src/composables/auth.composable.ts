import type { IJwtToken } from "@/interfaces/IJwtToken.interface";
import type ILoginData from "@/interfaces/ILoginData.interface";
import type { IUserAccountData } from "@/interfaces/IUserAccountData.interface";
import { useAuthStore } from "@/stores/auth.store";
import { getUserAuthUtil, loginUtil } from "@/utils/auth.util";

export const useAuth = () => {
    const login = async (credentials: ILoginData): Promise<void> => {
        try {
            const jwtToken: IJwtToken | void = await loginUtil(credentials);
            if (jwtToken) 
                useAuthStore().setAuth(jwtToken.access_token);
            else throw new Error('Could not return data on login attempt.');
        } catch (e) {
            console.error(`Could not login: ${e}`);
        }
    };

    const getUserAuth = async (): Promise<IUserAccountData | undefined> => {
        try {
            const user: IUserAccountData | undefined = await getUserAuthUtil();
            return user;
        } catch (e) {
            console.error(`Could not load authentified user: ${e}`);
        }
    }

    // todo: signup, getUserAuth

    return {
        login,
        getUserAuth
    }

}