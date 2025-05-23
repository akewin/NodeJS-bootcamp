const express = require("express");
const fs = require("node:fs");
// defining app as express and port
const app = express();
const port = 3334;

// middleware to post in json
app.use(express.json());

//reading tour data
const tours = JSON.parse(
	fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`),
);

// enveloping json from file and sending back
app.get("/api/v1/tours", (req, res) => {
	res.status(200).json({
		status: "success",
		results: tours.length,
		data: { tours },
	});
});

// the post route
app.post("/api/v1/tours", (req, res) => {
	// console.log(req.body);

	const newID = tours[tours.length - 1].id + 1;
	const newTour = Object.assign({ id: newID }, req.body);

	tours.push(newTour);
	fs.writeFile(
		`${__dirname}/dev-data/data/tours-simple.json`,
		JSON.stringify(tours),
		(err) => {},
	);

	res.send("done.");
});

app.listen(port, () => {
	console.log(`App running on port ${port}`);
});
