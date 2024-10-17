import type { IDataPage } from "@/interfaces/IDataPage.interface";
import type { ISecurityCheck } from "@/interfaces/ISecurityCheck.interface";
import { createDataPageUtil, deleteDataPageUtil, getAllDataPagesUtil, getDataPageUtil, updateDataPageUtil } from "@/utils/datapage.util";
import type { UUID } from 'crypto';

export const useDataPage = () => {
    const getAll = async (): Promise<IDataPage[] | void> => {
        try {
            const datapages = await getAllDataPagesUtil();
            if (!datapages) throw new Error(`Data pages array is empty.`);
            return datapages;
        } catch(e) {
            console.error(`Could not load data pages: ${e}`);
        }
    }

    const getOne = async (id: UUID): Promise<IDataPage|void> => {
        try {
            const datapage = await getDataPageUtil(id);
            if (!datapage) throw new Error(`Datapage is empty.`);
            return datapage;
        } catch(e) {
            console.error(`Could not load data page: ${e}`);
        }
    }

    const create = async (formData: IDataPage): Promise<IDataPage|void> => {
        try {
            const createdDatapage = await createDataPageUtil(formData);
            if (!createdDatapage) throw new Error(`Returned created datapage is empty.`);
            return createdDatapage;
        }catch(e) {
            console.error(`Could not save data page in the database: ${e}`);
        }
    }

    const update = async (id: UUID, formData: IDataPage): Promise<IDataPage|void> => {
        try {
            const updatedDatapage = await updateDataPageUtil(id, formData);
            if (!updatedDatapage) throw new Error(`Returned updated datapage is empty.`);
            return updatedDatapage;
        }catch(e) {
            console.error(`Could not save data page updates in the database: ${e}`);
        }
    }

    const deletePage = async (id: UUID, credentials: ISecurityCheck): Promise<IDataPage|void> => {
        try {
            const deletedDatapage = await deleteDataPageUtil(id, credentials);
            if (!deletedDatapage) throw new Error(`Returned deleted datapage is empty.`);
            return deletedDatapage;
        }catch(e) {
            console.error(`Could not delete datapage from the database: ${e}`);
        }
    }

    return {
        getAll,
        getOne,
        create,
        update,
        deletePage
    }

}