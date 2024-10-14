import React, { useState, useEffect, useCallback, useRef } from 'react';
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

  const observer = useRef(); // 保存 IntersectionObserver 实例
  const lastElementRef = useRef(null); // 用于跟踪最后一个 Merchant 元素

  const loadMoreMerchants = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(preValue => true);
    setTimeout(() => {
      const newMerchants = Array.from({ length: 9 }).map((_, index) => ({
        id: merchants.length + index,
        name: `新商家 ${merchants.length + index}`,
        distance: (Math.random() * 10).toFixed(1),
        costDownLimit: Math.floor(Math.random() * 100),
        costUpLimit: Math.floor(Math.random() * 200),
        starRate: (Math.random() * 5).toFixed(1),
        starNumber: Math.floor(Math.random() * 100),
      }));

      setMerchants((prevMerchants) => [...prevMerchants, ...newMerchants]);

      if (merchants.length + newMerchants.length >= 500) {
        setHasMore(preValue => false);
      }
      setLoading(preValue => false);
    }, 2000);
  }, [loading, hasMore, merchants]);

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore) {
        loadMoreMerchants();
      }
    });

    const currentObserver = observer.current;

    if (lastElementRef.current) {
      currentObserver.observe(lastElementRef.current);
    }

    return () => {
      if (lastElementRef.current) {
        currentObserver.unobserve(lastElementRef.current);
      }
    };
  }, [loadMoreMerchants, hasMore]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6">
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
