
Vue.component('search', {
    props: ['search-key'],
    template:`
        <form action="#" class="search-form">
            <slot></slot>
        </form>
    `
});