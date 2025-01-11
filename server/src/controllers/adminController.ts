import { NextFunction, Request, Response } from 'express';
import { UnprocessableEntity } from '../exceptions/validation';

import About from '../models/about'
import { aboutSchema, companySchema, contactsSchema } from '../schema/adminSchema';
import { BadRequestException } from '../exceptions/bad-requests';
import { ErrorCode } from '../exceptions/root';
import Contacts from '../models/contact';
import Company from '../models/company';

export const aboutUs = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const validation = aboutSchema.safeParse(req.body);

    // If validation fails, throw a custom error
    if (!validation.success) {
        return next(new UnprocessableEntity(validation.error.errors, 'Validation Error'));
    }

    // Destructure the data from the validated body
    const { chairmanDescription, mdDescription, mdDigiribDescription, ourStory, mission,vision } = req.body;
    
    


    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
   
    // Handle file uploads for images, using req.files (since you're uploading multiple fields)
    const chairmanImage = files['chairmanImage'] ? files['chairmanImage'][0].path : '';
    
    const mdImage = files['mdImage'] ? files['mdImage'][0].path : ''; // Check if 'image' exists in req.files
    

    const mdDigiribImage = files['mdDigiribImage'] ? files['mdDigiribImage'][0].path : ''; // Check if 'image' exists in req.files
    

    const ourStoryImage = files['ourStoryImage'] ? files['ourStoryImage'][0].path : '';
    

    // Create a new "About" record in the database
    const newAbout = await About.create({
        chairmanDescription,
        chairmanImage,
        mdDescription,
        mdImage,
        mdDigiribDescription,

        mdDigiribImage,

        ourStory,
        ourStoryImage,
        mission,
        vision
    
    });

    return res.status(201).json({ message: 'About created successfully', admin: newAbout });
};



// Update API
export const updateAbout = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params; // Get the ID of the record from the URL parameters
    const validation = aboutSchema.safeParse(req.body);

    // If validation fails, throw a custom error
    if (!validation.success) {
        return next(new UnprocessableEntity(validation.error.errors, 'Validation Error'));
    }

    const aboutRecord = await About.findByPk(id);

    // If record not found, return error
    if (!aboutRecord) {
        return next(new BadRequestException('About record not found', ErrorCode.ABOUT_RECORD_NOT_FOUND));
    }

    // Destructure the data from the validated body
    const { mission, chairmanDescription,mdDescription,mdDigiribDescription, vision, ourStory } = req.body;

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    // Handle file uploads for images, using req.files (since you're uploading multiple fields)
    const chairmanImage = files['chairmanImage'] ? files['chairmanImage'][0].path : ''; // Check if 'homeImage' exists in req.files
    const mdImage = files['mdImage'] ? files['mdImage'][0].path : ''; // Check if 'image' exists in req.files
    const mdDigiribImage = files['mdDigiribImage'] ? files['mdDigiribImage'][0].path : ''; // Check if 'homeImage' exists in req.files
    const ourStoryImage = files['ourStoryImage'] ? files['ourStoryImage'][0].path : ''; // Check if 'homeImage' exists in req.files

    
    // Update the fields if new values are provided, otherwise keep the existing values
    aboutRecord.mission = mission || aboutRecord.mission;
    aboutRecord.chairmanDescription = chairmanDescription || aboutRecord.chairmanDescription;
    aboutRecord.vision = vision || aboutRecord.vision;
    aboutRecord.mdDescription = mdDescription || aboutRecord.mdDescription;
    aboutRecord.mdDigiribDescription = mdDigiribDescription || aboutRecord.mdDigiribDescription;
    aboutRecord.ourStory = ourStory || aboutRecord.ourStory;
    
    aboutRecord.chairmanImage = chairmanImage || aboutRecord.chairmanImage;
    aboutRecord.mdImage = mdImage || aboutRecord.mdImage;
    aboutRecord.mdDigiribImage = mdDigiribImage || aboutRecord.mdDigiribImage;
    aboutRecord.ourStoryImage = ourStoryImage || aboutRecord.ourStoryImage;

    
    // Save the updated record
    const updatedAbout = await aboutRecord.save();

    return res.status(200).json({ message: 'About updated successfully', admin: updatedAbout });
};


