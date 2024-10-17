<script lang="ts" setup>
import { useDataPage } from '@/composables/datapage.composable';
import type { IDataPage } from '@/interfaces/IDataPage.interface';
import type { IEditDataPage } from '@/interfaces/IEditDataPage.interface';
import { formatDateUtil } from '@/utils/formatting.util';
import defaultIllustration from '@images/default-illustration.jpg';
import { QuillEditor } from '@vueup/vue-quill';
import type { UUID } from 'crypto';
import { onBeforeMount, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';


    // Get id from route params
    const route = useRoute();
    const dataId: UUID = route.params.id;

    // Data storage references
    const datapage = ref<IDataPage | void>();
    const createdDateFormatted = ref<string|null>();
    const updatedDateFormatted = ref<string|null>();
    // Cover illustration reference
    const coverIllustrationPath = ref<string>(defaultIllustration);
    // Quill Editor Reference to bind contents
    const quillRef = ref<InstanceType<typeof QuillEditor> | null>(null);

    // Bind data and form
    const formData = reactive<IEditDataPage>({
        title: '',
        summary: '',
        contents: '',
        authors: '',
        categories: []
    });

    // Load data from api
    onBeforeMount(async () => {
        datapage.value = await useDataPage().getOne(dataId);
        if (datapage.value) {
            // format dates
            // createdDateFormatted.value = formatDateUtil(new Date(datapage.value?.createdAt));
            if (datapage.value.updatedAt) updatedDateFormatted.value = formatDateUtil(new Date(datapage.value?.updatedAt));
            // bind loaded data to form
            formData.title = datapage.value.title;
            formData.authors = datapage.value.authors;
            formData.summary = datapage.value.summary;
            formData.categories = datapage.value.categories;
            formData.contents = datapage.value.contents;
        }
        if (datapage.value?.illustration) {
            coverIllustrationPath.value = datapage.value.illustration.filepath;
        }
    });
</script>


<template>
    <div class="classic-container">
        <HeroTitle color="primary">Mode édition</HeroTitle>
        <Dropdown title="Illustration de couverture" color="grey">
            <IllustrationForm v-if="datapage?._id" :dataId="datapage?._id" :isEdit="true" :illustrationPath="datapage?.illustration ? datapage.illustration : null" />
        </Dropdown>
    </div>
</template>