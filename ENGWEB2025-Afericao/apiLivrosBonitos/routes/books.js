var express = require('express');
var router = express.Router();
var booksController = require('../controllers/booksControler');

/* GET home page. */
// GET /books/genre (deve vir antes do :id)
router.get('/genre', function(req, res, next) {
  booksController.getGenres()
    .then(genres => {
      if (genres) res.status(200).jsonp(genres);
      else res.status(404).send('Genres not found');
    })
    .catch(err => {
      console.error('Error finding genres:', err);
      res.status(500).send('Error finding genres');
    });
});

// GET /books/genre/:genre
router.get('/genre/:genre', function(req, res, next) {
  const genre = req.params.genre;
  booksController.getBooksByGenre(genre)
    .then(books => {
      if (books) res.status(200).jsonp(books);
      else res.status(404).send('Books not found');
    })
    .catch(err => {
      console.error('Error finding books:', err);
      res.status(500).send('Error finding books');
    });
});

// GET /books/character/:character
router.get('/character/:character', function(req, res, next) {
  const character = req.params.character;
  booksController.getBooksByCharacter(character)
    .then(books => {
      if (books) res.status(200).jsonp(books);
      else res.status(404).send('Books not found');
    })
    .catch(err => {
      console.error('Error finding books:', err);
      res.status(500).send('Error finding books');
    });
});

// GET /books/:id (esta rota deve vir por último!)
router.get('/:id', function(req, res, next) {
  const id = req.params.id;
  booksController.getBook(id)
    .then(book => {
      if (book) res.status(200).jsonp(book);
      else res.status(404).send('Book not found');
    })
    .catch(err => {
      console.error('Error finding book:', err);
      res.status(500).send('Error finding book');
    });
});


module.exports = router;
