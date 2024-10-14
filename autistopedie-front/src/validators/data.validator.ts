import type { IValidation } from "@/interfaces/IValidation.interface";

export const titleValidator = (input: string): IValidation => {
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