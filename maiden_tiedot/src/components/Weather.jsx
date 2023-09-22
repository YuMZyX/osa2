import { useEffect, useState } from "react"
import axios from "axios"

const Weather = ({ country }) => {

    const [lat, setLat] = useState('')
    const [lon, setLon] = useState('')
    const [geoInfo, setGeoInfo] = useState(false)
    const [weatherInfo, setWeatherInfo] = useState(false)
    const [weatherData, setWeatherData] = useState([])

    const capital = country.capital
    const api_key = import.meta.env.VITE_SOME_KEY

    useEffect(() => {
        axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${capital}&limit=1&appid=${api_key}`)
        .then(response => {
            setGeoInfo(true)
            setLon(response.data[0].lon)
            setLat(response.data[0].lat)   
        })
    }, [])
    
    useEffect(() => {
        if (geoInfo) {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`)
            .then(response => {
            setGeoInfo(false)
            setWeatherData(response.data)
            setWeatherInfo(true)
        })
        }
    }, [geoInfo])
    
    if (weatherInfo) {
        const icon = weatherData.weather[0].icon
        const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`
        return (
            <div>
                <h3>Weather in {capital}</h3>
                temperature {weatherData.main.temp} Celsius
                <div><img src={iconUrl}></img></div>
                wind {weatherData.wind.speed} m/s
            </div>
        )
    }
}

export default Weather