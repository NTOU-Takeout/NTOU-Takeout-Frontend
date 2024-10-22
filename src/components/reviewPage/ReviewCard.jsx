import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const ReviewCard = () => {
  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 bg-white rounded-lg border border-gray-300">
      {/* 用戶名和日期 */}
      <div className="flex justify-between items-center">
        <span className="text-gray-800 font-semibold">顧客 Liu******09</span>
        <span className="text-gray-500 text-sm">2020-04-12</span>
      </div>

      {/* 星級評分 */}
      <div className="flex items-center mt-2">
        {[...Array(5)].map((_, i) => (
          <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-500" />
        ))}
      </div>

      {/* 評論內容 */}
      <p className="mt-2 text-gray-700 leading-relaxed">
        然四大。是人事聲、影活件、了應國行交埋有家仍生係上著人什型個沒國了要年李天青。
        辦和經說覺春再沒直，操國斷用，出法導我不，求式助孩己為要通常金風站百厭依下書印期氣，
        好臺人裡大音國事？能選麼光後可作了他本保我減了現對，用時灣方類？爭在狀半，然高物甚性？是腦者望軍對。
      </p>
    </div>
  );
};

export default ReviewCard;
