"use strict"

const GOODS = [
	{name : "Samsung", price : 51242, gid : 1},
	{name : "Huawei", price : 34549, gid : 2},
	{name : "iPhone", price : 85500, gid : 3},
	{name : "Xiaomi", price : 14222, gid : 4},
	{name : "Alcatel", price : 5541, gid : 5},
	{name : "Motorolla", price : 7891, gid : 6},
	{name : "Sony", price : 26999, gid : 7},
	{name : "Nokia", price : 12340, gid : 8}
];

function returnGood(name, price, gid){
	var good = "<div class='goods-item' data-id='" + gid + "'>" + "<h2>" + name + "</h2>" + "<span class='good-price'>" + price + " руб</span></div>";
	return good;
}

function generateGoods(array){
	var goodList = document.getElementById('goods-list');
	for(let i = 0; i < GOODS.length; i++){
		var getGood = returnGood(array[i].name, array[i].price, array[i].gid);
		goodList.innerHTML += getGood;
	}
}

generateGoods(GOODS);