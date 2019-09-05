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
  console.log("i am root")
  const { title, author, description, rating } = req.body;

  const newBook = new Book({
    title,
    author,
    description,
    rating
  });
  book.save().then(() => {
    res.redirect('/books')
  })
});

//get prefilled 

router.get('/edit', (req, res, next) => {
  Book.findOne({ _id: req.query.book_id })
    .then((book) => {
      res.render("book-edit", { book });
    })
    .catch((error) => {
      console.log(error);
    })
});

//post /book/edit/:id to update

router.post('/edit', (req, res, next) => {
  const { title, author, description, rating } = req.body;
  Book.update({ _id: req.query.book_id }, { $set: { title, author, description, rating } }, { new: true })
    .then((book) => {
      res.redirect('/books');
    })
    .catch((error) => {
      console.log(error);
    })
});


//get 

router.get('/delete', (req, res, next) => {
  Book.findOneAndDelete({ _id: req.query.book_id })
    .then((book) => {
      res.redirect('/books');
    })
    .catch((error) => {
      console.log(error);
    })
})

// router.get("/book/:bookID", (req, res, next) => {
//   console.log("i am here")
//   Book.findOne({ _id: req.params }).
//     then((book) => {
//       res.render("book-details", { book })
//     }).catch((error) => {
//       console.log("some thing is wrong with this route", error);
//     })
// })



module.exports = router;
