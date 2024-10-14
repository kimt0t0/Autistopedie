import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore('auth', () => {
    // Authentification state
    const userAuth = ref<string | null>();
    
    const setAuth = (access_token: string): void => {
        localStorage.clear();
        localStorage.setItem('authenticatedUser', access_token);
        userAuth.value = localStorage.getItem('authenticatedUser');
    };

    const resetAuth = (): void => {
        localStorage.clear();
        userAuth.value = null;
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
        // login / disconnect functions
        setAuth,
        resetAuth,
    }
})