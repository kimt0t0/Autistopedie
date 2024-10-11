<script lang="ts" setup>
defineProps<{
    color?: string;
}>();
</script>

<template>
    <div class="hero-container">
        <h2 :class="color">
            <slot></slot>
        </h2>
    </div>
</template>

<style lang="scss" scoped>
.hero-container {
    box-sizing: border-box;
    padding: $space-l 0 $space-m;
    > h2 {
        box-sizing: border-box;
        border-radius: $radius-xxs;
        width: fit-content;
        padding: $space-s $space-l $space-xxs $space-s;
        margin: 0;
        border-bottom: 8px solid transparent;
        border-bottom-color: $grey;
        position: relative;
        @include transition();
        /* colors */
        &.light {
            color: $light;
            border-bottom-color: $light;
        }
        &.dark {
            color: $dark;
            border-bottom-color: $dark;
        }
        &.primary {
            background-color: $grey;
            color: $primary;
            border-bottom-color: $primary;
        }
        &.secondary {
            color: $secondary;
            border-bottom-color: $secondary;
        }
        &.shadows {
            color: $shadows;
            border-bottom-color: $shadows;
        }
        &.success {
            color: $success;
            border-bottom-color: $success;
        }
        &.alert {
            color: $alert;
            border-bottom-color: $alert;
        }
    }
}
</style>
