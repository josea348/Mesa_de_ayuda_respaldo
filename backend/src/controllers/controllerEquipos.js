import { pool } from '../database/conexion.js';
import { validationResult } from "express-validator";

// Obtener todos los equipos
export const getEquipos = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM equipos');
    if (rows.length>0) {
      res.status(200).json({
        status: 200,
        message: 'Equipos obtenidos correctamente',
        rows
      });
    } else {
      res.status(404).json({
        status: 404,
        message: 'No hay equipos en la base de datos.'
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Error al obtener equipos',
      error: error.message
    });
  }
};

// Obtener un equipo por ID
export const getEquipoById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM equipos WHERE id = ?', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({
        status: 404,
        message: 'Equipo no encontrado'
      });
    }
    
    res.json({
      status: 200,
      message: 'Equipo obtenido correctamente',
      data: rows[0]
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Error al obtener el equipo',
      error: error.message
    });
  }
};

// Crear un nuevo equipo
export const crearEquipo = async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({
      status: 400,
      errors: errors.array()
    });
  }

  try {
    const { nombre, descripcion, tipo, id_ambiente } = req.body;
    let sql = 'INSERT INTO equipos (nombre, descripcion, tipo, id_ambiente) VALUES (?, ?, ?, ?)';

    const [result] = await pool.query(sql, [nombre, descripcion, tipo, id_ambiente]);
    
    if (result.affectedRows>0) {
      res.status(200).json({
        status: 200,
        message: 'Equipo creado correctamente',
        data: { id: result.insertId, ...req.body }
      });
    } else {
      res.status(404).json({
      status: 404,
      message: 'Error al crear el equipo.'
    });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Error en el servidor',
      error: error.message
    });
  }
};

// Actualizar un equipo
export const actualizarEquipo = async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({
      status: 400,
      errors: errors.array()
    });
  }

  try {
    const { id } = req.params;
    const { nombre, descripcion, tipo, id_ambiente } = req.body;
    let sql = 'UPDATE equipos SET nombre = ?, descripcion = ?, tipo = ?, id_ambiente = ? WHERE id = ?';
    
    const [result] = await pool.query(sql, [nombre, descripcion, tipo, id_ambiente, id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: 404,
        message: 'Equipo no encontrado'
      });
    }
    
    res.json({
      status: 200,
      message: 'Equipo actualizado correctamente',
      data: { id, ...req.body }
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Error al actualizar el equipo',
      error: error.message
    });
  }
};

// Eliminar un equipo
export const eliminarEquipo = async (req, res) => {
  try {
    const { id } = req.params;
    
    const [result] = await pool.query('DELETE FROM equipos WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: 404,
        message: 'Equipo no encontrado'
      });
    }
    
    res.json({
      status: 200,
      message: 'Equipo eliminado correctamente'
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Error al eliminar el equipo',
      error: error.message
    });
  }
};

// Obtener equipos por ambiente
export const getEquiposByAmbiente = async (req, res) => {
  try {
    const { id_ambiente } = req.params;
    const [rows] = await pool.query('SELECT * FROM equipos WHERE id_ambiente = ?', [id_ambiente]);
    
    res.json({
      status: 200,
      message: 'Equipos por ambiente obtenidos correctamente',
      data: rows
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Error al obtener equipos por ambiente',
      error: error.message
    });
  }
};

// Obtener equipos por tipo
export const getEquiposByTipo = async (req, res) => {
  try {
    const { tipo } = req.params;
    const [rows] = await pool.query('SELECT * FROM equipos WHERE tipo = ?', [tipo]);
    
    res.json({
      status: 200,
      message: 'Equipos por tipo obtenidos correctamente',
      data: rows
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Error al obtener equipos por tipo',
      error: error.message
    });
  }
};