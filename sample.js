

var express = require('express');
var app = express();
var fs = require("fs");
var apiRouter=express.Router();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
   
apiRouter.route('/')
  .get(function(request, response) {
  
     response.contentType('application/json');
     fs.readFile('person.json','utf8',function(err,data){
       
       if(err){
     	console.log(err);
       }

       else{
     	     var people = JSON.parse(data);
             console.log(people);

             for(var i=0;i<people.length;i++) {
           	    console.log(people[i].name);
             }
             
             response.send(people);
           }
    });
 });

 

  apiRouter.route('/:name')
  .get(function(request, response) {
  
    response.contentType('application/json');
    fs.readFile('person.json','utf8',function(err,data){
  	  var con;
      
      if(err){
     	console.log(err);
       }
     
      else {
     	   var people = JSON.parse(data);
           people=people.filter(function(items){
 				
 		   if(items.name==request.params.name){
 			con=items;
 			return con;
 		   }
 		});
           response.send(people);
       }
    });
 });

 
 apiRouter.route('/')
  .post(function(request,response){
  	var add_data;
  	fs.readFile('person.json','utf8',function(err,data){
  		
  		if(err){
  			console.log(err);
  		}
  		else {
  			data=JSON.parse(data);
  			console.log(data);
  			add_data=request.body;
  			console.log(add_data);
  			data.push(add_data);
  			data=JSON.stringify(data);
  			fs.writeFile('person.json',data,function(err,data){
  				if(err) {
  					console.log(err);
  				}
  			});
  			response.send(data.toString());
  		}
  	});
  });


apiRouter.route('/delete/:name') 
 .delete(function(request,response){
 	fs.readFile('person.json','utf8',function(err,data){
 		if(err) {
 			console.log(err);
 		}
 		else {
 		    var people=JSON.parse(data);
 		    people=people.filter(function(items){
 				return (items.name!=request.params.name);
 			});

 			people=JSON.stringify(people);
            console.log(data);
            fs.writeFile('person.json',people,function(err,data){
            	if(err){
            		console.log(err);
                }

            });

            response.send(people);
          }
 		
 	});
 });
 	

 apiRouter.route('/:name/:age') 
 .put(function(request,response){
 	fs.readFile('person.json','utf8',function(err,data){
 		if(err) {
 			console.log(err);
 		}
 		else {
 		    people=JSON.parse(data);
 		    people=people.filter(function(items){
 				if(items.name==request.params.name) {
 					items.age=request.params.age;
 				}
 				return items;
 			});
 			
 			people=JSON.stringify(people);
            console.log(people);
            fs.writeFile('person.json',people.toString(),function(err,data){
            	if(err){
            		console.log(err);
                }

            });

            response.send(people);
          }
 		
 	});
 });
 	

app.use('/user',apiRouter);
app.listen(8081,function(){
	console.log("Server started");
});