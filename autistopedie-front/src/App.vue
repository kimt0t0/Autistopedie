<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import Footer from './components/layout/Footer.vue';
import Header from './components/layout/Header.vue';
import Modal from './components/layout/Modal.vue';
import { useAuthStore } from './stores/auth.store';
import { useModalStore } from './stores/modal.store';

onMounted(() => {
    useAuthStore().getAuth();
});
</script>

<template>
    <Modal v-if="useModalStore().isShow" />
    <Header />
    <main>
        <RouterView />
    </main>
    <Footer />
</template>

<style lang="scss">
@import '@/assets/styles/theme.scss';
</style>
