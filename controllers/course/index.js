import Course from "../../models/course.js";
import asyncHandler from "express-async-handler";


export const createCourse = asyncHandler(async(req, res) => {
    console.log('all', req.user); 
    const user_id = req.user._id; 
    const course = new Course ({
        user_id, 
        category: req.body.category, 
        title: req.body.title, 
        price: req.body.price, 
        duration: req.body.duration, 
        status: req.body.status, 
        imageUrl: req.body.imageUrl, 
        name: req.user.firstName + ' ' + req.user.lastName,
        bio: req.body.bio, 
        socials: req.body.socials, 
        outline: req.body.outline

    })
    
        try {
            const courseCreated =  await course.save()
            res.status(201).json(courseCreated)
        } catch (Error) {
            res.status(400).json(Error); 
        }
        
        
    
    
     
}) 

//get all courses 
export const getCourses = asyncHandler(async(req, res)=>{
    const allCourses = await Course.find(); 
    return res.status(200).json({msg: "All Courses", data: allCourses})
})


//get a course by id 

export const getCourse = asyncHandler(async(req, res) => {
    
    
        const id = req.body.id 
        const findId = await Course.findById({_id:id}) 
        if (!findId) {
            res.status(404); 
            throw Error(`${id} Not Found!!!`);
        } 
        return res.status(200).json({'course Found': findId })
   
    
})  

//delete a course by id 
export const deleteCourse = asyncHandler(async(req, res) => {
    const id = req.body.id; 
    const deleteOneCourse = await Course.findByIdAndDelete(id);
    if (!deleteOneCourse) {
        res.status(404); 
        throw Error(`${id} Not Found!!!`);
    }
    return res.status(200).json({'deleted Course:': deleteOneCourse}); 
}) 

//update a course 

export const updateCourse = asyncHandler(async(req, res) =>{
    const id = req.body.id; 
    const getCourse = await Course.findById({_id:id}); 
    if (!getCourse) {
        res.status(404); 
        throw Error("Id not found");
        
    } 
    const updatedCourse = await Course.findByIdAndUpdate(getCourse, req.body, {new:true})
    return res.status(200).json({'Course Updated!!': updatedCourse});

})





