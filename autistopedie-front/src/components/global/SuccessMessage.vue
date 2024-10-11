
<script lang="ts" setup>
defineProps<{
    title?: string;
}>();
</script>

<template>
    <div class="success-message-container">
        <h4>{{ title }}</h4>
        <div class="cta-box">
            <slot></slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .success-message-container {
        box-sizing: border-box;
        padding: $space-m;
        background-color: lighten($success, 35);
        border: 3px solid $success;
        border-radius: $radius-xs;
        color: $success;
        font-size: $font-xs;
        font-weight: 800;
        > .cta-box {
            margin-top: $space-m;
            display: flex;
            gap: $space-s;
            flex-wrap: wrap;
        }
    }
</style>