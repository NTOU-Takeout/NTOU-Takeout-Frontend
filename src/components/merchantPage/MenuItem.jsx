import React from 'react';

const MenuItemCard = () => {
  return (
    <div className="MenuItem block">
      <div className="flex m-8 max-w-xl bg-white text-white rounded-lg overflow-hidden shadow-lg">
        {/* 圖片部分 */}
        <div className="w-1/2">
          <img 
            src="https://picsum.photos/200/150" 
            alt="doge" 
            className="object-cover h-full"
          />
        </div>

        {/* 內容部分 */}
        <div className="w-2/3 p-4">
          {/* 標題 */}
          <h2 className="text-2xl font-bold mb-2 text-black">原味飯糰</h2>

          {/* 價格 */}
          <p className="text-xl text-gray-800">$30</p>

          {/* 描述 */}
          <p className="text-sm text-gray-600 mt-2">
            綠聽吧之位子宜寧，各話又，正見跳免還「沒古六更是三肖」。
          </p>

          {/* 加號按鈕 */}
          <div className="flex justify-end mt-4">
            <button className="bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center">
              <span className="text-2xl font-bold mb-1">+</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default MenuItemCard;
