import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';

// Global components
import Button from './components/global/Button.vue';
import ErrorMessage from './components/global/ErrorMessage.vue';
import HeroTitle from './components/global/HeroTitle.vue';

// Icons from Vue Material Icons
import Account from 'vue-material-design-icons/Account.vue';
import AccountOff from 'vue-material-design-icons/AccountOff.vue';
import ChevronDown from 'vue-material-design-icons/ChevronDown.vue';
import ChevronUp from 'vue-material-design-icons/ChevronUp.vue';
import DoorClosedCancel from 'vue-material-design-icons/DoorClosedCancel.vue';
import DotsVertical from 'vue-material-design-icons/DotsVertical.vue';
import Eye from 'vue-material-design-icons/Eye.vue';
import EyeOff from 'vue-material-design-icons/EyeOff.vue';
import SuccessMessage from './components/global/SuccessMessage.vue';

const app = createApp(App);

app.use(createPinia());
app.use(router);

// Global components
app.component('Button', Button)
    .component('ErrorMessage', ErrorMessage)
    .component('HeroTitle', HeroTitle)
    .component('SuccessMessage', SuccessMessage);

// Icons from Vue Material Icons
app.component('account-icon', Account)
    .component('account-off-icon', AccountOff)
    .component('chevron-down-icon', ChevronDown)
    .component('chevron-up-icon', ChevronUp)
    .component('door-closed-cancel-icon', DoorClosedCancel)
    .component('dots-vertical-icon', DotsVertical)
    .component('eye-icon', Eye)
    .component('eye-off-icon', EyeOff);

app.mount('#app');
