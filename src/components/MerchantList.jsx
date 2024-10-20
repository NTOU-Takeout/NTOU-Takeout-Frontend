import { useState, useEffect, useCallback, useRef, memo } from 'react';
import {
  useQuery,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { useInView } from "react-intersection-observer";
import Merchant from './Merchant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import getStoreClient from '../api/store/getStoreClient';

function MerchantList() {
  const merchantIdListRef = useRef([]); 
  const LOAD_SIZE = 2;
  const { ref, inView } = useInView({
    rootMargin: '100px',
  });
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  const {
    data: merchantIdList,
    isLoading: isMerchantIdListLoading,
    isError: isMerchantIdListError,
    error: merchantIdListError,
  } = useQuery({
    queryKey: ['defaultMerchantIdList'],
    queryFn: getStoreClient.getStoreIdList,
  });

  useEffect(() => {
    merchantIdListRef.current = merchantIdList;
    console.log("merchantIdListRef:", merchantIdListRef.current);
  }, [merchantIdList]);

  // Use useInfiniteQuery to fetch merchants in pages
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isMerchantsLoading,
    isError: isMerchantsError,
    error: merchantsError,
  } = useInfiniteQuery({
    queryKey: ['merchants'],
    enabled: !!isMerchantIdListLoading,
    queryFn: async  ({ pageParam }) => {
      console.log("pageParam:", pageParam);
      const start = pageParam * LOAD_SIZE;
      const end = start + LOAD_SIZE;
      const idList = merchantIdListRef.current.slice(start, end);
      if (idList.length === 0) {
        return [];
      }
      const merchants = await getStoreClient.getMerchantsByIdList(idList);
      console.log("merchants:", merchants);
      return merchants;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage,allPages) => {
      const nextPage = allPages.length;
      const totalMerchants = merchantIdList?.length || 0;
      if (nextPage * LOAD_SIZE < totalMerchants) {
        return nextPage;
      } else {
        return undefined; // No more pages
      }
    },
  });

  return (isMerchantIdListLoading||isMerchantsLoading ? 
    <div className="flex justify-center items-center mt-4 fa-2x">
      <FontAwesomeIcon icon={faSpinner} spinPulse />
    </div> :
    <div className="-z-40-50 min-h-screen  flex flex-col items-center  space-y-6 py-5">
      {data?.pages.map((page) =>
        page.map((merchant) => {
          return (
            <div
              key={merchant.id}
              className="flex justify-center"
            >
              <Merchant
                id={merchant.id}
                name={merchant.name}
                averageSpend={merchant.averageSpend}
                rating={merchant.rating}
                picture={merchant.picture}
                className="w-[300px] h-[200px] bg-white border border-gray-300 rounded-xl shadow-lg"
              />
            </div>
          );
        })
      )}
      <div ref={ref}>{hasNextPage ?
        <div className="flex justify-center items-center mt-4 fa-2x">
          <FontAwesomeIcon icon={faSpinner} spinPulse />
        </div> : "No more merchants to show"}
      </div>
    </div>
  );
}

export default MerchantList;
