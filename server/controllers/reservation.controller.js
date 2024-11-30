// Importamos los modelos de reservas y libros.
const Reservation = require('../models/reservation.model');
const Book = require('../models/book.model');

// Función para crear una nueva reserva.
const createReservation = async (req, res) => {
  try {
    // Extraemos los datos necesarios del cuerpo de la solicitud.
    const { bookId, startDate, endDate } = req.body;

    // Verificamos si el libro existe en la base de datos.
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' }); // Error si no existe.
    }

    // Validamos que el libro tenga stock disponible.
    if (book.stock <= 0) {
      return res.status(400).json({ message: 'Book is out of stock' }); // Error si no hay stock.
    }

    // Creamos la reserva con los datos proporcionados.
    const reservation = await Reservation.create({
      user: req.user._id, // ID del usuario autenticado.
      book: bookId,       // ID del libro reservado.
      startDate,          // Fecha de inicio de la reserva.
      endDate,            // Fecha de finalización de la reserva.
      status: 'active'    // Estado inicial de la reserva.
    });

    // Reducimos el stock del libro reservado.
    book.stock -= 1;
    await book.save();

    // Respondemos con la reserva creada.
    res.status(201).json(reservation);
  } catch (error) {
    // Manejamos errores en caso de datos inválidos u otros problemas.
    res.status(400).json({ message: error.message });
  }
};

// Función para obtener todas las reservas de un usuario autenticado.
const getUserReservations = async (req, res) => {
  try {
    // Buscamos todas las reservas realizadas por el usuario.
    const reservations = await Reservation.find({ user: req.user._id })
      .populate('book') // Rellenamos los datos del libro asociado.
      .sort('-createdAt'); // Ordenamos por fecha de creación (más recientes primero).
    
    // Respondemos con las reservas encontradas.
    res.json(reservations);
  } catch (error) {
    // Respondemos con un error 500 si ocurre un problema en el servidor.
    res.status(500).json({ message: error.message });
  }
};

// Función para obtener todas las reservas (útil para administradores).
const getAllReservations = async (req, res) => {
  try {
    // Buscamos todas las reservas en la base de datos.
    const reservations = await Reservation.find({})
      .populate('user', 'username email') // Rellenamos los datos del usuario (solo username y email).
      .populate('book') // Rellenamos los datos del libro asociado.
      .sort('-createdAt'); // Ordenamos por fecha de creación (más recientes primero).

    // Respondemos con todas las reservas.
    res.json(reservations);
  } catch (error) {
    // Respondemos con un error 500 si ocurre un problema en el servidor.
    res.status(500).json({ message: error.message });
  }
};

// Función para actualizar el estado de una reserva.
const updateReservationStatus = async (req, res) => {
  try {
    // Extraemos el nuevo estado del cuerpo de la solicitud.
    const { status } = req.body;

    // Buscamos la reserva por su ID.
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' }); // Error si no existe.
    }

    // Si la reserva es cancelada, restauramos el stock del libro asociado.
    if (status === 'cancelled' && reservation.status === 'active') {
      const book = await Book.findById(reservation.book);
      book.stock += 1;
      await book.save();
    }

    // Actualizamos el estado de la reserva.
    reservation.status = status;
    await reservation.save();

    // Respondemos con la reserva actualizada.
    res.json(reservation);
  } catch (error) {
    // Respondemos con un error 400 si los datos enviados no son válidos.
    res.status(400).json({ message: error.message });
  }
};

// Exportamos las funciones para ser utilizadas en las rutas correspondientes.
module.exports = {
  createReservation,       // Crear una nueva reserva.
  getUserReservations,     // Obtener reservas de un usuario específico.
  getAllReservations,      // Obtener todas las reservas.
  updateReservationStatus  // Actualizar el estado de una reserva.
};
