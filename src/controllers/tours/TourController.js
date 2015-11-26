angular.module('tnTour').controller('TourController', TourController);

function TourController($scope, $routeParams, $resource, $q) {

  var Tour = $resource(
    'https://api.parse.com/1/classes/Tour/:objectId',
    {objectId: '@objectId'},
    {get: {params: {include: 'place,hotel'}}}
  );

  $scope.tour = Tour.get({objectId: $routeParams.id});
}
