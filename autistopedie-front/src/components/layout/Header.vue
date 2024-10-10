<script setup lang="ts">
import NavDesktop from './NavDesktop.vue';
import NavMobile from './NavMobile.vue';
</script>

<template>
    <header>
        <h1>AP</h1>
        <NavDesktop />
        <NavMobile />
    </header>
</template>

<style lang="scss" scoped>
header {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    padding: $space-s $space-xl;
    background-color: $grey;
    color: $light;
    border-bottom: 2px solid $grey;
    box-shadow: 0 0 8px 4px $grey;
    
    @media (max-width: $bp-xxs) {
        flex-direction: column;
    }
}
</style>
