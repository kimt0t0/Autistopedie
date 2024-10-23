import { useDataPage } from "@/composables/datapage.composable";
import type { IDataPage } from "@/interfaces/IDataPage.interface";
import type { IFilter } from "@/interfaces/IFilter.interface";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useDataPagesStore = defineStore('datapages', () => {
    const allDataPages = ref<IDataPage[]|void|undefined>();
    const selectedDataPages = ref<IDataPage[]|void|undefined>();

    const getAll = async(): Promise<void> => {
        allDataPages.value = await useDataPage().getAll();
        setSelectedDataPages(allDataPages.value);
    }
    
    const setSelectedDataPages = (value: IDataPage[]|void|undefined): void => {
        selectedDataPages.value = value;
    }

    const filterSelectedData = (filters: IFilter): void => {
        
    }
    
    const resetAllDataPages = (): void => {
        allDataPages.value = undefined;
    }

    const resetSelectedDataPages = (): void => {
        selectedDataPages.value = allDataPages.value;
    }


    return {
        allDataPages,
        selectedDataPages,
        getAll,
        setSelectedDataPages,
        filterSelectedData,
        resetAllDataPages,
        resetSelectedDataPages
    }
})