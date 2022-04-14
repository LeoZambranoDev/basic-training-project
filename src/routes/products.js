// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require('path')

// Multer //  ocupado para subir archivos
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '../../public/images/products'))
    },
    filename: function (req, file, cb) {
    
        let newName= Date.now() + file.originalname
      cb(null, newName)
    }
  })

const upload = multer({ storage })
// /Multer //

const validaciones=require('../../middlewares/main')

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); //Lista todos los products

// /*** CREATE ONE PRODUCT ***/ 
router.get('/create/', productsController.create); //Mostrar view create
router.post('/' ,upload.single('img-user'),validaciones, productsController.store); //NOTA: COLOCAR EL UPLOAD SINGLE  //Recibe producto para guardar. LISTA PERO NO TERMINADA


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id', productsController.detail);  //muestra el detalle del producto identificado por id

// /*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); //muestra la view para editar el producto correspondiente al id
router.put('/:id', productsController.update); //Actualiza los valores de acuerdo al id que recibe


// /*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productsController.destroy); 


module.exports = router;
