// Importamos mongoose para definir el esquema y el modelo.
const mongoose = require('mongoose');

// Definimos el esquema para el modelo "Reservation" (Reservación).
const reservationSchema = new mongoose.Schema(
  {
    // Usuario que realiza la reservación.
    user: {
      type: mongoose.Schema.Types.ObjectId, // Referencia al modelo "User".
      required: true, // Campo obligatorio.
      ref: 'User' // Nombre del modelo referenciado.
    },

    // Libro reservado.
    book: {
      type: mongoose.Schema.Types.ObjectId, // Referencia al modelo "Book".
      required: true, // Campo obligatorio.
      ref: 'Book' // Nombre del modelo referenciado.
    },

    // Fecha de inicio de la reservación.
    startDate: {
      type: Date, // Tipo de dato: fecha.
      required: true // Campo obligatorio.
    },

    // Fecha de fin de la reservación.
    endDate: {
      type: Date, // Tipo de dato: fecha.
      required: true // Campo obligatorio.
    },

    // Estado de la reservación.
    status: {
      type: String, // Tipo de dato: cadena de texto.
      enum: ['pending', 'active', 'completed', 'cancelled'], // Valores permitidos:
      // - "pending": Reservación creada pero no confirmada.
      // - "active": Reservación confirmada y en uso.
      // - "completed": Reservación finalizada.
      // - "cancelled": Reservación cancelada.
      default: 'pending' // Valor predeterminado: "pending".
    }
  },
  {
    // Opciones adicionales del esquema.
    timestamps: true // Agrega automáticamente los campos "createdAt" y "updatedAt".
  }
);

// Creamos el modelo "Reservation" basado en el esquema definido.
const Reservation = mongoose.model('Reservation', reservationSchema);

// Exportamos el modelo para usarlo en otras partes del proyecto.
module.exports = Reservation;
