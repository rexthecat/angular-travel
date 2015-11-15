angular.module('tnTour').controller('TourListController', TourListController);

function TourListController($scope, $resource, $q) {

  function parseResults(data) {
    var data = angular.fromJson(data);
    return data.results;
  }

  var Tour = $resource(
    'https://api.parse.com/1/classes/Tour/:objectId',
    {objectId: '@objectId'},
    {query: {isArray: true, transformResponse: parseResults, params: {include: 'place,hotel'}}}
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

  $q.all({
    tours: Tour.query().$promise,
    country: Country.query().$promise,
    place: Place.query().$promise
  })
    .then(function(results) {
      $scope.tours = results.tours;
      $scope.countries = results.countries;
      $scope.places = results.places;
    });
}