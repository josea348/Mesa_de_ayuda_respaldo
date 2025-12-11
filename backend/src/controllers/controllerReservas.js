import { pool } from "../database/conexion.js";
import { validationResult } from "express-validator";

export const getReservasJoin = async (req, res) => {
  try {
    let sql = `(SELECT 'Ambiente' AS tipo_reserva, ra.id AS id_reserva, ra.usuario_id, u.nombre AS username, a.nombre AS item_reservado, ra.fecha_inicio, ra.fecha_fin, ra.estado, ra.fecha_registro, ra.fecha_actualizacion FROM reservas_ambiente ra
              JOIN ambiente a ON ra.ambiente_id = a.id
              JOIN usuarios u ON ra.usuario_id = u.identificacion)
              UNION ALL
              (SELECT 'Equipo' AS tipo_reserva, re.id AS id_reserva, re.usuario_id, u.nombre AS username, e.nombre AS item_reservado, re.fecha_inicio, re.fecha_fin, re.estado, re.fecha_registro, re.fecha_actualizacion FROM reservas_equipo re
              JOIN equipos e ON re.equipo_id = e.id
              JOIN usuarios u ON re.usuario_id = u.identificacion)
              ORDER BY fecha_registro DESC`;
    const [result] = await pool.query(sql);
    if (result.length > 0) res.status(200).json(result);
    else res.status(404).json({ status: 404, msg: 'No hay reservas registradas.' });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error: ' + e });
  }
}

export const getReservasJoinId = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ status: 400, errors: errors.array() });

  try {
    const {id} = req.params;
    let sql = `(SELECT 'Ambiente' AS tipo_reserva, ra.id AS id_reserva, ra.usuario_id, u.nombre AS username, a.nombre AS item_reservado, ra.fecha_inicio, ra.fecha_fin, ra.estado, ra.fecha_registro, ra.fecha_actualizacion FROM reservas_ambiente ra
              JOIN ambiente a ON ra.ambiente_id = a.id
              JOIN usuarios u ON ra.usuario_id = u.identificacion
              WHERE ra.usuario_id = ?)
              UNION ALL
              (SELECT 'Equipo' AS tipo_reserva, re.id AS id_reserva, re.usuario_id, u.nombre AS username, e.nombre AS item_reservado, re.fecha_inicio, re.fecha_fin, re.estado, re.fecha_registro, re.fecha_actualizacion FROM reservas_equipo re
              JOIN equipos e ON re.equipo_id = e.id
              JOIN usuarios u ON re.usuario_id = u.identificacion
              WHERE re.usuario_id = ?)
              ORDER BY fecha_registro DESC`;
    const [result] = await pool.query(sql, [id,id]);
    if (result.length > 0) res.status(200).json(result);
    else res.status(404).json({ status: 404, msg: 'No hay reservas registradas por el usuario.' });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error: ' + e });
  }
}
