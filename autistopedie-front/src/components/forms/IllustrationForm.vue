<script lang="ts" setup>
import type { UUID } from 'crypto';
import { computed, reactive, ref } from 'vue';
import SuccessMessage from '../global/SuccessMessage.vue';

// get data page id from parent component
const props = defineProps<{
    dataId: UUID;
}>();

// reactive form data
const formData = reactive<{
    dataId: UUID;
    illustration: File | null;
}>({
    dataId: props.dataId,
    illustration: null,
});

// handle illustration change in form
const onFileChange = (event: Event): void => {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length > 0) formData.illustration = files[0];
    else formData.illustration = null;
};

const resetFile = ():void => {
    formData.illustration = null;
}

// validate form
const formIsValid = computed((): boolean => {
    return formData.illustration != undefined && formData.dataId;
});

// check if success
const createdIsSuccess = ref<boolean>(false);
const setCreatedIsSuccess = (value: boolean): void => {
    createdIsSuccess.value = value;
}

// submit form
const onSubmit = () => {
    alert("Ajout de l'illustration");
    setCreatedIsSuccess(true);
};
</script>

<template>
    <form @submit.prevent="onSubmit()">
        <label>Ajouter une illustration de couverture:</label>
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
            <Button type="button" class="cancel-button" size="small" color="alert" @click="resetFile()">Annuler</Button>
        </div>
        <p>{{ formData }}</p>
        <Button color="success" :disabled="!formIsValid">
            <content-save-icon></content-save-icon>
            Enregistrer
        </Button>
    </form>
    <SuccessMessage title="L'illustration a bien été ajoutée !">
        <RouterLink to="/page" class="button-styled-link secondary">Voir la page éditable</RouterLink>
        <RouterLink to="/" class="button-styled-link">Retourner à l'accueil</RouterLink>
        <RouterLink to="/mon-compte" class="button-styled-link">Retourner à mon tableau de bord</RouterLink>
    </SuccessMessage>
</template>

<style lang="scss" scoped>
form {
    border: 3px solid $primary;
    border-radius: $radius-xs;
    @include classicPadding();
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
