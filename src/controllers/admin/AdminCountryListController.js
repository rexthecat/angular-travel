angular.module('tnTour').controller('AdminCountryListController', AdminCountryListController);

function AdminCountryListController($scope, $resource) {

  function parseResults(data) {
    data = angular.fromJson(data);
    return data.results;
  }

  var Country = $resource(
    'https://api.parse.com/1/classes/Country/:objectId',
    {objectId: '@objectId'},
    {query: {isArray: true, transformResponse: parseResults},
      update: {method: 'PUT'}}
  );

  $scope.countries = Country.query();
  $scope.newCountry = {name: null};

  $scope.createCountry = function() {
    var countryToServer = new Country($scope.newCountry);
    countryToServer.$save().then(
      function(country) {
        var countryFromServer = angular.extend(country, $scope.newCountry);
        $scope.countries.push(countryFromServer);
        $scope.newCountry.name = null;
      }
    ).catch(function(reason) {
        console.log('Error occurred: ' + reason.error);
      });
  };

  $scope.editCountry = function(country) {
    country.isInEdit = true;
    country.currentCountry = angular.copy(country);
  };

  $scope.cancelEdit = function(country) {
    country.isInEdit = false;
    country.name = country.currentCountry.name;

    delete country.currentCountry;

  };

  $scope.saveChanges = function(country) {
    delete country.isInEdit;
    delete country.currentCountry;

    var countryToServer = new Country(country);
    countryToServer.$update().then(
      function(respCountry) {
        country = respCountry;
      }).catch(function(reason) {
        console.log('Error occurred: ' + reason.error);
      });
  };

  $scope.deleteCountry = function(country) {
    var countryToServer = new Country(country);
    countryToServer.$delete().then(
      function() {
        var index = $scope.countries.indexOf(country);
        $scope.countries.splice(index, 1);
      }
    ).catch(function(reason) {
        console.log('Error occurred: ' + reason.error);
      });
  };
}