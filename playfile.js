const fetch = require("node-fetch");

const Promise1 = new Promise((resolve, reject) => {
  resolve(fetch('http://google.com/'));
})
const Promise2 = new Promise((resolve, reject) => {
  resolve(fetch('http://google.com/'));
})

Promise.all([Promise1, Promise2])
.then(result => {
    console.log(result);
})
.catch(err => {
    console.log(err);
})