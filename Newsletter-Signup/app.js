//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

const port = process.env.PORT || 3000;

const cache = [];

app.get("/", (req, res) => {
    console.log("Hello my server");
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
    console.log(req.body);
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    cache.push(data);
    

    const options = {
        //trocar o X pelo numero final do api key
        //depois de lists temos o valor do grupo que vamos inserir
        url: "https://us4.api.mailchimp.com/3.0/lists/4bcf3cbb34",
        method: "POST",
        //user:api key
        auth: "angela1:fd8d2a94f77b14c7c113e1d4a29c6120-us4",
        //body: jsonData
    };

    request(options, (error, response, body) => {
        if (error) {
            res.send("There was an error with signing up, please try again!!!");
        } else {
            if (response.statusCode === 200) {
                res.send("Successfuly subscribed!!!");
            } else {
                res.sendFile(__dirname + "/failure.html");
            }
        }
    });

    // const url = "https://us4.api.mailchimp.com/3.0/lists/4bcf3cbb34";

    // const options = {
    //     method: "POST",
    //     auth: "angela1:fd8d2a94f77b14c7c113e1d4a29c6120-us4",
    //     //body: jsonData
    // };

    // const request = https.request(url, options, (response) => {
    //     response.on("data", (data) => {
    //         console.log(JSON.parse(data));
    //     });
    // });
    // request.write(jsonData);
    // request.end();
   // res.send(cache);

});

app.post("/failure", (req, res) => {
    res.redirect("/");
});

app.listen(port, () => {
    console.log("Server is running on port 3000");
});

//https://mailchimp.com/pt-br/
//Nessa aula, criar uma conta no site acima
//Pegar a API KEY -> No caso dela foi fd8d2a94f77b14c7c113e1d4a29c6120-us4
//Pegar a Lista Id -> No caso dela foi 4bcf3cbb34
//Nessa aula vamos fazer um post para a API que estamos 
