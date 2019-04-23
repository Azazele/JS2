"use strict"

function makeGETRequest(url, callback) {
	return new Promise(function(resolve, reject) {
		var xhr;
		if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
		} else if (window.ActiveXObject) { 
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}

		xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
		  callback(xhr.responseText);
		}
		}

		xhr.open('GET', url, true);

		xhr.onload = function() {
	      if (this.status == 200) {
	        resolve(this.response);
	      } else {
	        reject('Какая-та ошибка');
	      }
	    };
	    xhr.onerror = function() {
	    	reject('Какая-та ошибка');
	    };

		xhr.send();
	})
}

const API_URL = "http://davidmakhnev.ru/JSON/API-JS2/";


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
	fetchGoods(cb) {
		return makeGETRequest(`${API_URL}goods.json`, (goods) => {this.goods = JSON.parse(goods);});
	}
	getSumm(){
		let summ = 0;
		for(let i = 0; i < this.goods.length; i++){
			summ += this.goods[i].price;
		}
		return summ;
	}
	//добавлена возможность рендеринга найденного
	render(goods = this.goods){
		document.querySelector('.goods-list').innerHTML = '';
		for (var i = 0; i < goods.length; i++) {
			const gitem = goods.map(item => new GoodsItem(item.name, item.price, item.img, item.gid));
			document.querySelector('.goods-list').innerHTML += gitem[i].render();
		}
	}
	//функция фильтрации товаров
	filterGoods(value){
		let foundGoods = [];
		let reg = new RegExp(value, 'ig');
		for (var i = 0; i < this.goods.length; i++) {
			if(reg.test(this.goods[i].name) == true) {
				foundGoods.push(this.goods[i]);
				console.log(foundGoods);
			}
		}
		this.render(foundGoods);
		
	}
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
		this.basket = [];
	}
	putGood(goods, goodClass){
		for(let i = 0; i < goods.length; i++){
			goodClass[i].addEventListener("click", () => {
				document.querySelector('.basket-content').innerHTML = '';
				makeGETRequest(`${API_URL}addToBasket.json`, (goods) => {
					let result = JSON.parse(goods); 
					if (result.result == 1){
						return makeGETRequest(`${API_URL}basket.json`, (goods) => {this.basket = JSON.parse(goods)})
						.then(resolve => {this.render()})
						.then(resolve => {this.deleteGoods()})
						.catch(reject => console.error(reject));
					} else {
						console.error('Ошибка при добавлнии товара');
					}
				});
			  	
			});
		}
	}
	deleteGoods(){
		clearbasket.addEventListener("click", () => {
			makeGETRequest(`${API_URL}deleteFromBasket.json`, (goods) => {
				let result = JSON.parse(goods); 
				if (result.result == 1){
					document.querySelector('.basket-content').innerHTML = '';
					this.basket = [];
				} else {
					console.error('Ну удалось удалить товары');
				}
			});
		  	
		});
	}
	getSumm(){
		let summ = this.basket.amount;
		return summ;
	}
	render() {
		for (var i = 0; i < this.basket.contents.length; i++) {
			const gitem = this.basket.contents.map(item => new GoodsItem(item.name, item.price, item.img, item.gid));
			document.querySelector('.basket-content').innerHTML += gitem[i].render();
		}
	}
}


const glist = new GoodsList();
const blist = new BasketList();

glist.fetchGoods()
.then(resolve => {glist.render()})
.then(resolve => blist.putGood(glist.goods, document.getElementsByClassName('goods-item')))
.catch(reject => console.error(reject));

let bButton = document.getElementById('basket');
let buttonBlist = document.getElementById('basket-list');

bButton.addEventListener("click", () => {
	buttonBlist.classList.toggle('show');
});

// Поиск и рендеринг найденного + дубль функции putGood, чтобы работала после поиска
search.addEventListener("click", () => {
	glist.filterGoods(searchValue.value);
	blist.putGood(glist.goods, document.getElementsByClassName('goods-item'));
});

