import React, { Component } from 'react';


class Product extends Component {
  render() {
    return (
      <div className="subcontainer">
        <div className="product-container">
          <h1>
            <img src={this.props.image} alt="Producto" />
          </h1>
          <hr />
          <h4 className="cursor-pointer">$ {this.props.price}</h4>  
          <h5>{this.props.title}</h5>
        </div>
      </div>
    );
  }
}

export default Product;