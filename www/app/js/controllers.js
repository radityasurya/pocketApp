/*
  pocketApp.services module
    - The service module of this angular project. it used to expose or getting response for a public API.
        and to return some function regarding the data response from that public API.
    - This module is injected with 'angular-momentjs' for date formatting business.
 */
angular.module('pocketApp.controllers', [])

/**
 * VenuesCtrl is controller that handle the Venues, it works to load the venues list from the service 
 * and passed it into the front-end. 
 * 
 * Injected with '$scope' and Venues factory
 * '$scope' refers to the application model, and store the venues list via Venues factory function
 * 'Venues.list(function)' and assigned the returned value into '$scope' element which is 'venues'
 */
.controller('VenuesCtrl', function($scope, Venues) {

    $scope.venue = {
        name: ''
    }

    $scope.venues = Venues.list(function(venues) {
        $scope.venues = venues;
    })

    // List filter option
    $scope.predicate = 'favorite'; // Predicate
    $scope.favorite = '-stats.checkinsCount' // Current query for the orderBy filter

    // SetFilter function, to set the predicate work when the button at the view is clicked.
    $scope.setFilter = function(predicate) {
        $scope.predicate = predicate;
        (predicate == 'favorite') ? $scope.favorite = '-stats.checkinsCount': $scope.favorite = '+location.distance';
    }
})

/**
 * VenueDetailCtrl, works as a controller for Venue detailed section. 
 * it works to load the venue details from the service and passed into the front-end section. 
 * 
 * Injected with '$scope', '$stateParams', and Venues factory
 * '$scope' refers to the application model, and store the venues list via Venues factory function
 * 'Venues.get(venueId, function)'. the venueId are passed from '$stateParams' that appear on the browser url.
 * and used as a key for getting the data from API request
 * after that, the returned values are assigned into '$scope' element which is 'venues'
 *
 * in order to fix the navigation history problem, I used '$scope.$on('beforeEnter') to force the view into
 * showing or claiming a back history.
 */
.controller('VenueDetailCtrl', function($scope, $stateParams, Venues) {
    Venues.get($stateParams.venueId, function(venue) {
        $scope.venue = venue;
        $scope.photos = venue.photos.groups[0].items;

        console.log($scope.photos);
    })

    $scope.$on('$ionicView.beforeEnter', function(event, viewData) {
        viewData.enableBack = true;
    });
})

/**
 * CategoriesCtrl, works as a controller for categories list view
 * it works to load a list of category into the front-end section.
 */
.controller('CategoriesCtrl', function($scope) {
    $scope.lists = [{
        name: 'Arts & Entertainment',
        desc: 'Arcade, Casino, Movie Theater and Etc...',
        id: '4d4b7104d754a06370d81259',
        bg: '#59ABE3'
    }, {
        name: 'Food',
        desc: 'American, Asian, Indian, Chinese and Etc...',
        id: '4d4b7105d754a06374d81259',
        bg: '#F62459'
    }, {
        name: 'Nightlife Spot',
        desc: 'Arts & Entertainment',
        id: '4d4b7105d754a06376d81259',
        bg: '#90C695'
    }, {
        name: 'Shop & Service',
        desc: 'Arts & Entertainment',
        id: '4d4b7105d754a06378d81259',
        bg: '#E9D460'
    }, {
        name: 'College & University',
        desc: 'Arts & Entertainment',
        id: '4d4b7105d754a06372d81259',
        bg: '#F4B350'
    }, {
        name: 'Travel & Transport',
        desc: 'Arts & Entertainment',
        id: '4d4b7105d754a06379d81259',
        bg: '#BE90D4'
    }];
})

/**
 * CategoriesResultsCtrl, works as a controller for the venues based on category results view. 
 * it works to load the venue list that based on 1 category, from the service and passed into the front-end section. 
 * 
 * Injected with '$scope', '$stateParams', and Venues factory
 * '$scope' refers to the application model, and store the venues list via Venues factory function
 * 'Venues.get(venueId, function)'. the venueId are passed from '$stateParams' that appear on the browser url.
 * and used as a key for getting the data from API request
 * after that, the returned values are assigned into '$scope' element which is 'venues'
 *
 * in order to fix the navigation history problem, I used '$scope.$on('beforeEnter') to force the view into
 * showing or claiming a back history.
 */
.controller('CategoriesResultsCtrl', function($scope, $stateParams, Venues) {
    $scope.venue = {name: ''}

    $scope.venues = Venues.getResults($stateParams.listId, function(venues) {
        $scope.venues = venues;
    })
    $scope.$on('$ionicView.beforeEnter', function(event, viewData) {
        viewData.enableBack = true;
    });
})

/**
 * MapCtrl, works as a controller for google maps view. 
 * it works to load a maps from specific latitude and longitude and adding it into the front-end section
 * which is using the 'map' id.
 */
.controller('MapCtrl', function($scope) {
    var latlang = new google.maps.LatLng(40.0000, -98.0000);        // Location of the venues

    var mapOptions = {
        zoom: 18,                                                   // Zooms, bigger number: zoom +
        center: latlang,                                            // Location
        mapTypeId: google.maps.MapTypeId.ROADMAP                    // Map type, using the Road Map type
    }

    // Initialize the location of the venue
    $scope.init = function(lat, lng) {
        console.log(lat, lng);
    }

    // Assigned the google maps map into '$scope.map'
    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
})
