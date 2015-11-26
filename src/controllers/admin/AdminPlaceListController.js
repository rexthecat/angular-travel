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

  $q.all({
    places: Place.query().$promise,
    countries: Country.query().$promise
  })
    .then(function(results) {
      $scope.places = results.places;
      $scope.countries = results.countries;
    });

  function setDataForPlace(place) {
    place.country.__type = 'Pointer';
    place.country.className = 'Country';
  }

  $scope.newPlace = {name: null};

  $scope.createPlace = function() {
    setDataForPlace($scope.newPlace);
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

    setDataForPlace(place);
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