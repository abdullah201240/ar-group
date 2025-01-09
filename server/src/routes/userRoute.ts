import express from 'express';
import {  viewAboutById, viewTeam, viewTestimonial,contacts, viewWeAchieved, viewClient,viewBlog, viewBlogByid, viewJob, viewJobByid, applyJob, viewProject, viewProjectById, viewExperianceById, viewWhyDigiribById, viewAllServices, viewServiceById, viewServiceDescriptionById } from '../controllers/userController'; 
import { errorHandler } from '../error-handler';
import { uploadPdf } from '../middleware/uploadPdf';

const router = express.Router();

// Route for viewing an About record by ID
router.get('/about/:id', errorHandler(viewAboutById));
router.get('/experiance/:id', errorHandler(viewExperianceById));

router.get('/whyDigirib/:id', errorHandler(viewWhyDigiribById));

router.get('/testimonial', errorHandler(viewTestimonial));
router.get('/team', errorHandler(viewTeam));


router.post('/contacts', errorHandler(contacts));
router.get('/viewWeAchieved', errorHandler(viewWeAchieved));
router.get('/viewClient', errorHandler(viewClient));

router.get('/viewBlog', errorHandler(viewBlog));
router.get('/blog/:id', errorHandler(viewBlogByid));

router.get('/job', errorHandler(viewJob));
router.get('/job/:id', errorHandler(viewJobByid));
router.post('/applyJob',uploadPdf.single('resume'), errorHandler(applyJob));

router.get('/projectname', errorHandler(viewProject));
router.get('/viewProjectById', errorHandler(viewProjectById));
router.get('/services', errorHandler(viewAllServices));
router.get('/services/:id', errorHandler(viewServiceById));
router.get('/servicesDescription/:id', errorHandler(viewServiceDescriptionById));



export default router;
