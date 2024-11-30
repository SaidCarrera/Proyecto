// Importamos mongoose para definir el esquema y el modelo.
const mongoose = require('mongoose');

// Definimos el esquema para el modelo "Stats" (Estadísticas).
const statsSchema = new mongoose.Schema(
  {
    // Total de usuarios registrados en el sistema.
    totalUsers: {
      type: Number, // Tipo de dato: número.
      default: 0 // Valor predeterminado: 0.
    },

    // Total de usuarios administradores.
    adminUsers: {
      type: Number, // Tipo de dato: número.
      default: 0 // Valor predeterminado: 0.
    },

    // Total de usuarios regulares (no administradores).
    regularUsers: {
      type: Number, // Tipo de dato: número.
      default: 0 // Valor predeterminado: 0.
    },

    // Total de libros disponibles en el sistema.
    totalBooks: {
      type: Number, // Tipo de dato: número.
      default: 0 // Valor predeterminado: 0.
    },

    // Total de compras realizadas en el sistema.
    totalPurchases: {
      type: Number, // Tipo de dato: número.
      default: 0 // Valor predeterminado: 0.
    },

    // Total de reservaciones realizadas en el sistema.
    totalReservations: {
      type: Number, // Tipo de dato: número.
      default: 0 // Valor predeterminado: 0.
    },

    // Total de reservaciones activas (en curso).
    activeReservations: {
      type: Number, // Tipo de dato: número.
      default: 0 // Valor predeterminado: 0.
    },

    // Fecha de la última actualización de las estadísticas.
    lastUpdated: {
      type: Date, // Tipo de dato: fecha.
      default: Date.now // Valor predeterminado: la fecha y hora actuales.
    }
  },
  {
    // Opciones adicionales del esquema.
    timestamps: true // Agrega automáticamente los campos "createdAt" y "updatedAt".
  }
);

// Creamos el modelo "Stats" basado en el esquema definido.
const Stats = mongoose.model('Stats', statsSchema);

// Exportamos el modelo para usarlo en otras partes del proyecto.
module.exports = Stats;
