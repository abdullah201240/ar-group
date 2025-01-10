import express from 'express';
const router = express.Router();
import authRoute from './auth'



router.use('/admin/auth', authRoute);



export default router;
