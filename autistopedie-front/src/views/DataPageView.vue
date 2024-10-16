<script lang="ts" setup>
import HeroTitle from '@/components/global/HeroTitle.vue';
import { useDataPage } from '@/composables/datapage.composable';
import type { IDataPage } from '@/interfaces/IDataPage.interface';
import { formatDateUtil } from '@/utils/formatting.util';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import { onBeforeMount, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

// Get id from route params
const route = useRoute();
const dataId = route.params.id;

const datapage = ref<IDataPage | void>();
const createdDateFormatted = ref<string|null>();
const updatedDateFormatted = ref<string|null>();
const htmlContents = ref<string|null>();

// Load data from api
onBeforeMount(async () => {
    datapage.value = await useDataPage().getOne(dataId);
    if (datapage.value?.contents) {
        const parsedContents = JSON.parse(datapage.value.contents);
        const converter = new QuillDeltaToHtmlConverter(parsedContents.ops);
        htmlContents.value = converter.convert();
    }
});

// Select and format create and update dates from loaded data
watch(
    () => datapage.value?.createdAt,
    (newContents) => {
        if (newContents && datapage.value?.createdAt) {
            createdDateFormatted.value = formatDateUtil(new Date(datapage.value?.createdAt));
            if (datapage.value.updatedAt) updatedDateFormatted.value = formatDateUtil(new Date(datapage.value?.updatedAt));
        }
    },
);
</script>

<template>
    <section class="classic-container">
        <Button type="button" color="secondary">
            Éditer <pencil-icon></pencil-icon>
        </Button>
        <div class="datapage-head">
            <img v-if="datapage.illustration?.filepath" :src="datapage.illustration?.filepath" :alt="'Cover illustration of ' + datapage.title" class="cover-illustration" />
            <img v-else src="@images/default-illustration.jpg" alt="Cover default illustration with the words: Accept Understand Empower" class="cover-illustration" />
            <HeroTitle color="grey">{{ datapage?.title }}</HeroTitle>
            <p><strong>Ajouté par:</strong> {{ datapage?.dataAuthor?.username }}</p>
            <p><strong>Auteur.ice.s de la fiction:</strong> {{ datapage?.authors }}</p>
            <p><strong>Le:</strong> {{ createdDateFormatted }}</p>
            <p><strong>Dernière mise-à-jour:</strong> {{ updatedDateFormatted }}</p>
        </div>
        <div v-if="datapage?.contents" class="datapage-contents">
            <div v-if="htmlContents" v-html="htmlContents"></div>
            <p v-else>Désolé, la page ne parvient pas à formatter votre contenu correctement. Si le problème persiste veuillez contacter le support s'il-vous-plaît.</p>
        </div>
        <p v-else>Cette page n'a pas encore de contenu.</p>
    </section>
</template>

<style lang="scss" scoped>
.datapage-head {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: $space-xs;
    padding: $space-m $space-s;
    position: relative;
    >p {
        margin: 0;
        position: relative;
    }
    > .cover-illustration {
        position: absolute;
        z-index: 0;
        width: 100vw;
        top: 0;
        right: 0;
        left: 0;
    }
}

button {
    position: fixed;
    top: 220px;
    right: $space-xl;
}

.datapage-contents {
    padding: $space-l 0;
}
</style>