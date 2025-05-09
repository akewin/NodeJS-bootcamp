const fs = require("node:fs");
const http = require("http");
const url = require("url");
const path = require("node:path");
const slugify = require("slugify");

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

const tempOverview = fs.readFileSync(
	`${__dirname}/templates/template-overview.html`,
	"utf-8",
);
const tempCard = fs.readFileSync(
	`${__dirname}/templates/template-card.html`,
	"utf-8",
);
const tempProduct = fs.readFileSync(
	`${__dirname}/templates/template-product.html`,
	"utf-8",
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

// slugify urls
const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));

const replaceTemplate = (temp, product) => {
	let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
	output = output.replace(/{%IMAGE%}/g, product.image);
	output = output.replace(/{%PRICE%}/g, product.price);
	output = output.replace(/{%FROM%}/g, product.from);
	output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
	output = output.replace(/{%QUANTITY%}/g, product.quantity);
	output = output.replace(/{%DESCRIPTION%}/g, product.description);
	output = output.replace(/{%ID%}/g, product.id);

	if (!product.organic)
		output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
	return output;
};

const server = http.createServer((req, res) => {
	// console.log(req.url);
	// console.log(url.parse(req.url, true));

	const { query, pathname } = url.parse(req.url, true);

	//overview
	if (pathname === "/overview" || pathname === "/") {
		res.writeHead(200, { "Content-type": "text/html" });
		const cardsHtml = dataObj
			.map((el) => replaceTemplate(tempCard, el))
			.join("");
		const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
		res.end(output);
		// product
	} else if (pathname === "/product") {
		res.writeHead(200, { "Content-type": "text/html" });

		const product = dataObj[query.id];
		const output = replaceTemplate(tempProduct, product);
		res.end(output);
		//api
	} else if (pathname === "/api") {
		res.writeHead(200, { "Content-type": "application/json" });
		res.end(data);
		// 404
	} else {
		res.writeHead(404, {
			"Content-type": "text/html",
			"my-own-header": "hello, header",
		});
		res.end("<h1>404<h1/>");
	}
});

// listen to incoming request
server.listen(8000, "127.0.0.1", () => {
	console.log("listening to requests on port 8000");
});
