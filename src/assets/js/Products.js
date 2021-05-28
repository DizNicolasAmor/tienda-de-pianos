import React from 'react';
import Product from './Product.js';

const Products = ({ products }) => (
	<section aria-label="Productos" id="products">
		{products.map( (product, index) => (
			<Product
				key={index}
				image={product.thumbnail}
				title={product.title}
				price={product.price}
				id={index + 1} />
		))}
	</section>
);

export default Products;
