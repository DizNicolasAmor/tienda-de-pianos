import React from 'react';
import * as _truncate from 'lodash/truncate';

const Product = ({ image, price, title }) => (
  <div className="subcontainer">
    <div className="product-container">
      <div className="product-container-image-wrapper">
        <img src={image} alt="Producto" />
      </div>
      <hr />
      <div className="cursor-pointer text-center font-weight-bold my-3">
        $ {price}
      </div>
      <div title={title}>{_truncate(title, { length: 60 })}</div>
    </div>
  </div>
);

export default Product;
