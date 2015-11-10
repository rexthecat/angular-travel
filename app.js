angular.module('tnTour', ['ngRoute', 'ngResource'])
.config(function($routeProvider, $locationProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'templates/tour_list.html',
      controller: 'TourListController'
    })
    .when('/admin/countries', {
      templateUrl: 'templates/admin_country_list.html',
      controller: 'AdminCountryListController'
    })
    .when('/admin/places', {
      templateUrl: 'templates/admin_place_list.html',
      controller: 'AdminPlaceListController'
    })
    .when('/admin/tours', {
      templateUrl: 'templates/admin_tour_list.html',
      controller: 'AdminTourListController'
    })
    .when('/admin/hotels', {
      templateUrl: 'templates/admin_hotel_list.html',
      controller: 'AdminHotelListController'
    })
    .when('/tours/:id', {
      templateUrl: 'templates/tour.html',
      controller: 'TourController'
    }).otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);

  $httpProvider.defaults.headers.common = {
    "X-Parse-Application-Id": "",
    "X-Parse-REST-API-Key": ""
  };
});