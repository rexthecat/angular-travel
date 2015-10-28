angular.module('tnTour').controller('TourListController', TourListController);

function TourListController($scope) {
  $scope.tours = TOURS;
  $scope.countries = COUNTRIES;
}
