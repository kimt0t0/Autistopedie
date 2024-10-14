<script lang="ts" setup>
import { reactive, ref } from 'vue';

const isReadOnly = ref<boolean>(true);
const setIsReadOnly = (value: boolean): void => {
    // check user auth role, do only if contributor or admin
    isReadOnly.value = value;
}

const formData = reactive<{
    quillData: object
}>(
    {
        quillData: {}
    }
);

const onSubmitDataPage = (): void => {
    alert(`Enregistrement des données: ${formData.quillData}`);
}
</script>

<template>
    <main>

        <div class="classic-container">
            <h2>Data Page</h2>
            <Button type="button" color="secondary" v-if="isReadOnly" @click="setIsReadOnly(false)">Éditer</Button>
            <Button  type="button" color="secondary" v-else @click="setIsReadOnly(true)">Lire</Button>
            <form @submit.prevent="onSubmitDataPage()">
                <QuillEditor v-if="isReadOnly" v-model="formData.quillData" theme="snow" toolbar="full" placeholder="Ajoutez vos contenus ici" :readOnly="true" :magicPasteLinks="true" />
                <QuillEditor v-else v-model="formData.quillData" theme="snow" toolbar="full" placeholder="Ajoutez vos contenus ici" :readOnly="false" :magicPasteLinks="true" />
                <Button v-if="!isReadOnly">Enregistrer</Button>
            </form>
        </div>
        
    </main>
</template>
