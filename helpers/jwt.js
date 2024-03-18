const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const api = process.env.API_URL;

const authJwt = async (req, res, next) => {
    const unlessRoutes = [
        `${api}/users/login`,
        `${api}/users/register`
        // Adicione outras rotas aqui, se necessário
    ];

    // Verifique se a rota atual está na lista de rotas que não exigem autenticação JWT
    if (unlessRoutes.includes(req.path)) {
        // Se a rota atual estiver na lista, passe para a próxima middleware
        return next();
    }

    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: "Not Authorization" });
    }

    const token = authorization.split(' ')[1];

    try {
        const decodedToken= jwt.verify(token, secret);

        req.user = decodedToken;     


        next();
    } catch (error) {
        return res.status(401).json({ message: "Not Authorization2" });
    }
}

module.exports = authJwt
