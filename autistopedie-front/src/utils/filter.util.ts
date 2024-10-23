import { Category } from "@/enums/Category.enum";
import type { IDataPage } from "@/interfaces/IDataPage.interface";

export const filterByCategoriesUtil = (datapages: IDataPage[], categories: Category[]): IDataPage[] => {
    return datapages.filter(datapage => {
        categories.forEach(category => {
            if (datapage.categories.includes(category)) return true;
        })
    })
}