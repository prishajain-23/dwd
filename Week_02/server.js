let express = require('express');

// create an http server application which
// responds to any HTTP requests
let app = express();

// have our server respond to get requests 
// with the appropriate file from the 'public' folder
app.use(express.static('public'));

//tell our express app to process incoming request bodies as JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// create a get request handler at path/search
app.get('/search', mySearchRequestHandler);

function mySearchRequestHandler(req, res) {
    let question = req.query.q;

    console.log('Got search request: ' + question);
    res.send('don`t ask me about ' + question + ' ever again');
}

let secrets = [];

// build a post handler
app.post('/shareSecret', mySharedSecretRequestHandler);

function mySharedSecretRequestHandler(req, res) {
    // let secret = req.query.secret;

    // get access to incoming secret
    console.log(req.body);
    let secret = req.body.secret;

    // keep track in the secrets array
    secrets.push(secret);

    console.log('Got POST request at /shareSecret with secret ' + secret);
    res.send('I`m gonna tell everyone your secret');
}

app.get('/secrets', myGetSecretsRequestHandler);

function myGetSecretsRequestHandler(req, res) {
    console.log('Got GET request at /secrets');
    let secretsHtml = "<h1>Secrets:</h1>";
    secretsHtml = secretsHtml + "<h3>Here's some secrets people have shared:</h3>";
    secretsHtml = secretsHtml + secrets;
    res.send(secretsHtml);
}

// listen on port 8080
app.listen(8080);