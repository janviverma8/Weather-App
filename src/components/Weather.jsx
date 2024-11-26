import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import Search_icon from '../assets/Search-icon.svg'
import Clear_icon from '../assets/Clear.svg'
import Cloud_icon from '../assets/Cloud.svg'

import Humidity_icon from '../assets/Humidity.svg'
import Rain_icon from '../assets/Rain.svg'
import Snow_icon from '../assets/Snow.svg'
import Wind_icon from '../assets/Wind.svg'


const Weather = () => {
    
     const inputRef = useRef()
    const [weatherData,setWeatherData]=useState(false);

    const allIcons = {
      "01d": Clear_icon,
      "02d":Rain_icon,
      "03d":Cloud_icon,
      "04d":Cloud_icon,
      "05d":Cloud_icon,
      "06d":Rain_icon,
      "07d":Rain_icon,
      "08d":Rain_icon,
      "09d":Snow_icon,
      "10n":Snow_icon,
      "50d":Snow_icon,
    }
   
  const search = async (city)=>{
if(city === ""){
   alert("Enter city name")
   return;
}

    try{
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
      
      const response = await fetch(url);
      const data = await response.json();

if(!response.ok){
  alert(data.message);
  return;
}

      console.log(data);
      const icon = allIcons[data.weather[0].icon] || Clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed:data.wind.speed,
        temperature:Math.floor(data.main.temp),
        location:data.name,
        icon:icon
      })
    }catch(error){
        setWeatherData(false);
        console.error("Error in fetching data");
        
    }
  }

  useEffect(()=>{
    search("London")
  },[])

  return (
    <div className='weather'>
      <div className='search-bar'>
        <input ref={inputRef} type="text" placeholder='search'/>
        <img src={Search_icon} height={22} width={20} alt='' onClick={()=>search(inputRef.current.value)}/>
      </div>
       <img src={weatherData.icon} alt='' className='weather-icon' height={80} width={80}  />
       <p className='temperature'>{weatherData.temperature}c</p>
       <p className='location'>{weatherData.location}</p>
       <div className='weather-data'>
        <div className='col'>
          <img src={Humidity_icon} alt=''/>
          <div>
            <p>{weatherData.humidity}</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className='col'>
          <img src={Wind_icon} alt=''/>
          <div>
            <p>{weatherData.windSpeed}</p>
            <span>Wind Speed</span>
          </div>
        </div>
       </div>
    
    </div>
  )
}

export default Weather