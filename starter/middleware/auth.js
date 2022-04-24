const jwt = require('jsonwebtoken');
const {UnauthenticatedError} = require("../errors/index");

const authenticationMiddleware = async(req,res,next) => {
    console.log(req.headers.authorization)
    console.log(req.headers); //{authorization:'Bearer hdgfshdjgfhd...',others props..}
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        // throw new CustomAPIError('No token provided', 401) //401 - authentication error
        throw new UnauthenticatedError('No token provided')
    }

    const token = authHeader.split(' ')[1];
    
    //verify token:
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const {id,username} = decoded
        req.user = {id:id,username:username}
        next()
    } catch (error) {
        // throw new CustomAPIError('Not authorized to access the route', 401)
        throw new UnauthenticatedError('Not authorized to access the route')
    }
}

module.exports = authenticationMiddleware;