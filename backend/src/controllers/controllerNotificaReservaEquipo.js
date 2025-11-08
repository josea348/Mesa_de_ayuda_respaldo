import { pool } from "../database/conexion.js";
import { validationResult } from "express-validator";

export const getNotificaReservaEquipo = async (req, res) => {
  try {
    let sql = 'SELECT * FROM notifica_reserva_equipo';
    const [result] = await pool.query(sql);
    if (result.length > 0)
      res.status(200).json(result);
    else
      res.status(404).json({ status: 404, msg: 'No hay notificaciones de reservas de equipo registradas.' });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error: ' + e });
  }
}

export const getNotificaReservaEquipoId = async (req, res) => {
  try {
    const { id } = req.params;
    let sql = 'SELECT * FROM notifica_reserva_equipo WHERE id=?';
    const [result] = await pool.query(sql, [id]);
    if (result.length > 0)
      res.status(200).json(result[0]);
    else
      res.status(404).json({ status: 404, msg: `No se encontró la notificación con ID ${id}` });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error del servidor.' + e });
  }
}

export const registrarNotificaReservaEquipo = async (req, res) => {
  try {
    const { titulo, comentario, res_equipo_id } = req.body;
    let sql = 'INSERT INTO notifica_reserva_equipo(titulo, comentario, res_equipo_id) VALUES (?,?,?)';
    const [rows] = await pool.query(sql, [titulo, comentario, res_equipo_id]);
    if (rows.affectedRows > 0)
      res.status(200).json({ status: 200, msg: 'Notificación de reserva de equipo registrada correctamente.' });
    else
      res.status(404).json({ status: 404, msg: 'No se pudo registrar la notificación.' });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error al registrar: ' + e.message });
  }
}

export const borrarNotificaReservaEquipo = async (req, res) => {
  try {
    const { id } = req.params;
    let sql = 'DELETE FROM notifica_reserva_equipo WHERE id=?';
    const [result] = await pool.query(sql, [id]);
    if (result.affectedRows > 0)
      res.status(200).json({ status: 200, msg: 'Notificación de reserva de equipo eliminada correctamente.' });
    else
      res.status(404).json({ status: 404, msg: 'No se encontró la notificación con ID ' + id });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error: ' + e.message });
  }
}

export const actualizarNotificaReservaEquipo = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, comentario, res_equipo_id } = req.body;
    let sql = 'UPDATE notifica_reserva_equipo SET titulo=?, comentario=?, res_equipo_id=? WHERE id=?';
    const [result] = await pool.query(sql, [titulo, comentario, res_equipo_id, id]);
    if (result.affectedRows > 0)
      res.status(200).json({ status: 200, msg: 'Notificación de reserva de equipo actualizada correctamente.' });
    else
      res.status(404).json({ status: 404, msg: 'No se encontró la notificación con ID ' + id });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error del servidor: ' + e });
  }
}
