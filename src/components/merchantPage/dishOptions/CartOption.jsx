import React from 'react';
import AddToCart from './AddToCart';
import QuantitySelector from './QuantitySelector';

const CartOption = () => {
  return (
      <div className="flex jsutify-item-between fixed z-10 bottom-8 right-24">
        <QuantitySelector></QuantitySelector>
        <AddToCart></AddToCart>
    </div>
  );
};

export default CartOption;