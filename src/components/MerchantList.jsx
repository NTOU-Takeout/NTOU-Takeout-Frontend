import React, { useState, useEffect, useCallback, useRef } from 'react';
import Merchant from './Merchant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import getStoreClient from '../api/store/getStoreClient';

function MerchantList() {
  const [merchants, setMerchants] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const merchantIdList = useRef([]);
  const observer = useRef(); 
  const LOAD_SIZE = 6;

  useEffect(() => {
    const fetchMerchantIds = async () => {
      setLoading(true);
      try {
        merchantIdList.current = await getStoreClient.getStoreIdList();
        console.log("fetchMerchantsIdList:", merchantIdList.current);
        // 初始加载商家数据
        await fetchMerchantsByIdList(merchantIdList.current.slice(0, LOAD_SIZE));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchMerchantIds();
  }, []);
  
  
  
  const fetchMerchantsByIdList = useCallback(async (idList) => {
    setLoading(true); // 开始加载
    let newMerchants = [];
    try {
      console.log("idList:", idList);
      if (idList.length < LOAD_SIZE) {
        setHasMore(false);
      }
      newMerchants = await getStoreClient.getMerchantsByIdList(idList);
    } catch (error) {
      console.error(error);
    } finally {
      newMerchants.forEach((merchant) => {
        merchant.businessHour = "fuck";
        console.log("merchant businesshour:", merchant.businessHour);
      });
      setMerchants((prevMerchants) => [...prevMerchants, ...newMerchants]);
      console.log("???newMerchants:", newMerchants);
      setLoading(false); 
    }
  }, []);

  const loadMoreMerchants = useCallback(async () => {
    if (loading || !hasMore) return;
  
    const nextIdList = merchantIdList.current.slice(merchants.length, merchants.length + LOAD_SIZE);
    await fetchMerchantsByIdList(nextIdList);
  }, [loading, hasMore, fetchMerchantsByIdList, merchants]);
  
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

  console.log("sssss:",merchants.length);
  return (
    <div className="-z-40-50 min-h-screen  flex flex-col items-center justify-center space-y-6">
      {merchants.map((merchant, index) => {
        const isLastElement = index === merchants.length - 1;
        return (
          <div
            key={merchant.id}
            // ref={isLastElement ? lastElementRef : null}
            className="flex justify-center"
          >
            <Merchant
              id={merchants.length}
              name={merchant.name}
              averageSpend={merchant.averageSpend}
              rating={merchant.rating}
              picture={merchant.picture}
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
