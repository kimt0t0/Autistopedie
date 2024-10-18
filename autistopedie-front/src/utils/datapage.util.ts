import type { IDataPage } from "@/interfaces/IDataPage.interface.js";
import type { ISecurityCheck } from "@/interfaces/ISecurityCheck.interface.js";
import axiosInstance from "@/services/api.service.js";

// Get all
export const getAllDataPagesUtil = async(): Promise<IDataPage[] | void> => {
    try {
        const datapages = await axiosInstance.get('/datapages');
        return datapages.data;
    } catch (e) {
        console.error(`Data pages could not be loaded correctly: ${e}`);
    }
}

// Get one
export const getDataPageUtil = async(id: string): Promise<IDataPage | void> => {
    try {
        const datapage = await axiosInstance.get(`/datapages/${id}`);
        return datapage.data;
    } catch (e) {
        console.error(`Data page with id ${id} could not be loaded correctly: ${e}`);
    }
}

// Post 
export const createDataPageUtil = async(formData: IDataPage): Promise<IDataPage | void> => {
    try {
        const createdPage = await axiosInstance.post('/datapages', formData);
        return createdPage.data;
    } catch (e) {
        console.error(`New data page could not be saved in the database: ${e}`)
    }
}

// Patch
export const updateDataPageUtil = async(id: string, formData: IDataPage): Promise<IDataPage | void> => {
    try {
        const updatedPage = await axiosInstance.patch(`/datapages/${id}`, formData);
        return updatedPage.data;
    } catch (e) {
        console.error(`Data page with id ${id} could not be saved in the database: ${e}`)
    }
}

// Delete
export const deleteDataPageUtil = async(id: string, credentials: ISecurityCheck): Promise<IDataPage | void> => {
    try {
        const deletedPage = await axiosInstance.delete(`/datapages/${id}`, { data: credentials});
        return deletedPage.data;
    } catch (e) {
        console.error(`Data page with id ${id} could not be deleted correctly: ${e}`);
    }
}