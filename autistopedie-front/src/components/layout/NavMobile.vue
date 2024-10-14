<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth.store';
import { useModalStore } from '@/stores/modal.store';
import { ref } from 'vue';

const showNav = ref<boolean>(false);
const toggleNav = (): void => {
    showNav.value = !showNav.value;
}
</script>

<template>
    <div class="mobile-nav-container">
        <Button v-if="useAuthStore().userAuth" @click="useAuthStore().resetAuth()">
            <account-off-icon></account-off-icon>
        </Button>
        <Button v-else @click="useModalStore().toggleIsShow()">
            <account-icon></account-icon>
        </Button>
        <Button color="secondary" @click="toggleNav">
            <dots-vertical-icon></dots-vertical-icon>
        </Button>
        <nav v-if="showNav">
                <RouterLink to="/">Accueil</RouterLink>
                <RouterLink to="/definition">C'est quoi l'autisme ?</RouterLink>
                <RouterLink to="/contribuer">Je veux contribuer</RouterLink>
                <RouterLink to="/a-propos">A Propos</RouterLink>
            </nav>
    </div>
</template>

<style lang="scss" scoped>
.mobile-nav-container {
    display: flex;
    gap: $space-m;
    align-items: center;
    position: relative;
    @media (min-width: $bp-m) {
        display: none;
    }
}
nav {
    @include menuStyle();
}
</style>