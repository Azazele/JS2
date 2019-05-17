
Vue.component('error-msg', {
    props: ['error'],
    template:`
        <div class="error-msg" v-if="error">
        Ошибка подключения к серверу :(
        </div>
    `
});