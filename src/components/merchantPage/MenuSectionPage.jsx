import React, { useEffect, useMemo, useState } from 'react';
import MenuItemCard from './MenuItem';
import useMenuSectionItemStore from '../../stores/menuSectionItem';
import MenuDishDetail from './MenuDishDetail'; // 引入 DishDetail 組件

function MenuSectionPage({ sectionRefs, categoryData }) { // 接受 categoryData
    const { items, setItems } = useMenuSectionItemStore();
    const initialParagraph = useMemo(() => ["套餐", "主食", "甜點", "飲料"], []);

    const [selectedDish, setSelectedDish] = useState(null);
    
    useEffect(() => {
        const newItems = categoryData.map((category) => ({
            type: 'paragraph',
            text: category.categoryName,
            foods: category.dishes, // 使用從 API 獲取的菜品
        }));
        setItems(newItems);
    }, [categoryData, setItems]);

    const handleMenuItemClick = (item) => {
        setSelectedDish(item); // 確保 item 包含 dishesAttributes
    };

    return (
        <div className="-top-12 relative min-h-screen flex flex-col items-center justify-center container mx-auto p-4">
            {items.map((item, index) => (
                <div key={index} ref={(el) => sectionRefs.current[index] = el} className="mb-8">
                    <p className="text-2xl font-notoTC my-2 font-bold">{item.text}</p>
                    {item.foods.map((food) => (
                        <MenuItemCard 
                            key={food.id} 
                            item={food} 
                            imageUrl={food.picture} // 動態傳遞圖片鏈接
                            onClick={handleMenuItemClick} // 傳遞 onClick 函數
                        />
                    ))}
                </div>
            ))}
            {selectedDish && (
                <MenuDishDetail 
                    name={selectedDish.name} 
                    price={selectedDish.price} 
                    onClose={() => setSelectedDish(null)} // 關閉詳細視窗
                    imageUrl={selectedDish.picture} // 動態傳遞圖片鏈接
                    description={selectedDish.description} // 傳遞描述
                    options={selectedDish.dishAttributes || []} // 確保這裡能拿到 dishesAttributes
                />
            )}
        </div>
    );
}

export default MenuSectionPage;
