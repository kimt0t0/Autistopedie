import { Category } from "@/enums/Category.enum";
import type { IDataPage } from "@/interfaces/IDataPage.interface";

export const filterByCategoriesUtil = (datapages: IDataPage[]|void|undefined, categories: Category[]): IDataPage[]|void => {
    try {
        if (!datapages) throw new Error('Datapages array is empty, cannot filter an empty array.');
        if (!categories || categories.length < 1) throw new Error('No categories to filter by category.');
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

export const filterByTitleUtil = (datapages: IDataPage[]|void|undefined, title: string): IDataPage[]|void => {
    try {
        if (!datapages) throw new Error('Datapages array is empty, cannot filter an empty array.');
        if (!title || title.length < 1) throw new Error('No title to filter by title.');
        return datapages.filter(datapage => {
            return datapage.title.match(new RegExp(title, "i")) ? true : false; 
        })
    } catch (e) {
        console.error(`Could not filter datapages by title due to error: ${e}`);
    }
}

export const filterByContentsUtil = (datapages: IDataPage[]|void|undefined, contents: string): IDataPage[]|void => {
    try {
        if (!datapages) throw new Error('Datapages array is empty, cannot filter an empty array.');
        if (!contents || contents.length < 1) throw new Error('No contents to filter by contents.');
        return datapages.filter(datapage => {
            return (datapage.contents && datapage.contents.toString().match(new RegExp(contents, "i"))) ? true: false;
        })
    } catch (e) {
        console.error(`Could not filter datapages by title due to error: ${e}`);
    }
}