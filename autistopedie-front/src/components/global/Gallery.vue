<script lang="ts" setup>
import type { IDataPage } from '@/interfaces/IDataPage.interface';

defineProps<{
    dataPages?: IDataPage[]|IDataPage | void;
}>();
</script>

<template>
    <div class="horizontal-display gallery-container">
        <Card v-for="(page, index) in dataPages" :key="index" :datapage="page" />
    </div>
</template>

<style lang="scss" scoped>
.gallery-container {
    padding: $space-xl 0;
    gap: $space-l;
    flex-wrap: wrap;
    @media (max-width: $bp-s) {
        flex-direction: column;
        justify-content: flex-start;
    }
}
</style>