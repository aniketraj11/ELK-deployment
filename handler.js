var sys = require('util')
var exec = require('child_process').exec;
var child;
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(client) { 
    console.log('Client connected...');

    client.on('clicked', function(data) {
       
	console.log("Dataaaaaaaa ");
	callPlay();
    });
  
});

//function puts(error, stdout, stderr) { console.log(stdout) }
function callPlay(){
exec("ansible-playbook ansible/playbooks/test.yml --extra-vars 'mytype=version'", function (error, stdout, stderr){
    console.log(stdout);
});
}

server.listen(5050, function(){
    console.log('listening on *:5050');
});
