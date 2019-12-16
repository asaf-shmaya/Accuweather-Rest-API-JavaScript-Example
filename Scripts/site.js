var api = [];
api.search = "https://localhost:44351/api/accuweather/search?";
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

var search = [];
search.attachEvent = function () {
    var txtLocation = api.search + $('#txtLocation').val();
    //
    $('#btn-search').click(function () {
        $.ajax({
            method: 'GET',
            url: api.search,
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
        // REPLACE PLACEHOLDERS TEXT / VALUES
        searchResultTemplate.attr('locationkey', item.locationKey)
        searchResultTemplate.find('p').text(item.localizedName)
        // ATTACH TO DESIGNATED PLACE
        searchResultTemplate.appendTo($("#locationsSearchResults"));
    }); 
};

$(function () {
    search.attachEvent();
});