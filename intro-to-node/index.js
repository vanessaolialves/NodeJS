//jshint esversion:6

//https://nodejs.org/docs/latest-v17.x/api/fs.html#filehandlewritefiledata-options
const fs = require("fs");

//https://www.npmjs.com/package/superheroes?activeTab=readme
const superheroes = require('superheroes');

//https://www.npmjs.com/package/supervillains
const supervillains = require('supervillains');

//aqui temos pra fazer uma copia do file1 e salvar no file2
fs.copyFileSync("file1.txt", "file2.txt");

superheroes.all;
let SuperHeroName = superheroes.random();

//aqui temos a API pra gerar superheroes aleatoriamente
console.log("My SuperHero Name is " + SuperHeroName);

supervillains.all;
let SuperVillainName = supervillains.random();

console.log("My SuperVillain Name is " + SuperVillainName);

