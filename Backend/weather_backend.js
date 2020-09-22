var express = require('express');
var app = express();
var cors = require('cors');
var cities = require('./city.list.json')

const port = 8000;


app.use(cors())

app.get('/search',function(req,res){
	console.log("********************")
	let count = 0;
	let citiesSearch = [];
	if(req.query.searchText!=""){
		for(let i=0; i<cities.length; i++){
			if(count < 5){
				if (cities[i].name.includes(req.query.searchText)){
					count ++;
					let state=""
					if (cities[i].state=="") citiesSearch.push({name: cities[i].name, state:cities[i].name, coord: cities[i].coord})
					else citiesSearch.push({name: cities[i].name, state:cities[i].state,  coord: cities[i].coord, weather:"", temperature:""})
					console.log(cities[i])
				}
			} else {
				break;
				}
		}
		console.log(req.query.searchText);
		res.send(citiesSearch);
	} else {
		res.send(citiesSearch)
	}
})


app.get('/api',function(req,res){
    res.send("Backend Available :\)");
    
});

app.listen(port, 'localhost',() => console.log('Color Me Crazy API running on port ' + port));