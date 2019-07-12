window.MovieReview = (function() {
  class Review {
    constructor(values) {}
  }

  class ReviewSummary {
    constructor(reviews) {}
  }

  class MovieLocatorService {
    movies = [];

    constructor(movies) {
      this.movies = movies;
    }

    find(options) {
      if (options && options.orderBy) {
        return this.movies.sort(function(a, b) {
          return new Date(a[options.orderBy]) - new Date(b[options.orderBy]);
        });
      }
      return this.movies;
    }

    findByDirector(name) {
      if (name) {
        return this.movies.filter(function(m) {
          return m.crew.reduce(function(acc, c) {
            return acc || c.name === name;
          }, false);
        });
      }
      return this.movies;
    }
  }

  class MovieReviewService {
    constructor() {}

    submit(review, done) {}

    find(movie) {}
  }

  return {
    Review: Review,
    ReviewSummary: ReviewSummary,
    MovieReviewService: MovieReviewService,
    MovieLocatorService: MovieLocatorService
  };
})();
