import type { IDecodedToken } from "@/interfaces/IDecodedToken.interface.js";
import { jwtDecode } from 'jwt-decode';
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore('auth', () => {
    // Authentification state
    const userAuth = ref<string | null>();
    const decodedToken = ref<IDecodedToken|null>();

    const getAuth = (): void => {
        userAuth.value = localStorage.getItem('authenticatedUser');
        if (userAuth.value != null) {
            decodedToken.value = jwtDecode<IDecodedToken>(userAuth.value);
        }
    }
    
    const setAuth = (access_token: string): void => {
        localStorage.clear();
        localStorage.setItem('authenticatedUser', access_token);
        userAuth.value = localStorage.getItem('authenticatedUser');
        decodedToken.value = jwtDecode<IDecodedToken>(access_token);
    };

    const resetAuth = (): void => {
        localStorage.clear();
        userAuth.value = null;
        decodedToken.value = null;
    };
    const ownsAccount = ref<boolean>(true);

    const setOwnsAccount = (value: boolean): void => {
        ownsAccount.value = value;
    }

    return {
        // toggle login/signup form in modal
        ownsAccount,
        setOwnsAccount,
        // user when auth
        userAuth,
        decodedToken,
        // login / disconnect functions
        getAuth,
        setAuth,
        resetAuth,
    }
})