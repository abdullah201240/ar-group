import express from 'express';
const router = express.Router();
import authRoute from './auth'
import admin from './admin'



router.use('/admin/auth', authRoute);
router.use('/admin', admin);




export default router;
