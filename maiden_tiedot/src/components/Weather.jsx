import { useEffect, useState } from "react"
import axios from "axios"

const Weather = ({ country }) => {

    const [lat, setLat] = useState('')
    const [lon, setLon] = useState('')
    const [geoInfo, setGeoInfo] = useState([])
    const [weatherInfo, setWeatherInfo] = useState([])

    const capital = country.capital
    const api_key = import.meta.env.VITE_SOME_KEY

    useEffect(() => {
        axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${capital}&limit=1&appid=${api_key}`)
        .then(response => {
            setGeoInfo(response.data)
            setLon(response.data[0].lon)
            setLat(response.data[0].lat)   
        })
    }, [])

    /*
    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${api_key}`)
        .then(response => {
            console.log(response.data)
        })
    }, [])
    */

    console.log(lon, lat)

    return (
        <div>

        </div>
    )
}

/*
axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${api_key}`)
        .then(response => {
            console.log(response.data)
        })

*/

export default Weather