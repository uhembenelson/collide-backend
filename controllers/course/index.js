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

//register a course to a user 
// export const RegisterCourseUser = asyncHandler(async(req, res) => {
//     const user_id = req.user._id 
//     const courseId = req.body._id; 
//     //return res.json(courseId); 
//     const findCourse = await Course.findOne({_id:courseId }); 
 
//     if (!findCourseId) {
//         res.status(404); 
//         throw Error('Id not found!!')
        
//     } 
    
//      //if the course id is found then add it to the registered courses in the user
    
      
//         const userRegisterCourse = req.user.registeredCourse; 
//         if( findCourseId === userRegisterCourse){
//             res.status(404); 
//             throw Error('Course already Registered!!')
//         } 
//         //else or otherwise 
//         const course = JSON.parse(findCourseId)
//         userRegisterCourse.push(course)
//         userRegisterCourse.save(); 
//         return res.status(200).json({'Course Register!!!!': userRegisterCourse})
    
//     // 
    
//     // //const findUserById = await User.findById({_id:id }); 
//     // if(findUserById){
//     //     const newItem = req.body.course
//     //     const newme = findUserById.Courses
//     //     //let check if the newitem is in the newme 
//     //     if (newItem === newme) {
//     //         res.status(404); 
//     //         throw Error('course already exist!!!')
            
//     //     } 
//     //     //else or otherwise
//     //     newme.push(newItem); 
//     //     findUserById.save(); 
//     //     return res.status(200).json({'New Course added!!!!': findUserById }); 
//     // }
// })




export const RegisterCourseUser = asyncHandler(async(req, res) =>{
    //const user = req.user; 
    const user_id = req.user._id; 
    const frontendCourse = req.body.course; 
   
    //get the courseId in the frontendCourse 
    const courseId = frontendCourse[0].courseId
         
    //check if the courseid from the frontend is in the existing Course database
    const findCourse = await Course.findById({ _id:courseId}); 
    if (!findCourse) {
        res.status(404); 
        throw  new Error('Course Id not found!!')
        
    }
        res.status(200).json({msg: 'Course ID Found!!', data:findCourse}); 
     
        const RegisterCourse =   { registercourse: req.user['registeredCourse'] }      // console.log(typeof(RegisterCourse))
        
        // const Course = JSON.stringify(findCourse)
        // console.log(typeof(Course))
        //let myCourse;
       
       //console.log(RegisterCourse)
        //findCourse = mapped 
        

            //let check = RegisterCourse.find(user => user.user_id == user_id)
        //     for (let i = 0; i < findCourse.length; i++) {
        //         myCourse = {"courses registered:": findCourse[i]}
        //         RegisterCourse.push(myCourse[i]); 
        //         RegisterCourse.save(); 

                
        //    }
            // if (check == undefined) {
                // RegisterCourse.push(findCourse);  
                //RegisterCourse.save();  
                //console.log(RegisterCourse)
            //     res.status(400).send({ msg: 'Courses registered'})
            // } else {
            //     res.status(201).send({msg:"you have applied for this Course"})
            // }
         
        


    // 
    //  if(findCourse){
    //     const newme = RegisterCourse; 
    //     let check = newme.find(user => user.user_id == user_id)
    //     if(check === undefined){
    //         newme.push(findCourse)
    //         user.save() 
    //         res.status(400).send({ msg: 'Courses registered!'})
    //     } else{
    //         res.status(201).send({msg: "you have applied for this course"})
    //     }

    //  }  else{
    //     res.status(404); 
    //     throw Error('Course not found')
    // }
})
