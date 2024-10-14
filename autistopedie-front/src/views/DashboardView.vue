<script setup lang="ts">
import HeroTitle from '@/components/global/HeroTitle.vue';
</script>

<template>
    <div class="classic-container">
        <HeroTitle>Bienvenue <span class="success">Pseudo !</span></HeroTitle>
        <Dropdown title="Mes informations">
            <Button color="secondary" shape="round">
                <pencil-icon></pencil-icon>
            </Button>
            Informations utilisateur
            <!-- add an optional form with edit button -->
        </Dropdown>
    </div>
</template>

<style lang="scss" scoped>
.success {
    color: $success;
}
</style>
