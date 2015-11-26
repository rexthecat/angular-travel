angular.module('tnTour', ['ngRoute', 'ngResource', 'ngFileUpload'])
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
    "X-Parse-Application-Id": "rYGxvNNOxq1t4VfJNvgfa6UM30Cv5yZh4oX6Ql1B",
    "X-Parse-REST-API-Key": "FioOKP3q1nx5O8e92cx4WNiSEeeudH1lg7Br15x9"
  };
});