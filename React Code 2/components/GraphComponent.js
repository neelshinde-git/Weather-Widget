import React from "react"
import "../css/graphcomponent.css"
import sun from "../media/sun.png"
import clouds from "../media/clouds.svg"
import rain from "../media/rain.svg"
import mist from "../media/mist.png"
import haze from "../media/haze.png"


function GraphComponent(props){
    //console.log(props.temp)
    return(
        <div className="middle-container">
            <div className="temperature">
                <span>{props.temp}&deg;C</span>
                <img src={sun}></img>
            </div>
        </div>
    
    
    )
}

export default GraphComponent