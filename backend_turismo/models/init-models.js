const { DataTypes } = require("sequelize");
const _ciudades = require("./ciudades");
const _monumentos = require("./monumentos");

function initModels(sequelize) {
  const ciudades = _ciudades(sequelize, DataTypes);
  const monumentos = _monumentos(sequelize, DataTypes);

  // Definir relaciones aquí si existen
  
  return {
    ciudades,
    monumentos,
  };
}

module.exports = { initModels };
