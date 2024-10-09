<script setup lang="ts">
import { RouterView } from 'vue-router';
import Header from './components/Header.vue';
</script>

<template>
    <Header />
    <RouterView />
</template>

<style lang="scss">
@import '@/assets/styles/theme.scss';
</style>
