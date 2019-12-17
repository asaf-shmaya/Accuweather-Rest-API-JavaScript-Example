var api = [];
api.searchUrl = 'https://localhost:44351/api/accuweather/search?';
api.searchExampleResponseToLocationTel = {
    data: [
        {
            locationKey: 215854,
            localizedName: 'Tel Aviv',
        },
        {
            locationKey: 3431644,
            localizedName: 'Telanaipura',
        },
        {
            locationKey: 300558,
            localizedName: 'Telok Blangah New Town',
        },
        {
            locationKey: 325876,
            localizedName: 'Telford',
        },
        {
            locationKey: 169072,
            localizedName: 'Telavi',
        },
        {
            locationKey: 230611,
            localizedName: 'Telsiai',
        },
        {
            locationKey: 2723742,
            localizedName: 'Telégrafo',
        },
        {
            locationKey: 186933,
            localizedName: 'Tela',
        },
        {
            locationKey: 3453754,
            localizedName: 'Telaga Asih',
        },
        {
            locationKey: 3453755,
            localizedName: 'Telagamurni',
        },
    ],
};
api.currentConditionsUrl = 'https://localhost:44351/api/accuweather/currentWeather?';
api.currentConditionsExampleResponse = {
    data: [
        {
            celsiusTemperature: 12.9,
            weatherText: 'Mostly clear',
        },
    ],
};