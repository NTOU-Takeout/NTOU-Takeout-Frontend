import { useState, useEffect, useCallback, useRef } from 'react';
import Merchant from './Merchant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import getStoreClient from '../api/store/getStoreClient';
import { Link } from 'react-router-dom';
function MerchantList() {
  const [merchants, setMerchants] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const merchantIdList = useRef([]);
  const observer = useRef(); 
  const LOAD_SIZE = 2;

  //fetch mercantIdList to initialize all sotre list id
  useEffect(() => {
    const fetchMerchantIds = async () => {
      setLoading(true);
      try {
        merchantIdList.current = await getStoreClient.getStoreIdList();
        console.log("merchantIdList:", merchantIdList.current);
        await fetchMerchantsByIdList(merchantIdList.current.slice(0, LOAD_SIZE));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };  
    fetchMerchantIds();
  }, []);
  
  //fetch merchant by given id list
  const fetchMerchantsByIdList = useCallback(async (idList) => {
    setLoading(true); 
    let newMerchants = [];
    try {
      newMerchants = await getStoreClient.getMerchantsByIdList(idList);
    } catch (error) {
      console.error(error);
    } finally {
      console.log("newMerchants:", newMerchants);
      setMerchants((prevMerchants) => [...prevMerchants, ...newMerchants]);
      setLoading(false);
    }
  }, []);

  //load more merchants used by infinite scroll
  const loadMoreMerchants = useCallback(async () => {
    if(merchantIdList.current.length == merchants.length){
      setHasMore(false);
    }
    if (loading || !hasMore) return;
  
    const nextIdList = merchantIdList.current.slice(merchants.length, merchants.length + LOAD_SIZE);
    await fetchMerchantsByIdList(nextIdList);
  }, [loading, hasMore, fetchMerchantsByIdList, merchants]);
  
  //useEffect to observe the last element of the list
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
          <Link key={merchant.id} to={`/menu/${merchant.id}`}>
          <div
            key={merchant.id}
            ref={isLastElement ? lastElementRef : null}
            className="flex justify-center"
          >
            <Merchant
              id={merchants.length-1}
              name={merchant.name}
              averageSpend={merchant.averageSpend}
              rating={merchant.rating}
              picture={merchant.picture}
              className="w-[300px] h-[200px] bg-white border border-gray-300 rounded-xl shadow-lg"
            />
          </div>
          </Link> 
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
