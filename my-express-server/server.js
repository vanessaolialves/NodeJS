//https://expressjs.com/pt-br/starter/installing.html
//jshint esversion:6

const express = require('express');

const app = express();

// server simples apenas pra visualizar a utilização do express

// primeiro parametro é a localização, no caso será a root
app.get("/", function(req, res){
    res.send("<h1>Hello my world !!!<\h1>");
    //console.log(req);
})

app.get("/contact", function(req, res){
    res.send("<h5>Contact me at email...</h5>");
})

app.get("/about", function(req, res){
    res.send("<h5>My name is Vanessa and i like code.</h5>");
})

app.get("/hobbies", function(req, res){
    res.send("<ul><li>coffee</li><li>code</li><li>beer</li></ul>");
})


//esperando as chamadas de api
app.listen(3000, function(){
    console.log("Server started on port 3000");
});
