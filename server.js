const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000; 
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const students = [
    {
      id: 0,
      name: "Andre",
      country: "Germany",
      age: "33",
      bio: "Pear tree grower"
    },
    {
      id: 1,
      name: "Julia",
      country: "Russia",
      age: "31",
      bio: "Apple tree grower"
    },
    {
      id: 2,
      name: "Joey",
      country: "Australia",
      age: "3",
      bio: "Boxer"
    },
    {
      id: 3,
      name: "Zalabam",
      country: "India",
      age: "102",
      bio: "Cherry tree grower"
    },
    {
      id: 4,
      name: "Yokuzano",
      country: "Japan",
      age: "78",
      bio: "Bonsai tree grower"
    }
   ];

app.get('/', (req,res) => res.send('Hello, Express!'));
app.get('/students', (req,res) => {
    res.json(students);
});

app.get('/students/:search', (req, res) => {
    const id = parseInt(req.params.search);
    const name = req.params.search.toLowerCase();
    let found = false;
    for (let i = 0; i < students.length; i++) {
        if (students[i].id === id || students[i].name.toLowerCase() === name) {
            res.json(students[i]);
            found = true;
            break;
        }
    }
        res.send(req.params.search + ' not found! Sorry!');
    
});


app.post('/students', (req, res) => {

        const id = students.length +1;
        const newStudent = req.body;
        newStudent.id = id;
        students.push(newStudent);
        res.send('New person added!');
    
});




app.delete('/students/:id', (req, res) => {
    const id = parseInt (req.params.id);
    let found = false;
    for (let i = 0; i < students.length; i++) {

        if (students[i].id === id) {

            students.splice(i,1)
            res.send('A person has been removed')
            found = true;
            break;

        }
        
    }
    if (!found) res.send(id + ' not found! Sorry!');
});



app.put('/students/:id', (req, res) => {
    const id = parseInt (req.params.id);
    let found = false;
    const {name, country, age, bio } = req.body;
    for (let i = 0; i < students.length; i++) {

        if (students[i].id === id) {

            students[i].name = name;
            students[i].country = country;
            students[i].age = age;
            students[i].bio = bio;
            found = true;
            res.send('A person with some Id has been modified!')
            break;

        }
       
    }
    if (!found) {
        res.send('Person not found');
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}...`)
});