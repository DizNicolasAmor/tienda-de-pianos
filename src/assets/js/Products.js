import React, { Component } from 'react';
import Product from './Product.js';


class Products extends Component {
  render() {
    return (
         <div id="products">
          {this.props.products.map( (product, index) => {
            return <Product 
                     key={index} 
                     image={product.thumbnail} 
                     title={product.title} 
                     price={product.price}
                     id={index + 1} />
          })}
        </div>
    );
  }
}

export default Products;