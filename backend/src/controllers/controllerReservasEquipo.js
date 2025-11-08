import { pool } from "../database/conexion.js";
import { validationResult } from "express-validator";

export const getReservasEquipo = async (req, res) => {
  try {
    let sql = 'SELECT * FROM reservas_equipo';
    const [result] = await pool.query(sql);
    if (result.length > 0) res.status(200).json(result);
    else res.status(404).json({ status: 404, msg: 'No hay reservas de equipos registradas.' });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error: ' + e });
  }
}

export const getReservaEquipoId = async (req, res) => {
  try {
    const { id } = req.params;
    let sql = 'SELECT * FROM reservas_equipo WHERE id=?';
    const [result] = await pool.query(sql, [id]);
    if (result.length > 0) res.status(200).json(result[0]);
    else res.status(404).json({ status: 404, msg: `No se encontró la reserva con ID ${id}` });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error del servidor.' + e });
  }
}

export const registrarReservaEquipo = async (req, res) => {
  try {
    const { usuario_id, equipo_id, fecha_inicio, fecha_fin, estado } = req.body;
    let sql = 'INSERT INTO reservas_equipo(usuario_id, equipo_id, fecha_inicio, fecha_fin, estado) VALUES (?,?,?,?,?)';
    const [rows] = await pool.query(sql, [usuario_id, equipo_id, fecha_inicio, fecha_fin, estado]);
    if (rows.affectedRows > 0)
      res.status(200).json({ status: 200, msg: 'Reserva de equipo registrada correctamente.' });
    else
      res.status(404).json({ status: 404, msg: 'No se pudo registrar la reserva de equipo.' });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error al registrar: ' + e.message });
  }
}

export const borrarReservaEquipo = async (req, res) => {
  try {
    const { id } = req.params;
    let sql = 'DELETE FROM reservas_equipo WHERE id=?';
    const [result] = await pool.query(sql, [id]);
    if (result.affectedRows > 0)
      res.status(200).json({ status: 200, msg: 'Reserva de equipo eliminada correctamente.' });
    else
      res.status(404).json({ status: 404, msg: 'No se encontró la reserva con ID ' + id });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error: ' + e.message });
  }
}

export const actualizarReservaEquipo = async (req, res) => {
  try {
    const { id } = req.params;
    const { usuario_id, equipo_id, fecha_inicio, fecha_fin, estado } = req.body;
    let sql = 'UPDATE reservas_equipo SET usuario_id=?, equipo_id=?, fecha_inicio=?, fecha_fin=?, estado=? WHERE id=?';
    const [result] = await pool.query(sql, [usuario_id, equipo_id, fecha_inicio, fecha_fin, estado, id]);
    if (result.affectedRows > 0)
      res.status(200).json({ status: 200, msg: 'Reserva de equipo actualizada correctamente.' });
    else
      res.status(404).json({ status: 404, msg: 'No se encontró la reserva con ID ' + id });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error del servidor: ' + e });
  }
}
