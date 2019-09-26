const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/yelpcamp');
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

//schema setup
let campgroundSchema = new mongoose.Schema({
  name: String,
  image: String
});

const Campground = mongoose.model('Campground', campgroundSchema);

/* Campground.create(
  { 
    name: "Granite Hill", 
    image: "https://pixabay.com/get/5fe8d1434852b108f5d084609620367d1c3ed9e04e50744f7c2b7ad4944bc4_340.jpg"
  }, function(err, campground) {
    if (err) {
      console.log(err);
    } else {
      console.log("newly created campground!");
      console.log(campground);
    }
  }
) */

app.get('/', (req, res) => {
  res.render('landing');
});

//show all campgrounds we have
app.get('/campgrounds', (req, res) => {
  //get all campgrounds from db
/*   Campground.find({}, (err, campgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render('campgrounds', { campgrounds: campgrounds });
    }
  }); */
  Campground.find()
    .then(campgrounds => res.render('campgrounds', { campgrounds: campgrounds }))
    .catch(err => console.log(err))
});

//add a new campground
//same url as above, but different routes(above is a GET & this one is a POST). WHY?
//It's a convention for us to follow (REST convention).
app.post('/campgrounds', (req, res) => {
  //get data from form & add to campgrounds array
  let name = req.body.name;
  let image = req.body.image;
  let newCampground = { name, image}; //use ES6 here
  //Create a new campground and save to DB
  Campground.create(newCampground, (err, newlyCreated) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/campgrounds')
    }
  })
});

//this route shows the form that will send the data to the above POST route
//to make sure this route is working & connected correctly, we can just type in the form, hit submit & it should take us 
//to the route above (POST - /campgrounds).
app.get('/campgrounds/new', (req, res) => {
  res.render('new.ejs');
});

app.listen(3000, () => console.log('Yelpcamp server has started!'));