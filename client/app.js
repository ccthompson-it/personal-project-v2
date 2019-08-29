import {loadWeather} from './api'
import moment from 'moment'

export function launchApp() {
// if time load db
// else load weather 
loadWeather()
.then(result => {
  sortData(result.body)
  return result
})
.then(result => {
  renderData(result.body)
})
}

function renderData(weatherData) {

let html = `<h1>${weatherData.name} - ${weatherData.sys.country}</h1>
            <h2>Temperature</h2>
            <p>Current Temp: ${weatherData.main.temp}<p>
            <p>Max Temp: ${weatherData.main.temp_max}<p>
            <p>Min Temp: ${weatherData.main.temp_min}<p>
            <p>Humidity: ${weatherData.main.humidity}<p>
            <h2>Other Information</h2>
            <p>Sunrise: ${moment.unix(weatherData.sys.sunrise)}<p>
            <p>Sunset: ${moment.unix(weatherData.sys.sunset)}<p>

`
document.getElementById('weather-data').innerHTML = html
}

function sortData(weatherData) {
  console.log(weatherData)
  
let city = weatherData.name // city = 'wgtn' / 'auk' / 'chch'
 console.log(city)
let dayData = {}

}