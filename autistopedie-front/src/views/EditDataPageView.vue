<script lang="ts" setup>
import { useDataPage } from '@/composables/datapage.composable';
import { Role } from '@/enums/Role.enum';
import type { IDataPage } from '@/interfaces/IDataPage.interface';
import { useAuthStore } from '@/stores/auth.store';
import { formatDateUtil } from '@/utils/formatting.util';
import { BookOpenIcon } from '@heroicons/vue/16/solid';
import defaultIllustration from '@images/default-illustration.jpg';
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';

// Get id from route params
const route = useRoute();
const dataId: string = route.params.id.toString();

// Data storage references
const datapage = ref<IDataPage | void>();
const createdDateFormatted = ref<string | null>();
const updatedDateFormatted = ref<string | null>();
// Cover illustration reference
const coverIllustrationPath = ref<string>(defaultIllustration);

// Load data from api
onBeforeMount(async () => {
    datapage.value = await useDataPage().getOne(dataId);
    if (datapage.value) {
        // format dates
        // createdDateFormatted.value = formatDateUtil(new Date(datapage.value?.createdAt));
        if (datapage.value.updatedAt) updatedDateFormatted.value = formatDateUtil(new Date(datapage.value?.updatedAt));
        if (datapage.value?.illustration) {
            coverIllustrationPath.value = datapage.value.illustration.filepath;
        }
    }
});
</script>

<template>
    <PageGuard v-if="!useAuthStore().userAuth|| useAuthStore().decodedToken?.role != (Role.ADMIN || Role.CONTRIBUTOR)" />

    <div v-else class="classic-container edit-datapage-container">
        <HeroTitle color="primary">Mode édition</HeroTitle>
        <RouterLink :to="'/page/' + dataId" class="page-link">
            <BookOpenIcon /> Voir la page
        </RouterLink>
        <!-- Illustration -->
        <Dropdown title="Illustration de couverture" color="shadows">
            <IllustrationForm
                v-if="datapage?._id"
                :dataId="datapage?._id"
                :isEdit="true"
                :illustration="datapage?.illustration ? datapage.illustration : null"
            />
        </Dropdown>

        <DataForm v-if="datapage" :datapage="datapage" />
    </div>
</template>

<style lang="scss" scoped>
.edit-datapage-container {
    position: relative;
    > .page-link {
        position: fixed;
        z-index: 1;
        top: 200px;
        right: $space-xl;
        @include buttonStyle();
        background-color: $light;
        color: $secondary;
        border-color: $secondary;
        &:hover {
            background-color: $secondary;
            color: $light;
        }
    }
}

</style>