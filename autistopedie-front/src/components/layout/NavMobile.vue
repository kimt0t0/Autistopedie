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
                <RouterLink to="/contribute">Je veux contribuer</RouterLink>
                <RouterLink to="/about">A Propos</RouterLink>
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
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 300px;
    background-color: $primary;
    border: 2px solid $grey;
    border-radius: $radius-xs;
    box-shadow: 1px 2px 4px 1px $dark;
    position: absolute;
    top: 80px;
    right: 0;
    z-index: 2;
    @media (max-width: $bp-xxs) {
        width: 80vw;
    }
    > a {
        box-sizing: border-box;
        font-size: $font-m;
        color: $grey;
        border-bottom: 2px solid $grey;
        padding: $space-s $space-m;
        text-decoration: none;
        &:hover {
            background-color: $grey;
            color: $primary;
        }
    }
    a.router-link-exact-active {
        color: $light;
        background-color: $secondary;
    }
    > button {
        border-radius: $circle;
        width: 60px;
        height: 60px;
    }
}
</style>