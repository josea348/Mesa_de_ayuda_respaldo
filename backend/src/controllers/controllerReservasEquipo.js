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

export const getReservasEquipoJoin = async (req, res) => {
  try {
    let sql = `SELECT reEqu.id, user.nombre AS username, equ.nombre AS equipo, fecha_inicio, fecha_fin, estado, reEqu.fecha_registro, reEqu.fecha_actualizacion FROM reservas_equipo reEqu
              JOIN usuarios user ON user.identificacion = reEqu.usuario_id
              JOIN equipos equ ON equ.id = reEqu.equipo_id
              ORDER BY reEqu.id ASC`;
    const [result] = await pool.query(sql);
    if (result.length > 0) res.status(200).json(result);
    else res.status(404).json({ status: 404, msg: 'No hay reservas de equipos registradas.' });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error: ' + e });
  }
}

export const getReservaEquipoId = async (req, res) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ status: 400, errors: errors.array() });

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

export const getReservaEquipoJoinId = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ status: 400, errors: errors.array() });

  try {
    const { id } = req.params;
    let sql = `SELECT reEqu.id, user.nombre AS username, equ.nombre AS equipo, fecha_inicio, fecha_fin estado, reEqu.fecha_registro, reEqu.fecha_actualizacion FROM reservas_equipo reEqu
              JOIN usuarios user ON user.identificacion = reEqu.usuario_id
              JOIN equipos equ ON equ.id = reEqu.equipo_id
              WHERE reEqu.id=?`;
    const [result] = await pool.query(sql, [id]);
    if (result.length > 0) res.status(200).json(result[0]);
    else res.status(404).json({ status: 404, msg: `No se encontró la reserva con ID ${id}` });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error del servidor. ' + e });
  }
}

export const registrarReservaEquipo = async (req, res) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ status: 400, errors: errors.array() });

  try {
    const { usuarioId, equipoId, fechaInicio, fechaFin, estado } = req.body;
    let sql = 'INSERT INTO reservas_equipo(usuario_id, equipo_id, fecha_inicio, fecha_fin, estado) VALUES (?,?,?,?,?)';
    const [rows] = await pool.query(sql, [usuarioId, equipoId, fechaInicio, fechaFin, estado]);
    if (rows.affectedRows > 0)
      res.status(200).json({ status: 200, msg: 'Reserva de equipo registrada correctamente.' });
    else
      res.status(404).json({ status: 404, msg: 'No se pudo registrar la reserva de equipo.' });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error al registrar: ' + e.message });
  }
}

export const borrarReservaEquipo = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ status: 400, errors: errors.array() });

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
  const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ status: 400, errors: errors.array() });

  try {
    const { id } = req.params;
    const { usuarioId, equipoId, fechaInicio, fechaFin, estado } = req.body;
    let sql = 'UPDATE reservas_equipo SET usuario_id=?, equipo_id=?, fecha_inicio=?, fecha_fin=?, estado=? WHERE id=?';
    const [result] = await pool.query(sql, [usuarioId, equipoId, fechaInicio, fechaFin, estado, id]);
    if (result.affectedRows > 0)
      res.status(200).json({ status: 200, msg: 'Reserva de equipo actualizada correctamente.' });
    else
      res.status(404).json({ status: 404, msg: 'No se encontró la reserva con ID ' + id });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error del servidor: ' + e });
  }
}
