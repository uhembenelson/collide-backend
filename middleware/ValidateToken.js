import pkg from 'jsonwebtoken'; 

export const ValidateToken = async (req, res, next) => {
    const jwt = pkg; 
    let token 
    let authHeader = req.headers.Authorization || req.headers.authorization; 
    if(authHeader && authHeader.startsWith('Bearer')){
        token = authHeader.split(' ')[1]; 
        jwt.verify(
            token, 'eking@590', (err, decoded) => {
                if(err){
                    return res.status(401).json({msg: 'User is not Authorized!'})
                } 
                req.user = decoded.user.data; 
                next() 
            }) 

            if(token == undefined){
                return res.status(401).json({msg: 'User is not Authorized!!!'})
            }
    }
}