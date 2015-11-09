angular.module('tnTour').controller('TourListController', TourListController);

function TourListController($scope, $resource, $q) {

  function parseResults(data) {
    var data = angular.fromJson(data);
    return data.results;
  }

  var Tour = $resource(
    'https://api.parse.com/1/classes/Tour/:objectId',
    {objectId: '@objectId'},
    {query: {isArray: true, transformResponse: parseResults, params: {include: 'place'}}}
  );

  var Country = $resource(
    'https://api.parse.com/1/classes/Country/:objectId',
    {objectId: '@objectId'},
    {query: {isArray: true, transformResponse: parseResults}}
  );

  var Place = $resource(
    'https://api.parse.com/1/classes/Place/:objectId',
    {objectId: '@objectId'},
    {query: {isArray: true, transformResponse: parseResults, params: {include: 'country'}}}
  );

  $q.all([Tour.query().$promise, Country.query().$promise, Place.query().$promise])
    .then(function(result) {
      $scope.tours = result[0];
      $scope.countries = result[1];
      $scope.places = result[2];
    });
}