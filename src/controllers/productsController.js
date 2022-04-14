const fs = require('fs');
const path = require('path');

const {validationResult}=require('express-validator')

// const productsFilePath = path.join(__dirname, '../data/productsDataBase.json'); //L:\Projects JS\js\Actual\EjercicioClaseCRUD\src\data\productsDataBase.json
// const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const db=require('../database/models')

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); 

const controller = {
	// Root - Show all products 
	index: (req, res) => {
		db.Product.findAll()
		.then((products)=>{
			res.render('products', { 'listProducts':products })
		})
	},

	// Detail - Detail from one product 	-- Detalle de prodcuto
		detail: (req, res) => {
		//NOTA: revisar si un producto no existe
		let productById=products.find(x=>x.id==req.params.id)
		res.render('detail', { 'product':productById})
	},

	// Create - Form to create  -- Vista crear producto
	create: (req, res) => {
		res.render('product-create-form')
	},

	// Create -  Method to store    -- Agregar producto    
	store: (req, res) => {
		let results=validationResult(req)
		
		console.log(req.body);
		
		if(results.errors.length>0){
			res.render('product-create-form',{'listErrors':results.errors})
		}else{
			res.send('sin errores')
		}


		// console.log(req.file.filename)
		// let newProduct = {
		// 	"id": products.length + 1,
		// 	"name": req.body.name,
		// 	"price": req.body.price,
		// 	"discount": req.body.discount,
		// 	"category": req.body.category,
		// 	"description": req.body.description,
		// 	"image": req.file.filename
		// }

		// //es necesario amacenarlo en una nueva variable para enviarlo al archivo
		// let auxProducts = products
		// auxProducts.push(newProduct)

		// fs.writeFileSync(productsFilePath, JSON.stringify(auxProducts, null, ' '))


		// res.redirect('/products')
	},

	// Update - Form to edit	-- Vista Actualizar
	edit: (req, res) => {

		let productById=products.find(x=>x.id==req.params.id)

		res.render('product-edit-form', { 'product': productById })
	},

	// Update - Method to update	-- Actualizar producto
	update: (req, res) => {

		let auxProducts = []
		products.forEach(x => {
			if (x.id == req.params.id) {
				let newProduct = {
					"id": x.id,
					"name": req.body.name,
					"price": req.body.price,
					"discount": req.body.discount,
					"category": req.body.category,
					"description": req.body.description,
					"image": x.image
				}
				auxProducts.push(newProduct)
			}
			else {
				auxProducts.push(x)
			}
		})

		fs.writeFileSync(productsFilePath, JSON.stringify(auxProducts, null, ' '))


		res.redirect('/products')
	},

	// Delete - Delete one product from DB	-- Eliminar producto
	destroy: (req, res) => {
		
		
		let auxProducts = []
		products.forEach(x => {
			if (x.id != req.params.id) {
				auxProducts.push(x)
			}
		})

		fs.writeFileSync(productsFilePath, JSON.stringify(auxProducts, null, ' '))

		res.redirect('/products')
	}
};

module.exports = controller;