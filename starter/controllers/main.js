//check username, password in post(login) request
//if they exist - create new JWT - JSON WEB TOKEN

const jwt = require('jsonwebtoken');
const {BadRequest} = require("../errors/index");

//send back to FE
const login = async(req,res) => {
    const {username, password} = req.body;
    //checking if both r present or else throwing error
    if(!username || !password) {
        // throw new CustomAPIError('Please provide username and password',400)
        throw new BadRequest('Please provide username and password')
    }
    //other ways to check:
    //mongoose validation (in Schema, using 'required'), package called JOI

    const id = new Date().getDate(); //just for demo, normally provided by DB

    const token = jwt.sign(
        { id, username },//keep the payload small, no passwords
        process.env.JWT_SECRET,//keep the jwt secret long and unpredictable in case production
        { expiresIn:'30d' }
    ) 
    //jwt.sign({payload,jwt_secret,options})
    res.status(200).json({msg:'user created',token:token})
    //in FE,
    //localStorage.setItem('token',data.token);
}

const dashboard = async(req,res) => {
    // console.log(req.headers); //{authorization:'Bearer hdgfshdjgfhd...',others props..}
    // const authHeader = req.headers.authorization;
    // if (!authHeader || !authHeader.startsWith('Bearer ')) {
    //     throw new CustomAPIError('No token provided',401) //401 - authentication error
    // }

    // const token = authHeader.split(' ')[1];

    // //verify token:
    // try {
    //     const decoded = jwt.verify(token,process.env.JWT_SECRET);
    //     console.log(decoded) // { id: 24, username: 'rashmi', iat: 1650802316, exp: 1653394316 } > it is the payload which u sent while creating the token
        const {username} = req.user; //from auth middleware
        const luckyNumber = Math.floor(Math.random() * 100)

        res.status(200).json({ msg: `Hello, ${username}`, secret: `Here is your authorized data, your lucky number is ${luckyNumber}` })
    // } catch (error) {
    //     throw new CustomAPIError('Not authorized to access the route',401)
    // }
    
    //in FE,
    //localStorage.getItem('token');
    //const {data} = await axios.get('/api/v1/dashboard',{headers:{Authorization:`Bearer ${token}`}})
}

module.exports = {login, dashboard};

//JWT - way to exchange data btw FE app and api
//JWT - has some security features, where we can sure abt the integrity of the data
//header payload signature - str of JWT
//package for signing and decoding JWT - jsonwebtoken