const fs = require('fs');
const path = require('path');

// const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
// const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const db=require('../database/models')

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {//revisar esto(hay que mandar solo lo necesario y en orden)
	index: (req, res) => {
		db.Product.findAll()
		.then((products)=>{
			let productsVisited=products.filter(x=>{
				return x.category=='visited'
			})
			let productsSale=products.filter(x=>{
				return x.category=='in-sale'
			})
			res.render('index',{ productsVisited,productsSale })
		})
		
	},
	search: (req, res) => {
		// Do the magic
	},
};

module.exports = controller;
