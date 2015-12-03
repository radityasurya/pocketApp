/*
  PocketApp
    - The main module of this angular project is called 'pocketApp', 
      it is instantiate in the index.html with 'ng-app' params.

    - 'pocketApp.controllers' module  : collection of all the controllers for this app.
    - 'pocketApp.services' module     : the service that used in this app, containing foursquare response json.
 */
angular.module('pocketApp', ['ionic', 'pocketApp.controllers', 'pocketApp.services'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

/*
  States Config
    - Configuration of various states that this app has.
    - in order to define the state, $stateProvider is injected to this function.
    - to set up default path as a fallback for the app, $urlRouterProvider is injected to this function.
 */
.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

    // setup an abstract state for the tabs directive
        .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'app/layout/tabs.html'
    })

    // Each tab has its own nav history stack, and each state are assigned into their own controller and their templateURL.
    .state('tab.search', {
            url: '/search',
            views: {
                'tab-search': {
                    templateUrl: 'app/layout/tab-search.html',
                    controller: 'VenuesCtrl'
                }
            }
        })
        .state('tab.search-detail', {
            url: '/search/:venueId',
            views: {
                'tab-search': {
                    templateUrl: 'app/layout/venues/venue-details.html',
                    controller: 'VenueDetailCtrl'
                }
            }
        })
        .state('tab.categories', {
            url: '/categories',
            views: {
                'tab-categories': {
                    templateUrl: 'app/layout/tab-categories.html',
                    controller: 'CategoriesCtrl'
                }
            }
        })
        .state('tab.categories-result', {
            url: '/categories/:listId',
            views: {
                'tab-categories': {
                    templateUrl: 'app/layout/categories/categories-results.html',
                    controller: 'CategoriesResultsCtrl'
                }
            }
        });

    $urlRouterProvider.otherwise('/tab/search');

});
