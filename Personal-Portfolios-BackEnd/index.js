const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send(`Personal Portfolios Server is running...`)
})

app.listen(port, (req, res) => {
    console.log(`Personal Portfolios Server is running on: ${port}`);
});