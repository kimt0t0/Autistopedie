import type { IIllustration } from "@/interfaces/IIllustration.interface";
import type { INewIllustration } from "@/interfaces/INewIllustration.interface";
import axiosInstance from "@/services/api.service";
import type { UUID } from 'crypto';

// Get all
export const getAllIllustrationsUtil = async(): Promise<IIllustration[] | void> => {
    try {
        const illustrations = await axiosInstance.get('/illustrations');
        return illustrations.data;
    } catch (e) {
        console.error(`Illustrations could not be loaded correctly: ${e}`);
    }
}

// Get one
export const getIllustrationUtil = async(id: UUID): Promise<IIllustration | void> => {
    try {
        const illustration = await axiosInstance.get(`/illustrations/${id}`);
        return illustration.data;
    } catch (e) {
        console.error(`Illustration with id ${id} could not be loaded correctly: ${e}`);
    }
}

// Post 
export const createIllustrationUtil = async(formData: INewIllustration): Promise<IIllustration | void> => {
    try {
        const createdIllustration = await axiosInstance.post('/illustrations', formData, {headers: {
        'Content-Type': 'multipart/form-data',
    },});
        return createdIllustration.data;
    } catch (e) {
        console.error(`New illustration could not be saved in the database: ${e}`)
    }
}

// Delete
export const deleteIllustrationUtil = async(id: UUID): Promise<IIllustration | void> => {
    try {
        const deletedIllustration = await axiosInstance.delete(`/illustrations/${id}`);
        return deletedIllustration.data;
    } catch (e) {
        console.error(`Illustration with id ${id} could not be loaded correctly: ${e}`);
    }
}