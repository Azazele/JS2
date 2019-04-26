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
        searchKey: ''
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
        addProduct (product) {
            this.basketGoods.push(product);
        },
        filter (name){
            let reg = new RegExp(this.searchKey, 'ig');
            if (reg.test(name)){ 
                 return true;
            }
        }
    },
    mounted () {
        this.getJson (`${API + this.apis.goods}`)
        .then(goods => {this.goods = JSON.parse(goods)})
        .catch(error => console.log(error))
    }
});
