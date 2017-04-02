var express = require('express');
var router = express.Router();
var exec = require('child_process').exec;
var fs = require('fs');
var os = require('os');
var TwoStep = require("two-step");

module.exports = function(app) {
	app.post('/code',function(req,res){

		if(req.url=="/code"){

    		res.header("Access-Control-Allow-Origin", "*");
  			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  		}
  		console.log(req.body.lang);
		if(req.body.lang=="cpp"){
			cpp(req,res);
		}
		else if(req.body.lang=="c"){
			cprogram(req,res);
		}
		else if(req.body.lang=="python"){
			python(req,res);
		}
		else{
			java(req,res);
		}

	});

}

function cpp(req,res){
		var nameOfFile=randomIntInc(1,10000).toString()+'.cpp';
		var nameOfInputFile=randomIntInc(1,10000).toString()+'.txt';
		var nameOfCompileFile=randomIntInc(1,10000).toString();
		

	  	console.log(req.body.code);
		var fb=fs.openSync(nameOfInputFile, 'w');

		req.body.input.split('\n').forEach(function (line) {     	

    		fs.appendFileSync(nameOfInputFile, line.toString() + "\n");
    	
		});

		fs.closeSync(fb);
		fb=fs.openSync(nameOfFile, 'w');

		req.body.code.split('\n').forEach(function (line) { 
    	
    		fs.appendFileSync(nameOfFile, line.toString() + "\n");
    	
		});

		fs.closeSync(fb);	
		var cmd = 'g++ '+nameOfFile+' -o '+nameOfCompileFile;

		exec(cmd, function(error, stdout, stderr) {
  		
  			var jsonSend=({"response":null,"error":null,"time":null});
  			console.log("COMPLING...\n");
  			if(error){
  				console.log(stderr);  			
  				jsonSend.error=stderr;
  				res.json(jsonSend);
  				cmd='rm '+nameOfFile+' '+nameOfInputFile;

  				exec(cmd,function(error,stdout,stderr){

  					if(error){
  						console.log("Error in removing the file\n");
  					}
  					else{
  						console.log("Files removed\n");
  					}

  				});
  			}
  			else{
  				console.log("RUNNNING....\n");
  				var currtime = Date.now();
				console.log(currtime);  			  			
				
				cmd='timeout 5s ./'+nameOfCompileFile+' <'+nameOfInputFile;
  				exec(cmd,function(error,stdout,stderr){  				
  					if(error){

  						var newCurrtime = Date.now();
						var tle=((newCurrtime-currtime)/1000).toString();
  						if(tle>4){
  							jsonSend.error="Time Limit Exceeded "+tle;
  							jsonSend.time=tle.toString();
  							res.json(jsonSend);   						  				
  							
  						}
  						else{
  						console.log(stderr);
  						jsonSend.error=stderr;
  						jsonSend.time=tle.toString();
  						res.json(jsonSend);   						  				
  						}
  					}
  					else{
  						var newCurrtime = Date.now();
  						var exeTime=((newCurrtime-currtime)/1000).toString();
						console.log("time:"+(exeTime));
  						//console.log(stdout);
  						jsonSend.response=stdout;
  						jsonSend.time=exeTime.toString();
  						res.json(jsonSend);  				
  						cmd='rm '+nameOfFile+' '+nameOfInputFile+' '+nameOfCompileFile;  				  				
  				
  					}

  					cmd='rm '+nameOfFile+' '+nameOfInputFile+' '+nameOfCompileFile;
  					
  						exec(cmd,function(error,stdout,stderr){
  							if(error){
  								console.log("Error in removing the file\n");
  							}
  							else{
  								console.log("Files removed\n");
  							}

  						});  
  						
  						});  		  				

  			}

  		});

}

