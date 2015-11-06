angular.module('tnTour').controller('AdminTourListController', AdminTourListController);

function AdminTourListController($scope, $resource, $q) {

  function parseResults(data) {
    data = angular.fromJson(data);
    return data.results;
  }

  var Tour = $resource(
    'https://api.parse.com/1/classes/Tour/:objectId',
    {objectId: '@objectId'},
    {query: {isArray: true, transformResponse: parseResults, params: {include: 'place'}},
      update: {method: 'PUT'}}
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

  $q.all([Tour.query().$promise, Country.query().$promise, Place.query().$promise])
    .then(function(result) {
      $scope.tours = result[0];
      $scope.countries = result[1];
      $scope.places = result[2];
    });

  $scope.showForm = false;
  $scope.newTour = createEmptyTour();
  $scope.newPlace = {name: null, objectId: null};

  function createEmptyTour() {
    return {
      title: null,
      country: null,
      place: {
        __type: 'Pointer',
        className: 'Place',
        name: null,
        objectId: null
      },
      text: null,
      price: null,
      duration: null};
  }

  $scope.createTour = function() {
    $scope.newTour.price = $scope.newTour.price || 0;
    $scope.newTour.duration = $scope.newTour.duration || 0;
    $scope.newTour.place.name = $scope.newPlace.name;
    $scope.newTour.place.objectId = $scope.newPlace.objectId;

    var tourToServer = new Tour($scope.newTour);
    tourToServer.$save().then(
      function(tour) {
        var tourFromServer = angular.extend(tour, $scope.newTour);
        $scope.tours.push(tourFromServer);
        $scope.newTour = createEmptyTour();
        $scope.newPlace = {name: null, objectId: null};
      }
    ).catch(function(reason) {
        console.log('Error occurred ' + reason.data.error);
      });
  };

  $scope.cancelCreate = function() {
    $scope.showForm = !$scope.showForm;

    $scope.newTour = createEmptyTour();
  };

  $scope.editTour = function(tour) {
    tour.hide = true;
    tour.currentTour = angular.copy(tour);
    console.log(tour);
    console.log($scope.places);
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
    delete tour.hide;
    delete tour.currentTour;

    tour.place.className = 'Place';
    tour.place.__type = 'Pointer';
    var tourToServer = new Tour(tour);
    tourToServer.$update().then(
      function(respTour) {
        tour = respTour;
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