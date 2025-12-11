import { pool } from "../database/conexion.js";
import { validationResult } from "express-validator";

export const getNotificaReservaJoin = async (req, res) => {
  try {
    let sql = `(SELECT 'NotificacionAmbiente' AS tipo_reserva, nra.id AS id_reserva, nra.titulo, nra.comentario, a.nombre AS item_reservado, ra.fecha_inicio, ra.fecha_fin, ra.estado, nra.fecha_creacion AS f_register_notificacion FROM notifica_reserva_ambiente nra
              JOIN reservas_ambiente ra ON ra.id = nra.res_ambiente_id
              JOIN ambiente a ON ra.ambiente_id = a.id)
              UNION ALL
              (SELECT 'NotificacionEquipo' AS tipo_reserva, nre.id AS id_reserva, nre.titulo, nre.comentario, e.nombre AS item_reservado, re.fecha_inicio, re.fecha_fin, re.estado, nre.fecha_creacion AS f_register_notificacion FROM notifica_reserva_equipo nre
              JOIN reservas_equipo re ON re.id = nre.res_equipo_id
              JOIN equipos e ON re.equipo_id = e.id)
              ORDER BY f_register_notificacion DESC`;
    const [result] = await pool.query(sql);
    if (result.length > 0)
      res.status(200).json(result);
    else
      res.status(404).json({ status: 404, msg: 'No hay notificaciones registradas.' });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error: ' + e });
  }
}

export const getNotificaReservaJoinId = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ status: 400, errors: errors.array() });

  try {
    const { id } = req.params;
    let sql = `(SELECT 'NotificacionAmbiente' AS tipo_reserva, nra.id AS id_reserva, nra.titulo, nra.comentario, a.nombre AS item_reservado, ra.fecha_inicio, ra.fecha_fin, ra.estado, nra.fecha_creacion AS f_register_notificacion FROM notifica_reserva_ambiente nra
              JOIN reservas_ambiente ra ON ra.id = nra.res_ambiente_id
              JOIN ambiente a ON ra.ambiente_id = a.id
              WHERE ra.usuario_id = ?
              UNION ALL
              SELECT 'NotificacionEquipo' AS tipo_reserva, nre.id AS id_reserva, nre.titulo, nre.comentario, e.nombre AS item_reservado, re.fecha_inicio, re.fecha_fin, re.estado, nre.fecha_creacion AS f_register_notificacion FROM notifica_reserva_equipo nre
              JOIN reservas_equipo re ON re.id = nre.res_equipo_id
              JOIN equipos e ON re.equipo_id = e.id
              WHERE re.usuario_id = ?)
              ORDER BY f_register_notificacion DESC`;
    const [result] = await pool.query(sql, [id,id]);
    if (result.length > 0)
      res.status(200).json(result);
    else
      res.status(404).json({ status: 404, msg: 'No hay notificaciones registradas.' });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error: ' + e });
  }
}
