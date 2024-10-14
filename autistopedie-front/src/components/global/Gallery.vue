<script lang="ts" setup>
import type { IDataPage } from '@/interfaces/IDataPage.interface';

defineProps<{
    dataPages?: IDataPage[];
}>();
</script>

<template>
    <div class="gallery-container">
        <p v-for="(page, index) in dataPages" :key="index">{{ page.title }}</p>
    </div>
</template>