describe('TourController', function() {
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

  beforeEach(inject(function($controller, _$httpBackend_) {
    $controller('TourController', {$scope: $scope});
    $httpBackend = _$httpBackend_;
    $httpBackend.whenGET(url + 'Tour?include=place,hotel').respond(200, tour);
  }));

  describe('initialize controller', function() {

    it('should call to parse.com', function () {
      $httpBackend.expectGET(url + 'Tour?include=place,hotel').respond(200);
      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });

    it('should set $scope.tour to an array of tours with mock http request', function () {
      $httpBackend.flush();
      expect($scope.tour).toBeDefined();
      expect($scope.tour.title).toBe('The Mirage');
      expect($scope.tour.hotel.stars).toBe(3);
    });
  });
});