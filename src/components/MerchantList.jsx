import React, { useState, useEffect, useCallback, useRef } from 'react';
import Merchant from './Merchant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import getStoreClient from '../api/store/getStoreClient';
// const initialMerchants = [
//   { id: 0, name: "海洋大學店", distance: 1.6, costDownLimit: 98, costUpLimit: 123, starRate: 4.8, starNumber: 71 },
//   { id: 1, name: "海", distance: 2.5, costDownLimit: 12, costUpLimit: 124, starRate: 3.2, starNumber: 12 },
//   { id: 2, name: "海洋大學店", distance: 1.6, costDownLimit: 98, costUpLimit: 123, starRate: 4.8, starNumber: 71 },
//   { id: 3, name: "海", distance: 2.5, costDownLimit: 12, costUpLimit: 124, starRate: 3.2, starNumber: 12 },
//   { id: 4, name: "海洋大學店", distance: 1.6, costDownLimit: 98, costUpLimit: 123, starRate: 4.8, starNumber: 71 },
//   { id: 5, name: "海", distance: 2.5, costDownLimit: 12, costUpLimit: 124, starRate: 3.2, starNumber: 12 },
// ];

function MerchantList() {
  const [merchants, setMerchants] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const observer = useRef(); 
  
  const fetchMerchantsIdList = useCallback(async () => {
    const result = await getStoreClient.getStoreIdList();
    console.log(result);
  }, []);

  useEffect(() => {
    fetchMerchantsIdList();
  }, [fetchMerchantsIdList]);

  
  const loadMoreMerchants = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);
    setTimeout(() => {
      setMerchants((prevMerchants) => {
        const newMerchants = Array.from({ length: 9 }).map((_, index) => ({
            id: prevMerchants.length + index,
            name: `新商家 ${prevMerchants.length + index}`,
            distance: (Math.random() * 10).toFixed(1),
            costDownLimit: Math.floor(Math.random() * 100),
            costUpLimit: Math.floor(Math.random() * 200),
            starRate: (Math.random() * 5).toFixed(1),
            starNumber: Math.floor(Math.random() * 100),
        }));
    
        if (prevMerchants.length + newMerchants.length >= 500) {
          setHasMore(false);
        }
    
        return [...prevMerchants, ...newMerchants];
      });
    
      setLoading(false);
    }, 2000);
  }, [loading, hasMore]);

  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
  
      if (node) {
        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting && hasMore && !loading) {
            loadMoreMerchants();
          }
        });
  
        observer.current.observe(node);
      }
    },
    [loading, hasMore, loadMoreMerchants]
  );

  return (
    <div className="-z-40-50 min-h-screen  flex flex-col items-center justify-center space-y-6">
      {merchants.map((merchant, index) => {
        const isLastElement = index === merchants.length - 1;
        return (
          <div
            key={merchant.id}
            ref={isLastElement ? lastElementRef : null}
            className="flex justify-center"
          >
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
          </div>
        );
      })}
      {loading && (
        <div className="flex justify-center items-center mt-4">
          <FontAwesomeIcon icon={faSpinner} spinPulse />
        </div>
      )}
      {!hasMore && (
        <div className="text-center mt-4">
          <p>No more merchants to load</p>
        </div>
      )}
    </div>
  );
}

export default MerchantList;
