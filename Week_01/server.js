let http = require('http');
let fs = require('fs');

let myServer = http.createServer(myRequestHandler);

myServer.listen(8080);

function myRequestHandler(req, res) {
    let path = req.url;
    console.log('Incoming request at',req.url);
    console.log('Server running in this directory:',__dirname);

    let filePath = __dirname + path;
    console.log('Serving file at',filePath);

    fs.readFile(filePath, function (err, data){
        if (err) {
            console.log("Error getting data. Sending error status code 500");
            res.writeHead(500);
            res.end();
            return;
        }
        console.log('Got data! Let`s send it to the client');
        res.writeHead(200);
        res.end(data);
    }); 
}