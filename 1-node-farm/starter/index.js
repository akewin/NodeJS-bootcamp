const fs = require("node:fs");

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
//
