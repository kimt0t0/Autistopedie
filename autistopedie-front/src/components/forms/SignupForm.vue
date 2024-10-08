<script setup lang="ts">
import type ISignupData from '@/interfaces/ISignupData.interface';
import { useAuthStore } from '@/stores/auth.store';
import { emailValidator, passwordValidator, roleValidator, usernameValidator } from '@/validators/auth.validator';
import { computed, reactive, ref } from 'vue';

// Get form data
const formData = reactive<ISignupData>({
    username: '',
    email: '',
    password: '',
    role: undefined,
});

// Show / hide password
const isPasswordHidden = ref<boolean>(true);

const toggleIsPasswordHidden = (): void => {
    isPasswordHidden.value = !isPasswordHidden.value;
};

// Check if form is valid
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
                    <eye-icon class="password-button-icon" v-if="isPasswordHidden"></eye-icon>
                    <eye-off-icon class="password-button-icon" v-else></eye-off-icon>
                </Button>
                <label class="input-label" for="password">password</label>
            </div>
            <ErrorMessage v-if="formData.password.length > 0" :validation="passwordValidator(formData.password)" />
        </div>
        <div class="center-content">
            <Button type="submit" color="secondary" :disabled="!formIsValid">Envoyer</Button>
        </div>
    </form>
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
    display: flex;
    flex-direction: column;
    margin-top: $space-l;
    gap: $space-l;
}

.input-group {
    display: flex;
    flex-direction: column;
    gap: $space-xxs;
}

.input-container {
    box-sizing: border-box;
    width: 280px;
    max-width: 280px;
    display: flex;
    justify-content: space-between;
    border: 3px solid $grey;
    border-radius: $radius-xs;
    position: relative;
    > label {
        text-transform: capitalize;
        position: absolute;
        top: $space-s;
        left: $space-m;
        transition: all 200ms ease-in;
    }
    > input,
    textarea {
        padding: $space-s $space-m;
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
            &.colored-dark {
                color: $grey;
            }
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
            color: $grey;
            &.colored-dark {
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