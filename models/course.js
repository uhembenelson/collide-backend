import mongoose, { Schema, Document, Model } from 'mongoose'; 


const CourseSchema = new Schema({ 
    category: { type: String, required: true, }, 
    title: { type: String}, 
    description: { type: String}, 
    price: { type: String}, 
    duration: { type: Number}, 
    status: { type: String}, 
    imageUrl: {type: String}, 
    name: {type: String, ref: "User",}, 
    bio: {type: String}, 
    socials: { type: Array}, 
    outline: { type: Array}, 

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


const Course = mongoose.model('Course', CourseSchema); 
export default Course; 