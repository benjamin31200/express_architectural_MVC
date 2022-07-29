const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');

const PRIVATE_KEY = process.env.PRIVATE_KEY;

const calculateToken = (userEmail = "") => {
    return jwt.sign({email: userEmail}, PRIVATE_KEY)
}

const decodeToken = (token) => {
    return jwtDecode(token);
}

module.exports = { 
    calculateToken,
    decodeToken
};