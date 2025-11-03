// routes/courses.js
const express = require('express');
const Course = require('../models/course');
const router = express.Router();

// 🟢 Create a new course
router.post('/', async (req, res) => {
    try {
        const course = new Course(req.body);
        await course.save();
        res.status(201).send(course);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// 🟡 Read (get) all courses
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        res.send(courses);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// 🔵 Update a course by ID
router.put('/:id', async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(course);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// 🔴 Delete a course by ID
router.delete('/:id', async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.id);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;
