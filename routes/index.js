var express = require('express');
var router = express.Router();

const Book = require('../models/book');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get("/book/:bookID", (req, res, next) => {
  console.log(req.params.bookID)
  Book.findOne({ _id: req.params.bookID }).
    then((book) => {
      res.render("book-details", { book })
    }).catch((error) => {
      console.log("some thing is wrong with this route", error);
    })
})

module.exports = router;
