'use strict';
// Фэйк АПИ
const API = 'http://davidmakhnev.ru/JSON/API-JS2';

let app = new Vue ({
    el: '#app',
    data: {
        goods: [],
        basketGoods: [],
        apis: {
            goods: '/goods.json',
            canAddToBasket: '/addToBasket.json',
            canDeleteFromBasket: '/deleteFromBasket.json',
        },
        searchKey: '',
        showCart: false,
        serverError: false
    },
    methods: {
        getJson (url) {
            return new Promise(function(resolve, reject) {
               var xhr;
               xhr = new XMLHttpRequest();
               xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    xhr.status === 200 ? resolve(xhr.responseText) : reject('error');
                }
               }
               xhr.timeout = 15000;
               xhr.ontimeout = () => {
                reject('error');
               }
               xhr.open('GET', url, true);
               xhr.send();
            })
        },
        addProduct(product){
            this.getJson(`${API + this.apis.canAddToBasket}`)
                .then(data => {
                    if(JSON.parse(data).result){
                            let find = this.basketGoods.find(el => el.gid === product.gid);
                        if(find){
                            find.quantity++;
                        } else {
                            let prod = Object.assign({quantity: 1}, product);
                            this.basketGoods.push(prod);
                        }
                    }
                })
        },
        remove(product){
            this.getJson(`${API + this.apis.canDeleteFromBasket}`)
                .then(data => {
                    if(JSON.parse(data).result){
                        if(product.quantity > 1){
                            product.quantity--;
                        } else {
                            this.basketGoods.splice(this.basketGoods.indexOf(product), 1);
                        }
                    }
                })
        },
        
    },
    mounted () {
        this.getJson (`${API + this.apis.goods}`)
        .then(goods => {this.goods = JSON.parse(goods)})
        .catch(error => {this.serverError = true;})
    }
});