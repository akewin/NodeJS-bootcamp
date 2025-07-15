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

// REFACTORING ROUTES
const getAllTours = (req, res) => {
	res.status(200).json({
		status: "success",
		results: tours.length,
		data: { tours },
	});
};

const getTour = (req, res) => {
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
};

const deleteTour = (req, res) => {
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
};

const createTour = (req, res) => {
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
};

const updateTour = (req, res) => {
	if (req.params.id * 1 > tours.length) {
		return res.status(404).json({
			status: "fail",
			message: "Invalid ID",
		});
	}

	res.status(200).json({
		status: "success",
		data: {
			tour: "<updated tour here>",
		},
	});
};

// enveloping json from file and sending back
// app.get("/api/v1/tours", getAllTours);
// app.post("/api/v1/tours", createTour);
// :id is a new variable to this url
app.get("/api/v1/tours/:id", getTour);
app.delete("api/v1/tours/:id", deleteTour);
app.patch("/api/v1/tour/:id", updateTour);

app.listen(port, () => {
	console.log(`App running on port ${port}`);
});
