const cors = require('cors')
const express = require('express');
const app = express();
const PORT = 7777;

app.use(cors())
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

//--------------------old-----------------
// var static = require('node-static');
// var path = require('path')
// var http = require('http');

// var public = path.resolve(__dirname, './public')

// var file = new(static.Server)(public);

// http.createServer(function (req, res) {
//   file.serve(req, res);
// }).listen(7777);