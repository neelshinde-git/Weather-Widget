import React from "react"
import {
  ResponsiveContainer,AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';
import "../css/graphcomponent.css"
import sun from "../media/sun.png"
import clouds from "../media/clouds.svg"
import rain from "../media/rain.svg"
import mist from "../media/mist.png"
import haze from "../media/haze.png"


class GraphComponent extends React.Component{
    ////console.log(this.props.data.temp)
    constructor(props){
        super(props)
    }

    
render(){
    const data = [];
    //console.log(this.props.data)
    var graphDimension = {width: 800, height: 200};
    let count=0;
    for(let i=0; i<48;i++){
        
        let showDay = new Date(this.props.data.hourly[i].dt * 1000).getDay()
        let currentDay = new Date().getDay();
        
        if(this.props.data.button===0){
            if(showDay===currentDay) {
                //console.log("Today")
                let hours = new Date(this.props.data.hourly[i].dt * 1000).getHours()
                let hoursString;
                if (hours < 12) hoursString = hours + "am"
                else if (hours > 12) hoursString = (hours-12) + "pm"
                else if(hours==12) hoursString = hours + "pm"
                let temp = Math.trunc(this.props.data.hourly[i].temp - 273.15)
                data.push({name: hoursString, temp: temp, pv: 0, amt: 0})
                count++;
                //console.log("Button: " + this.props.data.button + "Show Day: " + showDay + " Props day: "+ currentDay)
            } 
        }else if(this.props.data.button===1){
                if((showDay===currentDay+1 && currentDay!==6) ||(showDay===0 && currentDay===6) ){
                    let hours = new Date(this.props.data.hourly[i].dt * 1000).getHours()
                    let hoursString;
                    if (hours < 12) hoursString = hours + "am"
                    else if (hours > 12) hoursString = (hours-12) + "pm"
                    else if(hours==12) hoursString = hours + "pm"
                    let temp = Math.trunc(this.props.data.hourly[i].temp - 273.15)
                    data.push({name: hoursString, temp: temp, pv: 0, amt: 0})
                    count++;
                    //console.log("Button: " + this.props.data.button + "Show Day: " + showDay + " Props day: "+ currentDay)
                }
        } else if(this.props.data.button===2){
                //console.log("here  " + showDay)
                if((showDay===currentDay+2 && currentDay<5) || (currentDay===5 && showDay===0) || (currentDay===6 && showDay===1)){
                    let hours = new Date(this.props.data.hourly[i].dt * 1000).getHours()
                    let hoursString;
                    if (hours < 12) hoursString = hours + "am"
                    else if (hours > 12) hoursString = (hours-12) + "pm"
                    else if(hours==12) hoursString = hours + "pm"
                    let temp = Math.trunc(this.props.data.hourly[i].temp - 273.15)
                    data.push({name: hoursString, temp: temp, pv: 0, amt: 0})
                    count++;
                    //console.log("Button: " + this.props.data.button + "Show Day: " + showDay + " Props day: "+ currentDay)
                }
        } /*else if(this.props.data.button===3){
                //console.log("here  " + showDay)
                if((showDay===currentDay+2 && currentDay<5) || (currentDay===5 && showDay===0) || (currentDay===6 && showDay===1)){
                    let hours = new Date(this.props.data.hourly[i].dt * 1000).getHours()
                    let hoursString;
                    if (hours < 12) hoursString = hours + "am"
                    else if (hours > 12) hoursString = (hours-12) + "pm"
                    else if(hours==12) hoursString = hours + "pm"
                    let temp = Math.trunc(this.props.data.hourly[i].temp - 273.15)
                    data.push({name: hoursString, temp: temp, pv: 0, amt: 0})
                    //console.log("Button: " + this.props.data.button + "Show Day: " + showDay + " Props day: "+ currentDay)
                }
        }*/
    }
    if(count>12) graphDimension={width:1300, height: 200}

    var icon=sun
    if(this.props.data.currentIcon==="Clouds") icon=clouds;
    else if(this.props.data.currentIcon==="Rain") icon=rain;
    else if(this.props.data.currentIcon==="Mist") icon=mist;
    else if(this.props.data.currentIcon==="Sun") icon=sun;
    else if(this.props.data.currentIcon==="Clear") icon=sun;
    else if(this.props.data.currentIcon==="Haze") icon=haze;
    //console.log("Graph rendered")
    
    let sunrise = {hours: new Date(this.props.data.daily[this.props.data.button].sunrise * 1000).getHours(), min: new Date(this.props.data.daily[this.props.data.button].sunrise * 1000).getMinutes()};
    if(sunrise.hours>12) sunrise.hours=sunrise.hours-12;
    let sunset = {hours: new Date(this.props.data.daily[this.props.data.button].sunset * 1000).getHours(), min: new Date(this.props.data.daily[this.props.data.button].sunset * 1000).getMinutes()};
    if(sunset.hours>12) sunset.hours=sunset.hours-12;
    let currentSunrise = {hours: new Date(this.props.data.current.sunrise * 1000).getHours(), min: new Date(this.props.data.current.sunrise * 1000).getMinutes()};
    if(currentSunrise.hours>12) currentSunrise.hours=currentSunrise.hours-12;
    let currentSunset = {hours: new Date(this.props.data.current.sunset * 1000).getHours(), min: new Date(this.props.data.current.sunset * 1000).getMinutes()};
    if(currentSunset.hours>12) currentSunset.hours=currentSunset.hours-12;
    return(
        <div className="middle-container">
            <div className="temperature">
                <span>{Math.trunc(this.props.data.temp-273.15)}&deg;C</span>
                <img src={icon}></img>
            </div>
            <div className="graph-container1">
                <div className="graph1">
                <AreaChart
                    width={graphDimension.width}
                    height={graphDimension.height}
                    data={data}
                    margin={{
                    top: 10, right: 30, left: 0, bottom: 0,
                    }}
                >
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="40%" stopColor="#3BB9FF" stopOpacity={0.8}/>
                        <stop offset="60%" stopColor="#ffffff" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid horizontal={false}/>
                    <XAxis dataKey="name" axisLine={false}/>
                    <YAxis hide={true} tick={false}/>
                    <Tooltip />
                    <Area type="monotone" dataKey="temp"  fill="url(#colorUv)" />
                </AreaChart>
                </div>
                <br></br>
                <div className="humidity-container">
                    <span><b>Pressure</b><br />{this.props.data.daily[this.props.data.button].pressure} hpa</span>
                    <span><b>Humidity</b><br />{this.props.data.daily[this.props.data.button].humidity} %</span>
                </div>
                <br></br>
                <br></br>
                <div className="sunrise-container">
                    <span><b>Sunrise</b><br /><span>{sunrise.hours}:{sunrise.min}am</span></span>
                    <span><b>Sunset</b><br /><span>{sunset.hours}:{sunset.min}pm</span></span>
                </div>
                <br></br>
                <div className="sunrise-graph">
                    <ResponsiveContainer width="100%" height={150}>
                        <AreaChart
                            data={[{name: "", sunPlot: 0, pv: 0, amt: 0},
                                   {name: `${currentSunrise.hours}:${currentSunrise.min}am`, sunPlot: 0, pv: 0, amt: 0},
                                   {name: "3am", sunPlot: 100, pv: 0, amt: 0},
                                   {name: `${currentSunset.hours}:${currentSunset.min}pm`, sunPlot: 0, pv: 0, amt: 0},
                                   {name: "", sunPlot: 0, pv: 0, amt: 0}]}
                            margin={{
                            top: 10, right: 30, left: 0, bottom: 0,
                            }}
                        >
                            <defs>
                                <linearGradient id="sunColor" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#fee576" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#fee576" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid horizontal={false} vertical={false}/>
                            <XAxis dataKey="name" />
                            <YAxis hide={true} tick={false}/>

                            <Area type="monotone" dataKey="sunPlot" stroke="#fee576" fill="url(#sunColor)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    
    
    )
}
}

export default GraphComponent