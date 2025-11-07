import { pool } from "../database/conexion.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import multer from "multer";

const storage = multer.diskStorage(
    {
        destination: function(req,file,cb){
            cb(null, "public/img");
        },
        filename: function(req,file,cb){
            cb(null, file.originalname);
        }
    }
);

// const upload=multer({storage:storage});
// export const cargarImagen=upload.single('image');

// Configuración de multer con opciones adicionales para depuración
const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        console.log("Archivo recibido:", file);
        cb(null, true);
    }
});

// Middleware para manejar la carga de imágenes
export const cargarImagen = (req, res, next) => {
    console.log("Iniciando carga de imagen");
    console.log("Campos del formulario:", req.body);
    
    upload.single('image')(req, res, function(err) {
        if (err) {
            console.error("Error en multer:", err);
            return res.status(400).json({
                status: 400,
                message: 'Error al cargar la imagen',
                error: err.message
            });
        }
        
        console.log("Después de multer - req.file:", req.file);
        next();
    });
};

export const getUsers= async (req,res) => {
    try {
        let sql = 'SELECT * FROM usuarios';
        const [result] = await pool.query(sql);
        if(result.length > 0) {
            res.status(200).json(result);
        }else{
            res.status(404).json({ 'status':404,'message':'No hay usuarios registrados...!!!'});
        }
    } catch (e) {
        console.log('Error del sistema'+e);
        res.status(500).json({'status':500,'message':'Error: '+e});
    }
}

export const getUserId = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                status: 400,
                errors: errors.array()
            });
        }

        const { id } = req.params;
        let sql = 'SELECT * FROM usuarios WHERE identificacion = ?';
        const [result] = await pool.query(sql, [id]);
        if (result.length > 0) {
            res.status(200).json(result[0]);
        } else {
            res.status(404).json({ 'status': 404, msg: `No se encontró ningún usuario con ese ID ${id}` });
        }
    } catch (e) {
        console.log('Error del sistema' + e);
        res.status(500).json({ 'status': 500, msg: 'Error del servidor al intentar buscar el usuario.' + e });
    }
}

export const registrarUsuario= async (req,res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json(errors);
            /* return res.status(400).json({
                status: 400,
                errors: errors.array()
            }); */
        }

        const { identificacion, nombre, telefono, email, password, rol } = req.body;
        
        // Verificar si se subió una imagen
        if (!req.file) {
            return res.status(400).json({
                status: 400,
                msg: 'La imagen es obligatoria para registrar un usuario',
                errors: [{ msg: 'La imagen es obligatoria', param: 'image' }]
            });
        }
        
        let image = req.file.originalname;
        let passwordHash = await bcrypt.hash(password, 8);
        let sql = `INSERT INTO usuarios(identificacion,nombre,image,Telefono,email,password,rol) values (?,?,?,?,?,?,?)`;
        const [rows] = await pool.query(sql, [identificacion,nombre,image,telefono,email,passwordHash,rol]);
        if (rows.affectedRows>0) {
            res.status(200).json({'status':200,'msg':'Se registró con éxito el usuario'});
        }else{
            res.status(404).json({'status':404,'msg':'No se pudo registrar el usuario'});
        }
    } catch (e) {
        console.log('Error al registrar usuario:', e);
        res.status(500).json({'status':500,'msg':'Error al registrar usuario: '+e.message});
    }
}

export const borrarUsuario= async (req,res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                status: 400,
                errors: errors.array()
            });
        }

        const idUsuario = req.params.id;
        let sql = 'DELETE FROM usuarios WHERE identificacion=?';
        const [result] = await pool.query(sql, [idUsuario]);
        if(result.affectedRows>0) {
            res.status(200).json({'status':200,msg:'Se eliminó el usuario con la identificacion: '+idUsuario});
        }else{
            res.status(404).json({'status':404,msg:'No se encontró el usuario con la identificacionID: '+idUsuario});
        }
    } catch (error) {
        res.status(500).json({'status':500,msg:'Error: '+error.message});
    }
}

