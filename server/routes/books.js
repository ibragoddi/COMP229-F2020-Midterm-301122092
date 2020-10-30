// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    res.render('books/details',
        {
            title: 'Books Add Page',
            books: {},
            edit: null
        });

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    book.create({
        Title: req.body.title,
        Description: req.body.description,
        Price: req.body.price,
        Author: req.body.author,
        Genre: req.body.genre
    }, function (error, newBook){
        if(error) return next(error);
        res.redirect('/books');
    });
});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    var id = req.params.id;
    book.findById(id,function (error, dbBook){
        if(error) return next(error);
        res.render('books/details',
            {
                title: 'Books Edit Page',
                books: dbBook,
                edit: id
            });
    });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    var id = req.params.id;

    book.findByIdAndUpdate(id,{
        Title: req.body.title,
        Description: req.body.description,
        Price: req.body.price,
        Author: req.body.author,
        Genre: req.body.genre
    }, function (error, editedBook){
        if(error) return next(error);
        res.redirect('/books');
    });
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    var id = req.params.id;
    book.remove({_id: id},function (err){
        if (err) return next (err);
        res.redirect('/books');
    });

});


module.exports = router;
