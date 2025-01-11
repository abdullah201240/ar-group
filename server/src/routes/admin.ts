import express from 'express';
import { errorHandler } from '../error-handler';
import authMiddleware from '../middleware/auth';
import { uploadSeo } from '../middleware/uploadSeo';
import { aboutUs, company, contacts, deleteAbout, deleteCompany, updateAbout, updateCompany, viewAbout, viewAboutById, viewCompany, viewCompanyById, viewContacts } from '../controllers/adminController';
const router = express.Router();

router.post('/about',
    
    uploadSeo.fields([
      { name: 'chairmanImage', maxCount: 1 },
      { name: 'mdImage', maxCount: 1 },
      { name: 'mdDigiribImage', maxCount: 1 },
      { name: 'ourStoryImage', maxCount: 1 }
    ]),
  
    errorHandler(aboutUs)
  );
  // Route for updating an existing About record by ID
  router.put('/about/:id', uploadSeo.fields([
    { name: 'chairmanImage', maxCount: 1 },
      { name: 'mdImage', maxCount: 1 },
      { name: 'mdDigiribImage', maxCount: 1 },
      { name: 'ourStoryImage', maxCount: 1 }
  ]),
    errorHandler(updateAbout));
  
  
  // Route for deleting an About record by ID
  router.delete('/about/:id', authMiddleware, errorHandler(deleteAbout));
  
  // Route for viewing all About records
  router.get('/about', errorHandler(viewAbout));
  
  // Route for viewing an About record by ID
  router.get('/about/:id', errorHandler(viewAboutById));

  router.get('/contacts', errorHandler(viewContacts));
  router.post('/contacts', errorHandler(contacts));


  router.get('/contacts', errorHandler(viewContacts));
  router.post('/contacts', errorHandler(contacts));


  router.get('/company', errorHandler(viewCompany));
  router.post('/company', errorHandler(company));
  router.put('/company/:id', errorHandler(updateCompany));
  router.delete('/company', errorHandler(deleteCompany));
  router.get('/company/:id', errorHandler(viewCompanyById));




  export default router;
