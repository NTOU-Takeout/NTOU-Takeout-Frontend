import React from 'react';
import useDishStore from '../../../stores/dishDetailStore.js';

const QuantitySelector = () => {
  const { quantity, setQuantity } = useDishStore();

  return (
    <div className="font-notoTC flex items-center bg-orange-500 rounded-full px-2 py-1 shadow-md border border-orange-700 mr-4">
      <button
        className="pb-1 bg-white text-black font-bold rounded-full w-6 h-6 flex items-center justify-center"
        onClick={() => setQuantity(quantity - 1)}
        disabled={quantity <= 0} // Quantity can't be negative
      >
        -
      </button>
      <span className="pb-1 mx-4 text-white font-bold">{quantity}</span>
      <button
        className="bg-white text-black font-bold rounded-full w-6 h-6 flex items-center justify-center"
        onClick={() => setQuantity(quantity + 1)}
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
