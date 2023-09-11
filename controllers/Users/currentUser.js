//Get current user 

export const CurrentUser = (req, res) => {
    console.log("thiss is a new user",req.user)
    return res.status(200).send(req.user); 
}