import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';

// Global components
import Button from './components/global/Button.vue';
// Icons from Vue Material Icons
import Account from 'vue-material-design-icons/Account.vue';
import AccountOff from 'vue-material-design-icons/AccountOff.vue';
import DoorClosedCancel from 'vue-material-design-icons/DoorClosedCancel.vue';
import DotsVertical from 'vue-material-design-icons/DotsVertical.vue';

const app = createApp(App);

app.use(createPinia());
app.use(router);

// Global components
app.component('Button', Button);

// Icons from Vue Material Icons
app.component('account-icon', Account)
    .component('account-off-icon', AccountOff)
    .component('door-closed-cancel-icon', DoorClosedCancel)
    .component('dots-vertical-icon', DotsVertical);

app.mount('#app');
