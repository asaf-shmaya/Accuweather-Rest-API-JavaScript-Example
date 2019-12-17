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
    $('#addToFavorites').removeClass('hidden');
};

$(function () {
    search.attachEvent();
});

var demo = {
    populateResults: function () { search.populateResults() }, 
    currentConditions: function () { currentConditions.populateResults()},
};
