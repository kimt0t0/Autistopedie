<script setup lang="ts">
import EditUserForm from '@/components/forms/EditUserForm.vue';
import HeroTitle from '@/components/global/HeroTitle.vue';
import { ref } from 'vue';

const isEdit = ref<boolean>(false);
const toggleIsEdit = (): void => {
    isEdit.value = !isEdit.value;
}
</script>

<template>
    <div class="classic-container">
        <HeroTitle>Bienvenue <span class="success">Pseudo !</span></HeroTitle>
        <Dropdown title="Mes informations">
            <Button class="toggle-form-button" color="secondary" shape="round" @click="toggleIsEdit()">
                <pencil-icon></pencil-icon>
            </Button>
            <EditUserForm v-if="isEdit" />
            <div v-else class="contents">
                Informations utilisateur
            </div>
        </Dropdown>
    </div>
</template>

<style lang="scss" scoped>
.success {
    color: $success;
}

.toggle-form-button {
    position: absolute;
    top: $space-s;
    right: $space-m;
}
</style>
