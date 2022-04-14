const {check}=require('express-validator')

const validaciones=[
    check('name').notEmpty().withMessage('Ingrese un nombre'),
    check('price').notEmpty().withMessage('Debe ingresar un precio'),
    check('discount').notEmpty().withMessage('Debe ingresar el descuento'),
    check('description').notEmpty().withMessage('Debe ingresar la descripción')
]

module.exports=validaciones

