import jwt from 'jsonwebtoken';

export const PRIVATE_KEY = "wdqwedqwd12d3d32ddd23d23d23ddsds"

export const generateToken = user => {
    const token = jwt.sign({user}, PRIVATE_KEY )
    return token
}

export const verifySign = token => {
    try {
        const credentials = jwt.verify(token, PRIVATE_KEY)
        return credentials
        } catch (error) {
        console.error("Error verifying token:", error);
        return null;
    }
}