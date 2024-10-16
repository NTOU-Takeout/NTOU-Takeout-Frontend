import React, { useState, useEffect} from 'react';
import Merchant from './Merchant';



function MerchantList() {
  const [items, setItems] = useState([]);
  const initialParagraph=["套餐","主食","甜點","飲料"];
  useEffect(() => {
    setItems(Array.from({ length: 4 }).map((_, index) => ({
      type: 'paragraph',
      text: `${initialParagraph[index]}`,
      merchants: Array.from({ length: 5 }).map((_, i) => ({
            id: i+1,
            name: `新商家 ${i+1}`,
            distance: (Math.random() * 10).toFixed(1),
            costDownLimit: Math.floor(Math.random() * 100),
            costUpLimit: Math.floor(Math.random() * 200),
            starRate: (Math.random() * 5).toFixed(1),
            starNumber: Math.floor(Math.random() * 100),
      })),
    }))
  );
  }, []);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center container mx-auto p-4">
      {items.map((item, index) => (
        <div key={index}>
          <p className="text-lg font-medium my-4">{item.text}</p>
          {item.merchants.map((merchant, i) => (
            <Merchant
            id={merchant.id}
            name={merchant.name}
            distance={merchant.distance}
            costDownLimit={merchant.costDownLimit}
            costUpLimit={merchant.costUpLimit}
            starRate={merchant.starRate}
            starNumber={merchant.starNumber}
            className="w-[300px] h-[200px] bg-white border border-gray-300 rounded-xl shadow-lg"
          />
          ))}
        </div>
      ))}
      
    </div>
  );
}

export default MerchantList;



/*
import React, { useState, useEffect, useRef, useCallback } from 'react';


function App() {

  return (
    <div className="container mx-auto p-4">
      {items.map((item, index) => (
        <div key={index}>
          <p className="text-lg font-medium my-4">{item.text}</p>

          {item.merchants.map((merchant, i) => (
            <Merchant
              key={merchant.id}
              name={merchant.name}
              price={merchant.price}
              description={merchant.description}
              ref={
                index === items.length - 1 && i === item.merchants.length - 1
                  ? lastItemRef
                  : null
              } // 監聽最後一個商店項目
            />
          ))}
        </div>
      ))}
      {loading && (
        <div className="text-center p-4">
          <p className="text-gray-500">載入中...</p>
        </div>
      )}
    </div>
  );
}

export default App;

*/