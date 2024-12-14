
const CartItemCardSkeleton = () => {
    return (
        <div className="relative flex rounded-lg p-4 w-full items-start min-h-[142px] backdrop-blur-sm bg-white/30 animate-pulse">
            {/* Image skeleton */}
            <div className="w-20 h-26 rounded-lg flex-shrink-0 bg-gray-200/50" />

            {/* Content container */}
            <div className="ml-4 flex min-w-0 flex-col h-full flex-grow">
                {/* Title skeleton */}
                <div className="h-6 bg-gray-200/50 rounded w-3/4 mb-2" />

                {/* Attributes skeleton */}
                <div className="h-4 bg-gray-200/50 rounded w-1/2 mb-2" />

                {/* Note skeleton */}
                <div className="h-4 bg-gray-200/50 rounded w-2/3 mb-2" />

                {/* Price skeleton */}
                <div className="absolute bottom-[15px] h-6 bg-gray-200/50 rounded w-16" />
            </div>

            {/* Quantity control skeleton */}
            <div className="absolute bottom-[15px] right-[15px] flex items-center h-8 w-24 bg-gray-200/50 rounded-md" />
        </div>
    );
};

export default CartItemCardSkeleton;