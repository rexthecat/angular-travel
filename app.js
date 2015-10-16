var app = angular.module('tnTour', []);

app.controller('MainController', MainController);

function MainController($scope) {
  $scope.showForm = false;
  $scope.newTour = {title: null, country: null, text: null, price: null};
  $scope.tours = [
    {
      title: "Чикаго",
      country: "США",
      text: "Население Чикаго (по данным переписи 2010 года) \
      составляет 2 695 000 человек (белое население — около 45 %). \
      Агломерация Чикаго (с различными пригородами) называется \
      «Большой Чикаго» или «Страна Чикаго» (англ. Chicagoland; \
      название предложено газетой Chicago Tribune в начале XX века);\
      в ней проживает около 9,5 млн человек. Агломерация Чикаго занимает \
      26-е место в мире по числу жителей. \
      Чикаго по праву считается экономической, промышленной, \
      транспортной и культурной столицей Среднего Запада. Неофициально \
      его иногда также называют «Второй Город» и «Город ветров». \
      Впервые Чикаго был назван «Городом ветров» в статье в Chicago \
      Tribune за 1858 год.",
      price: 43490
    },
    {
      title: "Рим",
      country: "Италия",
      text: "Рим — один из старейших городов мира, древняя столица \
      Римской империи. Ещё в Античности (III век н. э.) Рим стали часто \
      называть Вечным (лат. Roma Aeterna). Одним из первых так назвал Рим \
      римский поэт Альбий Тибулл (I век до н. э.) в своей второй элегии. \
      Представления о «вечности» Рима во многом сохранились и после падения \
      древнеримской цивилизации, принеся соответствующий эпитет в современные языки.",
      price: 127990
    }];

  function clearTourObj(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        obj[key] = null;
      }
    }
  }

  $scope.editTour = function(tour) {
    tour.hide = true;
    tour.currentTour = {
      title: tour.title,
      country: tour.country,
      text: tour.text,
      price: tour.price
    };
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

  $scope.addTour = function() {
    $scope.newTour.price = $scope.newTour.price || 0;
    $scope.tours.push(angular.copy($scope.newTour));
    clearTourObj($scope.newTour);
  };

  $scope.removeTour = function(tour) {
    var idx = $scope.tours.indexOf(tour);
    $scope.tours.splice(idx, 1);
  };

  $scope.cancelSave = function() {
    $scope.showForm = !$scope.showForm;
    clearTourObj($scope.newTour);
  };
}