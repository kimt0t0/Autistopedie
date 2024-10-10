<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth.store';
import { useModalStore } from '@/stores/modal.store';
</script>

<template>
    <nav>
            <RouterLink to="/">Accueil</RouterLink>
            <RouterLink to="/definition">C'est quoi l'autisme ?</RouterLink>
            <RouterLink to="/contribute">Je veux contribuer</RouterLink>
            <RouterLink to="/about">A Propos</RouterLink>
            <Button v-if="useAuthStore().isAuth" @click="useAuthStore().setIsAuth(false)">
                <account-off-icon></account-off-icon>
            </Button>
            <Button v-else @click="useModalStore().toggleIsShow()">
                <account-icon></account-icon>
            </Button>
        </nav>
</template>

<style lang="scss" scoped>
nav {
    display: flex;
    align-items: center;
    gap: $space-m;
    @media (max-width: $bp-m) {
        display: none;
    }
    > a {
        box-sizing: border-box;
        font-size: $font-m;
        color: $primary;
        border-bottom: 4px solid transparent;
        padding: $space-s $space-m $space-s 0;
        text-decoration: none;
        &:hover {
            border-bottom-color: $primary;
        }
    }
    a.router-link-exact-active {
        color: $secondary;
        border-bottom-color: $secondary;
    }
    > button {
        border-radius: $circle;
        width: 60px;
        height: 60px;
    }
}
</style>