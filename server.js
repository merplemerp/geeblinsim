//
// # SimpleServer
//
// A simple Express server
//
var http = require('http');
var path = require('path');

var express = require('express');
var bodyParser = require('body-parser');

//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var router = express();
var server = http.createServer(router);

router.use(bodyParser.json());

router.use(express.static(path.resolve(__dirname, 'client')));

// API Routes
router.get('/api/v1/getData', function(request, response) {
    var data = [
        {
            question: 'What day is it?',
            correctAnswer: 2,
            answers: [
                {id: 1, value: "Monday"},
                {id: 2, value: "Tuesday"},
                {id: 3, value: "Wednesday"},
                {id: 4, value: "Thursday"},
                ]
            },
            {
                question: 'What month is it?',
                correctAnswer: 6,
                answers: [
                    {id: 1, value: "January"},
                    {id: 2, value: "February"},
                    {id: 3, value: "March"},
                    {id: 4, value: "April"},
                    {id: 5, value: "May"},
                    {id: 6, value: "June"},
                    ]
            }
    ];
    response.send(data);
});

router.post('/api/v1/postData', function(request, response) {
    var color = request.body.color;
    if (color) {
        color = color.charAt(0).toUpperCase() + color.substring(1) + ' ';
    }
    var data = {
        message: color + 'Monday??'
    };
    response.send(data);
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
    var addr = server.address();
    console.log("Server listening at", addr.address + ":" + addr.port);
});
