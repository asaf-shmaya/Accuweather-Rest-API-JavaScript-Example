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
                search.populateResults();
            }
        });
    });
};
//
search.populateResults = function (results) {
    if (!results) { results = api.searchExampleResponseToLocationTel; }
    // EMPTY LAST RESULTS IF ANY BEFORE POPULATING NEW RESULTS
    $("div#locationsSearchResults").empty();
    //
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
//
var currentConditions = [];
currentConditions.localizedName = 'Default LocalizedName';
currentConditions.locationKey = '0';
currentConditions.attachEvent = function () {
    $('#locationsSearchResults .locations-template.panel').click(function () {
        currentConditions.localizedName = $(this)[0].outerText;
        currentConditions.locationKey = $($(this)[0]).attr('locationkey');
        //
        $.ajax({
            method: 'GET',
            url: api.currentConditionsUrl,
            data: { locationKey: currentConditions.locationKey },
            success: function (response) {
                currentConditions.populateResults(response);
            },
            error: function (xhr, status) {
                console.log('statusText: ' + xhr.statusText);
                currentConditions.populateResults();
            }
        });
    });
};
//
currentConditions.populateResults = function (results) {

    if (!results) {
        results = api.currentConditionsExampleResponse;
        currentConditions.localizedName = 'Stored City of Tel Aviv'
    }

    // ASSIGN VALUES
    $($('#current-conditions-template p#localizedName')[0]).text(currentConditions.localizedName)
    $($('#current-conditions-template p#localizedName')[0]).attr("locationkey", currentConditions.locationKey)
    $($('#current-conditions-template span#celsiusTemperature')[0]).text(results.data[0].celsiusTemperature);
    $($('#current-conditions-template span#weatherText')[0]).text(results.data[0].weatherText);
   
    // UNHIDE CURRENT CONDITIONS ELEMENT
    $('#current-conditions-template').removeClass('hidden');    
    $('#addToFavorites').removeClass('hidden');

    // ATTACH EVENT TO FAVORITE BUTTON
    favorites.attachEventAdd();
};
//
var favorites = [];
favorites.attachEventAdd = function () {
    $('#addToFavorites').click(function () {
        var locationKey = $('div.conditions-template p#localizedName').attr('locationKey');
        var localizedName = $('div.conditions-template p#localizedName').text();
        //
        $.ajax({
            method: 'POST',
            url: api.favoriteUrl,
            data: { locationKey: locationKey, localizedName: localizedName },
            success: function (response) {
                alert('Successfuly added favorite location: ' + localizedName)
                event.stopPropagation();
                return false;
            },
            error: function (xhr, status) {
                console.log('statusText: ' + xhr.statusText);
                alert('Error adding favorite location: ' + localizedName)
                event.stopPropagation();
                return false;
            }
        });
    });
};
favorites.attachEventReload = function () {
    $('#btn-reload').click(function () {
        $.ajax({
            method: 'GET',
            url: api.favoritesUrl,
            success: function (response) {
                favorites.reload(response);
                event.stopPropagation();
                return false;
            },
            error: function (xhr, status) {
                console.log('statusText: ' + xhr.statusText);
                alert('Error loading favorites')
                event.stopPropagation();
                return false;
            }
        });
    });
};
//
favorites.reload = function (results) {
    if (!results) { alert('No results!'); };
    // EMPTY LAST RESULTS IF ANY BEFORE POPULATING NEW RESULTS
    $('div#favoritesSearchResults').empty();
    //
    results.data.forEach(function (item, index) {
        // GET TEMPLATE CLONE
        var searchResultTemplate = $($('#templates #favorites-template')[0].outerHTML).clone();
        // REMOVE ID FROM TEMPLATE GENERATION
        searchResultTemplate.removeAttr('id');
        // REPLACE PLACEHOLDERS TEXT / VALUES
        searchResultTemplate.attr('locationkey', item.locationKey);
        searchResultTemplate.find('span').text(item.localizedName);
        // ATTACH TO DESIGNATED PLACE
        searchResultTemplate.appendTo($("#favoritesSearchResults"));
    }); 
    //
    $('#favoritesSearchResults').removeClass('hidden');    
    //
    $('[data-toggle="tooltip"]').tooltip();
    //
    favorites.attachEventRemove();
};
//
favorites.attachEventRemove = function () {
    $('.locations-favorites button i.fa-remove').click(function () {   
        var locationKey = $($(this).parents('div.locations-favorites')).attr('locationkey');
        //
        $.ajax({
            method: 'DELETE',
            url: api.favoriteUrl + '/' + locationKey,
            success: function (response) {
                $('div#favoritesSearchResults div.locations-favorites[locationkey="' + locationKey + '"]').remove();                
                event.stopPropagation();
                return false;
            },
            error: function (xhr, status) {
                console.log('statusText: ' + xhr.statusText);
                alert('Error loading favorites')
                event.stopPropagation();
                return false;
            }
        });
    });
};
//
$(function () {
    search.attachEvent();
    favorites.attachEventReload();
});
//
var demo = {
    populateResults: function () { search.populateResults() }, 
    currentConditions: function () { currentConditions.populateResults()},
};
