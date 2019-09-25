const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('landing');
});

  //temp data for now
  let campgrounds = [
    { name: "Salmon Creek", image: "https://pixabay.com/get/57e2d54b4852ad14f6da8c7dda793f7f1636dfe2564c704c73267fd5974ec359_340.jpg"},
    { name: "Granite Hill", image: "https://pixabay.com/get/5fe8d1434852b108f5d084609620367d1c3ed9e04e50744f7c2b7ad4944bc4_340.jpg"},
    { name: "Mountain Goat's Rest", image: "https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c73267fd5974ec359_340.jpg"}
  ];

//show all campgrounds we have
app.get('/campgrounds', (req, res) => {

  res.render('campgrounds', { campgrounds: campgrounds });
});

//add a new campground
//same url as above, but different routes(above is a GET & this one is a POST). WHY?
//It's a convention for us to follow (REST convention).
app.post('/campgrounds', (req, res) => {
  //get data from form & add to campgrounds array
  let name = req.body.name;
  let image = req.body.image;
  let newCampground = { name, image}; //use ES6 here
  campgrounds.push(newCampground);
  //redirect back to campgrounds page(the route above)
  res.redirect('/campgrounds');
});

//this route shows the form that will send the data to the above POST route
//to make sure this route is working & connected correctly, we can just type in the form, hit submit & it should take us 
//to the route above (POST - /campgrounds).
app.get('/campgrounds/new', (req, res) => {
  res.render('new.ejs');
});

app.listen(3000, () => console.log('Yelpcamp server has started!'));