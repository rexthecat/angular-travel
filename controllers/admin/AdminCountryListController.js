angular.module('tnTour').controller('AdminCountryListController', AdminCountryListController);

function AdminCountryListController($scope) {
  $scope.currentCountryName = null;
  $scope.newCountry = {name: null};
  $scope.countries = COUNTRIES;

  $scope.createCountry = function() {
    $scope.countries.unshift(angular.copy($scope.newCountry));
    $scope.newCountry.name = null;
  };

  $scope.editCountry = function(country) {
    country.isInEdit = true;
    $scope.currentCountryName = country.name;
  };

  $scope.deleteCountry = function(idx) {
    $scope.countries.splice(idx, 1);
  };

  $scope.cancelEdit = function(country) {
    country.name = $scope.currentCountryName;

    country.isInEdit = false;
  };

  $scope.saveChanges = function(country) {
    country.isInEdit = false;
  };
}
