require('dotenv/config');

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) 
    return res.status(401).json({ meta: { success: false, message: 'Não autenticado.' } });

  const parts = authHeader.split(' ');

  if (parts == 2)
    return res.status(401).json({ meta: { success: false, message: 'Token inválido!' } });

  const [ scheme, token ] = parts;
  
  if (!/^Bearer$/.test(scheme))
    return res.status(401).json({ meta: { success: false, message: 'Token inválido!' } });

  jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
    if (err) 
      return res.status(401).json({ meta: { success: false, message: 'Token inválido!' } });

    req.userId = decoded.id;
    
    return next();
  });
};