<script lang="ts" setup>
import type { IDataPage } from '@/interfaces/IDataPage.interface';
import { computed, ref } from 'vue';

const props = defineProps<{
    datapage: IDataPage
}>();

const createdAt = ref<Date | null>(props.datapage.createdAt ? new Date(props.datapage.createdAt) : null);
const updatedAt = ref<Date | null>(props.datapage.updatedAt ? new Date(props.datapage.updatedAt) : null);

const formatDate = (date: Date | null): string | null => {
    if (!date) return null;

    return new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
};

const createdDateFormatted = computed(() => formatDate(createdAt.value));
const updatedDateFormatted = computed(() => formatDate(updatedAt.value));
</script>

<template>
    <RouterLink :to="'/page/' + datapage._id">
    <div class="card">
        <img v-if="datapage.illustration?.filepath" :src="datapage.illustration?.filepath" :alt="'Cover illustration of ' + datapage.title" class="cover-illustration" />
        <img v-else src="@images/default-illustration.jpg" alt="Cover default illustration with the words: Accept Understand Empower" class="cover-illustration" />
        <div class="presentation">
            <h3>{{ datapage.title }}</h3>
            <p><strong>Ajouté par:</strong> {{ datapage.dataAuthor?.username }}</p>
            <p v-if="createdDateFormatted"><strong>Le:</strong> {{ createdDateFormatted }}</p>
            <p v-if="updatedDateFormatted"><strong>Modifié le:</strong> {{ updatedDateFormatted }}</p>
        </div>
        <p v-if="datapage.summary && datapage.summary.length > 0" class="summary">{{ datapage.summary }}</p>
    </div>
    </RouterLink>
</template>

<style lang="scss">
.card {
    box-sizing: border-box;
    width: 240px;
    height: 300px;
    border: 3px solid $primary;
    border-radius: $radius-m;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    > .cover-illustration {
        width: 100%;
        position: absolute;
        z-index: 0;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        filter: grayscale(100%);
        @include transition();
    }
    > .presentation {
        height: 100px;
        position: relative;
        z-index: 1;
        @include classicPadding();
        background-color: rgba(0, 0, 0, 0.4);
        color: $light;
        > h3 {
            color: $light;
            @include transition();
        }
        > p {
            font-size: $font-xs;
            margin: $space-xs 0;
            @include transition();
        }
    }
    > .summary {
        position: absolute;
        z-index: 3;
        left: -240px;
        box-sizing: border-box;
        height: 100px;
        background-color: $secondary;
        border-radius: $radius-xs;
        color: $light;
        @include classicPadding;
        @include transition();
    }
}

a {
    &:hover, &:focus {
        >.card {
            border-color: $secondary;
            >.cover-illustration {
                filter: initial;
            }
            >.presentation {
                > h3, > p {
                    color: $secondary;
                }
            }
            > .summary {
                transform: translateX(230px);
            }
        }
    }
}
</style>