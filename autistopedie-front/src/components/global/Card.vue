<script lang="ts" setup>
import type { IDataPage } from '@/interfaces/IDataPage.interface';

defineProps<{
    datapage: IDataPage
}>();
</script>

<template>
    <RouterLink :to="'/page/' + datapage._id">
    <div class="card">
        <h3>{{ datapage.title }}</h3>
    </div>
    </RouterLink>
</template>