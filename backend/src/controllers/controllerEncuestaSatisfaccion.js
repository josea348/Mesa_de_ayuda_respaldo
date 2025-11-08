import { pool } from "../database/conexion.js";
import { validationResult } from "express-validator";

export const getEncuesta = async (req, res) => {
  try {
    let sql = 'SELECT * FROM encuesta_satisfaccion';
    const [result] = await pool.query(sql);
    if (result.length > 0)
      res.status(200).json(result);
    else
      res.status(404).json({ status: 404, msg: 'No hay encuestas de satisfacción registradas.' });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error: ' + e });
  }
}

export const getEncuestaId = async (req, res) => {
  try {
    const { id } = req.params;
    let sql = 'SELECT * FROM encuesta_satisfaccion WHERE id=?';
    const [result] = await pool.query(sql, [id]);
    if (result.length > 0)
      res.status(200).json(result[0]);
    else
      res.status(404).json({ status: 404, msg: `No se encontró la encuesta con ID ${id}` });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error del servidor.' + e });
  }
}

export const registrarEncuesta = async (req, res) => {
  try {
    const { ticket_id, usuario_id, calificacion, comentarios } = req.body;
    let sql = 'INSERT INTO encuesta_satisfaccion(ticket_id, usuario_id, calificacion, comentarios) VALUES (?,?,?,?)';
    const [rows] = await pool.query(sql, [ticket_id, usuario_id, calificacion, comentarios]);
    if (rows.affectedRows > 0)
      res.status(200).json({ status: 200, msg: 'Encuesta registrada correctamente.' });
    else
      res.status(404).json({ status: 404, msg: 'No se pudo registrar la encuesta.' });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error al registrar: ' + e.message });
  }
}

export const borrarEncuesta = async (req, res) => {
  try {
    const { id } = req.params;
    let sql = 'DELETE FROM encuesta_satisfaccion WHERE id=?';
    const [result] = await pool.query(sql, [id]);
    if (result.affectedRows > 0)
      res.status(200).json({ status: 200, msg: 'Encuesta eliminada correctamente.' });
    else
      res.status(404).json({ status: 404, msg: 'No se encontró la encuesta con ID ' + id });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error: ' + e.message });
  }
}

export const actualizarEncuesta = async (req, res) => {
  try {
    const { id } = req.params;
    const { calificacion, comentarios } = req.body;
    let sql = 'UPDATE encuesta_satisfaccion SET calificacion=?, comentarios=? WHERE id=?';
    const [result] = await pool.query(sql, [calificacion, comentarios, id]);
    if (result.affectedRows > 0)
      res.status(200).json({ status: 200, msg: 'Encuesta actualizada correctamente.' });
    else
      res.status(404).json({ status: 404, msg: 'No se encontró la encuesta con ID ' + id });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error del servidor: ' + e });
  }
}
