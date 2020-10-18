function add (x, y) {
	return x+y;
}

function subtract (x,y) {
	return x-y;
}

function sum (arr) {
	return arr.reduce((a, b) => a+b, 0);
}

function multiply (arr) {
	return arr.reduce((a,b) => a*b, 1);
}

function power(x,y) {
	return Math.pow(x, y);
}

function factorial(x) {
	if (x <= 1) return 1;
	return x * factorial(x-1);
}

module.exports = {
	add,
	subtract,
	sum,
	multiply,
    power,
	factorial
}