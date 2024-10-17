<script lang="ts" setup>
import HeroTitle from '@/components/global/HeroTitle.vue';
import { useDataPage } from '@/composables/datapage.composable';
import { Role } from '@/enums/Role.enum';
import type { IDataPage } from '@/interfaces/IDataPage.interface';
import { useAuthStore } from '@/stores/auth.store';
import { formatDateUtil } from '@/utils/formatting.util';
import defaultIllustation from '@images/default-illustration.jpg';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import { onBeforeMount, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

// Get id from route params
const route = useRoute();
const dataId = route.params.id;

// Data storage references
const datapage = ref<IDataPage | void>();
const createdDateFormatted = ref<string|null>();
const updatedDateFormatted = ref<string|null>();
const htmlContents = ref<string|null>();
// Cover illustration
const coverIllustrationPath = ref<string>(defaultIllustation);

// Load data from api
onBeforeMount(async () => {
    datapage.value = await useDataPage().getOne(dataId);
    if (datapage.value?.contents) {
        const parsedContents = JSON.parse(datapage.value.contents);
        const converter = new QuillDeltaToHtmlConverter(parsedContents.ops);
        htmlContents.value = converter.convert();
    }
    if (datapage.value?.illustration) {
        coverIllustrationPath.value = datapage.value.illustration.filepath;
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
        <div class="actions-container" v-if="useAuthStore().decodedToken?.role == (Role.ADMIN || Role.CONTRIBUTOR)">
            <Button type="button" color="secondary">
                Éditer <pencil-icon></pencil-icon>
            </Button>
            <Button type="button" color="alert">
                Supprimer <delete-icon></delete-icon>
            </Button>
        </div>
        <div class="datapage-head" :style="{ backgroundImage: `url(${coverIllustrationPath})` }">
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
    padding: $space-xl $space-l $space-xxl;
    position: relative;
    background-size: cover;
    background-position: center;
    background-clip: border-box;
    border-radius: $radius-xxs;
    box-shadow: 1px 1px 5px 1px $shadows;
    >p {
        margin: 0;
        position: relative;
    }
}

.actions-container {
    position: fixed;
    top: 220px;
    right: $space-l;
    display: flex;
    flex-direction: column;
    gap: $space-m;
    > button {
        width: 160px;
    }
}

.datapage-contents {
    padding: $space-l 0;
}
</style>