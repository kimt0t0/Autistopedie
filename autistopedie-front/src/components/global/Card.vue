<script lang="ts" setup>
import { config } from '@/config/config';
import type { IDataPage } from '@/interfaces/IDataPage.interface';
import { formatDateUtil, formatImageUrlUtil } from '@/utils/formatting.util';
import defaultIllustration from '@images/default-illustration.jpg';
import { computed, ref } from 'vue';

// get API URL from config file
const { apiUrl } = config;

// Get datapage from page
const props = defineProps<{
    datapage: IDataPage
}>();

// Format datapage data to display
const createdAt = ref<Date | null>(props.datapage.createdAt ? new Date(props.datapage.createdAt) : null);
const updatedAt = ref<Date | null>(props.datapage.updatedAt ? new Date(props.datapage.updatedAt) : null);
const illustrationPath = ref<string>(
    props.datapage.illustration?.filepath ? 
    apiUrl + '/' + formatImageUrlUtil(props.datapage.illustration.filepath)
    : defaultIllustration
)

const createdDateFormatted = computed(() => formatDateUtil(createdAt.value));
const updatedDateFormatted = computed(() => formatDateUtil(updatedAt.value));
</script>

<template>
    <RouterLink :to="'/page/' + datapage._id">
    <div class="card">
        <img :src="illustrationPath" :alt="'Cover illustration of ' + datapage.title" class="cover-illustration" crossorigin="anonymous" />
        <div class="presentation">
            <h3>{{ datapage.title }}</h3>
            <p><strong>Ajouté par:</strong> {{ datapage.dataAuthor?.username }}</p>
            <p v-if="createdDateFormatted"><strong>Le:</strong> {{ createdDateFormatted }}</p>
            <p v-if="updatedDateFormatted"><strong>Modifié le:</strong> {{ updatedDateFormatted }}</p>
        </div>
        <p v-if="datapage.summary && datapage.summary.length > 0" class="summary"><div :class="'summary-content ' + (datapage.summary.length > 120 ? 'scroller':'' )">{{ datapage.summary }}</div></p>
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
    @media (max-width: $bp-s) {
        width: auto;
    }
    > .cover-illustration {
        width: 100%;
        min-height: 180px;
        position: absolute;
        z-index: 0;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        filter: grayscale(100%);
        @include transition();
        @media (max-width: $bp-xs) {
            min-height: 100%;
        }
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
        width: 240px;
        position: absolute;
        z-index: 3;
        left: -240px;
        box-sizing: border-box;
        height: 100px;
        background-color: $secondary;
        border-radius: $radius-xs;
        color: $light;
        white-space: wrap;
        overflow: hidden;
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
                > .summary-content.scroller {
                    animation: scroller;
                    animation-duration: 4s;
                    animation-delay: 0;
                    animation-iteration-count: infinite;
                    animation-timing-function: ease-in-out;
                }
            }
        }
    }
}

@keyframes scroller {
    10% {
        transform: translateY(0px);
    }
    100% {
        transform: translateY(-80px);
    }
}
</style>