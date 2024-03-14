const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const api = process.env.API_URL;

async function isRevoked(req, payload, done) {
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

function authJwt(req, res, next) {
    // Verifique se req está definido (ou seja, estamos no contexto de uma solicitação HTTP)
    if (!req) {
        // Se não houver uma solicitação, passe para a próxima middleware
        return;
    }

    // Lista de rotas que devem ser ignoradas (não autenticadas)
    const unlessPaths = [
        {url: /\/api\/products(.*)/, methods: ['GET', 'OPTIONS']},
        {url: /\/api\/categories(.*)/, methods: ['GET', 'OPTIONS']},
        `${api}/users/login`,
        `${api}/users/register`
    ];

    // Verifique se a rota atual está na lista de rotas unless
    const isUnlessRoute = unlessPaths.includes(req.path);

    if (isUnlessRoute) {
        return next ? next() : null; // Passe para a próxima middleware se next for uma função
    }

    // Restante do código de autenticação JWT...
}

module.exports = authJwt;
