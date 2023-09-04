//Get current user 

export const CurrentUser = (req, res) => {
    console.log(req.user)
    return res.status(200).send(req.user); 
}