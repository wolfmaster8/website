const getMainInformation = (info) => {
    return {
        location: {
            city: info.name,
        },
        atmospheric: {
            temperature: convertTemperatureToCelsius(info.main.temp),
            pressure: info.main.pressure,
            humidity: info.main.humidity
        },
        weather: {
            main: info.weather[0].main,
            description: info.weather[0].description,
        },
        icon: getIcon(info.weather[0].main.toLowerCase()),
        theme: defineTheme()
    }
}

const convertTemperatureToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(0)
};

const defineTheme = () => {
    const date = new Date();
    const hours = date.getHours();
    console.log(hours);
    if (hours <= 5 || hours >= 18) {
        return 'dark'
    } else {
        return 'light'
    }
};

const getIcon = (type) => {
    switch (type) {
        case 'clouds':
            return {icon: 'cloud', color: 'gray'}
        case 'thunderstorm':
            return {icon: 'cloud-showers-heavy', color: 'rain'}
        case 'rain':
            return {icon: 'cloud-rain', color: 'rain'};
        case 'drizzle':
            return {icon: 'cloud-sun-rain', color: 'gray'}
        case 'clear':
            return {icon: 'sun', color: 'yellow'}
        case 'snow':
            return {icon: 'snowflake', color: 'rain'};
        default:
            return {icon: 'cloud', color: 'gray'}
    }
};

async function getWeather(city = 'Bogota') {
    const weather = await $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?APPID=9f1cb634ec747082eb0732356b6d147b&q=${city},co`
    });
    return getMainInformation(weather)
}
