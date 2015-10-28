angular.module('tnTour').controller('TourController', TourController);

function TourController($scope, $routeParams) {
  angular.forEach(TOURS, function(tour) {
    if ($routeParams.slug == tour.slug) {
      $scope.tour = tour;
    }
  })
}
