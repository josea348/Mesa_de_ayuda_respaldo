import { pool } from "../database/conexion.js";
import { validationResult } from "express-validator";

export const getComentarios = async (req, res) => {
  try {
    let sql = 'SELECT * FROM comentarios';
    const [result] = await pool.query(sql);
    if (result.length > 0)
      res.status(200).json(result);
    else
      res.status(404).json({ status: 404, msg: 'No hay comentarios registrados.' });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error: ' + e });
  }
}

export const getComentarioId = async (req, res) => {
  try {
    const { id } = req.params;
    let sql = 'SELECT * FROM comentarios WHERE id=?';
    const [result] = await pool.query(sql, [id]);
    if (result.length > 0)
      res.status(200).json(result[0]);
    else
      res.status(404).json({ status: 404, msg: `No se encontró el comentario con ID ${id}` });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error del servidor.' + e });
  }
}

export const registrarComentario = async (req, res) => {
  try {
    const { ticket_id, usuario_id, comentario } = req.body;
    let sql = 'INSERT INTO comentarios(ticket_id, usuario_id, comentario) VALUES (?,?,?)';
    const [rows] = await pool.query(sql, [ticket_id, usuario_id, comentario]);
    if (rows.affectedRows > 0)
      res.status(200).json({ status: 200, msg: 'Comentario registrado correctamente.' });
    else
      res.status(404).json({ status: 404, msg: 'No se pudo registrar el comentario.' });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error al registrar: ' + e.message });
  }
}

export const borrarComentario = async (req, res) => {
  try {
    const { id } = req.params;
    let sql = 'DELETE FROM comentarios WHERE id=?';
    const [result] = await pool.query(sql, [id]);
    if (result.affectedRows > 0)
      res.status(200).json({ status: 200, msg: 'Comentario eliminado correctamente.' });
    else
      res.status(404).json({ status: 404, msg: 'No se encontró el comentario con ID ' + id });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error: ' + e.message });
  }
}

export const actualizarComentario = async (req, res) => {
  try {
    const { id } = req.params;
    const { comentario } = req.body;
    let sql = 'UPDATE comentarios SET comentario=? WHERE id=?';
    const [result] = await pool.query(sql, [comentario, id]);
    if (result.affectedRows > 0)
      res.status(200).json({ status: 200, msg: 'Comentario actualizado correctamente.' });
    else
      res.status(404).json({ status: 404, msg: 'No se encontró el comentario con ID ' + id });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error del servidor: ' + e });
  }
}
