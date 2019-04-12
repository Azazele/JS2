"use strict"

class GoodsItem {
	constructor(name, price, img, gid) {
		this.name = name;
		this.price = price;
		this.img = img;
		this.gid = gid;
	}
	render() {
		return `<div class="goods-item" data-id="${this.gid}"><div class="goods-img"><img src="${this.img}"></div><h3>${this.name}</h3><p>${this.price}</p></div>`;
	}
}

class GoodsList {
	constructor() {
		this.goods = [];
	}
	fetchGoods() {
		this.goods = [
			{name : "Samsung", price : 51242, img: 'https://pp.userapi.com/c850520/v850520354/fa861/ZYA91t0Td6E.jpg', gid : 0},
			{name : "Huawei", price : 34549, img: 'https://pp.userapi.com/c850520/v850520354/fa86a/t8nwP-xKRCo.jpg', gid : 1},
			{name : "iPhone", price : 85500, img: 'https://pp.userapi.com/c850520/v850520354/fa873/QHOs8XaLLUE.jpg', gid : 2},
			{name : "Xiaomi", price : 14222, img: 'https://pp.userapi.com/c850520/v850520354/fa885/FOODWxFDQHo.jpg', gid : 3},
			{name : "Alcatel", price : 5541, img: 'https://pp.userapi.com/c850520/v850520354/fa88e/ajhR5v7Oo0g.jpg', gid : 4},
			{name : "Motorolla", price : 7891, img: 'https://pp.userapi.com/c850520/v850520354/fa8a0/HxtOn6-6HOU.jpg', gid : 5},
			{name : "Sony", price : 26999, img: 'https://pp.userapi.com/c850520/v850520354/fa8a9/nUw0w6P859o.jpg', gid : 6},
			{name : "Nokia", price : 12340, img: 'https://pp.userapi.com/c850520/v850520354/fa8b2/mwOB497RTVs.jpg', gid : 7}
		];
	}
	getSumm(){
		let summ = 0;
		for(let i = 0; i < this.goods.length; i++){
			summ += this.goods[i].price;
		}
		return summ;
	}
}

const glist = new GoodsList();
glist.fetchGoods()

for (var i = 0; i < glist.goods.length; i++) {
	const gitem = glist.goods.map(item => new GoodsItem(item.name, item.price, item.img, item.gid));
	document.querySelector('.goods-list').innerHTML += gitem[i].render();
}


class BasketItem {
	constructor(name, price, img, gid) {
		this.name = name;
		this.price = price;
		this.img = img;
		this.gid = gid;
	}
	render() {
		return `<div class="goods-item" data-id="${this.gid}"><div class="goods-img"><img src="${this.img}"></div><h3>${this.name}</h3><p>${this.price}</p></div>`;
	}

}

class BasketList {
	constructor() {
		this.puttedGoods = [];
	}
	putGood(goods, goodClass){
		for(let i = 0; i < goods.length; i++){
			goodClass[i].addEventListener("click", () => {
			  	let numOfGood = goodClass[i].getAttribute('data-id');
			  	this.puttedGoods.push(goods[numOfGood]);
			});
		}
	}
	getSumm(){
		let summ = 0;
		for(let i = 0; i < this.puttedGoods.length; i++){
			summ += this.puttedGoods[i].price;
		}
		return summ;
	}
	render() {
		
	}
}

const blist = new BasketList();
blist.putGood(glist.goods, document.getElementsByClassName('goods-item'));