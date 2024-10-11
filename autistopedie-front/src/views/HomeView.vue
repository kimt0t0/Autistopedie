<script setup lang="ts">
import SearchBox from '@/components/global/SearchBox.vue';
import { ref } from 'vue';

const isShowSearchBox = ref<boolean>(false);
const toggleSearchBox = (): void => {
    isShowSearchBox.value = !isShowSearchBox.value;
}
</script>

<template>
    <div class="classic-container">
        <HeroTitle color="primary">Recherche</HeroTitle>
        <Button class="search-button" color="grey" @click="toggleSearchBox()">
            Filtres 
            <chevron-up-icon v-if="isShowSearchBox"></chevron-up-icon>
            <chevron-down-icon v-else></chevron-down-icon>
        </Button>
        <SearchBox v-if="isShowSearchBox" />
    </div>
</template>

<style lang="scss" scoped>
.search-button {
    > .chevron-down-icon, > .chevron-up-icon {
        padding-top: $space-s;
    }
}
</style>