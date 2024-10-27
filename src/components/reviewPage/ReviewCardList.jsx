import React from "react";
import { useState, useEffect, useRef } from "react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer"; // 用於觀察元素是否進入視窗
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import ReviewCard from "./ReviewCard";
import getStoreClient from "../../api/store/getStoreClient";
import PropTypes from "prop-types";
import getReviewClient from "../../api/review/getReviewClient";

const ReviewCardList = ({ reviewIdList, merchantId }) => {
    const LOAD_SIZE = 10;
    const { ref, inView } = useInView({
        rootMargin: "100px",
    });

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView]);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading: isReviewCardsLoading,
        isError: isReviewCardsError,
        error: reviewCardsError,
    } = useInfiniteQuery({
        queryKey: ["reviewCards" + merchantId],
        queryFn: async ({ pageParam }) => {
            const start = pageParam * LOAD_SIZE;
            const end = start + LOAD_SIZE;
            const idList = reviewIdList.slice(start, end);

            if (idList.length === 0) {
                return [];
            }
            const reviewCards = await getReviewClient.getReivewByIds(idList);
            console.log("reviewCards:", reviewCards);

            return reviewCards;
        },

        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = allPages.length;
            const totalReviewCards = reviewIdList?.length || 0;

            if (nextPage * LOAD_SIZE < totalReviewCards) {
                return nextPage;
            } else {
                return undefined; // No more pages
            }
        },
    });

    return isReviewCardsLoading ? (
        <div className="font-notoTC w-screen flex justify-center items-center mt-4 fa-2x">
            <FontAwesomeIcon
                icon={faSpinner}
                spinPulse
                className="flex justify-center items-center"
            />
        </div>
    ) : (
        <div className="font-notoTC flex flex-col items-center overflow-y-scroll ">
            {data?.pages.map((page) =>
                page.map((reviewCard) => {
                    return (
                        <ReviewCard
                            key={reviewCard.id}
                            name={reviewCard.userName}
                            starNumber={reviewCard.rating}
                            date={reviewCard.date}
                            description={reviewCard.comment}
                        />
                    );
                }),
            )}
            <div ref={ref} className="my-5"></div>
            {hasNextPage ? (
                <div className="flex justify-center items-center mt-4 fa-2x">
                    <FontAwesomeIcon icon={faSpinner} spinPulse />
                </div>
            ) : (
                "No more reviews to show"
            )}
        </div>
    );
};
ReviewCardList.propTypes = {
    reviewIdList: PropTypes.arrayOf(PropTypes.string).isRequired,
    merchantId: PropTypes.string.isRequired,
};

export default ReviewCardList;
