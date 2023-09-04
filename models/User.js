import mongoose, { Schema, Document, Model } from 'mongoose'; 


const UserSchema = new Schema({ 
    firstName: { type: String }, 
    lastName: { type: String}, 
    email: { type: String}, 
    phoneNumber: { type: String}, 
    password: { type: String}, 
    timestamps: {
        createdAt: {
            type: Date, 
            default: Date.now
        }, 
        updatedAt: {
            type: Date, 
            default: Date.now
        }
    }
}) 


const User = mongoose.model('User', UserSchema); 
export default User; 