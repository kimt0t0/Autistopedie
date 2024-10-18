<script lang="ts" setup>
import { useIllustration } from '@/composables/illustration.composable';
import type { IIllustration } from '@/interfaces/IIllustration.interface';
import type { INewIllustration } from '@/interfaces/INewIllustration.interface';
import { formatImageUrlUtil } from '@/utils/formatting.util';
import defaultIllustration from '@images/default-illustration.jpg';
import { computed, reactive, ref } from 'vue';
import SuccessMessage from '../global/SuccessMessage.vue';

// API URL
const apiUrl: string = import.meta.env.VITE_API_URL;

// get data page id from parent component
const props = defineProps<{
    dataId: string;
    illustration?: IIllustration;
    isEdit?: boolean; // use true for edit mode
}>();

// current illustration
const previewIllustration = ref<string>(props.illustration ? apiUrl + '/' + formatImageUrlUtil(props.illustration.filepath) : defaultIllustration);

// reactive form data
const formData = reactive<INewIllustration>({
    dataId: props.dataId,
    illustration: null,
});

// handle illustration change in form
const onFileChange = (event: Event): void => {
    formData.illustration = (event.target as HTMLInputElement).files?.[0] || null;
    URL.revokeObjectURL(previewIllustration.value);
    if (formData.illustration) previewIllustration.value = URL.createObjectURL(formData.illustration);
    else formData.illustration = null;
};

const resetFile = (): void => {
    previewIllustration.value = props.illustration ? apiUrl + '/' + formatImageUrlUtil(props.illustration.filepath) : defaultIllustration;
    formData.illustration = null;
};

// validate form
const formIsValid = computed((): boolean => {
    return (formData.illustration && formData.dataId) ? true : false;
});

// check if success creation
const createdIsSuccess = ref<boolean>(false);
const setCreatedIsSuccess = (value: boolean): void => {
    createdIsSuccess.value = value;
};
const createdIsError = ref<boolean>(false);
const setCreatedIsError = (value: boolean): void => {
    createdIsError.value = value;
};

// check if success deletion
const deletedIsSuccess = ref<boolean>(false);
const setDeletedIsSuccess = (value: boolean): void => {
    deletedIsSuccess.value = value;
};
const deletedIsError = ref<boolean>(false);
const setDeletedIsError = (value: boolean): void => {
    deletedIsError.value = value;
};

// submit form
const onSubmit = async () => {
    try {
        const createdIllustration = await useIllustration().create(formData);
        if (!createdIllustration) throw new Error('Created illustration returned is empty.');
        setCreatedIsSuccess(true);
    } catch (e) {
        console.error(`Illustration could not be saved due to error: ${e}`);
        setCreatedIsError(true);
        setTimeout(() => setCreatedIsError(false), 3000);
    }
};

// delete
const onDelete = async () => {
    try {
        if(props.illustration) {
            const deletedIllustration = await useIllustration().deleteIllustration(props.illustration?._id);
            if (!deletedIllustration) throw new Error('Deleted illustration returned is empty.');
            previewIllustration.value = defaultIllustration;
            setDeletedIsSuccess(true);
        }
    } catch (e) {
        console.error(`Illustration could not be deleted due to error: ${e}`);
        setDeletedIsError(true);
        setTimeout(() => setDeletedIsError(false), 3000);
    }
    
};
</script>

<template>
    <form @submit.prevent="onSubmit()">
        <img :src="previewIllustration" alt="Current illustration" />
        <label>{{ isEdit ? "Modifier l'" : 'Ajouter une' }} illustration de couverture:</label>
        <div class="horizontal-display">
            <Button color="secondary" class="select-button">
                <input
                    type="file"
                    id="illustration"
                    name="illustration"
                    accept="image/png, image/jpeg, image/jpg, image/wepb, image/gif"
                    @change="onFileChange"
                />
                Charger une image
            </Button>
            <Button v-if="isEdit" type="button" color="alert" @click="onDelete()"> Supprimer l'image existante </Button>
            <Button type="button" class="cancel-button" size="small" color="alert" @click="resetFile()">Annuler</Button>
        </div>
        <Button color="success" :disabled="!formIsValid">
            <content-save-icon></content-save-icon>
            Enregistrer
        </Button>
    </form>
    <SuccessMessage
        v-if="createdIsSuccess || deletedIsSuccess"
        :title="createdIsSuccess ? 'L\'illustration a bien été ajoutée !' : 'L\'illustration a bien été supprimée !'"
    >
        <RouterLink :to="'/page/' + dataId" class="button-styled-link secondary">Voir la page</RouterLink>
        <RouterLink to="/" class="button-styled-link">Retourner à l'accueil</RouterLink>
        <RouterLink to="/mon-compte" class="button-styled-link">Retourner à mon tableau de bord</RouterLink>
    </SuccessMessage>
    <p class="alert-message" v-if="createdIsError || deletedIsError">
        {{
            createdIsError
                ? "L'image n'a pas pu être enregistrée correctement. Si le problème persiste, veuillez contacter le support s'il-vous plaît."
                : "L'image n'a pas pu être supprimée correctement. Si le problème persiste, veuillez contacter le support s'il-vous plaît."
        }}
    </p>
</template>

<style lang="scss" scoped>
form {
    border: 3px solid $primary;
    border-radius: $radius-xs;
    @include classicPadding();
}

img {
    width: 200px;
    max-height: 300px;
    border-radius: $radius-xs;
    @include classicShadow();
}

label {
    color: darken($primary, 20);
    font-weight: 600;
}

.select-button {
    position: relative;
    > input {
        width: 100%;
        height: 100%;
        position: absolute;
        opacity: 0;
        cursor: pointer;
    }
}

.button-styled-link {
    @include buttonStyle();
    position: relative;
    color: $shadows;
    border-color: $shadows;
    max-width: fit-content;
    text-transform: capitalize;
    &:hover {
        background-color: $shadows;
        color: $light;
    }
    &.secondary {
        color: $secondary;
        border-color: $secondary;
        &:hover {
            background-color: $secondary;
            color: $light;
        }
    }
}
</style>
