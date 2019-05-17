'use strict';
// Фэйк АПИ
const API = '/api';

let app = new Vue ({
    el: '#app',
    data: {
        goods: [],
        basketGoods: [],
        apis: {
            goods: '/goods',
            basket: '/basket',
            canAddToBasket: '/addToBasket.json',
            canDeleteFromBasket: '/deleteFromBasket.json',
        },
        searchKey: '',
        showCart: false,
        serverError: false
    },
    methods: {
            getJson(url){
                return fetch(url)
                    .then(result => result.json())
                    .catch(error => {
                        console.log(error)
                    })
            },
            postJson(url,data){
                return fetch(url, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify (data)
                })
                    .then(result => result.json())
                    .catch(error => {
                        console.log(error)
                    })
            },
            deleteJson(url,data){
                return fetch(url, {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify (data)
                })
                    .then(result => result.json())
                    .catch(error => {
                        console.log(error)
                    })
            },
            putJson(url,data){
                return fetch(url, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify (data)
                })
                    .then(result => result.json())
                    .catch(error => {
                        console.log(error)
                    })
            },
            addProduct(product){
                let find = this.basketGoods.find(el => el.gid === product.gid);
                if (find){
                    this.putJson(`${API + this.apis.basket}/${find.gid}`, {quantity: 1})
                        .then (data => {
                            if(data.result){
                                find.quantity++
                            }
                        })
                } else {
                    let prod = Object.assign({quantity: 1}, product);
                    this.postJson(`${API + this.apis.basket}`, prod)
                        .then(data => {
                            if(data.result){
                                this.basketGoods.push(prod);
                            }
                        })
                }
            // this.getJson(`${API + this.apis.canAddToBasket}`)
            //     .then(data => {
            //         if(data.result){
            //                 let find = this.basketGoods.find(el => el.gid === product.gid);
            //             if(find){
            //                 find.quantity++;
            //             } else {
            //                 let prod = Object.assign({quantity: 1}, product);
            //                 this.basketGoods.push(prod);
            //             }
            //         }
            //     })
        },
        remove(product){
            let find = this.basketGoods.find(el => el.gid === product.gid);
            if (find && find.quantity > 1){
                this.putJson(`${API + this.apis.basket}/${find.gid}`, {quantity: -1})
                    .then (data => {
                        if(data.result){
                            find.quantity--
                        }
                    })
            } else {
                this.deleteJson(`${API + this.apis.basket}`, product)
                    .then(data => {
                        if(data.result){
                            this.basketGoods.splice(this.basketGoods.indexOf(product), 1);
                        }
                    })
            }
            // this.getJson(`${API + this.apis.canDeleteFromBasket}`)
            //     .then(data => {
            //         if(data.result){
            //             if(product.quantity > 1){
            //                 product.quantity--;
            //             } else {
            //                 this.basketGoods.splice(this.basketGoods.indexOf(product), 1);
            //             }
            //         }
            //     })
        },
        
    },
    mounted () {
        this.getJson (`${API + this.apis.goods}`)
            .then(goods => {this.goods = goods})
            .catch(error => {this.serverError = true;});
        this.getJson (`${API + this.apis.basket}`)
            .then(goods => {this.basketGoods = goods.contents})
            .catch(error => {this.serverError = true;});
    }
});