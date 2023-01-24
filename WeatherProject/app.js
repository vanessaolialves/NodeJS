const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const dotenv = require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

//Usando a api openweather que nos manda um apikey que manda as informações do clima
//de acordo com a cidade informada

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    //temos uma api de outro site que estamos buscando informações para apresentar na nossa api
    //https://openweathermap.org/api, precisa logar no site, você recebe uma chave e consegue fazer um quantidade de requisições
    console.log(req.body);
    const location = req.body.cityName;
    const apiKey = process.env.APIKEY;
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + apiKey + "&units=" + unit;
    https.get(url, (resHttps) => {
        const statusCode = resHttps.statusCode;
        if (statusCode === 200) {
            resHttps.on("data",(data) => {
                // data é passado com um valor hexadecimal
                const weatherData = JSON.parse(data);
                //outra forma que podemos transformar dados em string, utilizando JSON.stringify(data)
                console.log(weatherData);
                const temp = weatherData.main.temp;
                const weatherDescription = weatherData.weather[0].description;
                const icon = weatherData.weather[0].icon;
                const iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

                res.write("<p>The weather is currently " + weatherDescription + "</p>");
                res.write("<h1>The temperature in " + location + " is " + temp + " degrees Celsius</h1>");
                res.write("<img src=" + iconURL + ">");
                res.send();
            });
        } else {
            res.write("<h1>Error<\h1>");
            const errorURL = "https://httpstatusdogs.com/img/"+statusCode+".jpg";
            
            res.write("<img src=" + errorURL + ">");
            res.send();
        }
        
        
    });
    // Não posso user duas response send na mesma chamada
    //res.send("Server is up and running");
});


app.listen(process.env.PORT, () => {
    console.log("Server is running on port 3000");
});

