angular.module('tnTour').controller('AdminTourListController', AdminTourListController);

function AdminTourListController($scope, $resource, $q) {

  function parseResults(data) {
    data = angular.fromJson(data);
    return data.results;
  }

  var Tour = $resource(
    'https://api.parse.com/1/classes/Tour/:objectId',
    {objectId: '@objectId'},
    {query: {isArray: true, transformResponse: parseResults, params: {include: 'place,hotel'}},
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
    {query: {isArray: true, transformResponse: parseResults, params: {include: 'country'}}}
  );

  var Hotel = $resource(
    'https://api.parse.com/1/classes/Hotel/:objectId',
    {objectId: '@objectId'},
    {query: {isArray: true, transformResponse: parseResults}}
  );

  $q.all([Tour.query().$promise, Country.query().$promise, Place.query().$promise, Hotel.query().$promise])
    .then(function(result) {
      $scope.tours = result[0];
      $scope.countries = result[1];
      $scope.places = result[2];
      $scope.hotels = result[3];
    });

  $scope.showForm = false;
  $scope.newTour = createEmptyTour();
  $scope.newCountry = {name: null};
  $scope.newPlace = {name: null, objectId: null};

  function createEmptyTour() {
    return {
      title: null,
      country: null,
      place: {},
      hotel: {},
      text: null,
      price: null,
      duration: null};
  }

  $scope.createTour = function() {
    $scope.newTour.price = $scope.newTour.price || 0;
    $scope.newTour.duration = $scope.newTour.duration || 0;
    $scope.newTour.country = $scope.newCountry.name;
    $scope.newTour.place.__type = 'Pointer';
    $scope.newTour.place.className = 'Place';
    $scope.newTour.place.country.__type = 'Pointer';
    $scope.newTour.place.country.className = 'Country';
    $scope.newTour.hotel.__type = 'Pointer';
    $scope.newTour.hotel.className = 'Hotel';

    var tourToServer = new Tour($scope.newTour);
    tourToServer.$save().then(
      function(tour) {
        var tourFromServer = angular.extend(tour, $scope.newTour);
        $scope.tours.push(tourFromServer);
        $scope.newTour = createEmptyTour();
        $scope.newPlace = {name: null, objectId: null};
        $scope.newCountry = {name: null};
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
    tour.hotel.className = 'Hotel';
    tour.hotel.__type = 'Pointer';
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