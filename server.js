var http = require('http');
var path = require('path');
var fs = require('fs');

function requestEvent(req, res){
	var resource = '.'+req.url;
	var ext = path.extname(resource);

	if(resource === './'){
		resource = './index.html';
	}
	console.log(resource);
	
	var contentType ='text/html';
	switch(ext){
		case '.css':{
			contentType ='text/css';
			break;
		}
		case '.js':{
			contentType ='text/javascript';
			break;
		}
		case '.html':{
			contentType ='text/html';
			break;
		}
	}
	fs.exists(resource, function(exist){
		if(exist){
			fs.readFile(resource, function(err, data){
				if(err){
					res.writeHead(500);
					res.end('Internal Server Error');
				}else{
					res.writeHead(200,{'content-type':contentType});
					res.end(data);
				}
			});
		}else{
			res.writeHead(404);
			res.end('Not Found');
		}
	});

	res.setHeader('content-type', 'text/javascript');
}

var server = http.createServer(requestEvent);
server.listen(8000);
console.log("Server running...");