// Delete API
export const deleteAbout = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params; // Get the ID of the record from the URL parameters

    const deletedCount = await About.destroy({
        where: { id }, // Delete the record by ID
    });

    if (deletedCount === 0) {
        return next(new BadRequestException('About record not found', ErrorCode.ABOUT_RECORD_NOT_FOUND));

    }

    return res.status(200).json({ message: 'About deleted successfully' });
};
// View API (Fetch all About records)
export const viewAbout = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const aboutRecords = await About.findAll();

    if (!aboutRecords || aboutRecords.length === 0) {
        return next(new BadRequestException('About record not found', ErrorCode.ABOUT_RECORD_NOT_FOUND));
    }

    return res.status(200).json({ message: 'Fetched About records successfully', data: aboutRecords });
};
// View by ID API (Fetch a specific About record by ID)
export const viewAboutById = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params; // Get the ID of the record from the URL parameters

    const aboutRecord = await About.findByPk(id); // Find the record by primary key

    if (!aboutRecord) {
        return next(new BadRequestException(`About record with ID ${id} not found`, ErrorCode.ABOUT_RECORD_NOT_FOUND));

    }

    return res.status(200).json({ message: 'Fetched About record successfully', data: aboutRecord });
};



export const contacts
  = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const validation = contactsSchema.safeParse(req.body);

    // If validation fails, throw a custom error
    if (!validation.success) {
      return next(new UnprocessableEntity(validation.error.errors, 'Validation Error'));
    }

    // Destructure the data from the validated body
    const { name, email, phone, subject, massage} = req.body;

    const newContacts = await Contacts.create({
      name,
      email,
      phone,
      subject,
      massage
    });

    return res.status(201).json({ message: 'Contacts created successfully', user: newContacts });
  };





export const viewContacts = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const contactsRecords = await Contacts.findAll();
  
    if (!contactsRecords || contactsRecords.length === 0) {
      return next(new BadRequestException('Contacts record not found', ErrorCode.CONTACTS_RECORD_NOT_FOUND));
    }
  
    return res.status(200).json({ message: 'Fetched Contacts records successfully', data: contactsRecords });
  };
  

  export const company
  = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const validation = companySchema.safeParse(req.body);

    // If validation fails, throw a custom error
    if (!validation.success) {
      return next(new UnprocessableEntity(validation.error.errors, 'Validation Error'));
    }

    // Destructure the data from the validated body
    const { description, description1, description2} = req.body;

    const newCompany = await Company.create({
        description,
        description1,
        description2,
      
    });

    return res.status(201).json({ message: 'Company created successfully', user: newCompany });
  };

  export const viewCompany = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const companyRecords = await Contacts.findAll();
  
    if (!companyRecords || companyRecords.length === 0) {
      return next(new BadRequestException('Contacts record not found', ErrorCode.CONTACTS_RECORD_NOT_FOUND));
    }
  
    return res.status(200).json({ message: 'Fetched Contacts records successfully', data: companyRecords });
  };




  // Update API
export const updateCompany = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params; // Get the ID of the record from the URL parameters
    console.log(req.body)
    
    const validation = companySchema.safeParse(req.body);

    // If validation fails, throw a custom error
    if (!validation.success) {
        return next(new UnprocessableEntity(validation.error.errors, 'Validation Error'));
    }

    const aboutRecord = await Company.findByPk(id);

    // If record not found, return error
    if (!aboutRecord) {
        return next(new BadRequestException('About record not found', ErrorCode.ABOUT_RECORD_NOT_FOUND));
    }

    // Destructure the data from the validated body
    const { description, description1,description2 } = req.body;

    
    // Update the fields if new values are provided, otherwise keep the existing values
    aboutRecord.description = description || aboutRecord.description;
    aboutRecord.description1 = description1 || aboutRecord.description1;
    aboutRecord.description2 = description2 || aboutRecord.description2;
    
    
    
    // Save the updated record
    const updatedAbout = await aboutRecord.save();

    return res.status(200).json({ message: 'About updated successfully', admin: updatedAbout });
};


// Delete API
export const deleteCompany = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params; // Get the ID of the record from the URL parameters

    const deletedCount = await Company.destroy({
        where: { id }, // Delete the record by ID
    });

    if (deletedCount === 0) {
        return next(new BadRequestException('Company record not found', ErrorCode.ABOUT_RECORD_NOT_FOUND));

    }

    return res.status(200).json({ message: 'Company deleted successfully' });
};

export const viewCompanyById = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params; // Get the ID of the record from the URL parameters

    const aboutRecord = await Company.findByPk(id); // Find the record by primary key

    if (!aboutRecord) {
        return next(new BadRequestException(`About record with ID ${id} not found`, ErrorCode.ABOUT_RECORD_NOT_FOUND));

    }

    return res.status(200).json({ message: 'Fetched About record successfully', data: aboutRecord });
};