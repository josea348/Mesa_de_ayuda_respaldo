import { pool } from '../database/conexion.js';
import { validationResult } from "express-validator";

// Obtener todos los equipos
export const getEquipos = async (req, res) => {
  try {
    let sql = 'SELECT * FROM equipos';
    const [rows] = await pool.query(sql);
    if (rows.length>0) {
      res.status(200).json( rows );
    } else {
      res.status(404).json({
        status: 404,
        msg: 'No hay equipos en la base de datos.'
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      msg: 'Error del servidor: '+error.message
    });
  }
};

export const getEquiposJoin = async (req, res) => {
  try {
    let sql = `SELECT e.id, e.nombre, e.descripcion, e.tipo, a.nombre AS ambiente, id_ambiente, e.fecha_creacion FROM equipos e
              JOIN ambiente a ON a.id = e.id_ambiente`;
    const [rows] = await pool.query(sql);
    if (rows.length>0) {
      res.status(200).json( rows );
    } else {
      res.status(404).json({
        status: 404,
        msg: 'No hay equipos en la base de datos.'
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      msg: 'Error del servidor: '+error.message
    });
  }
};

// Obtener un equipo por ID
export const getEquipoById = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 400,
      errors: errors.array()
    });
  }

  try {
    const { id } = req.params;
    let sql = 'SELECT * FROM equipos WHERE id = ?';
    const [rows] = await pool.query(sql, [id]);
    if (rows.length === 0) {
      return res.status(404).json({
        status: 404,
        msg: 'Equipo no encontrado'
      });
    } else {
      res.status(200).json( rows );
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      msg: 'Error del servidor: '+error.message
    });
  }
};

export const getEquipoByIdJoin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 400,
      errors: errors.array()
    });
  }

  try {
    const { id } = req.params;
    let sql = `SELECT equipos.id, equipos.nombre AS nombre, descripcion, tipo, ambiente.nombre AS ambiente, id_ambiente, equipos.fecha_creacion FROM equipos
              JOIN ambiente ON ambiente.id = id_ambiente
              WHERE equipos.id = ?`;
    const [rows] = await pool.query(sql, [id]);
    if (rows.length === 0) {
      return res.status(404).json({
        status: 404,
        msg: 'Equipo no encontrado'
      });
    } else {
      res.status(200).json( rows );
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      msg: 'Error del servidor: '+error.message
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
    const { nombre, descripcion, tipo, idAmbiente } = req.body;
    let sql = 'INSERT INTO equipos (nombre, descripcion, tipo, id_ambiente) VALUES (?, ?, ?, ?)';
    const [result] = await pool.query(sql, [nombre, descripcion, tipo, idAmbiente]);
    if (result.affectedRows>0) {
      res.status(200).json({
        status: 200,
        msg: 'Equipo creado correctamente',
        data: { id: result.insertId, ...req.body }
      });
    } else {
      res.status(404).json({
      status: 404,
      msg: 'Error al crear el equipo.'
    });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      msg: 'Error en el servidor: '+error.message
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
    const { nombre, descripcion, tipo, idAmbiente } = req.body;
    let sql = 'UPDATE equipos SET nombre = ?, descripcion = ?, tipo = ?, id_ambiente = ? WHERE id = ?';
    const [result] = await pool.query(sql, [nombre, descripcion, tipo, idAmbiente, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: 404,
        msg: 'Equipo no encontrado.'
      });
    } else {
      res.status(200).json({
        status: 200,
        msg: 'Equipo actualizado correctamente.',
        data: { id, ...req.body }
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      msg: 'Error del servidor: '+error.message
    });
  }
};

// Eliminar un equipo
export const eliminarEquipo = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 400,
      errors: errors.array()
    });
  }

  try {
    const { id } = req.params;
    let sql = 'DELETE FROM equipos WHERE id = ?';
    const [result] = await pool.query(sql, [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: 404,
        msg: 'Equipo no encontrado.'
      });
    } else {
      res.status(200).json({
        status: 200,
        msg: 'Equipo eliminado correctamente.'
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      msg: 'Error en el sistema: '+error.message
    });
  }
};

// Obtener equipos por ambiente
export const getEquiposByAmbiente = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 400,
      errors: errors.array()
    });
  }

  try {
    const { idAmbiente } = req.params;
    let sql = 'SELECT * FROM equipos WHERE id_ambiente = ?';
    const [rows] = await pool.query(sql, [idAmbiente]);
    if (rows.length>0) {
      res.status(200).json(rows);
    } else {
      res.status(404).json({
        status: 404,
        msg: 'Equipos por ambiente no encontrado.',
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      msg: 'Error del servidor: '+error.message
    });
  }
};

// Obtener equipos por tipo
export const getEquiposByTipo = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 400,
      errors: errors.array()
    });
  }

  try {
    const { tipo } = req.params;
    let sql = 'SELECT * FROM equipos WHERE tipo = ?';
    const [rows] = await pool.query(sql, [tipo]);
    if (rows.length>0) {
      res.status(200).json(rows);
    } else {
      res.status(404).json({
        status: 404,
        msg: 'Equipos por tipo no encontrado.',
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      msg: 'Error del servidor: '+error.message
    });
  }
};

// Obtener equipos por area
export const getEquiposByArea = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 400,
      errors: errors.array()
    });
  }

  try {
    const { idArea } = req.params;
    let sql = `SELECT eq.id, eq.nombre, eq.descripcion, eq.tipo, am.nombre ambiente, ar.nombre areas, eq.fecha_creacion FROM equipos eq
              JOIN ambiente am ON am.id = eq.id_ambiente
              JOIN areas ar ON ar.id = am.area_id
              WHERE ar.id = ?`;
    const [rows] = await pool.query(sql, [idArea]);
    if (rows.length>0) {
      res.status(200).json(rows);
    } else {
      res.status(404).json({
        status: 404,
        msg: 'Equipos por area no encontrado.',
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      msg: 'Error del servidor: '+error.message
    });
  }
};