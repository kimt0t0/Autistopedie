import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore('auth', () => {
    const isAuth = ref<boolean>(false);
    const ownsAccount = ref<boolean>(true);

    const setIsAuth = (value: boolean): void => {
        isAuth.value = value;
    }

    const setOwnsAccount = (value: boolean): void => {
        ownsAccount.value = value;
    }

    return {
        isAuth,
        ownsAccount,
        setIsAuth,
        setOwnsAccount
    }
})