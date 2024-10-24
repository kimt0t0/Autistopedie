import { Category } from "@/enums/Category.enum";
import type { IDataPage } from "@/interfaces/IDataPage.interface";

export const filterByCategoriesUtil = (datapages: IDataPage[]|void|undefined, categories: Category[]): IDataPage[]|void => {
    try {
        if (!datapages) throw new Error('Datapages array is empty, cannot filter an empty array !');
        return datapages.filter(datapage => {
            let isValid = false;
            categories.forEach(category => {
                if (datapage.categories.includes(category)) isValid = true;
            })
            return isValid;
        });
    } catch (e) {
        console.error(`Could not filter datapages by categories due to error: ${e}`);
    }
}