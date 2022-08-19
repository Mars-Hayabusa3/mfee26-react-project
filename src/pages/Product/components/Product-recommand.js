import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ProductRecommandCard(props) {
  const { RandomProduct } = props;

  return (
    <div className="Mars-RecCard">
      <div className="Mars-Rec-imgwr">
        <Link to={`../${RandomProduct.sid}`}>
          <img
            src={`../${RandomProduct.product_img}`}
            alt=""
            className="Mars-Rec-img"
          />
        </Link>
      </div>
      <div className="Mars-Rec-content-wr">
        <div className="Mars-Rec-title">{RandomProduct.product_name}</div>
        <div className="Mars-Rec-category text-muted">
          {RandomProduct.category_sid === '1'
            ? '波堤'
            : RandomProduct.category_sid === '3'
            ? '歐菲香'
            : '圓型甜甜圈'}
        </div>
        <div className="Mars-Rec-desc">{RandomProduct.product_desc}</div>
        <div className="Mars-Rec-price text-muted">
          NT$ {RandomProduct.product_price}
        </div>
      </div>
    </div>
  );
}

export default ProductRecommandCard;
