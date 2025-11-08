import { pool } from "../database/conexion.js";
import { validationResult } from "express-validator";

export const getNotificaReservaAmbiente = async (req, res) => {
  try {
    let sql = 'SELECT * FROM notifica_reserva_ambiente';
    const [result] = await pool.query(sql);
    if (result.length > 0)
      res.status(200).json(result);
    else
      res.status(404).json({ status: 404, msg: 'No hay notificaciones de reservas de ambiente registradas.' });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error: ' + e });
  }
}

export const getNotificaReservaAmbienteId = async (req, res) => {
  try {
    const { id } = req.params;
    let sql = 'SELECT * FROM notifica_reserva_ambiente WHERE id=?';
    const [result] = await pool.query(sql, [id]);
    if (result.length > 0)
      res.status(200).json(result[0]);
    else
      res.status(404).json({ status: 404, msg: `No se encontró la notificación con ID ${id}` });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error del servidor.' + e });
  }
}

export const registrarNotificaReservaAmbiente = async (req, res) => {
  try {
    const { titulo, comentario, res_ambiente_id } = req.body;
    let sql = 'INSERT INTO notifica_reserva_ambiente(titulo, comentario, res_ambiente_id) VALUES (?,?,?)';
    const [rows] = await pool.query(sql, [titulo, comentario, res_ambiente_id]);
    if (rows.affectedRows > 0)
      res.status(200).json({ status: 200, msg: 'Notificación de reserva de ambiente registrada correctamente.' });
    else
      res.status(404).json({ status: 404, msg: 'No se pudo registrar la notificación.' });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error al registrar: ' + e.message });
  }
}

export const borrarNotificaReservaAmbiente = async (req, res) => {
  try {
    const { id } = req.params;
    let sql = 'DELETE FROM notifica_reserva_ambiente WHERE id=?';
    const [result] = await pool.query(sql, [id]);
    if (result.affectedRows > 0)
      res.status(200).json({ status: 200, msg: 'Notificación de reserva de ambiente eliminada correctamente.' });
    else
      res.status(404).json({ status: 404, msg: 'No se encontró la notificación con ID ' + id });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error: ' + e.message });
  }
}

export const actualizarNotificaReservaAmbiente = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, comentario, res_ambiente_id } = req.body;
    let sql = 'UPDATE notifica_reserva_ambiente SET titulo=?, comentario=?, res_ambiente_id=? WHERE id=?';
    const [result] = await pool.query(sql, [titulo, comentario, res_ambiente_id, id]);
    if (result.affectedRows > 0)
      res.status(200).json({ status: 200, msg: 'Notificación de reserva de ambiente actualizada correctamente.' });
    else
      res.status(404).json({ status: 404, msg: 'No se encontró la notificación con ID ' + id });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error del servidor: ' + e });
  }
}
