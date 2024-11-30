// Importamos mongoose para definir el esquema y el modelo.
const mongoose = require('mongoose');

// Definimos el esquema para el modelo "Book".
const bookSchema = new mongoose.Schema(
  {
    // Título del libro.
    title: {
      type: String, // Tipo de dato: cadena de texto.
      required: true // Campo obligatorio.
    },

    // Autor del libro.
    author: {
      type: String, // Tipo de dato: cadena de texto.
      required: true // Campo obligatorio.
    },

    // Categoría o género del libro (e.g., ficción, ciencia, historia).
    category: {
      type: String, // Tipo de dato: cadena de texto.
      required: true // Campo obligatorio.
    },

    // Año de publicación del libro.
    publicationYear: {
      type: Number, // Tipo de dato: número.
      required: true // Campo obligatorio.
    },

    // Código ISBN único para identificar el libro.
    isbn: {
      type: String, // Tipo de dato: cadena de texto.
      required: true, // Campo obligatorio.
      unique: true // Debe ser único en la base de datos.
    },

    // Precio del libro.
    price: {
      type: Number, // Tipo de dato: número.
      required: true // Campo obligatorio.
    },

    // Cantidad disponible en inventario (stock).
    stock: {
      type: Number, // Tipo de dato: número.
      required: true, // Campo obligatorio.
      default: 0 // Valor predeterminado: 0.
    }
  },
  {
    // Opciones adicionales del esquema.
    timestamps: true // Agrega automáticamente los campos "createdAt" y "updatedAt".
  }
);

// Creamos el modelo "Book" basado en el esquema definido.
const Book = mongoose.model('Book', bookSchema);

// Exportamos el modelo para usarlo en otras partes del proyecto.
module.exports = Book;
