import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { mongooseConnect } from '../lib/mongoose.mjs';
import { Admin } from '../models/Admin.mjs';

dotenv.config();

async function addAdminDB() {
    try {
      await mongooseConnect(); 
      const email = process.env.ADMIN_EMAIL;
      const plainTextPassword = process.env.ADMIN_PASSWORD;
      const saltRounds = 10; 
      const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);
      const newAdmin = new Admin({
        email,
        password: hashedPassword
        });
      await newAdmin.save();
    } catch (error) {
        console.error('Error inserting admin:', error);
    } finally {
        mongoose.disconnect();
    }
}
addAdminDB();
