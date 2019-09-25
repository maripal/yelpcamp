const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('landing');
});

//show all campgrounds we have
app.get('/campgrounds', (req, res) => {
  //temp data for now
  let campgrounds = [
    { name: "Salmon Creek", image: "https://pixabay.com/get/57e2d54b4852ad14f6da8c7dda793f7f1636dfe2564c704c73267fd5974ec359_340.jpg"},
    { name: "Granite Hill", image: "https://pixabay.com/get/5fe8d1434852b108f5d084609620367d1c3ed9e04e50744f7c2b7ad4944bc4_340.jpg"},
    { name: "Mountain Goat's Rest", image: "https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c73267fd5974ec359_340.jpg"}
  ];

  res.render('campgrounds', { campgrounds: campgrounds });
});

app.listen(3000, () => console.log('Yelpcamp server has started!'));