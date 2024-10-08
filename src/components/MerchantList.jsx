import React, { useState, useEffect } from 'react';
import Merchant from './Merchant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const initialMerchants = [
  { id: 0, name: "海洋大學店", distance: 1.6, costDownLimit: 98, costUpLimit: 123, starRate: 4.8, starNumber: 71 },
  { id: 1, name: "海", distance: 2.5, costDownLimit: 12, costUpLimit: 124, starRate: 3.2, starNumber: 12 },
  { id: 2, name: "海洋大學店", distance: 1.6, costDownLimit: 98, costUpLimit: 123, starRate: 4.8, starNumber: 71 },
  { id: 3, name: "海", distance: 2.5, costDownLimit: 12, costUpLimit: 124, starRate: 3.2, starNumber: 12 },
  { id: 4, name: "海洋大學店", distance: 1.6, costDownLimit: 98, costUpLimit: 123, starRate: 4.8, starNumber: 71 },
  { id: 5, name: "海", distance: 2.5, costDownLimit: 12, costUpLimit: 124, starRate: 3.2, starNumber: 12 },
];

function MerchantList() {
  const [merchants, setMerchants] = useState(initialMerchants); 
  const [hasMore, setHasMore] = useState(true); 
  const [loading, setLoading] = useState(false); 
  const [isBottom, setIsBottom] = useState(false);
  const loadMoreMerchants = () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setTimeout(() => {
      const newMerchants = merchants.concat(
        Array.from({ length: 3 }).map((_, index) => ({
          id: merchants.length + index,
          name: `新商家 ${merchants.length + index}`,
          distance: (Math.random() * 10).toFixed(1),
          costDownLimit: Math.floor(Math.random() * 100),
          costUpLimit: Math.floor(Math.random() * 200),
          starRate: (Math.random() * 5).toFixed(1),
          starNumber: Math.floor(Math.random() * 100),
        }))
      );

      setMerchants(newMerchants);
      
      if (newMerchants.length >= 50) {
        setHasMore(false);
      }
      setLoading(false); 
      setIsBottom(false);
    }, 2000);
  };

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    if (scrollTop + windowHeight >= documentHeight - 30 && !loading && hasMore) {
      setIsBottom(true); 
    }
  };

  useEffect(() => {
    if (isBottom) loadMoreMerchants();
  }, [isBottom]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading, hasMore]);

  return (
    <div>
      {merchants.map((merchant) => (
        <Merchant
          key={merchant.id}
          id={merchant.id}
          name={merchant.name}
          distance={merchant.distance}
          costDownLimit={merchant.costDownLimit}
          costUpLimit={merchant.costUpLimit}
          starRate={merchant.starRate}
          starNumber={merchant.starNumber}
          className="merchant" 
        />
      ))}
      {loading && (
        <center>
          <FontAwesomeIcon icon={faSpinner} spinPulse />
        </center>
      )}
      {/*!hasMore && (
        <center>
          <p className="text-gray-500 font-semibold text-xl">No more merchants to load</p>
        </center> 加載到沒有會用到，先不要刪
      )*/}
    </div>
  );
}

export default MerchantList;
