/*
  pocketApp.services module
    - The service module of this angular project. it used to expose or getting response for a public API.
        and to return some function regarding the data response from that public API.
    - This module is injected with 'angular-momentjs' for date formatting business.
 */
angular.module('pocketApp.services', ['angular-momentjs'])
.factory('Venues', ['$http', '$moment', '$filter', function($http, $moment, $filter) {

    /* -----------------    CACHE PROPERTIES    ----------------- */
    var cachedData,                                             // for storing the search response
        cachedDetailData,                                       // for storing the detailed venue response
        cachedResultData;                                       // for storing the category results response

    /* -----------------    API PROPERTIES    -----------------*/
    var API_URI = "https://api.foursquare.com/v2/venues/"
    var API_ID = "DEPZON0FXJ4RXWRVDYFJCSFOT1I40UPJW0CTSBRJ2A0J0HZ2";
    var API_SECRET = "CY5XBPMJC4VJAOEO0OPCYT3MNEINKHVGAHX2GQDBJHLBVAYT";

    /* -----------------    QUERY PROPERTIES    -----------------*/
    var langlong = '52.370216' + ',' + '4.895168';              // POCKET-MEDIA location
    var today = '20151202'                                      // Current date to fullfil the permission requirement for the API                              
    var distance = '100';                                       // The venues range from the location
    var categories = '4d4b7105d754a06374d81259,4d4b7104d754a06370d81259,4d4b7105d754a06376d81259,4c38df4de52ce0d596b336e1,4d4b7105d754a06378d81259,4bf58dd8d48988d129951735,52f2ab2ebcbc57f1066b8b51';                
                                                                // Selected categoryID for default searching query.

    /* -----------------    FUNCTIONS    -----------------*/

    /**
     * getData works as getter for the API url and retrieved the response data
     * @param  {Function} callback used as a method to passed the data to another function/controller
     */
    function getData(callback) {
        var url = API_URI + 'search?ll=' + langlong + 
                '&radius=' + distance + 
                '&intent=browse' +
                '&categoryId=' + categories +
                '&client_id=' + API_ID + 
                '&client_secret=' + API_SECRET + 
                '&v=' + today;

        $http.get(url)
            .success(function(data) {
                cachedData = data.response.venues;              // store the result into cachedData
                callback(data.response.venues);
                console.log(cachedData);
            });
    }
    /**
     * getResults works as getter for the API url and retrieved the response data
     * @param  {string}   categoryID parameter for the categoryId
     * @param  {Function} callback   method to passed the data to another function/controller
     */
    function getResults(categoryId, callback) {
        var url = API_URI + 'search?ll=' + langlong + 
                '&radius=' + distance + 
                '&intent=browse' +
                '&categoryId=' + categoryId +
                '&client_id=' + API_ID + 
                '&client_secret=' + API_SECRET + 
                '&v=' + today;

        $http.get(url)
            .success(function(data) {
                cachedResultData = data.response.venues;        // store the result into cachedResultData
                callback(data.response.venues);
                console.log(cachedResultData);
            });
    }
    /**
     * getDetails works as getter for venue details from the API url.
     * @param  {string}   venueId  parameter for the venue that going to be searched
     * @param  {Function} callback method to passed the data to another function/controller
     */
    function getDetails(venueId, callback){
        url = API_URI + venueId + 
                '?client_id=' + API_ID + 
                '&client_secret=' + API_SECRET + 
                '&v=' + today;
            $http.get(url)
            .success(function(data) {
                cachedDetailData = data.response.venue;         // store the result into cachedDetailData
                callback(data.response.venue);
                console.log(data.response.venue);
            });
    }

    // Return methor, so another module/controller could use the service functions.
    return {
        list: getData,
        get: getDetails,
        getResults: getResults
    };

}]);
