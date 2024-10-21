<script setup lang="ts">
import { Role } from '@/enums/Role.enum';
import type ISignupData from '@/interfaces/ISignupData.interface';
import router from '@/router';
import { useAuthStore } from '@/stores/auth.store';
import { useModalStore } from '@/stores/modal.store';
import { emailValidator, passwordValidator, roleValidator, usernameValidator } from '@/validators/auth.validator';
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/16/solid';
import { computed, reactive, ref } from 'vue';

// Get form data
const formData = reactive<ISignupData>({
    username: '',
    email: '',
    password: '',
    role: Role.READER,
});

// Show / hide password
const isPasswordHidden = ref<boolean>(true);

const toggleIsPasswordHidden = (): void => {
    isPasswordHidden.value = !isPasswordHidden.value;
};

// Validate form
const formIsValid = computed((): boolean => {
    return (
        usernameValidator(formData.username).isValid &&
        emailValidator(formData.email).isValid &&
        passwordValidator(formData.password).isValid &&
        roleValidator(formData.role).isValid
    );
});

// Submit form
const onSubmit = () => {
    if (!formIsValid) {
        throw new Error(
            `Attempted to submit invalid form. Form validation results are as follow: 
            ${usernameValidator(formData.username)}, 
            ${emailValidator(formData.email)}, 
            ${passwordValidator(formData.password)},
            ${roleValidator(formData.role)}`
        );
    }
    // todo: submit signup
    // submit login
    // display validation message with buttons to close modale and/or go to dashboard
    alert(`User submitted with data: ${formData.username}, ${formData.email}, ${formData.password}, ${formData.role}`);
}

// Go to user dashboard
const onClickAccount = ():void => {
    useModalStore().toggleIsShow();
    router.push('/dashboard');
}
</script>

<template>
    <h2>Inscription</h2>

    <button class="toggle-authform-button" @click="useAuthStore().setOwnsAccount(true)">
        Je possède déjà un compte
    </button>

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

        <!-- Email -->
        <div class="input-group">
            <div :class="'input-container' + (formData.email.length > 0 ? ' has-value' : '')">
                <input type="text" class="text-input" id="email" name="email" minlength="7" maxlength="150" v-model="formData.email" required />
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

    <SuccessMessage title="Inscription réussie !" v-if="useAuthStore().userAuth">
        <Button color="secondary" @click="useModalStore().toggleIsShow()">Parcourir</Button>
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
    margin-top: $space-l;
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
</style>