function cprogram(req,res){
		var nameOfFile=randomIntInc(1,10000).toString()+'.c';
		var nameOfInputFile=randomIntInc(1,10000).toString()+'.txt';
		var nameOfCompileFile=randomIntInc(1,10000).toString();
		

	  	console.log(req.body.code);
		var fb=fs.openSync(nameOfInputFile, 'w');

		req.body.input.split('\n').forEach(function (line) {     	

    		fs.appendFileSync(nameOfInputFile, line.toString() + "\n");
    	
		});

		fs.closeSync(fb);
		fb=fs.openSync(nameOfFile, 'w');

		req.body.code.split('\n').forEach(function (line) { 
    	
    		fs.appendFileSync(nameOfFile, line.toString() + "\n");
    	
		});

		fs.closeSync(fb);	
		var cmd = 'gcc '+nameOfFile+' -o '+nameOfCompileFile;

		exec(cmd, function(error, stdout, stderr) {
  		
  			var jsonSend=({"response":null,"error":null,"time":null});
  			console.log("COMPLING...\n");
  			if(error){
  				console.log(stderr);  			
  				jsonSend.error=stderr;
  				res.json(jsonSend);
  				cmd='rm '+nameOfFile+' '+nameOfInputFile;

  				exec(cmd,function(error,stdout,stderr){

  					if(error){
  						console.log("Error in removing the file\n");
  					}
  					else{
  						console.log("Files removed\n");
  					}

  				});
  			}
  			else{
  				console.log("RUNNNING....\n");
  				cmd='timeout 5s ./'+nameOfCompileFile+' <'+nameOfInputFile;
  					
				var currtime = Date.now();
				console.log(currtime);

				exec(cmd,function(error,stdout,stderr){  				
  					if(error){
  						
  						var newCurrtime = Date.now();
						var tle=((newCurrtime-currtime)/1000).toString();
  						if(tle>4){
  							jsonSend.error="Time Limit Exceeded "+tle;
  							jsonSend.time=tle.toString();
  							res.json(jsonSend);   						  				
  							
  						}
  						else{
  						console.log(stderr);
  						jsonSend.error=stderr;
  						jsonSend.time=tle.toString();
  						res.json(jsonSend);   						  				
  						}
  						cmd='rm '+nameOfFile+' '+nameOfInputFile;

  						exec(cmd,function(error,stdout,stderr){
  						
  							if(error){
  								console.log("Error in removing the file\n");
  							}
  							else{
  								console.log("Files removed\n");
  							}

	  					});
  					}
  					else{
  						var newCurrtime = Date.now();
  						var exeTime=((newCurrtime-currtime)/1000).toString();
						console.log("time:"+exeTime);
  						console.log(stdout);
  						jsonSend.response=stdout;
  						jsonSend.time=exeTime.toString()
  						res.json(jsonSend); 
  						cmd='rm '+nameOfFile+' '+nameOfInputFile+' '+nameOfCompileFile;

  						exec(cmd,function(error,stdout,stderr){
  						
  							if(error){
  								console.log("Error in removing the file\n");
  							}
  							else{
  								console.log("Files removed\n");
  							}

	  					}); 				
  				
  					}
  					

  				});  			

  			}

  		});

}

