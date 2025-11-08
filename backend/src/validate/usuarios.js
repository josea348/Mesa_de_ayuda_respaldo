import { check, body } from "express-validator";
import z from "zod";

export const validarUsuario = [
  check('identificacion')
    .notEmpty().withMessage('La identificación es obligatoria')
    .isNumeric().withMessage('La identificación debe contener solo números')
    .isLength({ min: 6 }).withMessage('La identificación debe tener al menos 6 caracteres'),
  
  check('nombre')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3 y 50 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.,;]+$/).withMessage('El nombre solo debe contener letras y espacios'),
  
  check('telefono')
    .notEmpty().withMessage('El teléfono es obligatorio')
    .isNumeric().withMessage('El teléfono debe contener solo números')
    .isLength({ min: 10, max: 14 }).withMessage('El teléfono debe tener entre 10 y 14 dígitos'),
  
  check('email')
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Debe ingresar un email válido')
    .normalizeEmail(),
  
  check('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
    .matches(/\d/).withMessage('La contraseña debe contener al menos un número'),
    // .matches(/[A-Z]/).withMessage('La contraseña debe contener al menos una letra mayúscula'),
  
  check('rol')
    .notEmpty().withMessage('El rol es obligatorio')
    .isIn(['Administrador', 'Operario', 'Instructor', 'Aprendiz']).withMessage('Rol inválido. Debe ser: Administrador, Operario, Instructor o Aprendiz'),
];

export const validarActualizacionUsuario = [
  check('identificacion')
    .notEmpty().withMessage('La identificación es obligatoria')
    .isNumeric().withMessage('La identificación debe contener solo números')
    .isLength({ min: 6 }).withMessage('La identificación debe tener al menos 6 caracteres'),
  
  check('nombre')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 5, max: 50 }).withMessage('El nombre debe tener entre 5 y 50 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.,;]+$/).withMessage('El nombre solo debe contener letras y espacios'),
  
  check('telefono')
    .notEmpty().withMessage('El teléfono es obligatorio')
    .isNumeric().withMessage('El teléfono debe contener solo números')
    .isLength({ min: 10, max: 14 }).withMessage('El teléfono debe tener entre 10 y 14 dígitos'),
  
  check('email')
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Debe ingresar un email válido')
    .normalizeEmail(),
  
  /* check('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
    .matches(/\d/).withMessage('La contraseña debe contener al menos un número'), */
  
  check('rol')
    .notEmpty().withMessage('El rol es obligatorio')
    .isIn(['Administrador', 'Operario', 'Instructor', 'Aprendiz']).withMessage('Rol inválido. Debe ser: Administrador, Operario, Instructor o Aprendiz'),
];

export const validarActualizacionDatosUsuario = [
  check('nombre')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 5, max: 50 }).withMessage('El nombre debe tener entre 5 y 50 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.,;]+$/).withMessage('El nombre solo debe contener letras y espacios'),
  
  check('telefono')
    .notEmpty().withMessage('El teléfono es obligatorio')
    .isNumeric().withMessage('El teléfono debe contener solo números')
    .isLength({ min: 10, max: 14 }).withMessage('El teléfono debe tener entre 10 y 14 dígitos'),
  
  check('email')
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Debe ingresar un email válido')
    .normalizeEmail(),
];

export const validarUpdatePasswordUser = [
  check('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
    .matches(/\d/).withMessage('La contraseña debe contener al menos un número'),
];

export const validarId = [
  check('id')
    .notEmpty().withMessage('El ID es obligatorio')
    .isNumeric().withMessage('El ID debe ser numérico')
];

// Mantenemos el esquema de Zod por si se necesita en el futuro
export const usuarioSchema = z.object({
  identificacion: z
    .string()
    .min(6, "La identificación debe tener al menos 6 caracteres"),
  nombre: z
    .string()
    .min(5, "El nombre debe tener al menos 5 caracteres")
    .max(50, "El nombre no puede superar los 50 caracteres"),
  telefono: z
    .string()
    .regex(/^\d{10,14}$/, "El teléfono debe contener entre 10 y 14 dígitos"),
  email: z
    .string()
    .email("Debe ser un correo electrónico válido"),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
  rol: z
    .string()
});