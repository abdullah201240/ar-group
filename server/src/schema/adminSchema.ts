
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
  const aboutSchema = z.object({
    
    chairmanDescription: z.string(),
    
    mdDescription: z.string(),
    
    mdDigiribDescription: z.string(),
    
    ourStory: z.string(),
    mission: z.string(),
    vision: z.string(),
  })

  const contactsSchema = z.object({
    name: z.string(),  // Ensures the title is a string
    phone: z.string(),  // Ensures the subTitle is a string
    email: z.string().email(), // Ensures that the email is in a valid format
    subject: z.string(),  // Ensures the description is a string
    massage: z.string(),
  });

  const companySchema = z.object({
    description: z.string(),  // Ensures the title is a string
    description1: z.string(),  // Ensures the subTitle is a string
    description2: z.string(), // Ensures that the email is in a valid format
  });
  
  export {companySchema,contactsSchema,aboutSchema,signupSchema,loginSchema};