function python(req,res){
		var nameOfFile=randomIntInc(1,10000).toString()+'.py';
		var nameOfInputFile=randomIntInc(1,10000).toString()+'.txt';
		
		/* WRITING INTO TEXT FILE */
	  	console.log(req.body.code);
		var fb=fs.openSync(nameOfInputFile, 'w');

		req.body.input.split('\n').forEach(function (line) {     	

    		fs.appendFileSync(nameOfInputFile, line.toString() + "\n");
    	
		});

		fs.closeSync(fb);

		/* WRITING INTO PROGRAM FILE */		
		fb=fs.openSync(nameOfFile, 'w');

		req.body.code.split('\n').forEach(function (line) { 
    	
    		fs.appendFileSync(nameOfFile, line.toString() + "\n");
    	
		});

		fs.closeSync(fb);	
		var cmd = 'timeout 25s python '+nameOfFile+' <'+nameOfInputFile;
		var currtime = Date.now();
		console.log(currtime);
		exec(cmd, function(error, stdout, stderr) {
  		
  			var jsonSend=({"response":null,"error":null});
  			console.log("COMPLING...\n");
  			if(error){
  						var newCurrtime = Date.now();
						var tle=((newCurrtime-currtime)/1000).toString();
  						if(tle>4){
  							jsonSend.error="Time Limit Exceeded "+tle;
  							jsonSend.time=tle;
  							res.json(jsonSend);   						  				
  							
  						}
  						else{
  						console.log(stderr);
  						jsonSend.error=stderr;
  						jsonSend.time=tle;
  						res.json(jsonSend);   						  				
  						}
  				cmd='rm '+nameOfFile+' '+nameOfInputFile;

  				exec(cmd,function(error,stdout,stderr){

  					if(error){
  						console.log("Error in removing the file\n");
  					}
  					else{
  						console.log("Files removed\n");
  					}

  				});
  			}
  			else{
  				var newCurrtime = Date.now();
				var tle=((newCurrtime-currtime)/1000).toString();
  				console.log("RUNNNING....\n");
  				console.log(stdout);
  				jsonSend.response=stdout;
  				jsonSend.time=tle;
  				res.json(jsonSend);
  				cmd='rm '+nameOfFile+' '+nameOfInputFile;

  				exec(cmd,function(error,stdout,stderr){
  					if(error){
  						console.log("Error in removing the file\n");
  					}
  					else{
  						console.log("Files removed\n");
  					}

  				});
  			}

  		});  			

}

function java(req,res){
		var nameOfFile=randomIntInc(1,10000).toString()+'.java';
		var nameOfInputFile=randomIntInc(1,10000).toString()+'.txt';
		var nameOfCompileFile="cypher";
		

	  	console.log(req.body.code);
		var fb=fs.openSync(nameOfInputFile, 'w');

		req.body.input.split('\n').forEach(function (line) {     	

    		fs.appendFileSync(nameOfInputFile, line.toString() + "\n");
    	
		});

		fs.closeSync(fb);
		fb=fs.openSync(nameOfFile, 'w');

		req.body.code.split('\n').forEach(function (line) { 
    	
    		fs.appendFileSync(nameOfFile, line.toString() + "\n");
    	
		});

		fs.closeSync(fb);	
		var cmd = 'javac '+nameOfFile;

		exec(cmd, function(error, stdout, stderr) {
  		
  			var jsonSend=({"response":null,"error":null,"time":null});
  			console.log("COMPLING...\n");
  			if(error){
  				console.log(stderr);  			
  				jsonSend.error=stderr;
  				res.json(jsonSend);
  				cmd='rm '+nameOfFile+' '+nameOfInputFile;

  				exec(cmd,function(error,stdout,stderr){

  					if(error){
  						console.log("Error in removing the file\n");
  					}
  					else{
  						console.log("Files removed\n");
  					}

  				});
  			}
  			else{
  				console.log("RUNNNING....\n");
  				cmd='timeout 5s java '+nameOfCompileFile+' <'+nameOfInputFile;
  				var currtime = Date.now();
				console.log(currtime);
  				exec(cmd,function(error,stdout,stderr){  				
  					if(error){
  						var newCurrtime = Date.now();
						var tle=((newCurrtime-currtime)/1000).toString();
  						if(tle>4){
  							jsonSend.error="Time Limit Exceeded "+tle;
  							jsonSend.time=tle;
  							res.json(jsonSend);   						  				
  							
  						}
  						else{
  						console.log(stderr);
  						jsonSend.error=stderr;
  						jsonSend.time=tle;
  						res.json(jsonSend);   						  				
  						}
  					}
  					else{
  						var newCurrtime = Date.now();
						var tle=((newCurrtime-currtime)/1000).toString();
  						console.log(stdout);
  						jsonSend.response=stdout;
  						jsonSend.time=tle;
  						res.json(jsonSend);  				
  				
  					}
  					cmd='rm '+nameOfFile+' '+nameOfInputFile+' '+nameOfCompileFile+".class";
  					
  					exec(cmd,function(error,stdout,stderr){
  						if(error){
  							console.log("Error in removing the file\n");
  						}
  						else{
  							console.log("Files removed\n");
  						}

  					});

  				});  			

  			}

  		});

}

function randomIntInc (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}


