<script lang="ts" setup>
import type { Category } from '@/enums/Category.enum';
import type { Filter } from '@/enums/Filter.enum';
import { computed, reactive } from 'vue';

    // Todo: fetch data only when a category is selected, or find a way to avoid slow loading (no illustration on mobile and reduce the number of data selected ?)
    // Select default filters ?

    // Reactive filter selection
    const selectedFilter = reactive<Filter[]>([]);

    const selectedCategories = reactive<Category[]>([]);

    const searchText = reactive<{input: string}>({
        input: ''
    });

    // Reactive sorting
    const filteredData = computed(() => {
        // execute filters when selected
    })

</script>

<template>
    <!-- Categories -->
    <div class="searchbox">
        <div class="filter-container">
            <h3>Par catégories</h3>
        </div>
        <!-- Alphabetical -->
        <div class="filter-container">
            <h3>Par ordre alphabétique</h3>
        </div>
        <!-- Created at -->
        <div class="filter-container">
            <h3>Par date</h3>
        </div>
        <!-- Text: input + toggle button for title / content -->
        <div class="filter-container">
            <h3>Par titre / texte</h3>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.searchbox {
    box-sizing: border-box;
    margin: $space-xs 0;
    padding: 0 $space-m;
    background-color: $primary;
    border: 3px solid $grey;
    border-radius: $radius-xxs;
    display: flex;
    gap: $space-xl;
    flex-wrap: wrap;
    @media (max-width: $bp-m) {
        flex-direction: column;
    }
}
</style>