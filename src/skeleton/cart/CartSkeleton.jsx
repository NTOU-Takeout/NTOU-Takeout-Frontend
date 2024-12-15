const CartSkeleton = () => {
    // Create mock items for the cart list
    const mockCartItems = Array(3).fill(null);

    return (
        <div className="mt-3 min-h-screen">
            {/* Header Skeleton */}
            <div className="flex-none">
                <div className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/30 backdrop-blur-sm border-b border-gray-200 flex items-center px-4 animate-pulse">
                    {/* Back button skeleton */}
                    <div className="w-8 h-8 bg-gray-200/50 rounded mr-4" />
                    {/* Title skeleton */}
                    <div className="h-6 bg-gray-200/50 rounded w-32" />
                </div>

                {/* Total Spend Section Skeleton */}
                <div className="mt-16 px-4 py-3 bg-white/30 backdrop-blur-sm border-b border-gray-200 animate-pulse">
                    {/* Store name skeleton */}
                    <div className="h-6 bg-gray-200/50 rounded w-40 mb-2" />
                    {/* Total amount skeleton */}
                    <div className="flex justify-between items-center">
                        <div className="h-5 bg-gray-200/50 rounded w-24" />
                        <div className="h-7 bg-gray-200/50 rounded w-32" />
                    </div>
                </div>
            </div>

            {/* Cart Items List Skeleton */}
            <div className="flex-1 overflow-auto pb-[120px] px-4">
                {mockCartItems.map((_, index) => (
                    <div
                        key={index}
                        className="relative flex rounded-lg p-4 w-full items-start min-h-[142px] bg-white/30 backdrop-blur-sm mb-4 animate-pulse"
                    >
                        {/* Image skeleton */}
                        <div className="w-20 h-26 rounded-lg flex-shrink-0 bg-gray-200/50" />

                        {/* Content container */}
                        <div className="ml-4 flex min-w-0 flex-col h-full flex-grow">
                            {/* Title */}
                            <div className="h-6 bg-gray-200/50 rounded w-3/4 mb-2" />
                            {/* Options */}
                            <div className="h-4 bg-gray-200/50 rounded w-1/2 mb-2" />
                            {/* Price */}
                            <div className="absolute bottom-[15px] h-6 bg-gray-200/50 rounded w-16" />
                        </div>

                        {/* Quantity control skeleton */}
                        <div className="absolute bottom-[15px] right-[15px] h-8 w-24 bg-gray-200/50 rounded" />
                    </div>
                ))}
            </div>

            {/* Order Section Skeleton */}
            <div className="fixed bottom-0 left-0 right-0 bg-white/30 backdrop-blur-sm border-t border-gray-200 p-4 animate-pulse">
                {/* Delivery time skeleton */}
                <div className="flex justify-between items-center mb-3">
                    <div className="h-5 bg-gray-200/50 rounded w-32" />
                    <div className="h-5 bg-gray-200/50 rounded w-24" />
                </div>

                {/* Total and button skeleton */}
                <div className="flex justify-between items-center">
                    <div className="h-6 bg-gray-200/50 rounded w-28" />
                    <div className="h-10 bg-gray-200/50 rounded w-32" />
                </div>
            </div>
        </div>
    );
};

export default CartSkeleton;