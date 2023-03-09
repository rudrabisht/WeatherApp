const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended : true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/",function(req,res){
    const cityName = req.body.cityName;
    const apiKey = "839d4d511c543b3cfbdb12834ad9d2ff";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName +"&appid=" + apiKey + "&units=" + units;
    https.get(url, function(response){

        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp; 
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<p> The weather is currently " + weatherDescription +"</p>");
            res.write("<h1> The temperature in " + cityName + " is " + temp + " degree Celsius</h1>");
            res.write("<img src =" + imageURL + ">");
            res.send();
        })

    });
})


app.listen(port,function(){
    console.log("Server is running on port " + port);
}) 
