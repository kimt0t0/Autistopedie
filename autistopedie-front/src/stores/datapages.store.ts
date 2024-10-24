import { useDataPage } from "@/composables/datapage.composable";
import type { IDataPage } from "@/interfaces/IDataPage.interface";
import type { IFilter } from "@/interfaces/IFilter.interface";
import { filterByCategoriesUtil, filterByTitleUtil } from "@/utils/filter.util";
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
        let filtered = allDataPages.value;
        console.log(`Filtered variable value at start from store: ${filtered}`);
        if (filters.title && filters.title.length > 0) {
            filtered = filterByTitleUtil(filtered, filters.title);
        }
        if (filters.contents && filters.contents.length > 0) {
            // filter by contents
        }
        if (filters.categories && filters.categories.length > 0) {
            filtered = filterByCategoriesUtil(filtered, filters.categories);
        console.log(`Filtered variable value at end of categories filter in store: ${filtered}`);
        }
        // todo: sorting alphabetically and/or by date
        console.log(`Filtered variable value at end of store: ${filtered}`);
        selectedDataPages.value = filtered;
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