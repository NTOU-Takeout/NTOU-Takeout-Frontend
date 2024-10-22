import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from "react-intersection-observer"; // 用於觀察元素是否進入視窗
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import ReviewCard from './ReviewCard';
import getStoreClient from '../../api/store/getStoreClient';

const ReviewCardList = () => {
  const reviewCardIDListRef=useRef([]);
  const LOAD_SIZE=3;
  const { ref, inView } = useInView({
    rootMargin: '100px',
  });
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);
  const {
    data: reviewCardIDList,
    isLoading: isReviewCardIdListLoading,
    isError: isReviewCardIdListError,
    error: reviewCardIdListError,
  } = useQuery({
    queryKey: ['defaultReviewCardIdList'],//todo
    queryFn: getStoreClient.getStoreIdList,//todo
  });

  useEffect(() => {
    reviewCardIDListRef.current = reviewCardIDList;
  }, [reviewCardIDList]);

  // Use useInfiniteQuery to fetch ReviewCards in pages
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isReviewCardsLoading,
    isError: isReviewCardsError,
    error: reviewCardsError,
  } = useInfiniteQuery({
    queryKey: ['reviewCards'],
    queryFn: async  ({ pageParam }) => {
        console.log("pageParam:", pageParam);
        const start = pageParam * LOAD_SIZE;
        const end = start + LOAD_SIZE;
        const idList = reviewCardIDListRef.current.slice(start, end);
        
        if (idList.length === 0) {
            return [];
        }

        const reviewCards = await getStoreClient.getReviewCardsByIdList(idList);
        console.log("reviewCards:", reviewCards);

        return reviewCards;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage,allPages) => {
        const nextPage = allPages.length;
        const totalReviewCards = reviewCardIDList?.length || 0;
        
        if (nextPage * LOAD_SIZE < totalReviewCards) {
            return nextPage;
        } else {
            return undefined; // No more pages
        }
    },
  });

  return (isReviewCardIdListLoading||isReviewCardsLoading?
    <div className="w-screen flex justify-center items-center mt-4 fa-2x">
      <FontAwesomeIcon icon={faSpinner} spinPulse className="flex justify-center items-center"/>
    </div> :
    <ReviewCard
        name="海洋"
        starNumber={3}
        date="2024-10-31"
        description="ARRRRRRRRRRR"
    ></ReviewCard>
    /*
        <div ref={ref}>{hasNextPage ?
        <div className="flex justify-center items-center mt-4 fa-2x">
          <FontAwesomeIcon icon={faSpinner} spinPulse />
        </div> : "No more merchants to show"}
      </div>
        */
  );
};

export default ReviewCardList;
