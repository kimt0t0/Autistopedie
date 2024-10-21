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

// Icons from Vue Material Icons
import AccountIcon from 'vue-material-design-icons/Account.vue';
import AccountOffIcon from 'vue-material-design-icons/AccountOff.vue';
import ChevronDownIcon from 'vue-material-design-icons/ChevronDown.vue';
import ChevronUpIcon from 'vue-material-design-icons/ChevronUp.vue';
import CloseIcon from 'vue-material-design-icons/Close.vue';
import CogIcon from 'vue-material-design-icons/Cog.vue';
import CogOffIcon from 'vue-material-design-icons/CogOff.vue';
import ContentSaveIcon from 'vue-material-design-icons/ContentSave.vue';
import DeleteIcon from 'vue-material-design-icons/Delete.vue';
import DoorClosedCancelIcon from 'vue-material-design-icons/DoorClosedCancel.vue';
import DotsVerticalIcon from 'vue-material-design-icons/DotsVertical.vue';
import EmailBoxIcon from 'vue-material-design-icons/EmailBox.vue';
import EyeIcon from 'vue-material-design-icons/Eye.vue';
import EyeOffIcon from 'vue-material-design-icons/EyeOff.vue';
import GlassesIcon from 'vue-material-design-icons/Glasses.vue';
import PencilIcon from 'vue-material-design-icons/Pencil.vue';
import PlusIcon from 'vue-material-design-icons/Plus.vue';

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

// Icons from Vue Material Icons
app.component('account-icon', AccountIcon)
    .component('account-off-icon', AccountOffIcon)
    .component('chevron-down-icon', ChevronDownIcon)
    .component('chevron-up-icon', ChevronUpIcon)
    .component('close-icon', CloseIcon)
    .component('cog-icon', CogIcon)
    .component('cog-off-icon', CogOffIcon)
    .component('content-save-icon', ContentSaveIcon)
    .component('delete-icon', DeleteIcon)
    .component('door-closed-cancel-icon', DoorClosedCancelIcon)
    .component('dots-vertical-icon', DotsVerticalIcon)
    .component('email-box-icon', EmailBoxIcon)
    .component('eye-icon', EyeIcon)
    .component('eye-off-icon', EyeOffIcon)
    .component('glasses-icon', GlassesIcon)
    .component('pencil-icon', PencilIcon)
    .component('plus-icon', PlusIcon);

app.mount('#app');
