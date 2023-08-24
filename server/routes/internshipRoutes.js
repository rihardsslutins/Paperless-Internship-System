import express from 'express';

// controllers
import { post_internships, get_internships, get_internships_teacher, get_single_internships, put_internships, post_journal, put_journal } from '../controllers/internshipController.js';

// // middleware
import { protect } from '../middleware/authMiddleware.js';

const internshipRouter = express.Router();

// post an internship
internshipRouter.post('/internships', protect, post_internships);

// get internships
internshipRouter.get('/internships', protect, get_internships)

// get internships for teacher
internshipRouter.get('/internships/teacher/:id', protect, get_internships_teacher)

// get a single internship
internshipRouter.get('/internships/:id', protect, get_single_internships)

// completes an internship
internshipRouter.put('/internships/:id', protect, put_internships)

// create a journal record
internshipRouter.post('/journals', protect, post_journal)

// grade journal record
internshipRouter.put('/journals/:id', protect, put_journal)

export default internshipRouter;