angular.module('tnTour').controller('TourListController', TourListController);

function TourListController($scope, $resource) {

  function parseResults(data) {
    var data = angular.fromJson(data);
    return data.results;
  }

  var Tour = $resource(
    'https://api.parse.com/1/classes/Tour/:objectId',
    {objectId: '@objectId'},
    {query: {isArray: true, transformResponse: parseResults}}
  );

  var Country = $resource(
    'https://api.parse.com/1/classes/Country/:objectId',
    {objectId: '@objectId'},
    {query: {isArray: true, transformResponse: parseResults}}
  );

  var Place = $resource(
    'https://api.parse.com/1/classes/Place/:objectId',
    {objectId: '@objectId'},
    {query: {isArray: true, transformResponse: parseResults}}
  );

  $scope.tours = Tour.query();
  $scope.countries = Country.query();
  $scope.places = Place.query();
}