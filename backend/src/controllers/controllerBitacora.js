import { pool } from "../database/conexion.js";
import { validationResult } from "express-validator";

export const getBitacora = async (req, res) => {
  try {
    let sql = 'SELECT * FROM bitácora';
    const [result] = await pool.query(sql);
    if (result.length > 0)
      res.status(200).json(result);
    else
      res.status(404).json({ status: 404, msg: 'No hay registros en la bitácora.' });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error: ' + e });
  }
}

export const getBitacoraId = async (req, res) => {
  try {
    const { id } = req.params;
    let sql = 'SELECT * FROM bitácora WHERE id=?';
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
  try {
    const { acción, detalles, usuario_id, ticket_id } = req.body;
    let sql = 'INSERT INTO bitácora(acción, detalles, usuario_id, ticket_id) VALUES (?,?,?,?)';
    const [rows] = await pool.query(sql, [acción, detalles, usuario_id, ticket_id]);
    if (rows.affectedRows > 0)
      res.status(200).json({ status: 200, msg: 'Registro en bitácora creado correctamente.' });
    else
      res.status(404).json({ status: 404, msg: 'No se pudo registrar en la bitácora.' });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error al registrar: ' + e.message });
  }
}

export const borrarBitacora = async (req, res) => {
  try {
    const { id } = req.params;
    let sql = 'DELETE FROM bitácora WHERE id=?';
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
  try {
    const { id } = req.params;
    const { acción, detalles } = req.body;
    let sql = 'UPDATE bitácora SET acción=?, detalles=? WHERE id=?';
    const [result] = await pool.query(sql, [acción, detalles, id]);
    if (result.affectedRows > 0)
      res.status(200).json({ status: 200, msg: 'Registro de bitácora actualizado correctamente.' });
    else
      res.status(404).json({ status: 404, msg: 'No se encontró el registro con ID ' + id });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error del servidor: ' + e });
  }
}
