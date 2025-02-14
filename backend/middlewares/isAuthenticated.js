import jwt from 'jsonwebtoken'

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token
        //console.log(token)
        if(!token) return res.status(401).json({message: 'user not authenticated'});
        const decode = await jwt.verify(token, process.env.JWT_SECRET)
        //console.log(decode)
        if(!decode) return res.status(401).json({message: 'Invalid token'})
        //console.log(decode._id)
        req.id = decode._id
        next()
    }catch(error){
        console.log(error)
    }
}

export default isAuthenticated