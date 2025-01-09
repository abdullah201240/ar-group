import { z } from 'zod';

const signupSchema = z.object({
  name: z.string()
    .min(3, 'Name must be at least 3 characters long')
    .max(50, 'Name must be at most 50 characters long'),

  email: z.string()
    .email('Invalid email')
    .min(1, 'Email is required'),

  password: z.string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one digit')
    .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character'),

  phone: z.string()
    .min(10, 'Phone number must be at least 10 characters long')
    .max(15, 'Phone number must be at most 15 characters long'),

  dob: z.string()
    .refine(val => !isNaN(Date.parse(val)), {
      message: 'Date of Birth must be a valid date',
    }),

  gender: z.string()
    .min(1, 'Gender is required')
    .max(10, 'Gender must be at most 10 characters long'),

  role: z.string()
    .min(3, 'Role must be at least 3 characters long')
    .max(20, 'Role must be at most 20 characters long'),
});

const loginSchema = z.object({
  email: z.string()
    .email('Invalid email')
    .min(1, 'Email is required'),
  password: z.string()
    .min(1, 'Password is required'),
});

const experianceSchema = z.object({
  projectsComplete: z.string()
    .max(10, 'Home description must be at most 10 characters long'),

    iTProfessionals: z.string()
    .max(10, 'Mission must be at most 10 characters long'),

    happyClients: z.string()
    .max(10, 'Vision must be at most 10 characters long'),

    yearsOfExpertise: z.string()
    .max(10, 'Description must be at most 10 characters long'),

  

 
});

const whyDigiribSchema = z.object({
  description: z.string()
    .max(600, 'Home description must be at most 600 characters long'),
 
});


const aboutSchema = z.object({
  homeDescription: z.string()
    .max(600, 'Home description must be at most 600 characters long'),

  mission: z.string()
    .max(500, 'Mission must be at most 500 characters long'),

  vision: z.string()
    .max(500, 'Vision must be at most 500 characters long'),

  description: z.string()
    .max(800, 'Description must be at most 800 characters long'),

  whoWeAreText: z.string()
    .max(800, 'Who we are text must be at most 800 characters long'),

 
});

const testimonialSchema  = z.object({
  title: z.string(),

  designation: z.string(),


    description: z.string(),

  
});
const teamSchema = z.object({
  name: z.string(),
  designation: z.string(),
  email: z.string().email(), // Ensures that the email is in a valid format
  phone: z.string(),
  description: z.string(),
});

const servicesSchema = z.object({
  name: z.string(),
});
const servicesDescriptionSchema = z.object({
  title: z.string(),
  description: z.string(),
});

const contactsSchema = z.object({
  name: z.string(),  // Ensures the title is a string
  phone: z.string(),  // Ensures the subTitle is a string
  email: z.string().email(), // Ensures that the email is in a valid format
  topic: z.string(),  // Ensures the description is a string
});
const categorySchema = z.object({
  name: z.string(),  // Ensures the title is a string
 
});

const projectSchema = z.object({
  title: z.string(), 
  link: z.string(),  
});



const weAchievedSchema = z.object({
  title: z.string(), 
  subTitle: z.string(),  
  date: z.string(),  

});

const blogSchema = z.object({
  title: z.string(), 
  description: z.string(),   

});
const jobSchema = z.object({
  deadline: z.string(),
  position: z.string(),
  location: z.string(),
  experience: z.string(),
  description: z.string(),
  salary: z.string(),
  vacancies: z.string(),
  keyResponsibilities: z.string(),
  skillsExperience: z.string(),
});


export {servicesDescriptionSchema,whyDigiribSchema,experianceSchema,jobSchema,blogSchema, weAchievedSchema,projectSchema,categorySchema, contactsSchema,signupSchema,servicesSchema,teamSchema, loginSchema,aboutSchema ,testimonialSchema};

