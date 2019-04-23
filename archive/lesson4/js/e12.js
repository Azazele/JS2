let reg = /(\B'|'\B)/ig;
doit.addEventListener("click", () => {
	did.innerHTML = str.innerHTML.replace(reg, '"');

});