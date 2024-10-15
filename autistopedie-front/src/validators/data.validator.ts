import { Category } from "@/enums/Category.enum";
import type { IValidation } from "@/interfaces/IValidation.interface";

export const titleValidator = (input: string): IValidation => {
    if (!input || input.length < 3) {
        return {
            isValid: false,
            errorMessage: 'Titre invalide: 3 caractères minimum.'
        }
    }
    const re = /^[A-Za-z0-9\s]{3,255}$/;
    return {
        isValid: re.test(input),
        errorMessage:
            'Titre invalide. Il peut contenir 3 à 80 caractères, qui peuvent inclure lettres, nombres, tirets du haut ou du bas, apostrophes, espaces et astérixes.',
    };
}

export const summaryValidator = (input: string): IValidation => {
    const re = /^[A-Za-z0-9\s]{0,500}$/;
    return {
        isValid: re.test(input),
        errorMessage:
            'Titre invalide. Il peut contenir 3 à 80 caractères, qui peuvent inclure lettres, nombres, tirets du haut ou du bas, apostrophes, espaces et astérixes.',
    };
}

export const authorsValidator = (input: string): IValidation => {
    const re = /^[A-Za-z0-9\s]{0,500}$/;
    return {
        isValid: re.test(input),
        errorMessage:
            'Titre invalide. Il peut contenir 3 à 80 caractères, qui peuvent inclure lettres, nombres, tirets du haut ou du bas, apostrophes, espaces et astérixes.',
    };
}

export const categoriesValidator = (input: Category[]): IValidation => {
    if (!input || input.length <= 0) return {
        isValid: false,
        errorMessage: "Vous devez sélectionner au moins une catégorie."
    }
    input.forEach(category => {
        if (!Object.values(Category).includes(category)) return {
            isValid: false,
            errorMessage: "Vous avez ajouté une catégorie inexistante dans l'application. Si vous souhaitez créer une nouvelle catégorie, veuillez contacter l'administrateur du site s'il-vous-plaît."
        }
    });
    return {
        isValid: true
    }
}