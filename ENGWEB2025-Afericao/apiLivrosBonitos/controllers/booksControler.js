const Book = require('../models/book');
const mongoose = require('mongoose');


// get all books

module.exports.list = ()=> {
    console.log ('list books');

    return Book.find().exec()
        .then((books) => {
            return books;
        })
        .catch((err) => {
            console.error('Error finding books:', err);
            throw err;
        });
}

// GET /books/:id: devolve o registo com identificador id (em PR.md deves indicar o que vais usar
//como id); 

// vamos usar _id como id 


module.exports.getBook = (id) => {
    console.log ('get book with id: ' + id);
    return Book.findById(id).exec()
        .then((book) => {
            if (!book) {
                throw new Error('Book not found');
            }
            return book;
        })
        .catch((err) => {
            console.error('Error finding book:', err);
            throw err;
        });
}


// GET /books?charater=EEEE: devolve a lista dos livros em que EEEE faz parte do nome de um dos
//personagens;

module.exports.getBooksByCharacter = (character) => {
    console.log ('get books with character: ' + character);
    return Book.find({ characters: { $regex: character, $options: 'i' } }).exec()
        .then((books) => {
            if (!books) {
                throw new Error('Books not found');
            }
            return books;
        })
        .catch((err) => {
            console.error('Error finding books:', err);
            throw err;
        });
}

// GET /books?genre=AAA: devolve a lista dos livros associados ao género (genre) AAA;

module.exports.getBooksByGenre = (genre) => {
    console.log ('get books with genre: ' + genre);
    return Book.find({ genres: { $regex: genre, $options: 'i' } }).exec()
        .then((books) => {
            if (!books) {
                throw new Error('Books not found');
            }
            return books;
        })
        .catch((err) => {
            console.error('Error finding books:', err);
            throw err;
        });
}
//GET /books/genres: devolve a lista de géneros ordenada alfabeticamente e sem repetições;

module.exports.getGenres = () => {
    console.log ('get genres');
    return Book.distinct('genres').exec()
        .then((genres) => {
            if (!genres) {
                throw new Error('Genres not found');
            }
            return genres.sort();
        })
        .catch((err) => {
            console.error('Error finding genres:', err);
            throw err;
        });
}