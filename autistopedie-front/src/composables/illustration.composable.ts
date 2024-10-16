import type { IIllustration } from "@/interfaces/IIllustration.interface.js";
import type { INewIllustration } from "@/interfaces/INewIllustration.interface.js";
import { createIllustrationUtil, deleteIllustrationUtil, getAllIllustrationsUtil, getIllustrationUtil } from "@/utils/illustration.util.js";

export const useIllustration = () => {
    const getAll = async (): Promise<IIllustration[] | void> => {
        try {
            const illustrations = await getAllIllustrationsUtil();
            if (!illustrations) throw new Error(`Illustrations array is empty.`);
            return illustrations;
        } catch(e) {
            console.error(`Could not load illustrations: ${e}`);
        }
    }

    const getOne = async (id: string): Promise<IIllustration|void> => {
        try {
            const illustration = await getIllustrationUtil(id);
            if (!illustration) throw new Error(`Illustration is empty.`);
            return illustration;
        } catch(e) {
            console.error(`Could not load illustration: ${e}`);
        }
    }

    const create = async (formData: INewIllustration): Promise<IIllustration|void> => {
        try {
            const createdIllustration = await createIllustrationUtil(formData);
            if (!createdIllustration) throw new Error(`Returned illustration is empty.`);
            return createdIllustration;
        }catch(e) {
            console.error(`Could not save new illustration in the database: ${e}`);
        }
    }

    const deleteIllustration = async (id: string): Promise<IIllustration|void> => {
        try {
            const deletedIllustration = await deleteIllustrationUtil(id);
            if (!deletedIllustration) throw new Error(`Returned deleted illustration is empty.`);
            return deletedIllustration;
        }catch(e) {
            console.error(`Could not delete illustration from the database: ${e}`);
        }
    }

    return {
        getAll,
        getOne,
        create,
        deleteIllustration
    }

}