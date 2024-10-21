<script lang="ts" setup>
import router from '@/router';
import { useAuthStore } from '@/stores/auth.store';
import { useModalStore } from '@/stores/modal.store';
import { ChevronUpIcon, Cog6ToothIcon, EllipsisVerticalIcon, UserIcon } from '@heroicons/vue/16/solid';
import { ref } from 'vue';

const showNav = ref<boolean>(false);
const toggleNav = (): void => {
    showNav.value = !showNav.value;
}

const isShowUserMenu = ref<boolean>(false);
const setIsShowUserMenu = (value: boolean): void => {
    isShowUserMenu.value = value;
}

const onDisconnect = (): void => {
    setIsShowUserMenu(false);
    useAuthStore().resetAuth();
    router.push('/');
}
</script>

<template>
    <div class="mobile-nav-container">
        <Button v-if="!useAuthStore().userAuth" @click="useModalStore().toggleIsShow()">
            <UserIcon />
        </Button>
        <div v-else class="user-menu-container">
            <Button class="active" v-if="isShowUserMenu" @click="setIsShowUserMenu(false)">
                <ChevronUpIcon />
            </Button>
            <Button v-else @click="setIsShowUserMenu(true)">
                <Cog6ToothIcon />
            </Button>
            <div class="user-menu-mobile" v-if="isShowUserMenu">
                <RouterLink @click="setIsShowUserMenu(false)" to="/mon-compte">Tableau de bord</RouterLink>
                <Button color="grey" @click="onDisconnect()">
                    Déconnexion
                </Button>
            </div>
        </div>
        <Button color="secondary" @click="toggleNav">
            <EllipsisVerticalIcon />
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
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: $space-m;
    position: relative;
    @media (min-width: $bp-m) {
        display: none;
    }
}
nav, .user-menu-mobile {
    @include menuStyle();
}
</style>