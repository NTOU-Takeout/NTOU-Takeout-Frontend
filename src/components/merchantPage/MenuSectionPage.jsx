import React, { useEffect, useMemo, useState } from 'react';
import MenuItemCard from './MenuItem';
import useMenuSectionItemStore from '../../stores/menuSectionItem';
import MenuDishDetail from './MenuDishDetail'; // 引入 DishDetail 組件

function MenuSectionPage({ sectionRefs }) {
    const { items, setItems } = useMenuSectionItemStore();
    const initialParagraph = useMemo(() => ["套餐", "主食", "甜點", "飲料"], []);
    
    // 新增 state 來控制 DishDetail 的顯示和當前菜品
    const [selectedDish, setSelectedDish] = useState(null);
    
    useEffect(() => {
        const newItems = Array.from({ length: 4 }).map((_, index) => ({
            type: 'paragraph',
            text: `${initialParagraph[index]}`,
            foods: Array.from({ length: 5 }).map((_, i) => ({
                id: index * 5 + i,
                name: `菜品 ${index * 5 + i}`, // 假設這裡是菜品名稱
                price: (index + 1) * 100 + (i * 10), // 假設這裡是菜品價格
                description: `這是 ${index * 5 + i} 的描述`, // 假設這裡是菜品描述
            })),
        }));
        setItems(newItems);
    }, [initialParagraph, setItems]);

    const handleMenuItemClick = (item) => {
        setSelectedDish(item); // 設定當前選擇的菜品
    };

    return (
        <div className="-top-12 relative min-h-screen flex flex-col items-center justify-center container mx-auto p-4">
            {items.map((item, index) => (
                <div key={index} ref={(el) => sectionRefs.current[index] = el} className="mb-8">
                    <p className="text-2xl font-medium my-2">{item.text}</p>
                    {item.foods.map((food) => (
                        <MenuItemCard 
                            key={food.id} 
                            item={food} 
                            onClick={handleMenuItemClick} // 傳遞 onClick 函數
                        />
                    ))}
                </div>
            ))}
            {/* 根據 selectedDish 的值顯示 DishDetail */}
            {selectedDish && (
                <MenuDishDetail 
                    name={selectedDish.name} 
                    price={selectedDish.price} 
                    onClose={() => setSelectedDish(null)} // 關閉詳細視窗
                    imageUrl="https://picsum.photos/400/300" // 可以根據需要動態傳遞
                    description={selectedDish.description} // 傳遞描述
                />
            )}
        </div>
    );
}

export default MenuSectionPage;
