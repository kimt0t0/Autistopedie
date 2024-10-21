<script setup lang="ts">
import { useAuth } from '@/composables/auth.composable';
import type ILoginData from '@/interfaces/ILoginData.interface';
import router from '@/router';
import { useAuthStore } from '@/stores/auth.store';
import { useModalStore } from '@/stores/modal.store';
import { passwordValidator, usernameValidator } from '@/validators/auth.validator';
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/16/solid';
import { computed, reactive, ref } from 'vue';

// Form data
const formData = reactive<ILoginData>({
    username: '',
    password: ''
});

// Show / hide password
const isPasswordHidden = ref<boolean>(true);
const toggleIsPasswordHidden = ():void => {
    isPasswordHidden.value = !isPasswordHidden.value;
}

// Show / hide success form submission
const isShowSuccess = ref<boolean>(false);
const setIsShowSuccess = (value: boolean): void => {
    isShowSuccess.value = !isShowSuccess.value;
}

// Validate form
const formIsValid = computed(() => {
    return (
        usernameValidator(formData.username).isValid &&
        passwordValidator(formData.password).isValid
    )
});

// Submit form
const onSubmit = async () => {
    if (!formIsValid) {
        throw new Error(
            `Attempted to submit invalid form. Form validation results are as follow:
            ${usernameValidator(formData.username)},
            ${passwordValidator(formData.password)}`
        );
    }
    useAuth().login(formData);
    if (useAuthStore().userAuth) setIsShowSuccess(true);
}

// Actions after login
const onClickVisit = ():void => {
    useModalStore().toggleIsShow();
    router.push('/');
}

const onClickAccount = ():void => {
    useModalStore().toggleIsShow();
    router.push('/mon-compte');
}
</script>

<template>
    <h2>Connexion</h2>
    <button class="toggle-authform-button" @click="useAuthStore().setOwnsAccount(false)">Je n'ai pas encore de compte</button>

    <form @submit.prevent="onSubmit">
        <!-- Username -->
        <div class="input-group">
            <div :class="'input-container' + (formData.username.length > 0 ? ' has-value' : '')">
                <input
                    type="text"
                    class="text-input"
                    id="username"
                    name="username"
                    minlength="3"
                    maxlength="50"
                    v-model="formData.username"
                    required
                />
                <label class="input-label" for="username">username</label>
            </div>
            <ErrorMessage v-if="formData.username.length > 0" :validation="usernameValidator(formData.username)" />
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

    <SuccessMessage title="Connexion réussie !" v-if="useAuthStore().userAuth">
        <Button color="secondary" @click="onClickVisit()">Parcourir</Button>
        <Button color="success" @click="onClickAccount()">Mon compte</Button>
    </SuccessMessage>
</template>

<style lang="scss" scoped>
.toggle-authform-button {
    @include linkStyle();
}

h2 {
    margin: 0;
}

form {
    box-sizing: border-box;
    min-width: 500px;
    width: 500px;
    display: flex;
    flex-direction: column;
    margin: $space-l 0 $space-m;
    gap: $space-l;
    @media (max-width: $bp-s) {
        min-width: initial;
        width: initial;
    }
}

.input-group {
    display: flex;
    flex-direction: column;
    gap: $space-xxs;
}

.input-container {
    box-sizing: border-box;
    min-width: 280px;
    width: 280px;
    max-width: 280px;
    height: 45px;
    display: flex;
    justify-content: space-between;
    border: 3px solid $shadows;
    border-radius: $radius-xs;
    position: relative;
    @media (max-width: $bp-xxs) {
        min-width: 90%;
        width: 90%;
        max-width: 90%;
        }
    > label {
        color: $shadows;
        text-transform: capitalize;
        position: absolute;
        top: $space-s;
        left: $space-m;
        transition: all 200ms ease-in;
    }
    > input,
    textarea {
        width: 100%;
        @include classicPadding();
        background-color: transparent;
        font-weight: 600;
        border: transparent;
        @media (max-width: $bp-xs) {
            width: 100%;
            min-width: initial;
            max-width: initial;
        }
        &:focus {
            color: $grey;
            + label {
                transform: translate(-$space-m, -$space-l);
                font-size: $font-xs;
                font-weight: 200;
            }
        }
    }
    > textarea {
        min-height: $space-xxxl;
    }
    &.has-value {
        > input,
        > textarea {
            color: $shadows;
            &.colored-dark {
                color: $shadows;
            }
            &:focus {
                color: $grey;
            }
        }
        > label,
        > input:focus + label {
            transform: translate(-$space-m, -$space-l);
            font-size: $font-xs;
            font-weight: 200;
        }
    }
}

.button-style-link {
    @include buttonStyle();
    width: fit-content;
}
</style>
