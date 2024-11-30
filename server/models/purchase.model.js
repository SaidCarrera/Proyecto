// Importamos mongoose para definir el esquema y el modelo.
const mongoose = require('mongoose');

// Definimos el esquema para el modelo "Purchase" (Compra).
const purchaseSchema = new mongoose.Schema(
  {
    // Usuario que realiza la compra.
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Referencia al modelo "User".
      ref: 'User', // Nombre del modelo al que hace referencia.
      required: true // Campo obligatorio.
    },

    // Libro que se está comprando.
    bookId: {
      type: mongoose.Schema.Types.ObjectId, // Referencia al modelo "Book".
      ref: 'Book', // Nombre del modelo al que hace referencia.
      required: true // Campo obligatorio.
    },

    // Cantidad de libros comprados.
    quantity: {
      type: Number, // Tipo de dato: número.
      required: true, // Campo obligatorio.
      min: 1 // Mínimo valor permitido es 1 (no se puede comprar menos de un libro).
    },

    // Precio total de la compra.
    totalPrice: {
      type: Number, // Tipo de dato: número.
      required: true // Campo obligatorio.
    },

    // Fecha de la compra.
    purchaseDate: {
      type: Date, // Tipo de dato: fecha.
      default: Date.now // Valor predeterminado: fecha y hora actual.
    },

    // Estado de la compra.
    status: {
      type: String, // Tipo de dato: cadena de texto.
      enum: ['completed', 'cancelled', 'refunded'], // Valores permitidos.
      default: 'completed' // Valor predeterminado: "completed".
    }
  },
  {
    // Opciones adicionales del esquema.
    timestamps: true // Agrega automáticamente "createdAt" y "updatedAt".
  }
);

// Creamos el modelo "Purchase" basado en el esquema definido.
const Purchase = mongoose.model('Purchase', purchaseSchema);

// Exportamos el modelo para usarlo en otras partes del proyecto.
module.exports = Purchase;
