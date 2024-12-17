const MerchantSkeleton = () => {
    return (
        <div className="relative w-[90vw] h-[241px] m-2 bg-white/30 backdrop-blur-sm border-2 
                    border-gray-300 rounded-2xl overflow-hidden animate-pulse">
            {/* Image skeleton */}
            <div className="w-full h-[65%] bg-gray-200/50" />

            {/* Info section skeleton */}
            <div className="box-border absolute w-[90vw] h-[87px] left-0 top-[154px] border-t-2 border-gray-300">
                {/* Store name skeleton */}
                <div className="absolute h-[22px] left-[12px] top-[9px]">
                    <div className="h-5 bg-gray-200/50 rounded w-40" />
                </div>

                {/* Distance skeleton */}
                <div className="absolute h-[12px] left-[12px] top-[32px]">
                    <div className="h-3 bg-gray-200/50 rounded w-32" />
                </div>

                {/* Average spend skeleton */}
                <div className="absolute h-[12px] left-[12px] top-[57px]">
                    <div className="h-3 bg-gray-200/50 rounded w-36" />
                </div>

                {/* Rating skeleton */}
                <div className="absolute w-[75px] h-[20px] right-[3px] bottom-[11px] flex items-center">
                    <div className="flex items-center space-x-1">
                        {/* Star icon skeleton */}
                        <div className="w-4 h-4 bg-gray-200/50 rounded-full" />
                        {/* Rating text skeleton */}
                        <div className="h-4 bg-gray-200/50 rounded w-16" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MerchantSkeleton;