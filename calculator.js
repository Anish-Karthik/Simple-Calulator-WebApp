const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/bmi", (req, res) => {
    res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmi", (req, res) => { 
    var weight = parseFloat(req.body.weight);
    var height = parseFloat(req.body.height);
    var bmi = weight / (height * height);
    bmi = bmi.toFixed(2);
    res.send("<h1>Your BMI is " + bmi + "</h1> <br> <a href='/bmi'>Back to home</a>");
});

app.post("/", (req, res) => {
    var num1 = Number(req.body.num1);
    var num2 = Number(req.body.num2);
    var operator = req.body.operator;
    if(operator !== null) operator = operator.toLowerCase();
    var result = 0;
    switch (operator) {
        case "add":
            result = num1 + num2;
            break;
        case "subtract":
            result = num1 - num2;
            break;
        case "multiply":
            result = num1 * num2;
            break;
        case "divide":
            result = num1 / num2;
            break;
        default:
            result = "Please enter a valid operator";
    }
    result = result.toFixed(2);
    res.send("<h1>Thgit state result is " + result + "</h1> <br> <a href='/'>Back to home</a>");
}); 

app.listen(3000, () => {
    console.log("Server started on port 3000");
});

