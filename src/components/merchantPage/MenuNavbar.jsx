import React from 'react';
import useNavStore from '../../stores/merchantMenuNav';

const Navbar = () => {
    const { navbarItems, nowPage, setNowPage } = useNavStore();

    return (
    <nav className="bg-white p-4 flex">
      {/* Navbar Items */}
      <ul className="mt-2 flex space-x-4 text-gray-400 text-lg font-notoTC relative -top-12">
        {navbarItems.map((item, index) => (
          <li
            key={index}
            className={`${
              index === nowPage ? 'text-black font-bold border-b-2 border-black hover:border-black' : ''
            } hover:text-gray-800 cursor-pointer`}
            onClick={() => setNowPage(index)}
          >
            {item}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
