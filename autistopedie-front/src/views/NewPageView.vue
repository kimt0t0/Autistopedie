<script setup lang="ts">
import { Role } from '@/enums/Role.enum';
import { useAuthStore } from '@/stores/auth.store';
</script>

<template>
    <main>
        <PageGuard v-if="!useAuthStore().userAuth || useAuthStore().decodedToken?.role != (Role.ADMIN || Role.CONTRIBUTOR)" />

        <div class="classic-container" v-else>
            <HeroTitle>Création</HeroTitle>
            <DataForm />
        </div>
        
    </main>
</template>
