import { defineStore } from "pinia";
import { ref } from "vue";

export const useModalStore = defineStore('modal', () => {
    const isShow = ref<boolean>(false);

    const toggleIsShow = (): void => {
        isShow.value = !isShow.value;
    }

    return {isShow, toggleIsShow}
})