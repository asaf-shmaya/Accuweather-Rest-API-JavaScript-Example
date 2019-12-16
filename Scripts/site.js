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
api.currentConditionsUrl = 'https://localhost:44351/api/accuweather/getCurrentWeather?';
api.currentConditionsExampleResponse = {
    data: [
        {
            celsiusTemperature: 12.9,
            weatherText: 'Mostly clear',
        },
    ],
};

/*
 *  api.currentConditionsExampleResponse.data[0].celsiusTemperature
    api.currentConditionsExampleResponse.data[0].weatherText
 */
 
var search = [];
search.attachEvent = function () {
    $('#btn-search').click(function () {
        $.ajax({
            method: 'GET',
            url: api.searchUrl,
            data: { location: $('#txtLocation').val() },
            success: function (response) {
                search.populateResults(response);
            },
            error: function (xhr, status) {
                console.log('statusText: ' + xhr.statusText);
            }
        });
    });
};

search.populateResults = function (results) {
    if (!results) { results = api.searchExampleResponseToLocationTel; }

    results.data.forEach(function (item, index) {
        // GET TEMPLATE CLONE
        var searchResultTemplate = $($('#templates #locations-template')[0].outerHTML).clone();
        // REMOVE ID FROM TEMPLATE GENERATION
        searchResultTemplate.removeAttr('id');
        // REPLACE PLACEHOLDERS TEXT / VALUES
        searchResultTemplate.attr('locationkey', item.locationKey);
        searchResultTemplate.find('a').text(item.localizedName);
        // ATTACH TO DESIGNATED PLACE
        searchResultTemplate.appendTo($("#locationsSearchResults"));
    }); 

    currentConditions.attachEvent();
};

var currentConditions = [];
currentConditions.localizedName = 'Tesla';
currentConditions.attachEvent = function () {
    $('#locationsSearchResults .locations-template.panel').click(function () {
        currentConditions.localizedName = $(this)[0].outerText;
        $.ajax({
            method: 'GET',
            url: api.currentConditionsUrl,
            data: { locationKey: $($(this)[0]).attr('locationkey') },
            success: function (response) {
                currentConditions.populateResults(response);
            },
            error: function (xhr, status) {
                console.log('statusText: ' + xhr.statusText);
            }
        });
    });
};
currentConditions.populateResults = function (results) {
    if (!results) { results = api.currentConditionsExampleResponse; currentConditions.localizedName = 'Stored City of Tel Aviv' }

    // ASSIGN VALUES
    $($('#current-conditions-template p#localizedName')[0]).text(currentConditions.localizedName);
    $($('#current-conditions-template span#celsiusTemperature')[0]).text(results.data[0].celsiusTemperature);
    $($('#current-conditions-template span#weatherText')[0]).text(results.data[0].weatherText);
   
    // UNHIDE CURRENT CONDITIONS ELEMENT
    $('#current-conditions-template').removeClass('hidden');
};

$(function () {
    search.attachEvent();
});