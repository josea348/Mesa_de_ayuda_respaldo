import { check } from "express-validator";

export const validarBitacora = [
  check('accion')
    .notEmpty().withMessage('La acción es obligatoria')
    .isLength({ min: 3, max: 100 }).withMessage('La acción debe tener entre 3 y 100 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s,.-]+$/).withMessage('La acción solo debe contener letras, números, espacios y signos básicos'),

  check('usuario_id')
    .notEmpty().withMessage('El ID del usuario es obligatorio')
    .isNumeric().withMessage('El ID del usuario debe ser numérico')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s,.;:()-]+$/).withMessage('Los detalles solo deben contener letras, números y signos básicos'),

  check('ticket_id')
    .notEmpty().withMessage('El ID del ticket es obligatorio')
    .isNumeric().withMessage('El ID del ticket debe ser numérico')
];

export const validarId = [
  check('id')
    .notEmpty().withMessage('El ID es obligatorio')
    .isNumeric().withMessage('El ID debe ser numérico')
];
