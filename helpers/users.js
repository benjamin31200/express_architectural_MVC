import pkg from 'jsonwebtoken';
const { sign } = pkg;
import jwtDecode from 'jwt-decode';

const PRIVATE_KEY = process.env.PRIVATE_KEY;

export const calculateToken = (userEmail = "") => {
    return sign({email: userEmail}, PRIVATE_KEY)
}

export const decodeToken = (token) => {
    return jwtDecode(token);
}