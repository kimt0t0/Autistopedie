<script setup lang="ts">
import Gallery from '@/components/global/Gallery.vue';
import SearchBox from '@/components/global/SearchBox.vue';
import { useDataPagesStore } from '@/stores/datapages.store';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/16/solid';
import { computed, onBeforeMount, ref } from 'vue';

const isLoading = computed((): boolean => {
    return useDataPagesStore().allDataPages ? false : true
});

onBeforeMount(async() => {
    try {
        useDataPagesStore().getAll();
        if(!useDataPagesStore().allDataPages) setIsError(true);
    } catch (e) {
        console.error(`Data pages could not be loaded correctly`);
    }
})

const isShowSearchBox = ref<boolean>(false);
const toggleSearchBox = (): void => {
    isShowSearchBox.value = !isShowSearchBox.value;
}

const isError = ref<boolean>(false);
const setIsError = (value: boolean):void => {
    isError.value = value;
}
</script>

<template>
    <div class="classic-container">
        <HeroTitle color="primary">Recherche</HeroTitle>
        <Button :class="'search-button ' + (isShowSearchBox ? 'active' : '')" color="grey" @click="toggleSearchBox()">
            Filtres 
            <ChevronUpIcon v-if="isShowSearchBox" />
            <ChevronDownIcon v-else />
        </Button>
        <SearchBox v-if="isShowSearchBox" />
        <Loader v-if="isLoading" />
        <Gallery v-else :dataPages="useDataPagesStore().selectedDataPages" />
    </div>
</template>

<style lang="scss" scoped>
.search-button {
    > .chevron-down-icon, > .chevron-up-icon {
        padding-top: $space-s;
    }
}
</style>