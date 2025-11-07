import { check, body } from "express-validator";

export const validarAutenticacion = [
  check('login')
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Debe ingresar un email válido')
    .normalizeEmail(),
  
  check('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 6, max: 10 }).withMessage('La contraseña debe tener entre 6 a 10 caracteres')
    .matches(/\d/).withMessage('La contraseña debe contener al menos un número'),
];