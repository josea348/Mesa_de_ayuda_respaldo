import { check, body } from "express-validator";

export const validarCategoria = [
  check('nombre')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3 y 50 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.,;]+$/).withMessage('El nombre solo debe contener letras y espacios'),

  check('descripcion')
    .notEmpty().withMessage('La descripción es obligatoria')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.,;]+$/).withMessage('La desripción solo debe contener letras y espacios'),
];

export const validarId = [
  check('id')
    .notEmpty().withMessage('El ID es obligatorio')
    .isNumeric().withMessage('El ID debe ser numérico')
];
