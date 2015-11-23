describe('AdminTourListController', function() {
  beforeEach(module('tnTour'));

  var $scope = {};
  var $httpBackend = null;
  var url = 'https://api.parse.com/1/classes/';

  var tour = {
    country: 'США',
    title: 'The Mirage',
    duration: 7,
    hotel: {
      stars: 3,
      title: 'Pirate Bay Hotel Resort and SPA'
    },
    place: {
      name: 'Рокфеллер-центр',
      country: {name: 'США'}
    },
    price: 150000,
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing!'
  };

  var hotel = {
    stars: 3,
    title: 'Pirate Bay Hotel Resort and SPA'
  };

  var country = {
    name: 'США'
  };

  var place = {
    name: 'Рокфеллер-центр',
    country: {
      name: 'США'
    }
  };

  beforeEach(inject(function($controller, _$httpBackend_) {
    $controller('AdminTourListController', {$scope: $scope});
    $httpBackend = _$httpBackend_;

    var stringify = JSON.stringify;
    $httpBackend.whenGET(url + 'Tour?include=place,hotel').respond(200, stringify({results: [tour]}));
    $httpBackend.whenGET(url + 'Country').respond(200, stringify({results: [country]}));
    $httpBackend.whenGET(url + 'Place?include=country').respond(200, stringify({results: [place]}));
    $httpBackend.whenGET(url + 'Hotel').respond(200, stringify({results: [hotel]}));
  }));

  describe('initialize controller', function() {

    it('should set showForm to false', function() {
      expect($scope.showForm).toBe(false);
    });

    it('should call to parse.com', function () {
      $httpBackend.expectGET(url + 'Tour?include=place,hotel').respond(200);
      $httpBackend.expectGET(url + 'Country').respond(200);
      $httpBackend.expectGET(url + 'Place?include=country').respond(200);
      $httpBackend.expectGET(url + 'Hotel').respond(200);
      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });

    it('should set $scope.tours to an array of tours with mock http request', function () {
      $httpBackend.flush();
      expect($scope.tours.length).toBe(1);
      var localTour = $scope.tours[0];
      expect($scope.tours.length).toBe(1);
      expect(localTour.title).toBe('The Mirage');
      expect(localTour.hotel.stars).toBe(3);
    });

    it('should set $scope.countries to an array of countries with mock http request', function () {
      $httpBackend.flush();
      expect($scope.countries.length).toBe(1);
      var localCountry = $scope.countries[0];
      expect(localCountry.name).toBe('США');
    });

    it('should set $scope.hotels to an array of hotels with mock http request', function () {
      $httpBackend.flush();
      expect($scope.hotels.length).toBe(1);
      var localHotel = $scope.hotels[0];
      expect(localHotel.title).toBe('Pirate Bay Hotel Resort and SPA');
    });

    it('should set $scope.places to an array of places with mock http request', function () {
      $httpBackend.flush();
      expect($scope.places.length).toBe(1);
      var localPlace = $scope.places[0];
      expect(localPlace.name).toBe('Рокфеллер-центр');
    });
  });

  describe('$scope.createTour', function() {

    it('should make POST request to parse.com', function() {
      $httpBackend.expectPOST(url + 'Tour').respond(201);
      $scope.createTour();
      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });

    it('should add tour to $scope.tours', function() {
      $httpBackend.whenPOST(url + 'Tour').respond(201);
      $scope.createTour();
      $httpBackend.flush();
      expect($scope.tours.length).toBeGreaterThan(1);
    });

    it('should call push when creating new tour', function() {
      $httpBackend.flush();
      $httpBackend.whenPOST(url + 'Tour').respond(201);
      spyOn($scope.tours, 'push');
      $scope.createTour();
      $httpBackend.flush();
      expect($scope.tours.push).toHaveBeenCalled();
      expect($httpBackend.verifyNoOutstandingRequest());
    });

    it('sets error about failed request', function() {
      $httpBackend.whenPOST(url + 'Tour').respond(400);
      $scope.createTour();
      $httpBackend.flush();
      expect($scope.errorMessage).toBe('Error occurred trying to create a tour');
     });
  });

  describe('$scope.cancelCreate', function() {
    it('should change showForm to false and assign empty object to newTour', function() {
      $scope.showForm = true;
      $scope.newTour = tour;
      $scope.cancelCreate();
      expect($scope.showForm).toBe(false);
      expect($scope.newTour).toEqual({
        title: null,
        country: null,
        place: {},
        hotel: {},
        text: null,
        price: null,
        duration: null});
    });
  });

  describe('$scope.editTour', function() {
    it('should set tour.hide to true and assign copy of tour to tour.currentTour', function() {
      var expectedTour = angular.copy(tour);
      expectedTour.hide = true;
      expectedTour.currentTour = angular.copy(expectedTour);

      $scope.tours = [angular.copy(tour)];
      $scope.editTour($scope.tours[0]);
      expect($scope.tours[0]).toEqual(expectedTour);
    });
  });

  describe('$scope.cancelEdit', function() {
    it('should set $scope.hide to false and cancel changes of tour', function() {
      var expectedTour = angular.copy(tour);
      expectedTour.hide = false;

      var testTour = angular.copy(tour);

      $scope.editTour(testTour);

      testTour.title = 'Россия';
      testTour.duration = 14;

      $scope.cancelEdit(testTour);
      expect(testTour).toEqual(expectedTour);
    });
  });

  describe('$scope.saveChanges', function() {
    it('should make PUT request to parse.com', function() {
      var testTour = angular.copy(tour);
      $httpBackend.expectPUT(url + 'Tour').respond(200);
      $scope.saveChanges(testTour);
      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });

    it('sets error about failed request', function() {
      var testTour = angular.copy(tour);
      $httpBackend.whenPUT(url + 'Tour').respond(400);
      $scope.saveChanges(testTour);
      $httpBackend.flush();
      expect($scope.errorMessage).toBe('Error occurred trying to save changes');
    });

    it('should update the tour', function() {
      var testTour = angular.copy(tour);
      testTour.hide = true;
      testTour.currentTour = angular.copy(tour);

      testTour.country = 'Россия';
      testTour.duration = 14;

      var expectedTour = angular.copy(testTour);
      expectedTour.price = expectedTour.price || 0;
      expectedTour.duration = expectedTour.duration || 0;
      expectedTour.place.className = 'Place';
      expectedTour.place.__type = 'Pointer';
      expectedTour.hotel.className = 'Hotel';
      expectedTour.hotel.__type = 'Pointer';
      delete expectedTour.hide;
      delete expectedTour.currentTour;

      $httpBackend.whenPUT(url + 'Tour').respond(200);
      $scope.saveChanges(testTour);
      expect(testTour).toEqual(expectedTour);
    });
  });

  describe('deleteTour', function() {
    it('should make DELETE request to parse.com', function() {
      var testTour = angular.copy(tour);
      $httpBackend.expectDELETE(url + 'Tour').respond(200);
      $scope.deleteTour(testTour);
      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });

    it('sets error about failed request', function() {
      var testTour = angular.copy(tour);
      $httpBackend.whenDELETE(url + 'Tour').respond(400);
      $scope.deleteTour(testTour);
      $httpBackend.flush();
      expect($scope.errorMessage).toBe('Error occurred trying to delete tour');
    });

    it('should delete given tour from tours', function() {
      $scope.tours = [tour];
      $httpBackend.whenDELETE(url + 'Tour').respond(200);
      $scope.deleteTour(tour);
      $httpBackend.flush();
      expect($scope.tours.length).toBe(0);
    });
  });
});