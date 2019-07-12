window.MovieReview = (() => {
  const validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  class Review {
    constructor(values) {
      if (values && values.name) {
        this.name = values.name;
      } else {
        throw new Error('The name is not valid');
      }

      this.comment = values.comment;

      if (values && values.email && validateEmail(values.email)) {
        this.email = values.email;
      } else {
        throw new Error('The email is not valid');
      }

      if (values && values.score && values.score > 0 && values.score < 1) {
        this.score = values.score;
      } else {
        throw new Error('The score is invalid');
      }

      if (values && values.movie) {
        this.movie = values.movie;
      } else {
        throw new Error('The movie is missing');
      }
    }
  }

  class ReviewSummary {
    constructor(reviews) {
      this.averageScore = 0;
      reviews.forEach(r => {
        this.averageScore += r.score;
      });
      this.averageScore = parseFloat(
        (this.averageScore / reviews.length).toFixed(1)
      );
      this.title = reviews && reviews[0].movie.title;
    }
  }

  class MovieLocatorService {
    constructor(movies) {
      this.movies = movies;
    }

    find(options) {
      if (options && options.orderBy) {
        return this.movies.sort(
          (a, b) => new Date(a[options.orderBy]) - new Date(b[options.orderBy])
        );
      }
      return this.movies;
    }

    findByDirector(name) {
      if (name) {
        return this.movies.filter(m =>
          m.crew.reduce((acc, c) => acc || c.name === name, false)
        );
      }
      return this.movies;
    }
  }

  class MovieReviewService {
    constructor() {
      this.reviews = [];
    }

    submit(review, done) {
      this.submitted = review;
      this.reviews.push(review);
      this.success = true;
      done && done(this);
    }

    find(movie) {
      const reviews = this.reviews.filter(r => r.movie.title === movie.title);
      return new MovieReview.ReviewSummary(reviews);
    }
  }

  return {
    Review: Review,
    ReviewSummary: ReviewSummary,
    MovieReviewService: MovieReviewService,
    MovieLocatorService: MovieLocatorService
  };
})();
