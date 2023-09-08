import express from 'express';
import { RegisterCourseUser, createCourse, deleteCourse, getCourse, getCourses, updateCourse } from '../controllers/course/index.js';
import { ValidateToken } from '../middleware/ValidateToken.js';
const router = express.Router(); 





//create course 
router.post("/api/v1/create-course", ValidateToken, createCourse)

//get all courses
router.get("/api/v1/all-courses", ValidateToken, getCourses) 


//get course by id 
router.get("/api/v1/get-a-course", ValidateToken, getCourse)


//update course
router.put("/api/v1/update-course", ValidateToken, updateCourse)


//delete course  
router.delete("/api/v1/delete-course", ValidateToken, deleteCourse)


//add a course to an existing user 
router.post("/api/v1/register-a-course", ValidateToken, RegisterCourseUser)





export { router as courseRoute }