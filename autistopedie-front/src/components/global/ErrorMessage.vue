<script setup lang="ts">
import type { IValidation } from '@/interfaces/IValidation.interface';
defineProps<{
    validation: IValidation;
}>();
</script>
<template>
    <p class="error-message" v-if="!validation.isValid">
        {{ validation.errorMessage }}
    </p>
</template>

<style lang="scss" scoped>
.error-message {
    color: $alert;
    font-size: $font-xxs;
    font-weight: 600;
    text-align: justify;
    white-space: normal;
    max-width: 500px;
}
</style>
