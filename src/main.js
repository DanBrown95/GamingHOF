import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { createAuth0 } from '@auth0/auth0-vue';

createApp(App).use(store).use(router).use(
    createAuth0({
        domain: "dev-jemsaolybhry2o4a.us.auth0.com",
        clientId: "wc5B2DgfDOgoW6etIUUxcz3xoROAb5ON",
        authorizationParams: {
            redirect_uri: window.location.origin
        }
    })
).mount('#app')
