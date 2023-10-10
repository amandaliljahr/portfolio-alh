const express = require('express') // loads the express package
const { engine } = require('express-handlebars'); // loads handlebars for Express
const port = 8080 // defines the port
const app = express() // creates the Express application

// defines handlebars engine
app.engine('handlebars', engine());
// defines the view engine to be handlebars
app.set('view engine', 'handlebars');
// defines the views directory
app.set('views', './views');

// define static directory "public" to access css/ and img/
app.use(express.static('public'))

// MODEL (DATA)
const humans = [
    {"id": "0", "name": "Jerome"}, 
    {"id": "1", "name": "Mira"},
    {"id": "2", "name": "Linus"}, 
    {"id": "3", "name": "Susanne"}, 
    {"id": "4", "name": "Jasmin"}, 
]

// CONTROLLER (THE BOSS)
// defines route "/"
app.get('/', function(request, response){
  response.render('home.handlebars')
})

// defines route "/humans"
app.get('/humans', function(request, response){
  const model = { listHumans: humans } // defines the model
  // in the next line, you should send the abovedefined 
  // model to the page and not an empty object {}...
  response.render('humans.handlebars', model)
})


// Define a dynamic route for "/humans/:id"
app.get('/humans/:id', function(request, response){
  // Get the ID from the dynamic route parameters
  const id = request.params.id;

  // Find the person with the provided ID in the humans array
  const person = humans.find(person => person.id === id);
  
  if (!person) {
    // If the person is not found, render a 404 error page
    response.status(404).render('404.handlebars');
  } else {
    // If the person is found, render the "human.handlebars" template with the data
    response.render('human.handlebars', person);
  }
});


// defines the final default route 404 NOT FOUND
app.use(function(req,res){
  res.status(404).render('404.handlebars');
});

// runs the app and listens to the port
app.listen(port, () => {
  console.log(`Server running and listening on port ${port}...`)
})



