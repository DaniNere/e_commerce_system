const jwt = require("express-jwt");
const api = process.env.API_URL;

function authJwt() {
    const secret = process.env.JWT_SECRET;
    return jwt({
        secret,
        algorithms: ['HS256']
    }).unless({ // Rota que deseja excluir
        path: [
            {url: /\/api\/products(.*)/, methods: ['GET', 'OPTIONS']},
            `${api}/users/login`,
            `${api}/users/register`
        ]
    });
}

module.exports = authJwt;