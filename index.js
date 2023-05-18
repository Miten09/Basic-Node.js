const fs = require("fs");
const http = require("http");
const url = require("url");

/////////////////////////////////////////
//// Read & Write FILES

// Blocking,synchronous way
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);
// const textOut = `This is what we know about the avocado:${textIn}\n Created on ${new Date().getDay()} day`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File written!");

//Non-Blocking,Asynchronous way
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   if (err) return console.log("ERROR");
//   console.log(data1);
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       console.log(data3);
//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, (err) => {
//         console.log("File has been written!");
//       });
//     });
//   });
// });
// console.log("will read file");

/////////////////////////////////////////
//// SERVER
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataobj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  //overview page
  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end(tempOverview);

    //Product page
  } else if (pathName === "/products") {
    res.end("This is products");

    // API
  } else if (pathName === "/api") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(data);

    // Not Found
  } else {
    res.writeHead(404, {
      "content-type": "text/html",
      "my-own-header": "hello world",
    });
    res.end("<h1>page not found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to reques on port number 8000");
});
