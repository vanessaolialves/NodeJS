
const express = require("express")
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

const port = 3000;

app.get("/", (req, res) => {
    //res.send("<h1>Hello World !!!</h1>");
    res.sendFile(__dirname + "/index.html");
});

app.get("/bmicalculator", (req, res) => {
    res.sendFile(__dirname + "/bmicalculator.html");
})


// Na rota "/", ou seja, default, temos um somatorio
app.post("/", (req, res) => {
    //Using body-parser, os valores alterados no html, são enviados para cá usando req.body
    // lembre-se que os valores passados são strings

    let num1 = Number(req.body.num1);
    let num2 = Number(req.body.num2);

    let result = num1 + num2;

    res.send("The result of the calculation is " + result)


    //res.send("Thanks for posting that.")
    //console.log(req.body);
})

// Na rota bmicalculator, calculamos o bmi
app.post("/bmicalculator", (req, res) => {

    let height = parseFloat(req.body.height);
    let weight = parseFloat(req.body.weight);

    let bmi = weight/(height*height);

    res.send("Your BMI is " + bmi);
});

app.listen(port, () => {
    console.log("Server is running in port 3000");
});