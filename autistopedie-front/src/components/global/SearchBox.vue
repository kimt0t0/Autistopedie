<script lang="ts" setup>
import { Category } from '@/enums/Category.enum';
import type { IFilter } from '@/interfaces/IFilter.interface';
import { useDataPagesStore } from '@/stores/datapages.store';
import { ArrowDownRightIcon, ArrowUpRightIcon } from '@heroicons/vue/16/solid';
import { reactive } from 'vue';
import Dropdown from './Dropdown.vue';

// Todo: fetch data only when a category is selected, or find a way to avoid slow loading (no illustration on mobile and reduce the number of data selected ?)
// Select default filters ?

// Reactive filter selection
const selectedFilters = reactive<IFilter>({
    alphaAZ: false,
    alphaZA: false,
    createdAsc: false,
    createdDesc: false,
    categories: [],
    title: '',
    contents: '',
});

// Create categories list from enum
const availableCategories = Object.values(Category);

// Check filters compatibility
const checkAlphaFilters = (): void => {
    if (selectedFilters.alphaAZ) selectedFilters.alphaAZ = false;
    if (selectedFilters.alphaZA) selectedFilters.alphaZA = false;
};

const checkCreatedFilters = (): void => {
    if (selectedFilters.createdAsc) selectedFilters.createdAsc = false;
    if (selectedFilters.createdDesc) selectedFilters.createdDesc = false;
}

// Filter data on form submission
const onFilterSelectedData = () => {
    useDataPagesStore().filterSelectedData(selectedFilters);
};
</script>

<template>
    <!-- Categories -->
    <form class="searchform" @submit.prevent="onFilterSelectedData()">
        <div class="contents">

            <!-- Alphabetical -->
            <div class="filter-container">
                <h3>Par ordre alphabétique:</h3>
                <div :class="'button-styled-checkbox' + (selectedFilters.alphaAZ ? ' active' : '')" @click="checkAlphaFilters()">
                    <input type="checkbox" id="alphaAZ" :value="selectedFilters.alphaAZ" v-model="selectedFilters.alphaAZ" />
                    <label><ArrowUpRightIcon />A-Z</label>
                </div>
                <div :class="'button-styled-checkbox' + (selectedFilters.alphaZA ? ' active' : '')" @click="checkAlphaFilters()">
                    <input type="checkbox" id="alphaZA" :value="selectedFilters.alphaZA" v-model="selectedFilters.alphaZA" />
                    <label><ArrowDownRightIcon />Z-A</label>
                </div>
            </div>

            <!-- Created at -->
            <div class="filter-container">
                <h3>Par date de création:</h3>
                <div :class="'button-styled-checkbox' + (selectedFilters.createdAsc ? ' active' : '')" @click="checkCreatedFilters()">
                    <input type="checkbox" id="createdAsc" :value="selectedFilters.createdAsc" v-model="selectedFilters.alphaAZ" />
                    <label><ArrowUpRightIcon />Du plus ancien...</label>
                </div>
                <div :class="'button-styled-checkbox' + (selectedFilters.createdDesc ? ' active' : '')" @click="checkCreatedFilters()">
                    <input type="checkbox" id="createdDesc" :value="selectedFilters.createdDesc" v-model="selectedFilters.alphaZA" />
                    <label><ArrowDownRightIcon />Du plus récent...</label>
                </div>
            </div>

            <!-- Text: input + toggle button for title / content -->
            <div class="filter-container">
                <h3>Par titre:</h3>
                <input class="text-input" type="text" maxlength="150" id="title" v-model="selectedFilters.title"/>
            </div>

            <!-- Text: input + toggle button for title / content -->
            <div class="filter-container">
                <h3>Par contenu:</h3>
                <textarea class="contents-text-input" type="text" maxlength="255" id="contents" v-model="selectedFilters.contents"/>
            </div>
        </div>

        <!-- Categories -->
            <Dropdown title="Par catégories" color="grey" :thin="true" :small="true">
                <div class="horizontal-display">
                    <div
                        v-for="(category, index) in availableCategories"
                        :key="index"
                        :class="'button-styled-checkbox' + (selectedFilters.categories?.includes(category) ? ' active' : '')"
                    >
                        <input type="checkbox" :id="category" :value="category" v-model="selectedFilters.categories" />
                        <label>{{ category }}</label>
                    </div>
                </div>
            </Dropdown>
        <div class="submit-container">
            <Button color="success">Filtrer</Button>
        </div>
    </form>
</template>

<style lang="scss" scoped>
p {
    margin: 0;
}

.searchform {
    box-sizing: border-box;
    margin: $space-xs 0;
    @include classicPadding();
    background: linear-gradient(0.58turn, $primary 60%, lighten($secondary, 50));
    border: 3px solid $grey;
    border-radius: $radius-xxs;
    display: flex;
    flex-direction: column;
    max-width: 800px;
    overflow: hidden;
    > .contents {
        display: flex;
        flex-wrap: wrap;
        gap: $space-m $space-xl;
        @media (max-width: $bp-m) {
            flex-direction: column;
        }
    }
}

.dropdown {
    margin: $space-s 0;
    min-width: 100%;
}

.button-styled-checkbox {
    @include buttonStyle();
    position: relative;
    color: $grey;
    border-color: $grey;
    max-width: fit-content;
    text-transform: capitalize;
    &:hover {
        background-color: $grey;
        color: $light;
    }
    &.active {
        border-color: $secondary;
        background-color: $secondary;
        color: $light;
    }
    > input {
        cursor: pointer;
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
    }
    > label {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: $space-xs;
        font-weight: 600;
    }
}

.filter-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $space-m;
    > .button-styled-checkbox {
        min-width: 100%;
        display: flex;
        justify-content: center;
        font-size: $font-xs;
        font-weight: 600;
        padding: $space-s;
    }
}

.contents-text-input, .text-input {
    padding: $space-s $space-xs;
    color: $grey;
    border: 3px solid $grey;
    border-radius: $radius-xs;
    background-color: transparent;
    font-weight: 600;
}

.text-input {
    min-width: 160px;
}

.contents-text-input {
    width: 420px;
    min-height: 80px;
}

.submit-container {
    box-sizing: border-box;
    margin: -$space-m;
    @include classicPadding();
}
</style>
