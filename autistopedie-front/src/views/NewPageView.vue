<script lang="ts" setup>
import { reactive } from 'vue';

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
            <h2>New Data Page</h2>
            <form @submit.prevent="onSubmitDataPage()">
                <QuillEditor v-model="formData.quillData" theme="snow" toolbar="full" placeholder="Ajoutez vos contenus ici" :readOnly="false" :magicPasteLinks="true" />
                <Button>Enregistrer</Button>
            </form>
        </div>
        
    </main>
</template>
