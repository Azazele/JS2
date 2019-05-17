Vue.component('products', {
    props: ['goods', 'search'],
    template:`
        <div class="products">
            <product :search="search" v-for="good in goods" :key="good.gid" :good='good'></product>
        </div>
    `
});

Vue.component('product', {
    props: ['good', 'search'],
    template:`
        <div class="product-item" v-if="filter(search, good.name)">
            <img :src="good.img" alt="Some img">
            <div class="desc">
                <h3>{{ good.name }}</h3>
                <p>{{ good.price }} руб</p>
                <button class="buy-btn" @click="$parent.$emit('add-product', good)">Купить</button>
            </div>
        </div>
    `,
    methods: {
        filter (searchKey, name){
            let reg = new RegExp(searchKey, 'ig');
            if (reg.test(name)){ 
                 return true;
            }
        }
    },
})