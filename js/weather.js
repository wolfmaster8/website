const getMainInformation = (info) => {
    console.log(info.weather);
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
    return kelvin - 273.15
};

const defineTheme = () => {
    const date = new Date();
    const hours = date.getHours();
    if (hours <= 5) {
        return 'dark'
    } else {
        return 'light'
    }
};

const getIcon = (type) => {
    switch (type) {
        case 'clouds':
            return {icon: 'cloud', color: 'gray'}
    }
};

function getWeather() {
    const weather = {
        "message": "accurate",
        "cod": "200",
        "count": 1,
        "list": [{
            "id": 3688689,
            "name": "Bogota",
            "coord": {"lat": 4.5981, "lon": -74.0762},
            "main": {"temp": 287.15, "pressure": 1027, "humidity": 67, "temp_min": 287.15, "temp_max": 287.15},
            "dt": 1572574172,
            "wind": {"speed": 2.36, "deg": 68.912},
            "sys": {"country": "CO"},
            "rain": null,
            "snow": null,
            "clouds": {"all": 40},
            "weather": [{"id": 802, "main": "Clouds", "description": "scattered clouds", "icon": "03n"}]
        }]
    };
    return getMainInformation(weather.list[0])
}