import Course from "../../models/course.js";
import asyncHandler from "express-async-handler";
import User from "../../models/User.js";


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



// export const registerCourse = asyncHandler(async(req, res) =>{
//    const user = req.user._id ;   //getting the logged in users _id from jwt token and assigning it to variable 'user' for
//    // get registeredCourse array from current logged in user 
//   // const userCourse = req.user.registeredCourse
//   // return res.status(200).json({'Course Updated!!': userCourse});
//    console.log("this is user")


// })
export const registerCourse = async (req, res)=>{
    const userId = req.user._id
    const data = req.body
    // console.log("this is worrk", req.body)
    const userdata = req.user
    const getUserCourse = req.user.Courses
    getUserCourse.push({...data})
    console.log('getUserCourse', getUserCourse )
    console.log("user", userdata)

    // find user with id of userId and update courses
   try{
    const newUser = await User.findOneAndUpdate({"_id":userId}, {"$set":{"Courses" : getUserCourse}})
    if(newUser){
        return res.status(201).json({msg:"Course registerd"});
    }
        
    

   }catch(error){
    return res.status(201).json({msg:error});
   }
 
}






