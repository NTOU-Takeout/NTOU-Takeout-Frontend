import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const name="asdaoib";
const starNumber=4;
const date="2024-10-22";
const description="然四大。是人事聲、影活件、了應國行交埋有家仍生係上著人什型個沒國了要年李天青。 辦和經說覺春再沒直，操國斷用，出法導我不，求式助孩己為要通常金風站百厭依下書印期氣， 好臺人裡大音國事？能選麼光後可作了他本保我減了現對，用時灣方類？爭在狀半，然高物甚性？是腦者望軍對。";

const ReviewCard = () => {
  console.log(starNumber);
  return (
    <div className="max-w-max mx-auto mt-10 p-4 bg-white rounded-lg border border-gray-300">
      
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
