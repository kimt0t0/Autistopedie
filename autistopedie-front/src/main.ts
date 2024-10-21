import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';

// Global components
import Button from './components/global/Button.vue';
import Dropdown from './components/global/Dropdown.vue';
import ErrorMessage from './components/global/ErrorMessage.vue';
import Gallery from './components/global/Gallery.vue';
import HeroTitle from './components/global/HeroTitle.vue';
import SuccessMessage from './components/global/SuccessMessage.vue';

// Quill as a component
import { Quill, QuillEditor } from '@vueup/vue-quill';
// Auto format links
import MagicUrl from 'quill-magic-url';
// Formatter for images and videos
import BlotFormatter from 'quill-blot-formatter';
// Quill UI themes (test and choose one)
import '@vueup/vue-quill/dist/vue-quill.bubble.css';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

// Global components
import DataForm from './components/forms/DataForm.vue';
import DeleteDataForm from './components/forms/DeleteDataForm.vue';
import IllustrationForm from './components/forms/IllustrationForm.vue';
import Card from './components/global/Card.vue';
import PageGuard from './components/layout/PageGuard.vue';

// Initialize app
const app = createApp(App);

app.use(createPinia());
app.use(router);

// Global components
app.component('Button', Button)
    .component('Card', Card)
    .component('DataForm', DataForm)
    .component('Dropdown', Dropdown)
    .component('ErrorMessage', ErrorMessage)
    .component('HeroTitle', HeroTitle)
    .component('DeleteDataForm', DeleteDataForm)
    .component('IllustrationForm', IllustrationForm)
    .component('Gallery', Gallery)
    .component('PageGuard', PageGuard)
    .component('SuccessMessage', SuccessMessage);

// Import Quill library as a component
app.component('QuillEditor', QuillEditor);
// detects emails and URLs in the editor and automatically converts to link
Quill.register('modules/magicUrl', MagicUrl);
Quill.register('modules/blotFormatter', BlotFormatter);

app.mount('#app');
