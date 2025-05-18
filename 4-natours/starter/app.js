const express = require("express");
// defining app as express and port
const app = express();
const port = 3333;

app.get('/', (req, res) => {
    res.status(200).json({message: 'hello from the server side', app: 'Natorus'});
});

app.post('/', (req, res) => {
    res.status(200).send("you can post to this endpoint.");
})

app.listen(port, () => {
    console.log(`App running on port ${port}`);
})