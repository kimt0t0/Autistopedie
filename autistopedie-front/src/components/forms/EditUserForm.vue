<script lang="ts" setup>
import { Role } from '@/enums/Role.enum';
import type { IUserAccountData } from '@/interfaces/IUserAccountData.interface';
import { editRoleValidator, emailValidator, passwordValidator, usernameValidator } from '@/validators/auth.validator';
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/16/solid';
import { computed, reactive, ref } from 'vue';

const user: IUserAccountData = {
    username: "tonton",
    role: Role.ADMIN
}

const formData = reactive<IUserAccountData>(user);

// Show / hide password
const isPasswordHidden = ref<boolean>(true);
const toggleIsPasswordHidden = ():void => {
    isPasswordHidden.value = !isPasswordHidden.value;
}

// Show / hide new password
const isNewPasswordHidden = ref<boolean>(true);
const toggleIsNewPasswordHidden = ():void => {
    isPasswordHidden.value = !isPasswordHidden.value;
}

// Validate form
const formIsValid = computed((): boolean => {
    return (
        (formData.email ? emailValidator(formData.email).isValid : false),
        (formData.password ? passwordValidator(formData.password).isValid : false),
        (formData.username ? usernameValidator(formData.username).isValid : true),
        (formData.newEmail ? emailValidator(formData.newEmail).isValid : true),
        (formData.newPassword ? passwordValidator(formData.newPassword).isValid : true),
        (formData.role ? editRoleValidator(user, formData.role).isValid : true)
    )
})

// Show / hide success
const isSuccess = ref<boolean>(false);

// Submit form
const onSubmit = (): void => {
    if (formIsValid)
    alert('Form submitted');
    isSuccess.value = true;
}
</script>

<template>
    <form @submit.prevent="onSubmit()">
        <!-- NEW DATA -->
        <!-- New Username -->
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
                <label class="input-label" for="username">Nouveau pseudonyme</label>
            </div>
            <ErrorMessage v-if="formData.username.length > 0" :validation="usernameValidator(formData.username)" />
        </div>

        <!-- New Email -->
        <div class="input-group">
            <div :class="'input-container' + (formData.newEmail && formData.newEmail.length > 0 ? ' has-value' : '')">
                <input type="text" class="text-input" id="new-email" name="new-email" minlength="7" maxlength="150" v-model="formData.newEmail" required />
                <label class="input-label" for="new-email">nouvel email</label>
            </div>
            <ErrorMessage v-if="formData.email && formData.email.length > 0" :validation="emailValidator(formData.email)" />
        </div>

        <!-- New Password -->
        <div class="input-group">
            <div :class="'input-container password-container' + (formData.newPassword && formData.newPassword.length > 0 ? ' has-value' : '')">
                <input
                    :type="isNewPasswordHidden ? 'password' : 'text'"
                    class="text-input password-input"
                    id="password"
                    name="password"
                    minlength="8"
                    maxlength="255"
                    v-model="formData.newPassword"
                    required
                />
                <Button type="button" size="small" color="grey" @click="toggleIsNewPasswordHidden()">
                    <EyeIcon class="password-button-icon" v-if="isNewPasswordHidden" />
                    <EyeSlashIcon class="password-button-icon" v-else />
                </Button>
                <label class="input-label" for="password">Nouveau mot-de-passe</label>
            </div>
            <ErrorMessage v-if="formData.newPassword && formData.newPassword.length > 0" :validation="passwordValidator(formData.newPassword)" />
        </div>

        <!-- CHECK USER -->
        <div class="check-user">
            <h3>Identifiants pour vérification:</h3>

            <!-- Email -->
            <div class="input-group">
                <div :class="'input-container' + (formData.email && formData.email.length > 0 ? ' has-value' : '')">
                    <input type="text" class="text-input" id="email" name="email" minlength="7" maxlength="150" v-model="formData.email" required />
                    <label class="input-label" for="email">email</label>
                </div>
                <ErrorMessage v-if="formData.email && formData.email.length > 0" :validation="emailValidator(formData.email)" />
            </div>

            <!-- Password -->
            <div class="input-group">
                <div :class="'input-container password-container' + (formData.password && formData.password.length > 0 ? ' has-value' : '')">
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
                <ErrorMessage v-if="formData.password && formData.password.length > 0" :validation="passwordValidator(formData.password)" />
            </div>
        </div>

        <!-- Submit button -->
        <div class="center-content">
            <Button type="submit" color="secondary" :disabled="!formIsValid">Envoyer</Button>
        </div>

        <SuccessMessage title="Inscription réussie !" v-if="isSuccess">
            Vos informations ont bien été mises à jour !
        </SuccessMessage>

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
    border: 3px solid $grey;
    border-radius: $radius-xs;
    position: relative;
    @media (max-width: $bp-xxs) {
        min-width: 90%;
        width: 90%;
        max-width: 90%;
        }
    > label {
        color: $grey;
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
            color: $grey;
            &.colored-dark {
                color: $grey;
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

.check-user {
    width: fit-content;
    padding-top: $space-m;
    margin-top: $space-l;
    border-top: 4px solid $grey;
    display: flex;
    flex-direction: column;
    gap: $space-l;
}
</style>