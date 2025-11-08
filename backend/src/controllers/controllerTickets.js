import { pool } from "../database/conexion.js";
import { validationResult } from "express-validator";

export const getTicket = async (req, res) => {
  try {
    let sql = 'SELECT * FROM tickets';
    const [result] = await pool.query(sql);
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ status: 404, msg: 'No hay tickets registrados...!!!' });
    }
  } catch (e) {
    console.log('Error del sistema:', e);
    res.status(500).json({ status: 500, msg: 'Error: ' + e });
  }
}

export const getTicketId = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ status: 400, errors: errors.array() });

    const { id } = req.params;
    let sql = 'SELECT * FROM tickets WHERE id = ?';
    const [result] = await pool.query(sql, [id]);
    if (result.length > 0) res.status(200).json(result[0]);
    else res.status(404).json({ status: 404, msg: `No se encontró el ticket con ID ${id}` });
  } catch (e) {
    console.log('Error:', e);
    res.status(500).json({ status: 500, msg: 'Error del servidor.' + e });
  }
}

export const registrarTicket = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ status: 400, errors: errors.array() });

    const { titulo, descripcion, categoria, prioridad, solicitante, asignado } = req.body;
    let sql = 'INSERT INTO tickets(titulo, descripcion, categoria, prioridad, solicitante, asignado) VALUES (?,?,?,?,?,?)';
    const [rows] = await pool.query(sql, [titulo, descripcion, categoria, prioridad, solicitante, asignado]);
    if (rows.affectedRows > 0)
      res.status(200).json({ status: 200, msg: 'Ticket registrado correctamente.' });
    else
      res.status(404).json({ status: 404, msg: 'No se pudo registrar el ticket.' });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error al registrar: ' + e.message });
  }
}

export const borrarTicket = async (req, res) => {
  try {
    const { id } = req.params;
    let sql = 'DELETE FROM tickets WHERE id=?';
    const [result] = await pool.query(sql, [id]);
    if (result.affectedRows > 0)
      res.status(200).json({ status: 200, msg: 'Ticket eliminado correctamente.' });
    else
      res.status(404).json({ status: 404, msg: 'No se encontró el ticket con ID ' + id });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error: ' + e.message });
  }
}

export const actualizarTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, categoria, prioridad, estado, asignado } = req.body;
    let sql = 'UPDATE tickets SET titulo=?, descripcion=?, categoria=?, prioridad=?, estado=?, asignado=? WHERE id=?';
    const [result] = await pool.query(sql, [titulo, descripcion, categoria, prioridad, estado, asignado, id]);
    if (result.affectedRows > 0)
      res.status(200).json({ status: 200, msg: 'Ticket actualizado correctamente.' });
    else
      res.status(404).json({ status: 404, msg: 'No se encontró el ticket con ID ' + id });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error del servidor: ' + e });
  }
}
