const apiKey = 'd92e3b7365d2e22d7605e9aeb27c267e';

let form = document.getElementById('weather-form');
let weatherInfo = document.getElementById('weather-info');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    let city = document.getElementById('city').value;
    getWeather(city);
});

async function getWeather(city) {
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
        let data = await response.json();
        console.log(data)

        let main = data.weather[0].main
        let desc = data.weather[0].description
        let iconcode = data.weather[0].icon
        let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        let base = data.base
        let temp = data.main.temp
        let pressure = data.main.pressure
        let humidity = data.main.humidity
        let w_speed = data.wind.speed

        console.log(desc)

        let card = `
            <div class="card justify-content-center" style='width:50rem'>
                <div class="card-body bg-secondary">
                    <h5 class="card-title text-center fs-1 text-white fw-bold">${data.name}</h5>
                </div>
                <ul class="list-group list-group-flush fs-3 fw-bold">
                    <li class="list-group-item text-center"><img src="${iconurl}" class="card-img-top" alt="icon" style='width:19%'></li>
                    <li class="list-group-item">Main : ${main}</li> 
                    <li class="list-group-item">Desc : ${desc}</li>
                    <li class="list-group-item">Base : ${base}</li>
                    <li class="list-group-item">Temprature : ${temp - 273.15}&deg;C</li>
                    <li class="list-group-item">Pressure : ${pressure}</li>
                    <li class="list-group-item">Humidity : ${humidity}</li>
                    <li class="list-group-item">Wind Speed : ${w_speed}</li>
                    
                </ul>
            </div>
        `;
        weatherInfo.innerHTML = card;
    } catch (error) {
        console.error('error fetching the weather data');
    }
}