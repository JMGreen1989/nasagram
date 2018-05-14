const jwt = require('jsonwebtoken');
const secret = process.env.TOKEN_SECRET || 'supersecuresecret';

module.exports = {
    makeToken(payload) {
     console.log('this is the payload', payload)
     return jwt.sign(
         payload,
         secret,
         {
             expiresIn: '1h',
             issuer: 'nasagram'
         }
        )
    },

    verify(token, claims, cb) {
       jwt.verify(
         token,
         secret,
         claims,
         cb
       )
    },
}
