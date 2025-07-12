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

// :id is a new variable to this url
app.get("/api/v1/tours/:id", (req, res) => {
	// console.log(req.params)

	// if we had more parameters of even optinal parameters;
	// app.get("/api/v1/tours/:id/:x/:y?", (req, res)

	// trick to convert the str param to int
	const id = req.params.id * 1;

	// checking for requests greater than the lenght of the actual tours size
	// if (id > tours.length)
	if (!tours) {
		return res.status(404).json({
			status: "fail",
			message: "Invalid ID",
		});
	}

	const tour = tours.find((el) => el.id === id);

	res.status(200).json({
		status: "success",
		data: {
			tour,
		},
	});
});

app.delete("api/v1/tours/:id", (req, res) => {
	if (req.params.id * 1 > tours.length) {
		return res.status(404).json({
			status: "fail",
			message: "Invalid ID",
		});
	}

	res.status(200).json({
		status: "success",
		data: null,
	});
});

// the post route
app.post("/api/v1/tours", (req, res) => {
	// console.log(req.body);

	const newId = tours[tours.length - 1].id + 1;
	const newTour = Object.assign({ id: newId }, req.body);
	console.log("Request body:", req.body);

	tours.push(newTour);
	fs.writeFile(
		`${__dirname}/dev-data/data/tours-simple.json`,
		JSON.stringify(tours),
		(err) => {
			res.status(201).json({
				status: "success",
				data: {
					tour: newTour,
				},
			});
		},
	);
});

app.listen(port, () => {
	console.log(`App running on port ${port}`);
});
