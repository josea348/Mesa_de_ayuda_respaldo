import { pool } from "../database/conexion.js";
import { validationResult } from "express-validator";
import multer from "multer";

const storage = multer.diskStorage(
  {
    destination: function(req,file,cb){
      cb(null, "public/files");
    },
    filename: function(req,file,cb){
      cb(null, file.originalname);
    }
  }
);

const upload=multer({storage:storage});
export const cargarArchivo=upload.single('archivo');

/* const upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb) {
    console.log("Archivo recibido:", file);
    cb(null, true);
  }
});

export const cargarArchivo = (req, res, next) => {
  console.log("Iniciando carga de archivo.");
  console.log("Campos del formulario:", req.body);
    
  upload.single('archivo')(req, res, function(err) {
    if (err) {
      console.error("Error en multer:", err);
      return res.status(400).json({
        status: 400,
        message: 'Error al cargar el archivo.',
        error: err.message
      });
    }
        
    console.log("Después de multer - req.file:", req.file);
    next();
  });
}; */

export const getArchivos = async (req, res) => {
  try {
    let sql = 'SELECT * FROM archivos_adjuntos';
    const [result] = await pool.query(sql);
    if (result.length > 0)
      res.status(200).json(result);
    else
      res.status(404).json({ status: 404, msg: 'No hay archivos registrados.' });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error: ' + e });
  }
}

export const getArchivosJoin = async (req, res) => {
  try {
    let sql = `SELECT aa.id, t.titulo AS ticket, aa.nombre_archivo, aa.archivo, aa.fecha_creacion FROM archivos_adjuntos aa
              JOIN tickets t ON t.id = aa.ticket_id`;
    const [result] = await pool.query(sql);
    if (result.length > 0)
      res.status(200).json(result);
    else
      res.status(404).json({ status: 404, msg: 'No hay archivos registrados.' });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error: ' + e });
  }
}

export const getArchivoId = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 400,
      errors: errors.array()
    });
  }

  try {
    const { id } = req.params;
    let sql = 'SELECT * FROM archivos_adjuntos WHERE id=?';
    const [result] = await pool.query(sql, [id]);
    if (result.length > 0)
      res.status(200).json(result[0]);
    else
      res.status(404).json({ status: 404, msg: `No se encontró el archivo con ID ${id}` });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error del servidor. ' + e });
  }
}

export const getArchivoIdJoin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 400,
      errors: errors.array()
    });
  }

  try {
    const { id } = req.params;
    let sql = `SELECT aa.id, t.titulo AS ticket, aa.nombre_archivo, aa.archivo, aa.fecha_creacion FROM archivos_adjuntos aa
              JOIN tickets t ON t.id = aa.ticket_id
              WHERE aa.id=?`;
    const [result] = await pool.query(sql, [id]);
    if (result.length > 0)
      res.status(200).json(result[0]);
    else
      res.status(404).json({ status: 404, msg: `No se encontró el archivo con ID ${id}` });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error del servidor.' + e });
  }
}

export const registrarArchivo = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 400,
      errors: errors.array()
    });
  }

  try {
    /* if (!req.file) {
      return res.status(400).json({
        status: 400,
        msg: 'El archivo es obligatoria para el registro.',
        errors: [{ msg: 'El archivo es obligatoria.', param: 'archivo' }]
      });
    } */

    const { ticketId, nombreArchivo } = req.body;
    let archivo = req.file.originalname;
    let sql = 'INSERT INTO archivos_adjuntos(ticket_id, nombre_archivo, archivo) VALUES (?,?,?)';
    const [rows] = await pool.query(sql, [ticketId, nombreArchivo, archivo]);
    if (rows.affectedRows > 0)
      res.status(200).json({ status: 200, msg: 'Archivo registrado correctamente.' });
    else
      res.status(404).json({ status: 404, msg: 'No se pudo registrar el comentario.' });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error al registrar: ' + e.message });
  }
}

export const borrarArchivo = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 400,
      errors: errors.array()
    });
  }

  try {
    const { id } = req.params;
    let sql = 'DELETE FROM archivos_adjuntos WHERE id=?';
    const [result] = await pool.query(sql, [id]);
    if (result.affectedRows > 0)
      res.status(200).json({ status: 200, msg: 'Archivos eliminado correctamente.' });
    else
      res.status(404).json({ status: 404, msg: 'No se encontró el archivo con ID ' + id });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error: ' + e.message });
  }
}

export const actualizarArchivo = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 400,
      errors: errors.array()
    });
  }

  try {
    const { id } = req.params;
    const { nombreArchivo } = req.body;
    let archivo = req.file.originalname;
    let sql = 'UPDATE archivos_adjuntos SET nombre_archivo=?, archivo=? WHERE id=?';
    const [result] = await pool.query(sql, [nombreArchivo, archivo, id]);
    if (result.affectedRows > 0)
      res.status(200).json({ status: 200, msg: 'Comentario actualizado correctamente.' });
    else
      res.status(404).json({ status: 404, msg: 'No se encontró el comentario con ID ' + id });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error del servidor: ' + e });
  }
} 


// Buscar archivos por tickets
export const getArchivoIdByTikets = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 400,
      errors: errors.array()
    });
  }

  try {
    const { id } = req.params;
    let sql = `SELECT c.id, c.ticket_id, t.titulo AS ticket, c.usuario_id, u.nombre AS usuario, c.comentario, c.fecha_registro, c.fecha_actualizacion FROM comentarios c
              JOIN tickets t ON t.id = c.ticket_id
              JOIN usuarios u ON u.identificacion = c.usuario_id
              WHERE t.id = ?`;
    const [result] = await pool.query(sql, [id]);
    if (result.length > 0)
      res.status(200).json(result);
    else
      res.status(404).json({ status: 404, msg: `No se encontró el comentario con ID ${id}` });
  } catch (e) {
    res.status(500).json({ status: 500, msg: 'Error del servidor.' + e });
  }
}
