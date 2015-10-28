angular.module('tnTour', ['ngRoute'])
.config(function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'templates/tour_list.html',
    controller: 'TourListController'
  })
  .when('/admin/countries', {
    templateUrl: 'templates/admin_country_list.html',
    controller: 'AdminCountryListController'
  })
  .when('/admin/tours', {
    templateUrl: 'templates/admin_tour_list.html',
    controller: 'AdminTourListController'
  })
  .when('/tours/:slug', {
    templateUrl: 'templates/tour.html',
    controller: 'TourController'
  }).otherwise({
    redirectTo: '/'
  });

  $locationProvider.html5Mode(true);
})

var COUNTRIES = [{name: 'Канада'}, {name: 'Россия'}, {name: 'США'}];

var TOURS = [
  {
  title: 'The Mirage',
  slug: 'mirage',
  text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  country: 'США',
  price: 150000
  },
  {
  title: 'The Golden Resort',
  slug: 'golde-ngate',
  text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  country: 'США',
  price: 220000
  },
  {
  title: 'Sheraton Vancouver Wall Centre',
  slug: 'vancouver-wall-centre',
  text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  country: 'Канада',
  price: 120000
  },
  {
  title: 'The Ritz-Carlton',
  slug: 'ritz-carltone-moscow',
  text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  country: 'Россия',
  price: 1420000
  }
];
