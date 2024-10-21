<script setup lang="ts">
import Gallery from '@/components/global/Gallery.vue';
import SearchBox from '@/components/global/SearchBox.vue';
import { useDataPage } from '@/composables/datapage.composable';
import type { IDataPage } from '@/interfaces/IDataPage.interface';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/16/solid';
import { onBeforeMount, ref } from 'vue';

const selectedPages = ref<IDataPage[]|void|undefined>();
const allDataPages = ref<IDataPage[]|void|undefined>();

onBeforeMount(async() => {
    try {
        allDataPages.value = await useDataPage().getAll();
        if(!allDataPages) setIsError(true);
        selectedPages.value = allDataPages.value;
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
        <Gallery :dataPages="selectedPages" />
    </div>
</template>

<style lang="scss" scoped>
.search-button {
    > .chevron-down-icon, > .chevron-up-icon {
        padding-top: $space-s;
    }
}
</style>