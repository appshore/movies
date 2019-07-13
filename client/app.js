var app = angular.module('MyMovieDBApp', []);

app.controller('MyMoviesController', [
  '$scope',
  '$http',
  function($scope, $http) {
    $scope.movies = [];
    $scope.moviesList = [];
    $scope.genres = [
      'All Movies',
      'Action',
      'Adventure',
      'Biography',
      'Comedy',
      'Crime',
      'Drama',
      'Horror',
      'Science Fiction',
      'Thriller'
    ];
    $scope.selectedGenre = $scope.genres[0];

    $scope.filterByGenre = genre => {
      $scope.movies =
        genre === 'All Movies'
          ? $scope.moviesList
          : $scope.moviesList.filter(m => m.genres.includes(genre));
      $scope.selectedGenre = genre;
      $scope.$broadcast('newGenre');
    };

    $scope.loaded = false;

    $scope.load = () => {
      $http
        .get('movies2.json')
        .then(response => response.data.sort((a, b) => b.year - a.year))
        .then(movies => {
          $scope.moviesList = movies;
          $scope.movies = movies;
          $scope.loaded = true;
        });
    };
    $scope.load();
  }
]);

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

app.controller('BannerController', [
  '$scope',
  '$http',
  function($scope, $http) {
    $scope.banners = [];
    $scope.blist = [];

    const ranPoster = () => $scope.blist[getRandomInt(0, $scope.blist.length - 1)];

    $scope.load = () => {
      $http
        .get('paid-promotions.json')
        .then(response => {
          $scope.blist = response.data;
          $scope.banner = ranPoster();
        });
    };
    $scope.load();

    $scope.$on('newGenre', () => {
      $scope.banner = ranPoster();
    });
  }
]);
