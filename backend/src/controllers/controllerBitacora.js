import { pool } from "../database/conexion.js";
import { validationResult } from "express-validator";

export const getBitacora = async (req, res) => {
  try {
    let sql = 'SELECT * FROM bitacora';
    const [result] = await pool.query(sql);
    if (result.length > 0)
      res.status(200).json(result);
    else
      res.status(404).json({ status: 404, msg: 'No hay registros en la bitácora.' });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error: ' + e });
  }
}

export const getBitacoraJoin = async (req, res) => {
  try {
    let sql = `SELECT bitacora.id, accion, detalles, usuarios.nombre AS username, tickets.titulo AS title_tickets, bitacora.fecha_creacion FROM bitacora
              JOIN usuarios ON identificacion = usuario_id
              JOIN tickets ON tickets.id = ticket_id`;
    const [result] = await pool.query(sql);
    if (result.length > 0)
      res.status(200).json(result);
    else
      res.status(404).json({ status: 404, msg: 'No hay registros de bitácora.' });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error: ' + e });
  }
}

export const getBitacoraId = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 400,
      errors: errors.array()
    });
  }

  try {
    const { id } = req.params;
    let sql = 'SELECT * FROM bitacora WHERE id=?';
    const [result] = await pool.query(sql, [id]);
    if (result.length > 0)
      res.status(200).json(result[0]);
    else
      res.status(404).json({ status: 404, msg: `No se encontró el registro de bitácora con ID ${id}` });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error del servidor.' + e });
  }
}

export const getBitacoraIdJoin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 400,
      errors: errors.array()
    });
  }

  try {
    const { id } = req.params;
    let sql = `SELECT accion, detalles, usuarios.nombre, tickets.nombre, bitacora.fecha_creacion FROM bitacora
              JOIN usuarios ON identificacion = usuario_id
              JOIN tickets ON tickets.id = ticket_id
              WHERE bitacora.id=?`;
    const [result] = await pool.query(sql, [id]);
    if (result.length > 0)
      res.status(200).json(result[0]);
    else
      res.status(404).json({ status: 404, msg: `No se encontró el registro de bitácora con ID ${id}` });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error del servidor.' + e });
  }
}

export const registrarBitacora = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 400,
      errors: errors.array()
    });
  }

  try {
    const { accion, detalles, usuarioId, ticketId } = req.body;
    let sql = 'INSERT INTO bitacora(accion, detalles, usuario_id, ticket_id) VALUES (?,?,?,?)';
    const [rows] = await pool.query(sql, [accion, detalles, usuarioId, ticketId]);
    if (rows.affectedRows > 0)
      res.status(200).json({ status: 200, msg: 'Registro en bitácora creado correctamente.' });
    else
      res.status(404).json({ status: 404, msg: 'No se pudo registrar en la bitácora.' });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error al registrar: ' + e.message });
  }
}

export const borrarBitacora = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 400,
      errors: errors.array()
    });
  }

  try {
    const { id } = req.params;
    let sql = 'DELETE FROM bitacora WHERE id=?';
    const [result] = await pool.query(sql, [id]);
    if (result.affectedRows > 0)
      res.status(200).json({ status: 200, msg: 'Registro de bitácora eliminado correctamente.' });
    else
      res.status(404).json({ status: 404, msg: 'No se encontró el registro con ID ' + id });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error: ' + e.message });
  }
}

export const actualizarBitacora = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 400,
      errors: errors.array()
    });
  }

  try {
    const { id } = req.params;
    const { accion, detalles } = req.body;
    let sql = 'UPDATE bitacora SET accion=?, detalles=? WHERE id=?';
    const [result] = await pool.query(sql, [accion, detalles, id]);
    if (result.affectedRows > 0)
      res.status(200).json({ status: 200, msg: 'Registro de bitácora actualizado correctamente.' });
    else
      res.status(404).json({ status: 404, msg: 'No se encontró el registro con ID ' + id });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error del servidor: ' + e });
  }
}
