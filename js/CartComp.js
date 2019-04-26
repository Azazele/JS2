Vue.component('cart', {
    props: ['show', 'basketgoods'],
    template:`
        <div class="cart-block" v-show="show">
            <p v-if="!basketgoods.length">Cart is empty</p>
            <cart-item v-for="good of basketgoods" :good="good" :key="good.gid"></cart-item>
        </div>
    `
});
Vue.component('cart-item', {
    props: ['good'],
    template: `
        <div class="cart-item" >
            <div class="product-bio">
                <img :src="good.img" alt="Some image">
                <div class="product-desc">
                    <p class="product-title">{{ good.name }}</p>
                    <p class="product-quantity">{{ good.quantity }}</p>
                    <p class="product-single-price">{{ good.price }}</p>
                </div>
            </div>
            <div class="right-block">
                <p class="product-price">{{ good.price*good.quantity }}</p>
                <button class="del-btn" @click="$parent.$emit('remove', good)">&times;</button>
            </div>
        </div>`
})
