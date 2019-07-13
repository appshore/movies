var app = angular.module('MyMovieDBApp', []);

app.controller('MyMoviesController', [
  '$scope',
  '$http',
  function($scope, $http) {
    $scope.movies = [];
    $scope.mlist = [];
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
    $scope.moviesByCast = [];
    $scope.selectedCast = '';

    $scope.filterByGenre = genre => {
      $scope.movies =
        genre === 'All Movies'
          ? $scope.mlist
          : $scope.mlist.filter(m => m.genres.includes(genre));
      $scope.selectedGenre = genre;
      $scope.$broadcast('newGenre');
    };

    $scope.getMoviesByCast = cast => {
      if( $scope.selectedCast === cast ) {
        $scope.selectedCast = '';
      } else {
        $scope.moviesByCast = $scope.mlist.filter(m => m.cast.includes(cast));
        $scope.selectedCast = cast;
      }
    };

    $scope.loaded = false;

    $scope.load = () => {
      $http
        .get('movies.json')
        .then(response => response.data.sort((a, b) => b.year - a.year))
        .then(movies => {
          $scope.mlist = movies;
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
