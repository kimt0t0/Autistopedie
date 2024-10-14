import { Role } from '@/enums/Role.enum';
import type { IUserAccountData } from '@/interfaces/IUserAccountData.interface';
import type { IValidation } from '@/interfaces/IValidation.interface';

export const validateInput = (input: string, validator: 'username' | 'email' | 'password'): IValidation => {
    switch (validator) {
        case 'username':
            return usernameValidator(input);
        case 'email':
            return emailValidator(input);
        case 'password':
            return passwordValidator(input);
        default:
            throw new Error(
                `Validator ${validator} could not be found. Please make sure you are using a validator among the following: username, email, password.`,
            );
    }
};

export const usernameValidator = (input: string): IValidation => {
    const re = /^[A-Za-z\d'_\-*]{3,50}$/;

    return {
        isValid: re.test(input),
        errorMessage:
            'Pseudonyme invalide. Il peut contenir 3 à 80 caractères, qui peuvent inclure lettres, nombres, tirets du haut ou du bas, apostrophes et astérixes.',
    };
};

export const emailValidator = (input: string): IValidation => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return {
        isValid: re.test(input),
        errorMessage: 'E-mail invalide',
    };
};

export const passwordValidator = (input: string): IValidation => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[^\s]{8,255}$/;
    return {
        isValid: re.test(input),
        errorMessage:
            'Mot-de-passe invalide. Il doit contenir 8 à 256 caractères comprenant des chiffres, des caractères spéciaux et des lettres minuscules et majuscules.',
    };
};

export const roleValidator = (input?: Role): IValidation => {
    if (!input || input == Role.GHOST || input == Role.READER) 
        return { isValid: true }
    else if (input == Role.CONTRIBUTOR || input == Role.ADMIN) {
        return {
            isValid: false,
            errorMessage: "Vous ne pouvez pas vous attribuer ce rôle vous-même. Si vous souhaiter contribuer, veuillez contacter l'administrateur du site après la création de votre compte en cliquant sur l'onglet Contribuer."
        }
    }
    return {
        isValid: false,
        errorMessage: "Ce rôle n'existe pas. Veuillez sélectionner un rôle dans la liste."
    }
}

export const editRoleValidator = (user: IUserAccountData, input?: Role): IValidation => {
    if (!input) return {isValid: true}
    else if (user.role != Role.ADMIN) {
        return {
            isValid: false,
            errorMessage: "Vous ne pouvez pas modifier le rôle d'un utilisateur si vous n'êtes pas un administrateur. Si vous souhaitez obtenir un nouveau rôle, veuillez contacter le support s'il-vous-plaît."
        }
    }
    return {
        isValid: true
    }
}
