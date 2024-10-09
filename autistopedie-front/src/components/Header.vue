<script lang="ts" setup></script>

<template>
    <header>
        <h1>AP</h1>
        <nav>
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/about">About</RouterLink>
        </nav>
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
}

nav {
    display: flex;
    align-items: center;
    > a {
        color: $light;
        font-size: $font-m;
    }
}
</style>
