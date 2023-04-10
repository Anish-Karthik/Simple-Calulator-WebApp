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
    const weight = parseFloat(req.body.weight);
    const height = parseFloat(req.body.height);
    const bmi = (weight / (height * height)).toFixed(2);
    res.send("<h1>Your BMI is " + bmi + "</h1> <br> <a href='/bmi'>Back to home</a>");
});

app.post("/", (req, res) => {
    const num1 = Number(req.body.num1);
    const num2 = Number(req.body.num2);
    const operator = req.body.operator;
    if(operator !== null) operator = operator.toLowerCase();
    let result = 0;
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
    res.send("<h1>The result is " + result + "</h1> <br> <a href='/'>Back to home</a>");
}); 

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server started on port 3000");
});

