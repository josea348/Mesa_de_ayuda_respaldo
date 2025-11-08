import { pool } from "../database/conexion.js";
import { validationResult } from "express-validator";

export const getReservasAmbiente = async (req, res) => {
  try {
    let sql = 'SELECT * FROM reservas_ambiente';
    const [result] = await pool.query(sql);
    if (result.length > 0) res.status(200).json(result);
    else res.status(404).json({ status: 404, msg: 'No hay reservas de ambientes registradas.' });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error: ' + e });
  }
}

export const getReservaAmbienteId = async (req, res) => {
  try {
    const { id } = req.params;
    let sql = 'SELECT * FROM reservas_ambiente WHERE id=?';
    const [result] = await pool.query(sql, [id]);
    if (result.length > 0) res.status(200).json(result[0]);
    else res.status(404).json({ status: 404, msg: `No se encontró la reserva con ID ${id}` });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error del servidor.' + e });
  }
}

export const registrarReservaAmbiente = async (req, res) => {
  try {
    const { usuarioId, ambienteId, fechaInicio, fechaFin, estado } = req.body;
    let sql = 'INSERT INTO reservas_ambiente(usuario_id, ambiente_id, fecha_inicio, fecha_fin, estado) VALUES (?,?,?,?,?)';
    const [rows] = await pool.query(sql, [usuarioId, ambienteId, fechaInicio, fechaFin, estado]);
    if (rows.affectedRows > 0)
      res.status(200).json({ status: 200, msg: 'Reserva de ambiente registrada correctamente.' });
    else
      res.status(404).json({ status: 404, msg: 'No se pudo registrar la reserva de ambiente.' });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error al registrar: ' + e.message });
  }
}

export const borrarReservaAmbiente = async (req, res) => {
  try {
    const { id } = req.params;
    let sql = 'DELETE FROM reservas_ambiente WHERE id=?';
    const [result] = await pool.query(sql, [id]);
    if (result.affectedRows > 0)
      res.status(200).json({ status: 200, msg: 'Reserva de ambiente eliminada correctamente.' });
    else
      res.status(404).json({ status: 404, msg: 'No se encontró la reserva con ID ' + id });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error: ' + e.message });
  }
}

export const actualizarReservaAmbiente = async (req, res) => {
  try {
    const { id } = req.params;
    const { usuario_id, ambiente_id, fecha_inicio, fecha_fin, estado } = req.body;
    let sql = 'UPDATE reservas_ambiente SET usuario_id=?, ambiente_id=?, fecha_inicio=?, fecha_fin=?, estado=? WHERE id=?';
    const [result] = await pool.query(sql, [usuario_id, ambiente_id, fecha_inicio, fecha_fin, estado, id]);
    if (result.affectedRows > 0)
      res.status(200).json({ status: 200, msg: 'Reserva de ambiente actualizada correctamente.' });
    else
      res.status(404).json({ status: 404, msg: 'No se encontró la reserva con ID ' + id });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error del servidor: ' + e });
  }
}
