const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); // Si no hay token, retorna 401 (Unauthorized)

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403); // Si el token no es válido, retorna 403 (Forbidden)

        req.user = user; // Guardar la información del usuario en la request para usarla en las rutas
        next(); // Continuar con la siguiente función middleware o la ruta
    });
}

module.exports = { authenticateToken };