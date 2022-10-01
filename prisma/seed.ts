import productsService from "../services/products";
import levelsServices from "../services/levels";
import categoriesServices from "../services/categories";
import prisma from "../database/database";

const categorySeed = async () => {
	for(let i = 0; i < 3; i++){
		const name = `eletronico-${i+1}`;
		await categoriesServices.create(name);
	}
}

const productSeed = async () => {
	for(let i = 0; i < 3; i++){
		for(let j = 0; j < 3; j++){
			const body = { 
				name: `product-${i}${i+j+1}`, 
				description: 'description', 
				price: (1500 * (i+1) * (j+1)), 
				shipping: 120, 
				categoryId: (i+1),
				stock: 999,
				image: 'https://i.ytimg.com/vi/AhVFog9C-HU/maxresdefault.jpg' 
			};
			await productsService.create(body);
		}
	}
}

const levelsSeed = async () => {
	for(let i = 0; i < 3; i++){
		const body = { 
			name: `Lord-${i+1}`, 
			totalPoints: 10000*(i+1), 
			features: {
				hasFreeShipping: i >= 1 ? true : false,
				discount: i === 1 ? 0.05 : (i === 2) ? 0.1 : 0,
				shippingDiscount: i === 1 ? 0.05 : (i === 2) ? 0.1 : 0
			} 
		}
		await levelsServices.create(body);
	}
}

(async () => {
	await prisma.$executeRaw`TRUNCATE TABLE products RESTART IDENTITY CASCADE;`;
	await prisma.$executeRaw`TRUNCATE TABLE categories RESTART IDENTITY CASCADE;`;
	await prisma.$executeRaw`TRUNCATE TABLE levels RESTART IDENTITY CASCADE;`;
	//restart and seed database 
	await categorySeed();
	await productSeed();
	await levelsSeed();
})();