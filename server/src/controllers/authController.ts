import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import Admin from '../models/admin'; // Adjust the import path as needed
import jwt from 'jsonwebtoken';
import { UnprocessableEntity } from '../exceptions/validation';
import { BadRequestException } from '../exceptions/bad-requests';
import { ErrorCode } from '../exceptions/root';
import { loginSchema, signupSchema } from '../schema/adminSchema';
import { UnauthorizedException } from '../exceptions/unauthorized';
const JWT_SECRET = process.env.JWT_SECRET_KEY || "12sawegg23grr434"; // Fallback to a hardcoded secret if not in env

export const createAdmin = async (req: Request, res: Response, next: NextFunction): Promise<any | Response> => {
    const result = signupSchema.safeParse(req.body); // Zod validation
  
    if (!result.success) {
      // If validation fails, throw a custom error
      return next(new UnprocessableEntity(result.error.errors, 'Validation Error'));
    }
    const { name, email, password, phone, dob, gender, role } = req.body;
    if (!name || !email || !password || !phone || !dob || !gender || !role) {
      return next(new BadRequestException('All fields are required', ErrorCode.MISSING_FIELDS));
    }
  
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ where: { email } });
    if (existingAdmin) {
      return next(new BadRequestException('Admin already exists', ErrorCode.ADMIN_ALREADY_EXISTS));
    }
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Create the new admin in the database
    const newAdmin = await Admin.create({
      name,
      email,
      password: hashedPassword,
      phone,
      dob,
      gender,
      role,
    });
  
  
    // Exclude the password from the response
    const { password: _, ...adminResponse } = newAdmin.toJSON();
    // Clear the cached admin list after creating a new admin
  
  
    return res.status(201).json({ message: 'Admin created successfully', admin: adminResponse });
  
  };


  // Delete API
export const deleteAdmin = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params; // Get the ID of the record from the URL parameters
  
    const deletedCount = await Admin.destroy({
      where: { id }, // Delete the record by ID
    });
  
    if (deletedCount === 0) {
      return next(new BadRequestException('Admin record not found', ErrorCode.ADMIN_RECORD_NOT_FOUND));
  
    }
    
  
    return res.status(200).json({ message: 'Admin deleted successfully' });
  };
  // View API (Fetch all Admin records)
  export const viewAdmin = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    
  
    const adminRecords = await Admin.findAll();
  
    if (!adminRecords || adminRecords.length === 0) {
      return next(new BadRequestException('Admin record not found', ErrorCode.ADMIN_RECORD_NOT_FOUND));
    }
    
  
    return res.status(200).json({ message: 'Fetched adminRecords records successfully', data: adminRecords });
  };
  // View by ID API (Fetch a specific Admin record by ID)
  export const viewAdminById = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params; // Get the ID of the record from the URL parameters
    
    const adminRecords = await Admin.findByPk(id); // Find the record by primary key
  
    if (!adminRecords) {
      return next(new BadRequestException(`About record with ID ${id} not found`, ErrorCode.ADMIN_RECORD_NOT_FOUND));
  
    }
    
  
    return res.status(200).json({ message: 'Fetched About record successfully', data: adminRecords });
  };
  
  
  
  
  
  export const login = async (req: Request, res: Response, next: NextFunction): Promise<any | Response> => {
    // Zod validation for request body
    const validation = loginSchema.safeParse(req.body);
  
    // If validation fails, throw a custom error
    if (!validation.success) {
  
      return next(new UnprocessableEntity(validation.error.errors, 'Validation Error'));
    }
  
    const { email, password } = req.body;
  
    // Check if the required fields are present
    if (!email || !password) {
      return next(new BadRequestException('All fields are required', ErrorCode.MISSING_FIELDS));
    }
    // Find the admin by email
    const admin = await Admin.findOne({ where: { email } });
  
    // If the admin doesn't exist, throw an error
    if (!admin) {
      return next(new BadRequestException('Admin not found', ErrorCode.ADMIN_NOT_FOUND));
    }
  
    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
  
    // If the password is incorrect, throw an error
    if (!isPasswordValid) {
      return next(new BadRequestException('Incorrect password', ErrorCode.INCORRECT_PASSWORD));
    }
  
    // Generate JWT token with the admin's id, email, and role
    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: admin.role },
      JWT_SECRET as string, // Make sure to define JWT_SECRET_KEY in your environment variables
      { expiresIn: '1h' } // Set token expiration time (e.g., 1 hour)
    );
    // Set the JWT token as a cookie
    res.cookie('token', token, {
      httpOnly: true, // Prevents access via JavaScript
      secure: process.env.NODE_ENV === 'production', // Secure cookie in production only
      sameSite: 'strict', // Corrected to lowercase "strict"
    });
  
    // Send the token in the response
    return res.status(200).json({ message: 'Login successful', token });
  };


  export const me = async (req: Request, res: Response) => {
    const reqWithAdmin = req as Request & { admin: Admin }; // Manually cast the request type
    const { name, email, phone, dob, gender } = reqWithAdmin.admin.dataValues; // Extract only required fields
    res.json({ name, email, phone, dob, gender }); // Return only desired fields
  };


  export const logout = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    
      // Clear the token cookie
      res.clearCookie('token', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
  
      // Set token expiration time to a past date
      const token = req.cookies.token; // Retrieve the token
      if (token) {
        jwt.verify(token, JWT_SECRET, (err: any) => {
          if (!err) {
            const blacklistedToken = { token }; // Add to blacklisted tokens if needed (optional)
            // Perform additional storage (e.g., in memory, file, etc.) if blacklisting is required
          }
        });
      }
  
      return res.status(200).json({ message: 'Logout successful' });
  };