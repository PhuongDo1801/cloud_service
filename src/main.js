import { createApp } from 'vue'
import App from './App.vue'
import HustDialog from './components/dialog/HustDialog.vue';
import HustToastMessage from './components/toast-message/HustToastMessage.vue'
import clickOutside from '@/utils/clickOutside';
import vueRouter from './router/router';
const app = createApp(App);
app.component('h-dialog', HustDialog);
app.component('h-toast', HustToastMessage);
app.directive("click-outside", clickOutside); // Sử dụng click out side
app.use(vueRouter);
app.mount('#app')
