const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

// base url for server
app.get("/", (req, res) => {
    console.log(`App get base-url route`);
    res.send(`Personal Portfolios Server is running...`)
})

app.listen(port, (req, res) => {
    console.log(`Personal Portfolios Server is running on: ${port}`);
});