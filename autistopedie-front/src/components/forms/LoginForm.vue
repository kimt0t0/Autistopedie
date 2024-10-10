<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';
</script>

<template>
    <h2>Connexion</h2>
    <button class="toggle-authform-button" @click="useAuthStore().setOwnsAccount(false)">
        Je n'ai pas encore de compte
    </button>
</template>

<style lang="scss" scoped>
.toggle-authform-button {
    @include linkStyle();
}
</style>