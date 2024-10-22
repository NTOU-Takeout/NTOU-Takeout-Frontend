import React, { useState, useEffect, useMemo} from 'react';
import MenuItem from './MenuItem';
import useMenuSectionItemStore from '../../stores/menuSectionItem';


function MenuSectionPage() {
  const { items, setItems } = useMenuSectionItemStore();
  const initialParagraph = useMemo(() => ["套餐", "主食", "甜點", "飲料"], []);
  useEffect(() => {
    const newItems = Array.from({ length: 4 }).map((_, index) => ({
      type: 'paragraph',
      text: `${initialParagraph[index]}`,
      foods: Array.from({ length: 5 }).map((_, i) => ({
        id: index * 5 + i
      })),
    }));
    setItems(newItems);
  }, [initialParagraph]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center container mx-auto p-4">
      {items.map((item,index) => (
        <div key={index}>
          <p className="text-2xl font-medium my-2">{item.text}</p>
          {item.foods.map((food) => (
            <MenuItem key={food.id}></MenuItem>
          ))}
        </div>
      ))}
      
    </div>
  );
}

export default MenuSectionPage;