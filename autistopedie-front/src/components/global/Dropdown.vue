<script lang="ts" setup>
import { ref } from 'vue';

defineProps<{
    title: string
}>();

const isShow = ref<boolean>(false);
const toggleIsShow = (): void => {
    isShow.value = !isShow.value;
}
</script>

<template>
    <div class="dropdown">
        <Button :class="'button-dropdown ' + (isShow ? 'active': '')" @click="toggleIsShow()">
            {{  title }}
            <chevron-up-icon v-if="isShow"></chevron-up-icon>
            <chevron-down-icon v-else></chevron-down-icon>
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
}

.button-dropdown {
    width: 100%;
    justify-content: space-between;
    >.material-design-icon {
        padding-top: $space-xs;
    }
}

.dropdown-contents {
    @include classicPadding();
    font-size: $font-m;
    position: relative;
}
</style>