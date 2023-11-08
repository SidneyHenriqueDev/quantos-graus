const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const APIKey = 'dc7b74fca1546b1655ddcd5205631f17';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}&lang=pt_br`)
        .then(response => response.json())
        .then(data => {

            if (data.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (data.weather[0].main) {
                //sky clean no rain very sun
                case 'Clear':
                    image.src = '/img/clear.png';
                    document.getElementById('background').style.backgroundImage = url("../img/sol.jpg")
                    document.getElementById('background').style.backgroundRepeat = 'no-repat'
                    document.getElementById('background').style.backgroundSize = 'cover'
                    break;
                // is rain
                case 'Rain':
                    image.src = '/img/rain.png';
                    document.getElementById('background').style.backgroundImage = url("../img/chuva.jpg")
                    document.getElementById('background').style.backgroundRepeat = 'no-repat'
                    document.getElementById('background').style.backgroundSize = 'cover'
                    break;

                case 'Snow':
                    image.src = '/img/snow.png';

                    document.getElementById('background').style.backgroundImage = url("../img/neve.jpg")
                    document.getElementById('background').style.backgroundRepeat = 'no-repat'
                    document.getElementById('background').style.backgroundSize = 'cover'
                    break;

                case 'Clouds':
                    image.src = '/img/cloud.png';
                    document.getElementById('background').style.backgroundImage = url("../img/nublado.jpeg")
                    document.getElementById('background').style.backgroundRepeat = 'no-repat'
                    document.getElementById('background').style.backgroundSize = 'cover'
                    break;

                case 'Haze':
                    image.src = '/img/mist.png';
                    break;

                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(data.main.temp)}<span>°C</span>`;
            description.innerHTML = `${data.weather[0].description}`;
            humidity.innerHTML = `${data.main.humidity}%`;
            wind.innerHTML = `${parseInt(data.wind.speed)}Km/h`;
            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';


        });


});