export const actualizarUsuario = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 400,
            errors: errors.array()
        });
    }

    try {
        const { id } = req.params;
        const { identificacion, nombre, telefono, email, password, rol } = req.body;
        
        // Verificar si se subió una imagen
        let img = req.file ? req.file.filename : null;
        let passwordHash = password ? await bcrypt.hash(password, 8) : null;
        
        // Si no hay imagen o password, no actualizar esos campos
        let sql, params;
        
        if (img && passwordHash) {
            sql = 'UPDATE usuarios SET identificacion=?, nombre=?, image=?, telefono=?, email=?, password=?, rol=? WHERE identificacion = ?';
            params = [identificacion, nombre, img, telefono, email, passwordHash, rol, id];
        } else if (img && !passwordHash) {
            sql = 'UPDATE usuarios SET identificacion=?, nombre=?, image=?, telefono=?, email=?, rol=? WHERE identificacion = ?';
            params = [identificacion, nombre, img, telefono, email, rol, id];
        } else if (!img && passwordHash) {
            sql = 'UPDATE usuarios SET identificacion=?, nombre=?, telefono=?, email=?, password=?, rol=? WHERE identificacion = ?';
            params = [identificacion, nombre, telefono, email, passwordHash, rol, id];
        } else {
            sql = 'UPDATE usuarios SET identificacion=?, nombre=?, telefono=?, email=?, rol=? WHERE identificacion = ?';
            params = [identificacion, nombre, telefono, email, rol, id];
        }
             
        const [result] = await pool.query(sql, params);
         
        if(result.affectedRows > 0) {
            res.status(200).json({
                'status': 200,
                'msg': `El usuario fue actualizado correctamente.`
            });
        } else {
               res.status(404).json({
                   'status': 404,
                   'msg': `No se encontró el usuario con la identificacion: ${id}`
               });
        }
    } catch (e) {
        console.log('Error del sistema'+e);
        res.status(500).json({'status': 500, msg: 'Error del servidor al intentar editar el usuario.'+e});
    }
}

export const actualizarDatosUsuario = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 400,
            errors: errors.array()
        });
    }

    try {
        const { id } = req.params;
        const { nombre, telefono, email } = req.body;
        let img = req.file ? req.file.filename : null;

        let sql, params;
        
        if (img) {
            sql = 'UPDATE usuarios SET nombre=?, image=?, telefono=?, email=? WHERE identificacion = ?';
            params = [nombre, img, telefono, email, id];
        } else {
            sql = 'UPDATE usuarios SET nombre=?, telefono=?, email=? WHERE identificacion = ?';
            params = [nombre, telefono, email, id];
        }
             
        const [result] = await pool.query(sql, params);
         
        if(result.affectedRows > 0) {
            res.status(200).json({
                'status': 200,
                'msg': `Los datos del usuario fue actualizado correctamente.`
            });
        } else {
               res.status(404).json({
                   'status': 404,
                   'msg': `No se encontró el usuario con la identificacion: ${id}`
               });
        }
    } catch (e) {
        console.log('Error del sistema'+e);
        res.status(500).json({'status': 500, msg: 'Error del servidor.'+e});
    }
}

export const actualizarContrasenaUsuario = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 400,
            errors: errors.array()
        });
    }

    try {
        const { id } = req.params;
        const { password } = req.body;
        let passwordHash = password ? await bcrypt.hash(password, 8) : null;

        let sql, params;
        sql = 'UPDATE usuarios SET password=? WHERE identificacion = ?';
        params = [passwordHash, id];

        const [result] = await pool.query(sql, params);

        if(result.affectedRows > 0) {
            res.status(200).json({
                'status': 200,
                'msg': `La contraseña del usuario fue actualizado correctamente.`
            });
        } else {
               res.status(404).json({
                   'status': 404,
                   'msg': `No se encontró el usuario con la identificacion: ${id}`
               });
        }
    } catch (e) {
        console.log('Error del sistema'+e);
        res.status(500).json({'status': 500, msg: 'Error del servidor.'+e});
    }
}
