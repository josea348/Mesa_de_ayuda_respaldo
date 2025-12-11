import { pool } from "../database/conexion.js";
import { validationResult } from "express-validator";

export const getAmbiente = async (req, res) => {
  try {
    let sql = 'SELECT * FROM ambiente';
    const [result] = await pool.query(sql);
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ 'status': 404, 'msg': 'No hay ambientes registradas.' });
    }
  } catch (e) {
    console.log('Error del sistema' + e);
    res.status(500).json({ 'status': 500, 'msg': 'Error: ' + e });
  }
}

export const getAmbienteJoin = async (req, res) => {  
  try {
    let sql = `SELECT ambiente.id, ambiente.nombre, ubicacion, capacidad, estado, areas.nombre AS area_id, ambiente.fecha_creacion FROM ambiente
              JOIN areas ON areas.id = ambiente.area_id`;
    const [result] = await pool.query(sql);
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ 'status': 404, 'msg': 'No hay ambientes registradas.' });
    }
  } catch (e) {
    console.log('Error del sistema' + e);
    res.status(500).json({ 'status': 500, 'msg': 'Error: ' + e });
  }
}

export const getAmbienteId = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 400,
        errors: errors.array()
      });
    }

    const { id } = req.params;
    let sql = 'SELECT * FROM ambiente WHERE id = ?';
    const [result] = await pool.query(sql, [id]);
    if (result.length > 0) {
      res.status(200).json(result[0]);
    } else {
      res.status(404).json({ 'status': 404, msg: `No se encontró ningún ambiente con ese ID ${id}` });
    }
  } catch (e) {
    console.log('Error del sistema' + e);
    res.status(500).json({ 'status': 500, msg: 'Error del servidor.' + e });
  }
}

export const getAmbienteIdJoin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 400,
        errors: errors.array()
      });
    }

    const { id } = req.params;
    let sql = `SELECT ambiente.id, ambiente.nombre, ubicacion, capacidad, estado, areas.nombre AS area_id, ambiente.fecha_creacion FROM ambiente
              JOIN areas ON areas.id=ambiente.area_id
              WHERE ambiente.id = ?`;
    const [result] = await pool.query(sql, [id]);
    if (result.length > 0) {
      res.status(200).json(result[0]);
    } else {
      res.status(404).json({ 'status': 404, msg: `No se encontró ningún ambiente con ese ID ${id}` });
    }
  } catch (e) {
    console.log('Error del sistema' + e);
    res.status(500).json({ 'status': 500, msg: 'Error del servidor. ' + e });
  }
}

export const registrarAmbiente = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      /* return res.status(400).json(errors); */
      return res.status(400).json({
        status: 400,
        errors: errors.array()
      });
    }

    const { nombre, ubicacion, capacidad, estado, areaId } = req.body;
    let sql = `INSERT INTO ambiente(nombre,ubicacion,capacidad, estado, area_id) values (?,?,?,?,?)`;
    const [rows] = await pool.query(sql, [nombre, ubicacion,capacidad,estado, areaId]);
    if (rows.affectedRows > 0) {
      res.status(200).json({ 'status': 200, 'msg': 'Se registró con éxito el ambiente' });
    } else {
      res.status(404).json({ 'status': 404, 'msg': 'No se pudo registrar el ambiente' });
    }
  } catch (e) {
    console.log('Error al registrar:', e);
    res.status(500).json({ 'status': 500, 'msg': 'Error al registrar: ' + e.message });
  }
}

export const borrarAmbiente = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 400,
        errors: errors.array()
      });
    }
    const {id} = req.params;
    let sql = 'DELETE FROM ambiente WHERE id=?';
    const [result] = await pool.query(sql, [id]);
    if (result.affectedRows > 0) {
      res.status(200).json({ 'status': 200, msg: 'Se eliminó el ambiente' });
    } else {
      res.status(404).json({ 'status': 404, msg: 'No se encontró el ambiente con el ID: ' + id });
    }
  } catch (error) {
    res.status(500).json({ 'status': 500, msg: 'Error: ' + error.message });
  }
}

export const actualizarAmbiente = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 400,
      errors: errors.array()
    });
  }

  try {
    const { id } = req.params;
    const { nombre, ubicacion, capacidad, estado, areaId } = req.body;
    let sql, params;
    sql = 'UPDATE ambiente SET nombre=?, ubicacion=?, capacidad=?, estado=?, area_id=? WHERE id = ?';
    params = [nombre, ubicacion, capacidad, estado, areaId, id];
    const [result] = await pool.query(sql, params);

    if (result.affectedRows > 0) {
      res.status(200).json({
        'status': 200,
        'msg': `El ambiente fue actualizado correctamente.`
      });
    } else {
      res.status(404).json({
        'status': 404,
        'msg': `No se encontró el ambiente con el ID: ${id}`
      });
    }
  } catch (e) {
    console.log('Error del sistema' + e);
     res.status(500).json({ 'status': 500, msg: 'Error del servidor.' + e });
  }
}

// Metodo adiccional
export const getAmbienteByArea = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 400,
        errors: errors.array()
      });
    }

    const { id } = req.params;
    let sql = `SELECT ambiente.id, ambiente.nombre, ubicacion, capacidad, estado, areas.nombre AS area_id, ambiente.fecha_creacion FROM ambiente
              JOIN areas ON areas.id=ambiente.area_id
              WHERE area_id = ?`;
    const [result] = await pool.query(sql, [id]);
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ 'status': 404, msg: `No se encontró ningún ambiente con el area de ID ${id}` });
    }
  } catch (e) {
    console.log('Error del sistema' + e);
    res.status(500).json({ 'status': 500, msg: 'Error del servidor. ' + e });
  }
}