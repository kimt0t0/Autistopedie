<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth.store';
import { useModalStore } from '@/stores/modal.store';
import LoginForm from '../forms/LoginForm.vue';
import SignupForm from '../forms/SignupForm.vue';
</script>

<template>
    <div class="modal-container">
        <div class="modal">
            <div class="headband">
                <Button shape="round" @click="useModalStore().toggleIsShow()" color="grey">
                    <door-closed-cancel-icon></door-closed-cancel-icon>
                </Button>
            </div>
            <div class="contents">
                <LoginForm v-if="useAuthStore().ownsAccount" />
                <SignupForm v-else />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.modal {
    box-sizing: border-box;
    padding: $space-s;
    border-radius: $radius-xs;
    background-color: $light;
    border: 2px solid $primary;
    min-width: 400px;
    @media (max-width: $bp-xs) {
        min-width: initial;
    }
}

.headband {
    display: flex;
    justify-content: flex-end;
}
</style>
