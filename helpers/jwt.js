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
            {url: /\/api\/categories(.*)/, methods: ['GET', 'OPTIONS']},
            `${api}/users/login`,
            `${api}/users/register`
        ]
    });
    
    async function isRevoked (req, payload, done){
        try {
            if (!payload.isAdmin) {
                // Se o usuário não for um administrador, revogue o token
                return done(null, true);
            } 
    
            // Se o usuário for um administrador, o token não é revogado
            return done(null, false);
        } catch (error) {
            return done(error, true); // Erro interno ao verificar o token, revogar por precaução
        }
    }
}

module.exports = authJwt;