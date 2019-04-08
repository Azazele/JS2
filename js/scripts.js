"use strict"

const GOODS = [
	{name : "Samsung", price : 51242, img: 'https://pp.userapi.com/c850520/v850520354/fa861/ZYA91t0Td6E.jpg', gid : 1},
	{name : "Huawei", price : 34549, img: 'https://pp.userapi.com/c850520/v850520354/fa86a/t8nwP-xKRCo.jpg', gid : 2},
	{name : "iPhone", price : 85500, img: 'https://pp.userapi.com/c850520/v850520354/fa873/QHOs8XaLLUE.jpg', gid : 3},
	{name : "Xiaomi", price : 14222, img: 'https://pp.userapi.com/c850520/v850520354/fa885/FOODWxFDQHo.jpg', gid : 4},
	{name : "Alcatel", price : 5541, img: 'https://pp.userapi.com/c850520/v850520354/fa88e/ajhR5v7Oo0g.jpg', gid : 5},
	{name : "Motorolla", price : 7891, img: 'https://pp.userapi.com/c850520/v850520354/fa8a0/HxtOn6-6HOU.jpg', gid : 6},
	{name : "Sony", price : 26999, img: 'https://pp.userapi.com/c850520/v850520354/fa8a9/nUw0w6P859o.jpg', gid : 7},
	{name : "Nokia", price : 12340, img: 'https://pp.userapi.com/c850520/v850520354/fa8b2/mwOB497RTVs.jpg', gid : 8}
];

const renderGoodsItem = (name, price, img, gid) => {
  return `<div class="goods-item" data-id="${gid}"><div class="goods-img"><img src="${img}"></div><h3>${name}</h3><p>${price}</p></div>`;
};

const renderGoodsList = (array) => {
  let goodsList = array.map(item => renderGoodsItem(item.name, item.price, item.img, item.gid));
  document.querySelector('.goods-list').innerHTML = goodsList.join('');
}


renderGoodsList(GOODS);





