let add = (cart, req) => {
    cart.contents.push (req.body);
    return JSON.stringify (cart, null, 4);
}

let change = (cart, req) => {
    let find  = cart.contents.find (el => el.gid === +req.params.gid);
    find.quantity += req.body.quantity;
    return JSON.stringify (cart, null, 4);
}

let del = (cart, req) => {
    let find = cart.contents.find(el => el.gid === req.body.gid);
    cart.contents.splice(cart.contents.indexOf (find), 1);
    return JSON.stringify (cart, null, 4);
}

module.exports = {
    add, change, del //тест
}