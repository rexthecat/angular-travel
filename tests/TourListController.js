describe('TourListController', function() {
  beforeEach(module('tnTour'));

  var $scope = {};
  var $httpBackend = null;
  var url = 'https://api.parse.com/1/classes/';
  var hotel = {stars: 3, title: 'Pirate Bay Hotel Resort and SPA'};
  var country = {name: 'США'};
  var place = {name: 'Рокфеллер-центр', country: country};

  var tour = {
    country: 'США',
    title: 'The Mirage',
    duration: 7,
    hotel: hotel,
    place: place,
    price: 150000,
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing!'
  };

  beforeEach(inject(function($controller, _$httpBackend_) {
    $controller('TourListController', {$scope: $scope});
    $httpBackend = _$httpBackend_;

    var stringify = JSON.stringify;
    $httpBackend.whenGET(url + 'Tour?include=place,hotel').respond(200, stringify({results: [tour]}));
    $httpBackend.whenGET(url + 'Country').respond(200, stringify({results: [country]}));
    $httpBackend.whenGET(url + 'Place?include=country').respond(200, stringify({results: [place]}));
  }));

  describe('initialize controller', function() {

    it('should call to parse.com', function() {
      $httpBackend.expectGET(url + 'Tour?include=place,hotel').respond(200);
      $httpBackend.expectGET(url + 'Country').respond(200);
      $httpBackend.expectGET(url + 'Place?include=country').respond(200);
      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });

    it('should set $scope.tours to an array of tours with mock http request', function() {
      $httpBackend.flush();
      var localTour = $scope.tours[0];
      expect($scope.tours.length).toBe(1);
      expect(localTour.title).toBe(tour.title);
      expect(localTour.hotel.stars).toBe(tour.hotel.stars);
    });

    it('should set $scope.countries to an array of countries with mock http request', function() {
      $httpBackend.flush();
      expect($scope.countries.length).toBe(1);
      var localCountry = $scope.countries[0];
      expect(localCountry.name).toBe(country.name);
    });

    it('should set $scope.places to an array of places with mock http request', function() {
      $httpBackend.flush();
      expect($scope.places.length).toBe(1);
      var localPlace = $scope.places[0];
      expect(localPlace.name).toBe(place.name);
    });
  });
});