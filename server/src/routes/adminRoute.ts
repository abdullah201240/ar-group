import express from 'express';
import { aboutUs, createBlog, createClientHandler, createJob, createProject, createService, createServiceDescription, deleteAbout, deleteBlog, deleteClient, deleteJob, deleteProject, deleteService, deleteServiceDescription, deleteTeam, deleteTestimonial, deleteWeAchieved, experiance, FinalizedEmail,  jobApplyById, RejectedEmail, Shortlistedemail, team, testimonial, updateAbout, updateApplicantStatus, updateExperiance, updateJob,  updateService,  updateTeam, updateTestimonial, updateWeAchieved, updateWhyDigirib, viewAbout, viewAboutById, viewAllServices, viewAllServicesDescription, viewBlog, viewClient, viewContacts, viewExperianceById, viewJob, viewProjects, viewServiceById, viewServiceDescriptionById, viewTeam, viewTeamById, viewTestimonial, viewTestimonialById, viewWeAchieved, viewWeAchievedById, viewWhyDigiribById, weAchieved, whyDigirib } from '../controllers/adminController'; // Adjust the import path as needed
import { errorHandler } from '../error-handler';
import authMiddleware from '../middleware/auth';
import { compressImageMiddlewareSeo, uploadSeo } from '../middleware/uploadSeo';
import { convertToWebP, uploadMul } from '../middleware/uploadMiddleware';
import { uploadPdf } from '../middleware/uploadPdf';

const router = express.Router();

router.post('/about',
  authMiddleware,
  uploadSeo.fields([
    { name: 'homeImage', maxCount: 1 },
    { name: 'whoWeAreImage', maxCount: 1 }
  ]),

  errorHandler(aboutUs)
);
// Route for updating an existing About record by ID
router.put('/about/:id', uploadSeo.fields([
  { name: 'homeImage', maxCount: 1 },
  { name: 'whoWeAreImage', maxCount: 1 }
]),
  authMiddleware,
  errorHandler(updateAbout));


// Route for deleting an About record by ID
router.delete('/about/:id', authMiddleware, errorHandler(deleteAbout));

// Route for viewing all About records
router.get('/about', authMiddleware, errorHandler(viewAbout));

// Route for viewing an About record by ID
router.get('/about/:id', authMiddleware, errorHandler(viewAboutById));


router.post('/experiance',
  errorHandler(experiance)
);
// Route for updating an existing About record by ID
router.put('/experiance/:id',
  authMiddleware,
  errorHandler(updateExperiance));

router.get('/experiance/:id', authMiddleware, errorHandler(viewExperianceById));


router.post('/whyDigirib',
  uploadSeo.fields([

    { name: 'image', maxCount: 1 }
  ]),
  
  errorHandler(whyDigirib)
);
// Route for updating an existing About record by ID
router.put('/whyDigirib/:id',
  authMiddleware,
  uploadSeo.fields([

    { name: 'image', maxCount: 1 }
  ]),
 
  errorHandler(updateWhyDigirib));

router.get('/whyDigirib/:id', authMiddleware, errorHandler(viewWhyDigiribById));








router.post('/testimonial',
  authMiddleware,
  uploadSeo.fields([

    { name: 'image', maxCount: 1 }
  ]),
  compressImageMiddlewareSeo,
  errorHandler(testimonial)
);
// Route for updating an existing About record by ID
router.put('/testimonial/:id', uploadSeo.fields([

  { name: 'image', maxCount: 1 }
]),
  authMiddleware,
  compressImageMiddlewareSeo,
  errorHandler(updateTestimonial));

// Route for deleting an About record by ID
router.delete('/testimonial/:id', authMiddleware, errorHandler(deleteTestimonial));

// Route for viewing all About records
router.get('/testimonial', authMiddleware, errorHandler(viewTestimonial));

// Route for viewing an About record by ID
router.get('/testimonial/:id', authMiddleware, errorHandler(viewTestimonialById));





