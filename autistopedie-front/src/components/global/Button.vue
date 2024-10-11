<script lang="ts" setup>
defineProps<{
    color?: string; //use existing color variable name
    size?: string; // use small / medium / large
    disabled?: boolean;
}>()
</script>

<template>
    <button :class="color + ' ' + size" :disabled="disabled">
        <slot></slot>
    </button>
</template>

<style lang="scss" scoped>
button {
    @include buttonStyle();
    /* Colors */
    &.light {
        border-color: $light;
        color: $light;
        &:hover {
            background-color: $light;
            color: $grey;
        }
    }
    &.dark {
        border-color: $dark;
        color: $dark;
        &:hover {
            background-color: $dark;
            color: $primary;
        }
    }
    &.grey {
        border-color: $grey;
        color: $grey;
        &:hover {
            background-color: $grey;
            color: $light;
        }
    }
    &.secondary {
        border-color: $secondary;
        color: $secondary;
        &:hover {
            background-color: $secondary;
            color: $light;
        }
    }
    &.shadows {
        border-color: $shadows;
        color: $shadows;
        &:hover {
            background-color: $shadows;
            color: $light;
        }
    }
    &.success {
        border-color: $success;
        color: $success;
        &:hover {
            background-color: $success;
            color: $light;
        }
    }
    &.alert {
        border-color: $alert;
        color: $alert;
        &:hover {
            background-color: $alert;
            color: $light;
        }
    }
    /* Sizes */
    &.small {
        font-size: $font-xs;
        padding: $space-xs $space-s;
    }
    /* Disabled */
}
</style>