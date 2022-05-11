let url = require("url");
let http = require("http");
let fs = require("fs");

function test(req, res) {
  let addr = req.url,
    q = url.parse(req.url, true);
  filePath = "";

  fs.appendFile(
    "log.txt",
    "URL:" + addr + "\nTimestamp: " + new Date() + "\n\n",
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("added to log.");
      }
    }
  );

  if (q.pathname === "/documentation") {
    filePath = __dirname + "/documentation.html";
  } else {
    filePath = __dirname + "/index.html";
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      throw err;
    }

    // here defining the function // two input
    res.writeHead(200, { "Content-Type": "text/html" }); // inputs always number + object
    res.end(data); //  - has to be a string
  });
}

//wants the function we created
http.createServer(test).listen(8080);

console.log("My first Node test server is running on Port 8080.");