router.post('/team',
  authMiddleware,
  uploadSeo.fields([

    { name: 'image', maxCount: 1 }
  ]),
  errorHandler(team)
);
// Route for updating an existing About record by ID
router.put('/team/:id', uploadSeo.fields([

  { name: 'image', maxCount: 1 }
]),
  authMiddleware,
  errorHandler(updateTeam));

// Route for deleting an About record by ID
router.delete('/team/:id', authMiddleware, errorHandler(deleteTeam));

// Route for viewing all About records
router.get('/team', authMiddleware, errorHandler(viewTeam));

// Route for viewing an About record by ID
router.get('/team/:id', authMiddleware, errorHandler(viewTeamById));




router.get('/contacts', authMiddleware, errorHandler(viewContacts));





router.post('/createProject', uploadSeo.fields([
  { name: 'image', maxCount: 1 }
]),createProject);

router.get('/projects', errorHandler(viewProjects));
router.delete('/projects/:id', deleteProject);

router.post('/weAchieved',
  authMiddleware,
  uploadSeo.fields([
    { name: 'image', maxCount: 1 }
  ]),
  compressImageMiddlewareSeo,
  errorHandler(weAchieved)
);
router.get('/viewWeAchieved', authMiddleware, errorHandler(viewWeAchieved));

router.get('/viewWeAchieved/:id', authMiddleware, errorHandler(viewWeAchievedById));
router.put('/weAchieved/:id', uploadSeo.fields([

  { name: 'image', maxCount: 1 }
]),
  authMiddleware,
  compressImageMiddlewareSeo,
  errorHandler(updateWeAchieved));

router.delete('/deleteWeAchieved/:id', authMiddleware, errorHandler(deleteWeAchieved));

router.post('/createClient',
  authMiddleware,
  uploadSeo.fields([
    { name: 'image', maxCount: 1 }
  ]),
  compressImageMiddlewareSeo,
  errorHandler(createClientHandler)
);


router.get('/viewClient', authMiddleware, errorHandler(viewClient));


router.delete('/deleteClient/:id', authMiddleware, errorHandler(deleteClient));




router.post('/createBlog',
  authMiddleware,
  uploadSeo.fields([
    { name: 'image', maxCount: 1 }
  ]),
  compressImageMiddlewareSeo,
  errorHandler(createBlog)
);
router.get('/viewBlog', authMiddleware, errorHandler(viewBlog));
router.delete('/deleteBlog/:id', authMiddleware, errorHandler(deleteBlog));

router.post('/job',
  authMiddleware,
  errorHandler(createJob)
);

router.get('/job', authMiddleware, errorHandler(viewJob));

router.delete('/job/:id', authMiddleware, errorHandler(deleteJob));

router.put('/job/:id',
  authMiddleware,
  errorHandler(updateJob));

router.get('/jobApply/:id/:page', authMiddleware, errorHandler(jobApplyById));

router.put('/jobApply/:applicantId/:status', authMiddleware, errorHandler(updateApplicantStatus));

router.post('/Shortlistedemail', authMiddleware, errorHandler(Shortlistedemail));
router.post('/RejectedEmail', authMiddleware, errorHandler(RejectedEmail));

router.post('/FinalizedEmail', uploadPdf.single('resume'), errorHandler(FinalizedEmail));

router.post('/services',
  uploadSeo.fields([
    { name: 'image', maxCount: 1 },
    { name: 'backgroundImage', maxCount: 1 }
  ]),
  
  errorHandler(createService));
  router.put('/services/:id',
    uploadSeo.fields([
      { name: 'image', maxCount: 1 },
      { name: 'backgroundImage', maxCount: 1 }
    ]),
    
    errorHandler(updateService));
  router.get('/services', errorHandler(viewAllServices));
  router.get('/services/:id', errorHandler(viewServiceById));
  router.delete('/services/:id', errorHandler(deleteService));

  


  router.post('/servicesDescription',
    errorHandler(createServiceDescription));
    router.put('/servicesDescription/:id',
      errorHandler(updateService));
    router.get('/servicesDescription', errorHandler(viewAllServicesDescription));
    router.get('/servicesDescription/:id', errorHandler(viewServiceDescriptionById));
    router.delete('/servicesDescription/:id', errorHandler(deleteServiceDescription));



export default router;
