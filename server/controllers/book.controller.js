// Importamos el modelo de libro desde la carpeta de modelos.
const Book = require('../models/book.model');

// Función para obtener todos los libros de la base de datos.
const getBooks = async (req, res) => {
  try {
    // Busca todos los libros en la colección de libros.
    const books = await Book.find({});
    // Devuelve los libros encontrados en formato JSON.
    res.json(books);
  } catch (error) {
    // Devuelve un error 500 si ocurre un problema en el servidor.
    res.status(500).json({ message: error.message });
  }
};

// Función para obtener un libro específico por su ID.
const getBookById = async (req, res) => {
  try {
    // Busca el libro usando el ID proporcionado en los parámetros de la solicitud.
    const book = await Book.findById(req.params.id);
    if (book) {
      // Si el libro se encuentra, lo devuelve en formato JSON.
      res.json(book);
    } else {
      // Si no se encuentra, devuelve un error 404.
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    // Devuelve un error 500 si ocurre un problema en el servidor.
    res.status(500).json({ message: error.message });
  }
};

// Función para crear un nuevo libro en la base de datos.
const createBook = async (req, res) => {
  try {
    // Crea un nuevo libro usando los datos enviados en el cuerpo de la solicitud.
    const book = await Book.create(req.body);
    // Devuelve el libro creado con un código 201 (Creado).
    res.status(201).json(book);
  } catch (error) {
    // Devuelve un error 400 si los datos enviados no son válidos.
    res.status(400).json({ message: error.message });
  }
};

// Función para actualizar un libro existente por su ID.
const updateBook = async (req, res) => {
  try {
    // Busca y actualiza el libro usando el ID proporcionado.
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Devuelve el documento actualizado.
      runValidators: true // Ejecuta las validaciones del esquema antes de guardar.
    });
    if (book) {
      // Si se encuentra y actualiza, lo devuelve en formato JSON.
      res.json(book);
    } else {
      // Si no se encuentra, devuelve un error 404.
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    // Devuelve un error 400 si los datos enviados no son válidos.
    res.status(400).json({ message: error.message });
  }
};

// Función para eliminar un libro por su ID.
const deleteBook = async (req, res) => {
  try {
    // Busca y elimina el libro usando el ID proporcionado.
    const book = await Book.findByIdAndDelete(req.params.id);
    if (book) {
      // Si se elimina correctamente, devuelve un mensaje de éxito.
      res.json({ message: 'Book removed' });
    } else {
      // Si no se encuentra, devuelve un error 404.
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    // Devuelve un error 500 si ocurre un problema en el servidor.
    res.status(500).json({ message: error.message });
  }
};

// Exporta todas las funciones para que puedan ser utilizadas en otras partes del proyecto.
module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};
