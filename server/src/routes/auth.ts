import express from 'express';
import { createAdmin, deleteAdmin, login, me, viewAdmin, viewAdminById } from '../controllers/authController'; // Adjust the import path as needed
import { errorHandler } from '../error-handler';
import authMiddleware from '../middleware/auth';

const router = express.Router();

// Route to create a new admin
router.post('/createAdmin',(createAdmin));
router.post('/login', errorHandler(login));

router.get('/me',authMiddleware,errorHandler(me));

// Route for deleting an About record by ID
router.delete('/admin/:id', authMiddleware,errorHandler(deleteAdmin));

// Route for viewing all About records
router.get('/admin',authMiddleware, errorHandler(viewAdmin));

// Route for viewing an About record by ID
router.get('/admin/:id',authMiddleware, errorHandler(viewAdminById));



export default router;
