var express = require('express');
var router = express.Router();

const Book = require('../models/book');

/* GET users listing. */
// /books/add
router.get('/add', function (req, res, next) {
  res.render('book-add');
});
// GET /books
router.get('/', function (req, res, next) {
  Book.find().then((data) => {
    res.render('books', { books: data })
  })
});

// POST /books
router.post('/', function (req, res, next) {
  req.body.title
  req.body.description
  req.body.author
  req.body.rating

  let book = new Book({
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    rating: req.body.rating,
  })
  book.save().then(() => {
    res.redirect('/books')
  })
});

//get prefilled 

router.get('/books/edit', (req, res, next) => {
  Book.findOne({ _id: req.query.book_id })
    .then((book) => {
      res.render("book-edit", { book });
    })
    .catch((error) => {
      console.log(error);
    })
});

//post /book/edit/:id to update

router.post('/books/edit', (req, res, next) => {
  const { title, author, description, rating } = req.body;
  Book.update({ _id: req.query.book_id }, { $set: { title, author, description, rating } }, { new: true })
    .then((book) => {
      res.redirect('/books');
    })
    .catch((error) => {
      console.log(error);
    })
});
//


module.exports = router;
