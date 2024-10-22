import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const ReviewCard = (prop) => {
  const {name,starNumber,date,description}=prop;

  //console.log(starNumber);
  return (
    <div className="w-[90%] mx-auto mt-10 p-4 bg-white rounded-lg border border-gray-300">
      
      <div className="flex justify-between items-center">
        <span className="text-gray-800 font-semibold">{name}</span>
        <span className="text-gray-500 text-sm">{date}</span>
      </div>

      <div className="flex items-center mt-2">
        {[...Array(starNumber)].map((_, i) => (
          <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-300" />
        ))}
        {[...Array(5-starNumber)].map((_, i) => (
          <FontAwesomeIcon key={i} icon={faStar} className="text-gray-300" />
        ))}
      </div>
      <p className="mt-2 text-gray-700 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default ReviewCard;
