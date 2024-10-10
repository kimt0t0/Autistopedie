<script setup lang="ts">
import { RouterView } from 'vue-router';
import Footer from './components/layout/Footer.vue';
import Header from './components/layout/Header.vue';
import Modal from './components/layout/Modal.vue';
import { useModalStore } from './stores/modal.store';
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
