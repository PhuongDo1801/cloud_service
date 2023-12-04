import { createApp } from 'vue'
import App from './App.vue'
import vueRouter from './router/router';
const app = createApp(App);
app.use(vueRouter);
app.mount('#app')
