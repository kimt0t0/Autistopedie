<script lang="ts" setup>
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/16/solid';
import { ref } from 'vue';

defineProps<{
    title: string
    color?: string
    thin?: boolean
}>();

const isShow = ref<boolean>(false);
const toggleIsShow = (): void => {
    isShow.value = !isShow.value;
}
</script>

<template>
    <div :class="'dropdown ' + color + (thin ? ' thin' : '')">
        <Button type="button" :class="'button-dropdown ' + (isShow ? 'active': '')" :color="color" @click="toggleIsShow()">
            {{  title }}
            <ChevronUpIcon v-if="isShow" />
            <ChevronDownIcon v-else />
        </Button>
        <div class="dropdown-contents" v-if="isShow">
            <slot></slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.dropdown {
    box-sizing: border-box;
    border: 3px solid $primary;
    border-radius: $radius-xs;
    &.light {
        border-color: $light;
    }
    &.dark {
        border-color: $dark;
    }
    &.grey {
        border-color: $grey;
    }
    &.secondary {
        border-color: $secondary;
    }
    &.shadows {
        border-color: $shadows;
    }
    &.success {
        border-color: $success;
    }
    &.alert {
        border-color: $alert;
    }
    &.thin {
        border: 1px solid transparent;
    }
}

.button-dropdown {
    width: 100%;
    justify-content: space-between;
}

.dropdown-contents {
    @include classicPadding();
    font-size: $font-m;
    position: relative;
    color: $dark;
}
</style>