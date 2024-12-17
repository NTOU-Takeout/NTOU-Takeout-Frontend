const ViewCartButtonSkeleton = () => {
    return (
        <div className="fixed bottom-4 right-6 flex z-10">
            <div className="relative">
                {/* Notification dot skeleton */}
                <div className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gray-200/50 rounded-full animate-pulse" />

                {/* Button skeleton */}
                <div className="bg-white/30 backdrop-blur-sm border border-gray-300 rounded-lg px-4 py-2 inline-flex items-center space-x-2 shadow-lg animate-pulse">
                    {/* Cart icon placeholder */}
                    <div className="w-6 h-6 bg-gray-200/50 rounded" />

                    {/* Price placeholder */}
                    <div className="w-16 h-6 bg-gray-200/50 rounded" />
                </div>
            </div>
        </div>
    );
};

export default ViewCartButtonSkeleton;