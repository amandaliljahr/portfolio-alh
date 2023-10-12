const express = require('express'); // loads the express package
const { engine } = require('express-handlebars'); // loads handlebars for Express
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('portfolio-alh.db');
const port = 8080; // defines the port
const app = express(); // creates the Express application

// defines handlebars engine
app.engine('handlebars', engine());
// defines the view engine to be handlebars
app.set('view engine', 'handlebars');
// defines the views directory
app.set('views', './views');

// define static directory "public" to access css/ and img/
app.use(express.static('public'))

// creates table projects at startup
db.run(
  "CREATE TABLE IF NOT EXISTS projects (pid INTEGER PRIMARY KEY, pname TEXT NOT NULL, pyear INTEGER NOT NULL, pdesc TEXT NOT NULL, pimgURL TEXT NOT NULL)",
  (error) => {
    if (error) {
      // tests error: display error
      console.log("ERROR: ", error);
    } else {
      // tests error: no error, the table has been created
      console.log("---> Table projects created!");
      const projects = [
        {
          "id": "1",
          "name": "CV without CSS",
          "desc": "The purpose of this project is to create a simple CV in HTML",
          "year": 2023,
          "url": "/img/project1.png"
        },
        {
          "id": "2",
          "name": "CV with CSS",
          "desc": "The purpose of this project is to create a CV and include CSS",
          "year": 2023,
          "url": "/img/project2.png"
        },
        {
          "id": "3",
          "name": "Multipage CV with CSS",
          "desc": "The purpose of this projects is to create a more advanced CV with CSS using multiple pages",
          "year": 2023,
          "url": "/img/project3.png"
        },
        {
          "id": "4",
          "name": "CV with CSS-flexbox",
          "desc": "The project is a CV as a one-page site, focusing on improving the structure of the page to achieve a good flex CSS layout",
          "year": 2023,
          "url": "/img/project4.png"
        },
        {
          "id": "5",
          "name": "CV with a CSS Framework",
          "desc": "This project was also a one-page site, with the purpose of making my CV fully responsive using CSS Framework",
          "year": 2023,
          "url": "/img/project5.png"
        }
      ];




      // inserts projects
      projects.forEach((oneProject) => {
        db.run(
          "INSERT INTO projects (pid, pname, pyear, pdesc, pimgURL) VALUES (?, ?, ?, ?, ?)",
          [oneProject.id, oneProject.name, oneProject.year, oneProject.desc, oneProject.url],
          (error) => {
            if (error) {
              console.log("ERROR: ", error);
            } else {
              console.log("Line added into the projects table!");
            }
          }
        );
      });
    }
  }
);


// CONTROLLER (THE BOSS)
// defines route "/"
app.get('/', function(request, response){
  response.render('home.handlebars')
})

app.get('/contact', function(request, response){
  response.render('contact.handlebars')
})

app.get('/about', function(request, response){
  response.render('about.handlebars')
})

app.get('/projects', function (request, response) {
  db.all('SELECT * FROM projects', function (err, projects) {
      if (err) {
          console.error(err);
          response.status(500).send('Internal Server Error');
      } else {
          response.render('projects.handlebars', { projects });
      }
  });
});

app.get('/projects/:id', function (request, response) {
  const id = request.params.id;
  db.get('SELECT * FROM projects WHERE pid = ?', id, function (err, project) {
      if (err) {
          console.error(err);
          response.status(500).send('Internal Server Error');
      } else if (!project) {
          response.status(404).render('404.handlebars');
      } else {
          response.render('project.handlebars', project);
      }
  });
});


// defines the final default route 404 NOT FOUND
app.use(function(req,res){
  res.status(404).render('404.handlebars');
});

// runs the app and listens to the port
app.listen(port, () => {
  console.log(`Server running and listening on port ${port}...`)
})



