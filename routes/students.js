const express = require('express');
const Student = require('../models/student');
const router = express.Router();

// Create a student
router.post('/', async (req, res) => {
    const student = new Student(req.body);
    await student.save();
    res.status(201).send(student);
});

// Read all students
router.get('/', async (req, res) => {
    const students = await Student.find();
    res.send(students);
});

// Update a student
router.put('/:id', async (req, res) => {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(student);
});

// Delete a student
router.delete('/:id', async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
});

module.exports = router;
