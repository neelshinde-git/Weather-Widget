import React, {useState} from "react"
import "../css/miniweather.css"
import sun from "../media/sun.png"
import clouds from "../media/clouds.svg"
import rain from "../media/rain.svg"
import mist from "../media/mist.png"
import haze from "../media/haze.png"
import GraphComponent from "./GraphComponent"

function MiniWeather(props){
    
    let weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    let src=sun;
    let buttons = []
    const [index,setIndex] = useState(0);
    var childprops={index:0,icon:""};
    
    if(props.daily!=undefined){
        for(let i=0;i<5;i++){
            let date = new Date(props.daily[i].dt * 1000);
            let day= weekday[date.getDay()];
            let mainTemp=Math.trunc(props.daily[i].temp.max-273.15);
            let secondTemp=Math.trunc(props.daily[i].temp.min-273.15);
            let weather = props.daily[i].weather[0].main;
            
            if(props.daily[i].weather[0].main==="Clouds") src=clouds;
            else if(props.daily[i].weather[0].main==="Rain") src=rain;
            else if(props.daily[i].weather[0].main==="Mist") src=mist;
            else if(props.daily[i].weather[0].main==="Sun") src=sun;
            else if(props.daily[i].weather[0].main==="Clear") src=sun;
            else if(props.daily[i].weather[0].main==="Haze") src=haze;
            
            buttons.push(<button key={i} className="day-button" onClick={()=>{childprops.index=i; childprops.icon=src; console.log(Math.trunc(props.daily[i].temp.day-273.15))}}>
                    <span className="day"><b>{day}</b></span>
                    <div className="miniwidget">
                        <span><b>{mainTemp}&deg; </b> </span>
                        <span className="second-temp">{secondTemp}&deg;</span>
                    </div>
                    <img src={src}></img>
                    <span className="short-weather">{weather}</span>
                </button>)
        }
        
    }
    
    
    return(
        <div>
            <div className="miniweather">

                {buttons}

            </div>
            <br></br>
            <GraphComponent temp={Math.trunc(props.daily[childprops.index].temp.day-273.15)}/>
        </div>
        
        
    )
}

export default MiniWeather