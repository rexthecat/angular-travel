var app = angular.module('tnTour', []);

app.controller('MainController', MainController);

function MainController($scope) {
  $scope.showForm = false;
  $scope.newTour = {title: null, country: null, text: null, price: null};
  $scope.tours = angular.fromJson(localStorage.getItem('thtour')) || [];

  function updateLocalStorage() {
    localStorage.setItem('thtour', angular.toJson($scope.tours));
  }

  function clearTourObj(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        obj[key] = null;
      }
    }
  }

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
    updateLocalStorage();
  };

  $scope.addTour = function() {
    $scope.newTour.price = $scope.newTour.price || 0;
    $scope.tours.unshift(angular.copy($scope.newTour));
    clearTourObj($scope.newTour);
    updateLocalStorage();
  };

  $scope.removeTour = function(tour, idx) {
    $scope.tours.splice(idx, 1);
    updateLocalStorage();
  };

  $scope.cancelCreate = function() {
    $scope.showForm = !$scope.showForm;
    clearTourObj($scope.newTour);
  };
}