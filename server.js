const express = require("express");

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

app.get("/", function(req, res){
    res.send("hello");
});

let reports = [];
app.get("/cases", function(req, res){
    res.json([
        "The Black Diamond",
        "The Missing Painting",
        "Office Data Theft"
    ]);
});
app.post("/report", function(req, res){
    reports.push(req.body);
    res.json({
        message: "Report Submited"
    });
});

app.get("/reports", function(req, res){
    res.json(reports);
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log("Server Running");
});