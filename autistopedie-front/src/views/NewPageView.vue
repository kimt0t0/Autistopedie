<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';
</script>

<template>
    <main>
        <PageGuard v-if="!useAuthStore().userAuth" />
        
        <div class="classic-container" v-else>
            <HeroTitle>Création</HeroTitle>
            <DataForm />
        </div>
        
    </main>
</template>
