<script lang="ts" setup>
import { useAuth } from '@/composables/auth.composable';
import { Category } from '@/enums/Category.enum';
import type { IDataPage } from '@/interfaces/IDataPage.interface';
import type { IUserAccountData } from '@/interfaces/IUserAccountData.interface';
import { authorsValidator, categoriesValidator, summaryValidator, titleValidator } from '@/validators/data.validator';
import { computed, onBeforeMount, reactive, ref } from 'vue';
import SuccessMessage from '../global/SuccessMessage.vue';

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
const formIsValid = computed((): boolean => {
    return (
        titleValidator(formData.title).isValid
        && categoriesValidator(formData.categories).isValid
    );
});

// Check if creation worked
const createdIsSuccess = ref<boolean>(false);
const setCreatedIsSuccess = (value: boolean): void => {
    createdIsSuccess.value = value;
}

// Handle cover illustration
const isAddIllustration = ref<boolean>(false);
const setIsAddIllustration = (value: boolean) :void => {
    isAddIllustration.value = value;
}
// Submit form
const onSubmit = (): void => {
    alert(`Enregistrement des données ...`);
    setCreatedIsSuccess(true);
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
        <Button color="success" :disabled="!formIsValid || createdIsSuccess">
            <content-save-icon></content-save-icon>
            Enregistrer
        </Button>
    </form>
    <SuccessMessage v-if="createdIsSuccess" title="Votre nouvelle page a bien été créée !">
        <RouterLink to="/page" class="button-styled-link secondary">Voir la page éditable</RouterLink>
        <Button color="shadows" @click="setIsAddIllustration(true)">Ajouter une image de couverture</Button>
    </SuccessMessage>
    <div v-if="isAddIllustration" class="illustration-form-container">
        <Button size="small" color="alert" @click="setIsAddIllustration(false)">
            <close-icon></close-icon>
        </Button>
        <IllustrationForm dataId="6706886ad50b9bcfee1e3c7f" />
    </div>
</template>

<style lang="scss" scoped>
.button-styled-category, .button-styled-link {
    @include buttonStyle();
    position: relative;
    color: $shadows;
    border-color: $shadows;
    max-width: fit-content;
    text-transform: capitalize;
    &:hover {
        background-color: $shadows;
        color: $light;
    }
    &.active {
        border-color: $success;
        background-color: $success;
        color: $light;
    }
    &.secondary {
        color: $secondary;
        border-color: $secondary;
        &:hover {
            background-color: $secondary;
            color: $light;
        }
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

.illustration-form-container {
    position: relative;
    > .close-form-button {
        position: absolute;
        top: $space-s;
        right: $space-m;
    }
}
</style>