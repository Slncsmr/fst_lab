const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

let students = [];

app.use(bodyParser.json());
app.use(express.static('public'));

app.get("/", (req, res) => {                                                                                                                                   
  res.type('html')
  res.sendFile('/home/fullstacklab/Desktop/FST - 2023103034/Week 8/student_management_system/index.html');                                                                                      
  console.log('get');                                                                                                                                        
});

app.get('/students', (req, res) => {
  res.json(students);
});

app.post('/students', (req, res) => {
  const { registerNumber, name, department, year, semester } = req.body;
  const newStudent = { registerNumber, name, department, year, semester };
  students.push(newStudent);
  res.json({ message: 'Student added', student: newStudent });
});


app.put('/students/:registerNumber', (req, res) => {
  const { registerNumber } = req.params;
  const { name, department, year, semester } = req.body;
  
  let student = students.find(s => s.registerNumber === registerNumber);
  if (student) {
    student.name = name || student.name;
    student.department = department || student.department;
    student.year = year || student.year;
    student.semester = semester || student.semester;
    res.json({ message: 'Student updated', student });
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
});

app.delete('/students/:registerNumber', (req, res) => {
  const { registerNumber } = req.params;
  const index = students.findIndex(s => s.registerNumber === registerNumber);
  if (index !== -1) {
    students.splice(index, 1);
    res.json({ message: 'Student deleted' });
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
