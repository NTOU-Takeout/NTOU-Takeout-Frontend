import { useEffect, useRef } from "react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import Merchant from "./Merchant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import getStoreClient from "../api/store/getStoreClient";
import useMerchantStore from "../stores/merchantStore";
import useSelectionStore from "../stores/selectionStore";

function MerchantList() {
    const { addMerchants } = useMerchantStore();
    const merchantIdListRef = useRef([]);
    const LOAD_SIZE = 4;

    const filter = useSelectionStore((state) => state.selectedFilter);
    const sorter = useSelectionStore((state) => state.selectedSorter);
    const keyword = useSelectionStore((state) => state.selectedKeyword);
    const isSubmitted = useSelectionStore((state) => state.isSubmitted);
    const setIsSubmitted = useSelectionStore((state) => state.setIsSubmitted);

    const { ref, inView } = useInView({
        rootMargin: "100px",
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
        queryKey: ["defaultMerchantIdList"], // 添加依賴項
        queryFn: async () => {
            const merchants = await getStoreClient.getStoreIdList({
                filter,
                sorter,
                keyword,
            });
            console.log(filter, sorter, keyword, isSubmitted);
            setIsSubmitted(false);
            console.log(merchants);
            console.log(isMerchantIdListLoading, isMerchantsLoading);
            return merchants;
        },
        enabled: isSubmitted,
    });

    useEffect(() => {
        merchantIdListRef.current = merchantIdList;
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
        queryKey: ["merchants", merchantIdList],
        queryFn: async ({ pageParam }) => {
            const start = pageParam * LOAD_SIZE;
            const end = start + LOAD_SIZE;
            const idList = merchantIdListRef.current.slice(start, end);

            if (idList.length === 0) {
                return [];
            }
            const merchants = await getStoreClient.getMerchantsByIdList(idList);
            addMerchants(merchants);
            return merchants;
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = allPages.length;
            const totalMerchants = merchantIdList?.length || 0;

            if (nextPage * LOAD_SIZE < totalMerchants) {
                return nextPage;
            } else {
                return undefined; // No more pages
            }
        },
    });
    if (isMerchantIdListError || isMerchantsError) {
        return (
            <div className="text-center">
                {isMerchantIdListError && merchantIdListError.message}
                {isMerchantsError && merchantsError.message}
            </div>
        );
    }

    return isMerchantIdListLoading || isMerchantsLoading ? (
        <div className="flex justify-center items-center mt-4 fa-2x">
            <FontAwesomeIcon icon={faSpinner} spinPulse />
        </div>
    ) : (
        <div className="-z-40-50 min-h-screen flex flex-col items-center space-y-6 py-5">
            {data?.pages.map((page) =>
                page.map((merchant) => {
                    return (
                        <Merchant
                            key={merchant.id}
                            id={merchant.id}
                            name={merchant.name}
                            averageSpend={merchant.averageSpend}
                            rating={merchant.rating}
                            reviews={merchant.reviewIdList}
                            picture={merchant.picture}
                            className="w-[300px] h-[200px] bg-white border border-gray-300 rounded-xl shadow-lg"
                        />
                    );
                }),
            )}
            <div ref={ref}>
                {hasNextPage ? (
                    <div className="flex justify-center items-center mt-4 fa-2x">
                        <FontAwesomeIcon icon={faSpinner} spinPulse />
                    </div>
                ) : (
                    "No more merchants to show"
                )}
            </div>
        </div>
    );
}

export default MerchantList;
