const jwt = require("express-jwt");

function authJwt(){

    const jwt  = require('express-jwt');

    function authJwt() {
        const secret = process.env.JWT_SECRET;
        return jwt({
            secret,
            algorithms: ['HS256']
        }).unless({ //não passa pelo middleware que exige o tojken
            path: [
                '/api/users/login',
                '/api/users/register'
            ]
            
        })
    }
    
    module.exports = authJwt;

}