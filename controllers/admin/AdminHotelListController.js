angular.module('tnTour').controller('AdminHotelListController', AdminHotelListController);

function AdminHotelListController($scope, $resource) {

  function parseResults(data) {
    data = angular.fromJson(data);
    return data.results;
  }

  var Hotel = $resource(
    'https://api.parse.com/1/classes/Hotel/:objectId',
    {objectId: '@objectId'},
    {query: {isArray: true, transformResponse: parseResults},
      update: {method: 'PUT'}}
  );

  $scope.hotels = Hotel.query();
  $scope.stars = [5, 4, 3, 2, 1];
  $scope.newHotel = {title: null, stars: null};

  $scope.createHotel = function() {
    var hotelToServer = new Hotel($scope.newHotel);
    hotelToServer.$save().then(
      function(hotel) {
        var hotelFromServer = angular.extend(hotel, $scope.newHotel);
        $scope.hotels.push(hotelFromServer);
        $scope.newHotel = {title: null, stars: null};
      }
    ).catch(function(reason) {
        console.log('Error occurred: ' + reason.error);
      });
  };

  $scope.editHotel = function(hotel) {
    hotel.isInEdit = true;
    hotel.currentHotel = angular.copy(hotel);
  };

  $scope.cancelEdit = function(hotel) {
    hotel.isInEdit = false;
    hotel.title = hotel.currentHotel.title;

    delete hotel.currentHotel;

  };

  $scope.saveChanges = function(hotel) {
    delete hotel.isInEdit;
    delete hotel.currentHotel;

    var hotelToServer = new Hotel(hotel);
    hotelToServer.$update().then(
      function(respHotel) {
        hotel = respHotel;
      }).catch(function(reason) {
        console.log('Error occurred: ' + reason.error);
      });
  };

  $scope.deleteHotel = function(hotel) {
    var hotelToServer = new Hotel(hotel);
    hotelToServer.$delete().then(
      function() {
        var index = $scope.hotels.indexOf(hotel);
        $scope.hotels.splice(index, 1);
      }
    ).catch(function(reason) {
        console.log('Error occurred: ' + reason.error);
      });
  };
}