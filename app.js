/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});

// create a new message
var create_message = function(req, res) {
require('cloudantdb').connect(cloudant.url, function(err, conn) {
var collection = conn.collection('messages');

// create message record
var parsedUrl = require('url').parse(req.url, true);
var queryObject = parsedUrl.query;
var name = (queryObject["name"] || 'Bluemix');
var message = { 'message': 'Hello, ' + name, 'ts': new Date()
};
collection.insert(message, {safe:true}, function(err){
 if (err) { console.log(err.stack); }
 res.writeHead(200, {'Content-Type': 'text/plain'});
 res.write(JSON.stringify(message));
 res.end('\n');
});
});
}
