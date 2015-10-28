angular.module('tnTour').controller('AdminTourListController', AdminTourListController);

function AdminTourListController($scope) {
  $scope.showForm = false;
  $scope.newTour = {title: null, country: null, text: null, price: null};
  $scope.tours = TOURS;
  $scope.countries = COUNTRIES;
  $scope.newCountry = {name: null};

  function clearTourObj(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        obj[key] = null;
      }
    }
  }

  $scope.createTour = function() {
    $scope.newTour.price = $scope.newTour.price || 0;
    $scope.newTour.country = $scope.newCountry;
    $scope.tours.unshift(angular.copy($scope.newTour));

    clearTourObj($scope.newTour);
    $scope.newCountry = null;
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
    tour.text = tour.currentTour.text;
    tour.price = tour.currentTour.price;
  };

  $scope.saveChanges = function(tour) {
    tour.hide = !tour.hide;
  };

  $scope.deleteTour = function(tour, idx) {
    $scope.tours.splice(idx, 1);
  };
}
