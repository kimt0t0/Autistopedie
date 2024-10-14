<script lang="ts" setup>
import router from '@/router';
import { useAuthStore } from '@/stores/auth.store';
import { useModalStore } from '@/stores/modal.store';
import { ref } from 'vue';

const isShowUserMenu = ref<boolean>(false);
const setIsShowUserMenu = (value: boolean): void => {
    isShowUserMenu.value = !isShowUserMenu.value;
}

const onDisconnect = (): void => {
    setIsShowUserMenu(false);
    useAuthStore().resetAuth();
    router.push('/');
}
</script>

<template>
    <nav>
            <RouterLink to="/">Accueil</RouterLink>
            <RouterLink to="/definition">C'est quoi l'autisme ?</RouterLink>
            <RouterLink to="/contribuer">Je veux contribuer</RouterLink>
            <RouterLink to="/a-propos">A Propos</RouterLink>
            <!-- User auth modal button -->
            <Button shape="round" v-if="!useAuthStore().userAuth" @click="useModalStore().toggleIsShow()">
                <account-icon></account-icon>
            </Button>
            <!-- User connected menu button -->
            <div v-else class="user-menu-container">
                <Button class="active" shape="round" v-if="isShowUserMenu" @click="setIsShowUserMenu(true)">
                    <cog-off-icon></cog-off-icon>
                </Button>
                <Button shape="round" v-else @click="setIsShowUserMenu(false)">
                    <cog-icon></cog-icon>
                </Button>
                <div class="user-menu" v-if="isShowUserMenu">
                    <RouterLink @click="setIsShowUserMenu(false)" to="/mon-compte">Tableau de bord</RouterLink>
                    <Button color="grey" shape="round" @click="onDisconnect()">
                        Déconnexion
                    </Button>
                </div>
            </div>
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
        @media (max-width: $bp-xl) {
            font-size: $font-s;
        }
    }
    a.router-link-exact-active {
        color: $secondary;
        border-bottom-color: $secondary;
    }
}

.user-menu-container {
    position: relative;
    > .user-menu {
        @include menuStyle();
    }
}
</style>