// Importamos los modelos necesarios.
const Stats = require('../models/stats.model');         // Modelo para las estadísticas.
const User = require('../models/user.model');           // Modelo para los usuarios.
const Book = require('../models/book.model');           // Modelo para los libros.
const Purchase = require('../models/purchase.model');   // Modelo para las compras.
const Reservation = require('../models/reservation.model'); // Modelo para las reservas.

class StatsService {
  // Método estático para actualizar las estadísticas.
  static async updateStats() {
    try {
      // Usamos Promise.all para obtener los datos de usuarios, libros, compras y reservas en paralelo.
      const [users, books, purchases, reservations] = await Promise.all([
        User.find(),         // Obtener todos los usuarios.
        Book.find(),         // Obtener todos los libros.
        Purchase.find(),     // Obtener todas las compras.
        Reservation.find()   // Obtener todas las reservas.
      ]);

      // Calculamos las estadísticas basadas en los datos obtenidos.
      const stats = {
        totalUsers: users.length,                    // Total de usuarios.
        adminUsers: users.filter(user => user.role === 'admin').length, // Cantidad de usuarios con rol admin.
        regularUsers: users.filter(user => user.role === 'user').length, // Cantidad de usuarios con rol user.
        totalBooks: books.length,                    // Total de libros disponibles.
        totalPurchases: purchases.length,            // Total de compras realizadas.
        totalReservations: reservations.length,       // Total de reservas realizadas.
        activeReservations: reservations.filter(res => res.status === 'active').length, // Total de reservas activas.
        lastUpdated: new Date()                       // Fecha de la última actualización.
      };

      // Actualizamos o creamos el documento de estadísticas en la base de datos.
      await Stats.findOneAndUpdate({}, stats, { upsert: true, new: true });
      return stats;  // Retornamos las estadísticas actualizadas.
    } catch (error) {
      // Si ocurre un error, lanzamos una excepción con el mensaje de error.
      throw new Error(`Error updating stats: ${error.message}`);
    }
  }

  // Método estático para obtener las estadísticas.
  static async getStats() {
    try {
      // Intentamos obtener las estadísticas actuales de la base de datos.
      const stats = await Stats.findOne();
      if (!stats) {
        // Si no existen estadísticas, las actualizamos y las retornamos.
        return await this.updateStats();
      }
      // Si existen estadísticas, las retornamos.
      return stats;
    } catch (error) {
      // Si ocurre un error al obtener las estadísticas, lanzamos una excepción.
      throw new Error(`Error getting stats: ${error.message}`);
    }
  }
}

// Exportamos el servicio para que se pueda usar en otros archivos.
module.exports = StatsService;
