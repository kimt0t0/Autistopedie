<script lang="ts" setup>
import { useAuth } from '@/composables/auth.composable';
import { Category } from '@/enums/Category.enum';
import type { IDataPage } from '@/interfaces/IDataPage.interface';
import type { IUserAccountData } from '@/interfaces/IUserAccountData.interface';
import { authorsValidator, summaryValidator, titleValidator } from '@/validators/data.validator';
import { onBeforeMount, reactive, ref } from 'vue';

// Load logged in user
const user = ref<IUserAccountData>();

onBeforeMount(async () => {
    user.value = await useAuth().getUserAuth();
});

// Reactive handling of form data
const formData = reactive<IDataPage>({
    title: "",
    authors: "",
    categories: [],
    dataAuthor: user.value
});

// Handle categories selection
const toggleCategory = (category: Category) => {
    const index = formData.categories.indexOf(category);
    if (index > -1) {
        formData.categories.splice(index, 1);
    } else {
        formData.categories.push(category);
    }
}

// Create categories list from enum
const availableCategories = Object.values(Category);

// Validate form

// Submit form
const onSubmit = (): void => {
    alert(`Enregistrement des données: ${formData.toString()}`);
}
</script>
<template>
    <form @submit.prevent="onSubmit()">
        <!-- Title -->
        <div class="input-group">
            <div :class="'input-container' + (formData.title.length > 0 ? ' has-value' : '')">
                <input
                    type="text"
                    class="text-input"
                    id="title"
                    name="title"
                    minlength="3"
                    maxlength="80"
                    v-model="formData.title"
                    required
                />
                <label class="input-label" for="title">Titre *</label>
            </div>
            <ErrorMessage v-if="formData.title.length > 0" :validation="titleValidator(formData.title)" />
        </div>
        <!-- Summary -->
        <div class="input-group">
            <div :class="'input-container textarea' + (formData.summary && formData.summary.length > 0 ? ' has-value' : '')">
                <textarea
                    id="summary"
                    name="summary"
                    maxlength="500"
                    v-model="formData.summary"  />
                <label class="input-label" for="summary">Résumé</label>
            </div>
            <ErrorMessage v-if="formData.summary && formData.summary.length > 0" :validation="summaryValidator(formData.summary)" />
        </div>
        <!-- Authors -->
        <div class="input-group">
            <div :class="'input-container' + (formData.authors && formData.authors.length > 0 ? ' has-value' : '')">
                <input
                    type="text"
                    class="text-input"
                    id="authors"
                    name="authors"
                    maxlength="500"
                    v-model="formData.authors"  />
                <label class="input-label" for="authors">Auteur·ice·s</label>
            </div>
            <ErrorMessage v-if="formData.authors && formData.authors.length > 0" :validation="authorsValidator(formData.authors)" />
        </div>
        <!-- Categories (mandatory) -->
        <div>
            <h4>Catégorie(s) *</h4>
            <div class="horizontal-display">
                <div :class="'button-styled-category' + (formData.categories.includes(category) ? ' active' : '')" v-for="(category, index) in availableCategories">
                <input 
                    :key="index"
                    type="checkbox"
                    :id="category"
                    :value="category"
                    v-model="formData.categories"
                    />
                    <label :for="category">{{ category }}</label>
                </div>
            </div>
        </div>
        <!-- Illustration -->
        <!-- Contents -->
        <div>
            <h4>Contenu *</h4>
            <QuillEditor v-model="formData.contents" theme="snow" toolbar="full" placeholder="Ajoutez vos contenus ici" :readOnly="false" :magicPasteLinks="true" />
        </div>
        <Button color="success">
            <content-save-icon></content-save-icon>
            Enregistrer
        </Button>
    </form>
</template>

<style lang="scss" scoped>
.button-styled-category {
    @include buttonStyle();
    position: relative;
    color: $shadows;
    border-color: $shadows;
    max-width: fit-content;
    &:hover, &.active {
        background-color: $shadows;
        color: $light;
    }
    > input {
        cursor: pointer;
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
    }
}

h4 {
    margin: $space-s 0;
    color: $shadows;
}
</style>