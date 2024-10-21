<script lang="ts" setup>
import { useDataPage } from '@/composables/datapage.composable';
import type { ISecurityCheck } from '@/interfaces/ISecurityCheck.interface';
import router from '@/router';
import { emailValidator, passwordValidator } from '@/validators/auth.validator';
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/16/solid';
import { computed, reactive, ref } from 'vue';

// Get id from parent component
const props = defineProps<{
    dataId: string;
}>();

// Check if deletion worked
const isDeleted = ref<boolean>(false);
const setIsDeleted = (value: boolean): void => {
    isDeleted.value = value;
}

const isError = ref<boolean>(false);
const setIsError = (value: boolean): void => {
    isError.value = value;
}

// Show/hide password
const isPasswordHidden = ref<boolean>(true);
const toggleIsPasswordHidden = (): void => {
    isPasswordHidden.value = !isPasswordHidden.value;
}

// Form data
const formData = reactive<ISecurityCheck>({
    email: '',
    password: ''
});

// Validate form
const formIsValid = computed((): boolean => {
    return (
        emailValidator(formData.email).isValid
        && passwordValidator(formData.password).isValid
    )
})

const onSubmit = async (): Promise<void> => {
    try {
        if (!props.dataId) throw new Error ('No id detected for datapage to delete.');
        if (!formIsValid) throw new Error('Credentials are invalid.');
        const deletedPage = await useDataPage().deletePage(props.dataId, formData);
        if (deletedPage) {
            setIsDeleted(true);
            setTimeout(() => router.push('/'), 5000);
        }
    } catch (e) {
        console.error(`Data Page with id ${props.dataId} could not be deleted due to error: ${e}`);
        setIsError(true);
        setTimeout(() => setIsError(false), 5000);
    }
}
</script>

<template>
    <form @submit.prevent="onSubmit">
        <div class="form-head">
            <h3 class="alert">Supprimer</h3>
            <p>Pour des raisons de sécurité, nous avons besoin de ces identifiants avant de valider la suppression d'une page.</p>
        </div>
        <!-- Username -->
        <div class="input-group">
            <div :class="'input-container' + (formData.email.length > 0 ? ' has-value' : '')">
                <input
                    type="text"
                    class="text-input"
                    id="email"
                    name="email"
                    minlength="3"
                    maxlength="50"
                    v-model="formData.email"
                    required
                />
                <label class="input-label" for="email">email</label>
            </div>
            <ErrorMessage v-if="formData.email.length > 0" :validation="emailValidator(formData.email)" />
        </div>

        <!-- Password -->
        <div class="input-group">
            <div :class="'input-container password-container' + (formData.password.length > 0 ? ' has-value' : '')">
                <input
                    :type="isPasswordHidden ? 'password' : 'text'"
                    class="text-input password-input"
                    id="password"
                    name="password"
                    minlength="8"
                    maxlength="255"
                    v-model="formData.password"
                    required
                />
                <Button type="button" size="small" color="grey" @click="toggleIsPasswordHidden()">
                    <EyeIcon class="password-button-icon" v-if="isPasswordHidden" />
                    <EyeSlashIcon class="password-button-icon" v-else />
                </Button>
                <label class="input-label" for="password">password</label>
            </div>
            <ErrorMessage v-if="formData.password.length > 0" :validation="passwordValidator(formData.password)" />
        </div>

        <!-- Submit button -->
        <div class="center-content">
            <Button type="submit" color="secondary" :disabled="!formIsValid">Envoyer</Button>
        </div>
    </form>
    
    <SuccessMessage v-if="isDeleted" title="La page a bien été supprimée" />
    <p class="alert-message" v-if="isError">La page n'a pas pu être supprimée. Vérifiez que vous avez entré votre e-mail et votre mot-de-passe correctement. Si l'erreur persiste, veuillez contacter l'administrateur du site s'il-vous-plaît.</p>
</template>

<style lang="scss" scoped>
form {
    background-color:lighten($shadows, 35);
    border: 3px solid $shadows;
    border-radius: $radius-xs;
    @include classicPadding();
    > .form-head {
        margin: $space-m 0 0;
        > h3 {
            color: $alert;
        }
        > p {
            color: darken($shadows, 10);
            font-size: $font-xs;
            font-weight: 600;
        }
    }
}
</style>