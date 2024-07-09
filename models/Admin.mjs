// import pkg from 'mongoose';
// const { Schema, model, models } = pkg;
import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const AdminSchema = new Schema({
    email: {
        type: String, 
        unique: true,
    },
    password: {
        type: String, 
    }
}, {timestamps: true});

const Admin = models?.Admin || model('Admin', AdminSchema);

export {Admin}
