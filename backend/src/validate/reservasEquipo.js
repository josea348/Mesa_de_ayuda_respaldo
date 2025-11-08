import { check } from "express-validator";

export const validarReservaEquipo = [
  check('usuario_id')
    .notEmpty().withMessage('El ID del usuario es obligatorio')
    .isNumeric().withMessage('El ID del usuario debe ser numérico'),

  check('equipo_id')
    .notEmpty().withMessage('El ID del equipo es obligatorio')
    .isNumeric().withMessage('El ID del equipo debe ser numérico'),

  check('fecha_inicio')
    .notEmpty().withMessage('La fecha de inicio es obligatoria')
    .isISO8601().withMessage('La fecha de inicio debe tener formato válido (YYYY-MM-DD)'),

  check('fecha_fin')
    .notEmpty().withMessage('La fecha de fin es obligatoria')
    .isISO8601().withMessage('La fecha de fin debe tener formato válido (YYYY-MM-DD)')
    .custom((value, { req }) => {
      if (new Date(value) < new Date(req.body.fecha_inicio)) {
        throw new Error('La fecha de fin no puede ser anterior a la fecha de inicio');
      }
      return true;
    }),

  check('estado')
    .notEmpty().withMessage('El estado es obligatorio')
    .isIn(['Pendiente','Confirmado','Cancelada','Completada'])
    .withMessage('El estado debe ser pendiente, confirmado, cancelada o completada'),
];

export const validarId = [
  check('id')
    .notEmpty().withMessage('El ID es obligatorio')
    .isNumeric().withMessage('El ID debe ser numérico')
];
