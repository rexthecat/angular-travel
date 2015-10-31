angular.module('tnTour').controller('AdminTourListController', AdminTourListController);

function AdminTourListController($scope, $resource) {

  function parseResults(data) {
    data = angular.fromJson(data);
    return data.results;
  }

  var Tour = $resource(
    'https://api.parse.com/1/classes/Tour/:objectId',
    {objectId: '@objectId'},
    {query: {isArray: true, transformResponse: parseResults},
      update: {method: 'PUT'}
    }
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

  $scope.showForm = false;
  $scope.newTour = {title: null, country: null, text: null, price: null, duration: null};
  $scope.tours = Tour.query();
  $scope.countries = Country.query();
  $scope.places = Place.query();
  $scope.newCountry = {name: null};
  $scope.newPlace = {name: null};

  function clearTourObj(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        obj[key] = null;
      }
    }
  }

  $scope.createTour = function() {
    $scope.newTour.price = $scope.newTour.price || 0;
    $scope.newTour.duration = $scope.newTour.duration || 0;
    $scope.newTour.country = $scope.newCountry;
    $scope.newTour.place = $scope.newPlace;

    var tourToServer = new Tour($scope.newTour);
    tourToServer.$save().then(
      function(tour) {
        var tourFromServer = angular.extend(tour, $scope.newTour);
        $scope.tours.push(tourFromServer);

        clearTourObj($scope.newTour);
        $scope.newCountry.name = null;
        $scope.newPlace.name = null;
      }
    ).catch(function(reason) {
        console.log('Error occurred ' + reason.data.error);
      });
  };

  $scope.cancelCreate = function() {
    $scope.showForm = !$scope.showForm;

    clearTourObj($scope.newTour);
  };

  $scope.editTour = function(tour) {
    tour.hide = true;
    tour.currentTour = angular.copy(tour);
  };

  $scope.cancelEdit = function(tour) {
    tour.hide = !tour.hide;
    tour.title = tour.currentTour.title;
    tour.country = tour.currentTour.country;
    tour.place = tour.currentTour.place;
    tour.text = tour.currentTour.text;
    tour.price = tour.currentTour.price;
    tour.duration = tour.currentTour.duration;

    delete tour.currentTour;
  };

  $scope.saveChanges = function(tour) {
    tour.hide = !tour.hide;
    delete tour.hide;
    delete tour.currentTour;

    var tourToServer = new Tour(tour);
    tourToServer.$update().then(
      function(tour) {
        var index = $scope.tours.indexOf(tour);
        $scope.tours[index] = tour;
      }).catch(function(reason) {
        console.log('Error occurred: ' + reason.error);
      });
  };

  $scope.deleteTour = function(tour) {
    var tourToDelete = new Tour(tour);
    tourToDelete.$delete().then(
      function () {
        var index = $scope.tours.indexOf(tour);
        $scope.tours.splice(index, 1);
      }).catch(function (reason) {
        console.log('Error occurred ' + reason.data.error);
      });
  };
}