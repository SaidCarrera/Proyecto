// Importamos mongoose para definir el esquema y el modelo.
const mongoose = require('mongoose');
// Importamos bcryptjs para encriptar las contraseñas.
const bcrypt = require('bcryptjs');

// Definimos el esquema para el modelo "User" (Usuario).
const userSchema = new mongoose.Schema(
  {
    // Nombre de usuario, requerido y debe ser único en la base de datos.
    username: {
      type: String, // Tipo de dato: cadena de texto.
      required: true, // Es obligatorio.
      unique: true // Debe ser único en la base de datos.
    },

    // Correo electrónico, requerido y debe ser único en la base de datos.
    email: {
      type: String, // Tipo de dato: cadena de texto.
      required: true, // Es obligatorio.
      unique: true // Debe ser único en la base de datos.
    },

    // Contraseña del usuario, requerida.
    password: {
      type: String, // Tipo de dato: cadena de texto.
      required: true // Es obligatorio.
    },

    // Rol del usuario, puede ser 'user' o 'admin'. Por defecto es 'user'.
    role: {
      type: String, // Tipo de dato: cadena de texto.
      enum: ['user', 'admin'], // Valores posibles: 'user' o 'admin'.
      default: 'user' // Valor por defecto: 'user'.
    }
  },
  {
    // Opciones adicionales del esquema.
    timestamps: true // Agrega automáticamente los campos "createdAt" y "updatedAt".
  }
);

// Middleware para encriptar la contraseña antes de guardar un nuevo usuario.
userSchema.pre('save', async function(next) {
  // Solo encriptar la contraseña si ha sido modificada (o es nueva).
  if (!this.isModified('password')) {
    next();
  }

  // Generar un "salt" con bcrypt (cantidad de rondas de encriptación).
  const salt = await bcrypt.genSalt(10);
  // Encriptar la contraseña con el "salt" generado.
  this.password = await bcrypt.hash(this.password, salt);
});

// Método para comparar la contraseña ingresada con la almacenada en la base de datos.
userSchema.methods.matchPassword = async function(enteredPassword) {
  // Usamos bcrypt para comparar las contraseñas (la ingresada y la almacenada).
  return await bcrypt.compare(enteredPassword, this.password);
};

// Creamos el modelo "User" basado en el esquema definido.
const User = mongoose.model('User', userSchema);

// Exportamos el modelo para usarlo en otras partes del proyecto.
module.exports = User;
