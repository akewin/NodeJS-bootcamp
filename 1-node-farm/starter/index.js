const fs = require("node:fs");
const http = require("http");
const url = require("url");
const path = require("node:path");

////////////////////////////////
// files

// blocking, synchronous way
// const avocadoFile = fs.readFileSync("./txt/read-this.txt", "utf-8");
// console.log(avocadoFile);

// const textOut = `This is what we know about the avocados: ${avocadoFile}.\nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File Written!");

// non-blocking asynchronous way
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
// 	if (err) return console.log("Errror!");
// 	fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
// 		fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
// 			console.log(data3);
// 			fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
// 				console.log("Your file has been written.");
// 			});
// 		});
// 	});
// });

////////////////////////////////
// server
const server = http.createServer((req, res) => {
	const pathName = req.url;

	if (pathName === "/overview" || pathName === "/") {
		res.end("Overview");
	} else if (pathName === "/product") {
		res.end("product");
	} else if (pathName === "/api") {
		fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
			const productData = JSON.parse(data);
			res.writeHead(200, { "Content-type": "application/json" });
			res.end(data);
		});
	} else {
		res.writeHead(404, {
			"Content-type": "text/html",
			"my-own-header": "hello, header",
		});
		res.end("<h1>404<h1/>");
	}
});

// listen to incoming requests
server.listen(8000, "127.0.0.1", () => {
	console.log("listening to requests on port 8000");
});
