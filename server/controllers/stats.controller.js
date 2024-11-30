// Importamos express-async-handler para gestionar errores en funciones asíncronas.
const asyncHandler = require('express-async-handler');

// Importamos el servicio de estadísticas que contiene la lógica para manejar los datos estadísticos.
const StatsService = require('../services/stats.service');

// Controlador para obtener las estadísticas actuales.
const getStats = asyncHandler(async (req, res) => {
  // Llama al servicio de estadísticas para obtener los datos actuales.
  const stats = await StatsService.getStats();

  // Devuelve las estadísticas en formato JSON.
  res.json(stats);
});

// Controlador para actualizar las estadísticas.
const updateStats = asyncHandler(async (req, res) => {
  // Llama al servicio de estadísticas para recalcular o actualizar los datos.
  const stats = await StatsService.updateStats();

  // Devuelve las estadísticas actualizadas en formato JSON.
  res.json(stats);
});

// Exportamos los controladores para ser utilizados en las rutas correspondientes.
module.exports = {
  getStats,       // Obtener estadísticas actuales.
  updateStats     // Actualizar estadísticas.
};
