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
// Formatter for images and videos
import BlotFormatter from 'quill-blot-formatter';
// Quill UI themes (test and choose one)
import '@vueup/vue-quill/dist/vue-quill.bubble.css';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

// Icons from Vue Material Icons
import MagicUrl from 'quill-magic-url';
import Account from 'vue-material-design-icons/Account.vue';
import AccountOff from 'vue-material-design-icons/AccountOff.vue';
import ChevronDown from 'vue-material-design-icons/ChevronDown.vue';
import ChevronUp from 'vue-material-design-icons/ChevronUp.vue';
import Close from 'vue-material-design-icons/Close.vue';
import Cog from 'vue-material-design-icons/Cog.vue';
import CogOff from 'vue-material-design-icons/CogOff.vue';
import ContentSave from 'vue-material-design-icons/ContentSave.vue';
import Delete from 'vue-material-design-icons/Delete.vue';
import DoorClosedCancel from 'vue-material-design-icons/DoorClosedCancel.vue';
import DotsVertical from 'vue-material-design-icons/DotsVertical.vue';
import EmailBox from 'vue-material-design-icons/EmailBox.vue';
import Eye from 'vue-material-design-icons/Eye.vue';
import EyeOff from 'vue-material-design-icons/EyeOff.vue';
import Glasses from 'vue-material-design-icons/Glasses.vue';
import Pencil from 'vue-material-design-icons/Pencil.vue';
import Plus from 'vue-material-design-icons/Plus.vue';
import DataForm from './components/forms/DataForm.vue';
import DeleteDataForm from './components/forms/DeleteDataForm.vue';
import IllustrationForm from './components/forms/IllustrationForm.vue';
import Card from './components/global/Card.vue';
import PageGuard from './components/layout/PageGuard.vue';

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

// Icons from Vue Material Icons
app.component('account-icon', Account)
    .component('account-off-icon', AccountOff)
    .component('chevron-down-icon', ChevronDown)
    .component('chevron-up-icon', ChevronUp)
    .component('close-icon', Close)
    .component('cog-icon', Cog)
    .component('cog-off-icon', CogOff)
    .component('content-save-icon', ContentSave)
    .component('delete-icon', Delete)
    .component('door-closed-cancel-icon', DoorClosedCancel)
    .component('dots-vertical-icon', DotsVertical)
    .component('email-box-icon', EmailBox)
    .component('eye-icon', Eye)
    .component('eye-off-icon', EyeOff)
    .component('glasses-icon', Glasses)
    .component('pencil-icon', Pencil)
    .component('plus-icon', Plus);

app.mount('#app');
