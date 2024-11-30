// Importamos jsonwebtoken para verificar los tokens.
const jwt = require('jsonwebtoken');

// Importamos el modelo de usuario para consultar información en la base de datos.
const User = require('../models/user.model');

// Middleware para proteger rutas mediante autenticación.
const protect = async (req, res, next) => {
  let token; // Variable para almacenar el token de autenticación.

  // Verificamos si existe un token en el encabezado de autorización y comienza con "Bearer".
  if (req.headers.authorization?.startsWith('Bearer')) {
    try {
      // Extraemos el token del encabezado.
      token = req.headers.authorization.split(' ')[1];

      // Verificamos y decodificamos el token usando la clave secreta.
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Buscamos al usuario en la base de datos por el ID contenido en el token.
      // Excluimos el campo de la contraseña para mayor seguridad.
      req.user = await User.findById(decoded.id).select('-password');

      // Si todo está correcto, pasamos al siguiente middleware o controlador.
      next();
    } catch (error) {
      // En caso de error al verificar el token, respondemos con un código 401 (no autorizado).
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // Si no se encontró un token, respondemos con un código 401.
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Middleware para verificar si el usuario tiene el rol de administrador.
const admin = (req, res, next) => {
  // Verificamos que el usuario autenticado tenga el rol de "admin".
  if (req.user && req.user.role === 'admin') {
    next(); // Si es administrador, pasamos al siguiente middleware o controlador.
  } else {
    // Si no tiene permisos de administrador, respondemos con un código 401.
    res.status(401).json({ message: 'Not authorized as admin' });
  }
};

// Exportamos los middlewares para usarlos en las rutas protegidas.
module.exports = { 
  protect, // Protege rutas mediante autenticación JWT.
  admin    // Verifica que el usuario tenga rol de administrador.
};
