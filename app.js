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

// creates skills projects at startup
db.run(
  "CREATE TABLE IF NOT EXISTS skills (sid INTEGER PRIMARY KEY, sname TEXT NOT NULL, sdesc TEXT NOT NULL, stype TEXT NOT NULL)",
  (error) => {
    if (error) {
      // tests error: display error
      console.log("ERROR: ", error);
    } else {
      // tests error: no error, the table has been created
      console.log("---> Table skills created!");
      const skills = [
        {"id": "1", "name": "C++", "type": "Programming language", "desc": "Programming with C++"},
        {"id": "2", "name": "SQL", "type": "Programming language", "desc": "Programming with SQL."},
        {"id": "3", "name": "Java", "type": "Programming language", "desc": "Programming with Java."},
        {"id": "4", "name": "Javascript", "type": "Programming language", "desc": "Programming with Javascript on the client side."},
        {"id": "5", "name": "Node", "type": "Programming language", "desc": "Programming with Javascript on the server side."},
        {"id": "6", "name": "Express", "type": "Framework", "desc": "A framework for programming Javascript on the server side."},
      ];


      // inserts skills
      skills.forEach((oneSkill) => {
        db.run(
          "INSERT INTO skills (sid, sname, sdesc, stype) VALUES (?, ?, ?, ?)",
          [oneSkill.id, oneSkill.name, oneSkill.desc, oneSkill.type],
          (error) => {
            if (error) {
              console.log("ERROR: ", error);
            } else {
              console.log("Line added into the skills table!");
            }
          }
        );
      });
    }
  }
);

db.run(
  "CREATE TABLE IF NOT EXISTS courses (cid INTEGER PRIMARY KEY, cname TEXT NOT NULL, ccredits TEXT NOT NULL, cdesc TEXT NOT NULL)",
  (error) => {
    if (error) {
      // tests error: display error
      console.log("ERROR: ", error);
    } else {
      // tests error: no error, the table has been created
      console.log("---> Table courses created!");
      const courses = [
        {"id": "1", "name": "Discrete Mathematics", "credits": "7.5hp", "desc": "The course introduces some of the fundamental elements of discrete mathematics, including set theory, combinatorics, modular arithmetic, propositional and predicate logic, as well as graph theory"},
        {"id": "2", "name": "Introduction to Computing", "credits": "7.5hp", "desc": "The content of the course aims to provide the student with an introduction to basic computer science terms and concepts, as well as an understanding of how code is compiled and executed on a computer"},
        {"id": "3", "name": "Linear Algebra", "credits": "6hp", "desc": "The course introduces vectors and demonstrates how vector calculations are used to solve geometric problems, provides theory and systematic methods for solving linear equation systems. Furthermore, determinants, matrices, and matrix algebra are introduced"},
        {"id": "4", "name": "Introduction to Programming", "credits": "9hp", "desc": "The course aims to provide the student with basic knowledge in structured programming, including program design and implementation using imperative programming in C/C++"},
        {"id": "5", "name": "Databases", "credits": "6hp", "desc": "After completing the course, the student should have a grasp of the fundamentals of relational databases and be able to model, create simple databases, and query them based on given requirements. The student should also have an understanding of database development as a part of system and business development"},
        {"id": "6", "name": "Data Structures and Algorithms", "credits": "7.5hp", "desc": "Advanced computer programs almost always utilize certain fundamental data structures (stacks, queues, hash tables, etc.). Therefore, a programmer must be well-acquainted with these data structures. They must understand how they work, their performance characteristics, and how they can be used by programs to solve complex problems. This course aims to address this need while providing students with the opportunity to practice their previously acquired knowledge in C/C++ and deepen their understanding of structured programming"},
        {"id": "7", "name": "Object-Oriented Software Development", "credits": "7.5hp", "desc": "The course aims to provide students with knowledge of object-oriented software construction and object-oriented programming languages"},
        {"id": "8", "name": "Single Variable Calculus", "credits": "9hp", "desc": "The course aims to provide basic knowledge of differential and integral calculus in a real variable and to enhance the ability to follow and conduct logical and mathematical reasoning using the language and symbolism of mathematics. This, in turn, creates the conditions for mathematical treatment of technical problems in professional practice"}
      ];


      // inserts courses
      courses.forEach((oneCourse) => {
        db.run(
          "INSERT INTO courses (cid, cname, ccredits, cdesc) VALUES (?, ?, ?, ?)",
          [oneCourse.id, oneCourse.name, oneCourse.credits, oneCourse.desc],
          (error) => {
            if (error) {
              console.log("ERROR: ", error);
            } else {
              console.log("Line added into the courses table!");
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

app.get('/about', function (request, response) {
  // Query courses data from the database
  db.all('SELECT * FROM courses', function (err, courses) {
      if (err) {
          console.error(err);
          response.status(500).send('Internal Server Error');
      } else {
          // Pass courses data to the "about.handlebars" template
          response.render('about.handlebars', { courses });
      }
  });
});

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

app.get('/skills', function (request, response) {
  // Query skills data from the database
  db.all('SELECT * FROM skills', function (err, skills) {
      if (err) {
          console.error(err);
          response.status(500).send('Internal Server Error');
      } else {
          // Pass skills data to the "skills.handlebars" template
          response.render('skills.handlebars', { skills });
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


    
