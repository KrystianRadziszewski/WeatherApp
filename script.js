const input = document.querySelector('input');
const button = document.querySelector('button');
const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');
const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity');

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q=';
const API_KEY = '&appid=22e4711ee611bdda701add966674b672';
const API_UNITS = '&units=metric';
const API_LANG = '&lang=pl';

const getWeather = () => {
	const city = input.value || 'Białystok' || 'Bialystok';
	const URL = API_LINK + city + API_LANG + API_KEY + API_UNITS;

	axios
		.get(URL)
		.then((res) => {
			const temp = res.data.main.temp;
			const hum = res.data.main.humidity;
			const status = Object.assign({}, ...res.data.weather);

			warning.textContent = '';
			input.value = '';

			cityName.textContent = res.data.name;
			weather.textContent = status.main;
			temperature.textContent = Math.floor(temp) + '℃';
			humidity.textContent = hum + '%';

			if (status.id >= 200 && status.id < 300) {
				photo.setAttribute('src', './img/thunderstorm.png');
			} else if (status.id >= 300 && status.id < 400) {
				photo.setAttribute('src', './img/drizzle.png');
			} else if (status.id >= 500 && status.id < 600) {
				photo.setAttribute('src', './img/rain.png');
			} else if (status.id >= 600 && status.id < 700) {
				photo.setAttribute('src', './img/ice.png');
			} else if (status.id >= 700 && status.id < 800) {
				photo.setAttribute('src', './img/fog.png');
			} else if (status.id === 800) {
				photo.setAttribute('src', './img/sun.png');
			} else if (status.id >= 800 && status.id < 900) {
				photo.setAttribute('src', './img/cloud.png');
			}
		})
		.catch(() => (warning.textContent = 'Wpisz poprawną nazwę miasta.'));
};

const enterCheck = (e) => {
	if (e.key === 'Enter') {
		getWeather();
	}
};

input.addEventListener('keyup', enterCheck);
button.addEventListener('click', getWeather);
getWeather();
