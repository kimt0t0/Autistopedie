<script setup lang="ts">
import EditUserForm from '@/components/forms/EditUserForm.vue';
import Dropdown from '@/components/global/Dropdown.vue';
import Gallery from '@/components/global/Gallery.vue';
import HeroTitle from '@/components/global/HeroTitle.vue';
import { useAuth } from '@/composables/auth.composable';
import { Role } from '@/enums/Role.enum';
import type { IUserAccountData } from '@/interfaces/IUserAccountData.interface';
import { onBeforeMount, ref } from 'vue';

const user = ref<IUserAccountData | undefined>();
const formattedRole = ref<string>('Lecteur·ice');

onBeforeMount(async () => {
    user.value = await useAuth().getUserAuth();
    switch (user.value?.role) {
        case (Role.ADMIN):
            formattedRole.value = "Administrateur·ice";
            break;
        case (Role.CONTRIBUTOR):
            formattedRole.value = "Contributeur·ice";
            break;
        case (Role.READER):
            formattedRole.value = "Lecteur·ice";
            break;
        case (Role.GHOST):
            formattedRole.value = "Testeur·euse";
            break;
        default:
            formattedRole.value = "Erreur, veuillez contacter le support !";
            break;
    }
});

const isEdit = ref<boolean>(false);
const toggleIsEdit = (): void => {
    isEdit.value = !isEdit.value;
}
</script>

<template>
    <section class="classic-container dashboard-container">
        <HeroTitle>Bienvenue <span class="success" v-if="user">{{ user?.username }} !</span></HeroTitle>
        <Dropdown title="Mes informations" color="success">
            <Button class="toggle-form-button" :color="isEdit ? 'success' : 'secondary'" shape="round" @click="toggleIsEdit()">
                <glasses-icon v-if="isEdit"></glasses-icon>
                <pencil-icon v-else></pencil-icon>
            </Button>
            <EditUserForm v-if="isEdit" />
            <div v-else class="contents">
                <p><strong>Pseudonyme:</strong> {{ user?.username }}</p>
                <p><strong>Rôle:</strong> {{ formattedRole }}</p>
            </div>
        </Dropdown>
        <Dropdown title="Mes pages" color="success">
            <Gallery />
        </Dropdown>
        <div class="center-content">
            <RouterLink class="new-page-link" to="/creation">
                <plus-icon></plus-icon>
                Créer une nouvelle page
            </RouterLink>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.dashboard-container {
    display: flex;
    flex-direction: column;
    gap: $space-l;
}

.success {
    color: $success;
}

.toggle-form-button {
    position: absolute;
    top: $space-s;
    right: $space-m;
}

.new-page-link {
    @include buttonStyle;
    border-color: $secondary;
    color: $secondary;
    width: fit-content;
    &:hover, &:focus {
        background-color: $secondary;
        color: $light;
    }
}
</style>
