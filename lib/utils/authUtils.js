const jwt = require('jsonwebtoken');

const JWT_SECRET = require('../plugins/auth/utils/config');

function getUserIdFromToken(socket){
    const token = socket.handshake.auth.token;

    if (!token) {
        return null;
    }

    try{
        const decoded = jwt.verify(token, JWT_SECRET); // Verify and decode the token
        return decoded.id;
    }
    catch(error){
        console.log('Invalid Token' , error);
        return null;
    }
}

module.exports = getUserIdFromToken