import { pool } from "../database/conexion.js";
import { validationResult } from "express-validator";
import bcrypt from 'bcrypt';
import Jwt from "jsonwebtoken";

export const validarUser = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    try {
        let { login, password } = req.body;
        let sql = `SELECT identificacion,nombre,email,rol,password FROM usuarios WHERE email=?`;
        const [rows] = await pool.query(sql,[login]);
        if (rows.length > 0) {
            const user = rows[0];
            const passwordMath = await bcrypt.compare(password, user.password);
            if (passwordMath) {
                delete user.password;
                let token = Jwt.sign({ rows }, process.env.AUT_SECRET, { expiresIn: process.env.AUT_EXPIRE });
                return res.status(200).json({ 'status': 200, 'user': rows, 'token': token, 'msg': 'Usuario autorizado.' });
            } else {
                return res.status(404).json({ 'status': 404, 'msg': 'Contraseña incorrecta.' });
            }
        } else {
            return res.status(404).json({ 'status': 404, "msg": "Usuario incorrecto" });
        }
    } catch (e) {
        res.status(500).json({ 'status': 500, 'msg': e });
    }
}

export const validarToken = async (req, res,next) => {
    let token_cliente = req.headers['token'];
    if (!token_cliente) {
        return res.status(404).json({'status': 404, 'msg': 'Se requiere el token.'})
    } else {
        const token = Jwt.verify(token_cliente, process.env.AUT_SECRET, (error, decoded) => {
            if (error) {
                return res.status(404).json({ 'status': 404, 'msg': 'Token incorrecto' });
            } else {
                next();
            }
        })
    }
}