import type { IJwtToken } from "@/interfaces/IJwtToken.interface";
import type ILoginData from "@/interfaces/ILoginData.interface";
import { useAuthStore } from "@/stores/auth.store";
import { loginUtil } from "@/utils/auth.util";

export const useAuth = () => {
    const login = async (credentials: ILoginData): Promise<void> => {
        try {
            const jwtToken: IJwtToken | void = await loginUtil(credentials);
            if (jwtToken) useAuthStore().setAuth(jwtToken.access_token);
            else throw new Error('Could not return data on login attempt.');
        } catch (e) {
            console.error(`Could not login: ${e}`);
        }
    };

    // todo: signup, getUserAuth

    return {
        login,
    }

}