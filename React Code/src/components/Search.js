import React from "react"
import "../css/search.css"
import location from "../media/location.svg"
import search from "../media/search.svg"
import clouds from "../media/clouds.svg"
import rain from "../media/rain.svg"
import sun from "../media/sun.png"
import mist from "../media/mist.png"
import haze from "../media/haze.png"

import MiniWeather from "./MiniWeather"
import GraphComponent from "./GraphComponent.js"

class Search extends React.Component{
    
    constructor(props){
        super(props)
        this.state={
            cityName:"Mumbai",
            stateName:"Maharashra",
            searchString:"Mumbai, Maharashtra",
            searchResults:[],
            currentTemperature:0,
            currentWeather:{},
            dailyWeather:[],
            hourlyWeather:[]
        };

        this.searchText = this.searchText.bind(this);
        this.selectCity = this.selectCity.bind(this);
    }
    
    selectCity(city,state,coord){
        let str = `${city}, ${state}`;
        document.getElementById("dropdown").style.display="none";
        let url = `http://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=minutely&appid=9e2a8bf2d665766c4005240c404f861a`
        console.log(url)
        fetch(url).then(response=> response.json()).then(data=>{this.setState({cityName:city, 
                                                                               stateName:state, 
                                                                               searchString:str, 
                                                                               searchResults:[], 
                                                                               dailyWeather:data.daily, 
                                                                               hourlyWeather: data.hourly
                                                                              })})

    }
    
    searchText(event){
        document.getElementById("dropdown").style.display="block";
        let searchData = []
        if(event.target.value==="" || event.target.value===undefined)
            {
                this.setState({searchResults:[], searchString:""})
            }else {
                
                this.setState({searchString: event.target.value}, function(){
                    let url = "http://localhost:8000/search?searchText="+this.state.searchString;
                    fetch(url).then((response)=>response.json()).then(
                        data => searchData=data).then(dataArray => dataArray.forEach((element,index)=>{
                            let uri = `http://api.openweathermap.org/data/2.5/weather?q=${element.name}&appid=9e2a8bf2d665766c4005240c404f861a`
                            fetch(uri).then(response=>response.json()).then(data=>
                                                                            { if(data.weather!=undefined){
                                                                                    searchData[index].weather=data.weather[0].main; 
                                                                                    if(data.weather[0].main==="Clouds") searchData[index].icon=clouds;
                                                                                    else if(data.weather[0].main==="Rain") searchData[index].icon=rain;
                                                                                    else if(data.weather[0].main==="Mist") searchData[index].icon=mist;
                                                                                    else if(data.weather[0].main==="Sun") searchData[index].icon=sun;
                                                                                    else if(data.weather[0].main==="Clear") searchData[index].icon=sun;
                                                                                    else if(data.weather[0].main==="Haze") searchData[index].icon=haze;
                                                                                }else {searchData[index].icon=sun; searchData[index].temperature=29;}
                                                                                if(data.main!=undefined)searchData[index].temperature=Math.trunc(data.main.temp-273.15);
                                                                                this.setState({searchResults:searchData})
                                                                             }
                                                                      )
                        }))
                });
                
            }
        
    }
    //{ lon: 72.847939, lat: 19.01441 }
    componentDidMount(){
    if(!navigator.geolocation) {
        // Default location considered Mumbai
        console.log('Geolocation is not supported by your browser');
        let url = `http://api.openweathermap.org/data/2.5/onecall?lat=72.847939&lon=19.01441&exclude=minutely&appid=9e2a8bf2d665766c4005240c404f861a`
        console.log(url)
        fetch(url).then(response=> response.json()).then(data=>{this.setState({dailyWeather:data.daily, 
                                                                               hourlyWeather: data.hourly
                                                                              })
                                                               })

    } else {
        navigator.geolocation.getCurrentPosition((position)=>{console.log(position)}, (error)=>{console.log("Cannot fetch your location")});
        let city=""
        let state=""
        fetch("http://ip-api.com/json/").then(response=>response.json()).then(data=>{
            let url = "http://localhost:8000/search?searchText=" + data.city;
            fetch(url).then(response=>response.json()).then(data=>{
                if(data[0]){
                    //console.log(data[0])
                    city=data[0].city;
                    state=data[0].state;
                    let url = `http://api.openweathermap.org/data/2.5/onecall?lat=${data[0].coord.lat}&lon=${data[0].coord.lon}&exclude=minutely&appid=9e2a8bf2d665766c4005240c404f861a`
                    fetch(url).then(response=>response.json()).then(data=> this.setState({
                        cityName: city,
                        stateName: state,
                        dailyWeather:data.daily,
                        hourlyWeather:data.hourlyWeather
                    }))
                }
                
            });
        });
    }
    }
        
    
    
    render(){
        console.log(this.state.dailyWeather)
        var ele = ""
        if(this.state.dailyWeather.length>0) ele = (<MiniWeather daily={this.state.dailyWeather}/>);
        return(
            <div>
                <div className="search-container">
                    <img className="location-icon" alt="Location icon" src={location}></img>
                    <input type="text" placeholder="" id="searchbox" value={this.state.searchString} onChange={this.searchText}></input>
                    <img className="search-icon" alt="Search icon" src={search}></img>
                </div>
                <div className="search-results" id="dropdown">
                    {   
                        this.state.searchResults.map(
                            (element,index)=> (<button key={index} alt="Options" onClick={()=>this.selectCity(element.name, element.state, element.coord)} className="result">{element.name}, {element.state}
                                        <div className="mini-weather-dropdown"> 
                                            <div className="temp-weather-dropdown">
                                                <span className="temp-dropdown">{element.temperature}&deg; C</span>
                                                <span className="weather-dropdown">{element.weather}</span>
                                            </div>
                                            <img className="drop-down-weather" alt="Drop down weather" src={element.icon} />
                                        </div>
                                        </button>)
                            
                        )
                    
                    }
                </div>
                <br></br>
                {
                    ele
                }
                <br></br>
                
            </div>
        )    
    }
}
export default Search