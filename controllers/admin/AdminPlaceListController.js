angular.module('tnTour').controller('AdminPlaceListController', AdminPlaceListController);

function AdminPlaceListController($scope, $resource) {

  function parseResults(data) {
    data = angular.fromJson(data);
    return data.results;
  }

  var Place = $resource(
    'https://api.parse.com/1/classes/Place/:objectId',
    {objectId: '@objectId'},
    {query: {isArray: true, transformResponse: parseResults},
      update: {method: 'PUT'}}
  );

  $scope.places = Place.query();
  $scope.newPlace = {name: null};

  $scope.createPlace = function() {
    var placeToServer = new Place($scope.newPlace);
    placeToServer.$save().then(
      function(place) {
        var placeFromServer = angular.extend(place, $scope.newPlace);
        $scope.places.push(placeFromServer);
        $scope.newPlace.name = null;
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

    delete country.currentPlace;
  };

  $scope.saveChanges = function(place) {
    delete place.isInEdit;
    delete place.currentPlace;

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