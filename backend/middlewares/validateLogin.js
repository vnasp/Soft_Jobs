import { check, validationResult } from 'express-validator'

export const validForm = [
  check('email').isEmail().withMessage('Ingrese una dirección de correo electrónico válida'),
  check('password').isLength({ min: 4 }).withMessage('La contraseña es obligatoria y mínimo 4 caracteres'),

  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next();
  }
]

export default validForm