import { pool } from "../database/conexion.js";
import { validationResult } from "express-validator";

export const getArea = async (req, res) => {
  try {
    let sql = 'SELECT * FROM areas';
    const [result] = await pool.query(sql);
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ 'status': 404, 'msg': 'No hay areas registradas...!!!' });
    }
  } catch (e) {
    console.log('Error del sistema' + e);
    res.status(500).json({ 'status': 500, 'msg': 'Error: ' + e });
  }
}

export const getAreaId = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 400,
        errors: errors.array()
      });
    }

    const { id } = req.params;
    let sql = 'SELECT * FROM areas WHERE id = ?';
    const [result] = await pool.query(sql, [id]);
    if (result.length > 0) {
      res.status(200).json(result[0]);
    } else {
      res.status(404).json({ 'status': 404, msg: `No se encontró ningún area con ese ID ${id}` });
    }
  } catch (e) {
    console.log('Error del sistema' + e);
    res.status(500).json({ 'status': 500, msg: 'Error del servidor.' + e });
  }
}

export const registrarArea = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      /* return res.status(400).json(errors); */
      return res.status(400).json({
        status: 400,
        errors: errors.array()
      });
    }

    const { nombre, descripcion } = req.body;
    let sql = `INSERT INTO areas(nombre,descripcion) values (?,?)`;
    const [rows] = await pool.query(sql, [nombre, descripcion]);
    if (rows.affectedRows > 0) {
      res.status(200).json({ 'status': 200, 'msg': 'Se registró con éxito el area' });
    } else {
      res.status(404).json({ 'status': 404, 'msg': 'No se pudo registrar el area' });
    }
  } catch (e) {
    console.log('Error al registrar:', e);
    res.status(500).json({ 'status': 500, 'msg': 'Error al registrar: ' + e.message });
  }
}

export const borrarArea = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 400,
        errors: errors.array()
      });
    }

    const {id} = req.params;
    let sql = 'DELETE FROM areas WHERE id=?';
    const [result] = await pool.query(sql, [id]);
    if (result.affectedRows > 0) {
      res.status(200).json({ 'status': 200, msg: 'Se eliminó el area.' });
    } else {
      res.status(404).json({ 'status': 404, msg: 'No se encontró el area con el ID: ' + id });
    }
  } catch (error) {
    res.status(500).json({ 'status': 500, msg: 'Error: ' + error.message });
  }
}

export const actualizarArea = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 400,
      errors: errors.array()
    });
  }

  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    let sql, params;
    sql = 'UPDATE areas SET nombre=?, descripcion=? WHERE id = ?';
    params = [nombre, descripcion, id];
    const [result] = await pool.query(sql, params);

    if (result.affectedRows > 0) {
      res.status(200).json({
        'status': 200,
        'message': `El area fue actualizado correctamente.`
      });
    } else {
      res.status(404).json({
        'status': 404,
        'message': `No se encontró el area con el ID: ${id}`
      });
    }
  } catch (e) {
    console.log('Error del sistema' + e);
    res.status(500).json({ 'status': 500, message: 'Error del servidor.' + e });
  }
}
