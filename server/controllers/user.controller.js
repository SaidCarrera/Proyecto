// Importamos el modelo de usuario y la librería jsonwebtoken.
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

// Función para generar un token JWT.
// Recibe el ID del usuario como parámetro y genera un token con un tiempo de expiración de 30 días.
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // El token será válido por 30 días.
  });
};

// Controlador para registrar un nuevo usuario.
const registerUser = async (req, res) => {
  try {
    // Extraemos los datos del cuerpo de la solicitud.
    const { username, email, password } = req.body;

    // Verificamos si ya existe un usuario con el mismo email.
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' }); // Error si el usuario ya está registrado.
    }

    // Creamos un nuevo usuario en la base de datos.
    const user = await User.create({
      username,  // Nombre de usuario.
      email,     // Email del usuario.
      password,  // Contraseña (debe manejarse con un hash en el modelo).
    });

    // Respondemos con los datos del usuario creado y generamos un token JWT.
    res.status(201).json({
      _id: user._id,         // ID único del usuario.
      username: user.username,
      email: user.email,
      role: user.role,       // Rol del usuario (por defecto, puede ser 'user').
      token: generateToken(user._id), // Token de autenticación.
    });
  } catch (error) {
    // En caso de error, respondemos con un mensaje y un código de estado 400.
    res.status(400).json({ message: error.message });
  }
};

// Controlador para iniciar sesión con un usuario existente.
const loginUser = async (req, res) => {
  try {
    // Extraemos el email y la contraseña del cuerpo de la solicitud.
    const { email, password } = req.body;

    // Buscamos al usuario por su email.
    const user = await User.findOne({ email });

    // Verificamos que el usuario existe y que la contraseña coincide.
    // `matchPassword` es un método definido en el modelo de usuario para comparar contraseñas.
    if (user && (await user.matchPassword(password))) {
      // Si las credenciales son correctas, respondemos con los datos del usuario y un token JWT.
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      // Error si las credenciales son inválidas.
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    // En caso de error, respondemos con un mensaje y un código de estado 400.
    res.status(400).json({ message: error.message });
  }
};

// Exportamos los controladores para usarlos en las rutas correspondientes.
module.exports = {
  registerUser, // Registro de un nuevo usuario.
  loginUser,    // Inicio de sesión de un usuario existente.
};
