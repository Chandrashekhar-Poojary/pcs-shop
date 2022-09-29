/* eslint-disable import/order */
/* eslint-disable no-underscore-dangle */
/* eslint-disable arrow-body-style */
import config from "./config";
import jwt from "jsonwebtoken";

export const generateToken = (user) =>{
    return jwt.sign(
    {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    },
    config.JWT_SECRET
    );
};

// Middleware , it requires 3 parameter
export const isAuth = ( req, res, next) =>{
    const bearerToken = req.headers.authorization;
    if(!bearerToken){
        res.status(401).send({ message: "Token is not supplied "});
    }else{
        const token = bearerToken.slice(7, bearerToken.length);
        jwt.verify(token, config.JWT_SECRET, (err, data) =>{
            if(err){
                res.status(401).send({ message: "Invalid Token" });
            }else {
                req.user = data;
                next(); // this means everything okay in this middleware and next handler should start processing the req
            }
        });
    }
};

export const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(401).send({ message: 'Token is not valid for admin user' });
    }
  };