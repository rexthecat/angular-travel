angular.module('tnTour').controller('AdminPlaceListController', AdminPlaceListController);

function AdminPlaceListController($scope, $resource, $q) {

  function parseResults(data) {
    data = angular.fromJson(data);
    return data.results;
  }

  var Country = $resource(
    'https://api.parse.com/1/classes/Country/:objectId',
    {objectId: '@objectId'},
    {query: {isArray: true, transformResponse: parseResults}}
  );

  var Place = $resource(
    'https://api.parse.com/1/classes/Place/:objectId',
    {objectId: '@objectId'},
    {query: {isArray: true, transformResponse: parseResults, params: {include: 'country'}},
      update: {method: 'PUT'}}
  );

  $q.all([Place.query().$promise, Country.query().$promise])
    .then(function(result) {
      $scope.places = result[0];
      $scope.countries = result[1];
    });

  $scope.newPlace = {name: null};

  $scope.createPlace = function() {
    $scope.newPlace.country.__type = 'Pointer';
    $scope.newPlace.country.className = 'Country';
    var placeToServer = new Place($scope.newPlace);

    placeToServer.$save().then(
      function(place) {
        var placeFromServer = angular.extend(place, $scope.newPlace);
        $scope.places.push(placeFromServer);
        $scope.newPlace = {name: null};
      }
    ).catch(function(reason) {
        console.log('Error occurred: ' + reason.error);
      });
  };

  $scope.editPlace = function(place) {
    place.isInEdit = true;
    place.currentPlace = angular.copy(place);
  };

  $scope.cancelEdit = function(place) {
    place.isInEdit = false;

    place.name = place.currentPlace.name;
    place.country = place.currentPlace.country;

    delete place.currentPlace;
  };

  $scope.saveChanges = function(place) {
    delete place.isInEdit;
    delete place.currentPlace;

    place.country.__type = 'Pointer';
    place.country.className = 'Country';
    var placeToServer = new Place(place);

    placeToServer.$update().then(
      function(respPlace) {
        place = respPlace;
      }).catch(function (reason) {
        console.log('Error occurred: ' + reason.error);
      });
  };

  $scope.deletePlace = function(place) {
    var placeToServer = new Place(place);

    placeToServer.$delete().then(
      function() {
        var index = $scope.places.indexOf(place);
        $scope.places.splice(index, 1);
      }
    ).catch(function(reason) {
        console.log('Error occurred: ' + reason.error);
      });
  };
}