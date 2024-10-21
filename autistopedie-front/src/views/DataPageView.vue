<script lang="ts" setup>
import HeroTitle from '@/components/global/HeroTitle.vue';
import { useDataPage } from '@/composables/datapage.composable';
import { config } from '@/config/config';
import { Role } from '@/enums/Role.enum';
import type { IDataPage } from '@/interfaces/IDataPage.interface';
import { useAuthStore } from '@/stores/auth.store';
import { formatDateUtil, formatImageUrlUtil } from '@/utils/formatting.util';
import { PencilIcon, TrashIcon, XMarkIcon } from '@heroicons/vue/16/solid';
import defaultIllustation from '@images/default-illustration.jpg';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import { onBeforeMount, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

// get API URL from config file
const { apiUrl } = config;

// Get id from route params
const route = useRoute();
const dataId: string = route.params.id.toString();

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
        const parsedContents = JSON.parse(datapage.value.contents.toString());
        const converter = new QuillDeltaToHtmlConverter(parsedContents.ops);
        htmlContents.value = converter.convert();
    }
    if (datapage.value?.illustration) {
        coverIllustrationPath.value = apiUrl + '/' + formatImageUrlUtil(datapage.value.illustration.filepath);
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

// Delete and return to homepage
const isDeleteAction = ref<boolean>(false);
const setIsDeleteAction = (value: boolean): void => {
    isDeleteAction.value = value;
}
</script>

<template>
    <section class="classic-container">
        <div class="alerts" v-if="isDeleteAction">
            <DeleteDataForm :dataId="dataId" />
            <Button type="button" color="alert" @click="setIsDeleteAction(false)">
                <XMarkIcon /> Annuler
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
        <div class="actions-container" v-if="useAuthStore().decodedToken?.role == (Role.ADMIN || Role.CONTRIBUTOR)">
            <RouterLink :to="'/edition/' + dataId" class="button-styled-link secondary">
                <PencilIcon /> Éditer
            </RouterLink>
            <Button type="button" color="alert" @click="setIsDeleteAction(true)">
                <TrashIcon /> Supprimer
            </Button>
        </div>
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
    @include classicShadow();
    >p {
        margin: 0;
        position: relative;
    }
}

.actions-container {
    position: fixed;
    z-index: 1;
    background-color: $grey;
    padding: $space-s;
    border-radius: $radius-xs;
    top: 220px;
    right: $space-l;
    display: flex;
    flex-direction: column;
    gap: $space-m;
    > .button-styled-link {
        @include buttonStyle();
        color: $secondary;
        border-color: $secondary;
        &:hover {
            background-color: $secondary;
        }
    }
    > button, a {
        width: 160px;
        &:hover {
            color: $grey;
        }
    }
    @media (max-width: $bp-m) {
        position: initial;
        top: initial;
        background-color: transparent;
        flex-direction: row;
        justify-content: flex-end;
        flex-wrap: wrap;
        margin-top: $space-l;
        padding: $space-m $space-xs $space-s;
        border-radius: 0;
        border-top: 3px solid $secondary;
    }
    @media (max-width: $bp-s) {
        justify-content: flex-start;
        > a, > button {
            width: 100%;
            justify-content: center;
        }
    }
}

.datapage-contents {
    padding: $space-l 0;
}

.alerts {
    position: fixed;
    z-index: 3;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: $primary;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > button {
        position: absolute;
        top: $space-xl;
        right: $space-xl;
    }
}
</style>