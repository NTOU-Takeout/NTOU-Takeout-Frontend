const ReviewSkeleton = () => {
    // Create mock review cards
    const mockReviews = Array(4).fill(null);
    // Create mock rating bars
    const ratingBars = Array(5).fill(null);

    return (
        <div className="overflow-y-auto font-notoTC fixed top-0 left-0 w-full h-full bg-white/30 backdrop-blur-sm flex flex-col justify-start items-start">
            <div className="w-full mt-8">
                {/* Close button skeleton */}
                <div className="absolute top-4 right-4">
                    <div className="w-8 h-8 bg-gray-200/50 rounded-full animate-pulse" />
                </div>

                {/* Title section */}
                <div className="title flex flex-col items-center">
                    {/* Store name skeleton */}
                    <div className="h-10 bg-gray-200/50 rounded w-48 animate-pulse" />

                    {/* Rating section skeleton */}
                    <div className="flex items-center mt-4">
                        {/* Rating number skeleton */}
                        <div className="h-14 bg-gray-200/50 rounded w-20 animate-pulse" />
                        {/* Star icon skeleton */}
                        <div className="w-10 h-10 bg-gray-200/50 rounded-full ml-2 animate-pulse" />
                    </div>

                    {/* Rating bars skeleton */}
                    <div className="mt-4 text-left w-full max-w-md px-4">
                        {ratingBars.map((_, index) => (
                            <div key={index} className="flex items-center mb-2 animate-pulse">
                                {/* Stars count skeleton */}
                                <div className="w-16 h-5 bg-gray-200/50 rounded mr-2" />
                                {/* Bar skeleton */}
                                <div className="flex-grow h-6 bg-gray-200/50 rounded" />
                                {/* Count skeleton */}
                                <div className="w-12 h-5 bg-gray-200/50 rounded ml-2" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Review cards skeleton */}
                <div className="mt-8 px-4">
                    {mockReviews.map((_, index) => (
                        <div
                            key={index}
                            className="mb-4 p-4 bg-white/30 backdrop-blur-sm rounded-lg border border-gray-200 animate-pulse"
                        >
                            {/* User info skeleton */}
                            <div className="flex items-center mb-3">
                                {/* Avatar skeleton */}
                                <div className="w-10 h-10 bg-gray-200/50 rounded-full" />
                                {/* Username skeleton */}
                                <div className="ml-3 h-5 bg-gray-200/50 rounded w-24" />
                                {/* Rating skeleton */}
                                <div className="ml-auto h-5 bg-gray-200/50 rounded w-20" />
                            </div>

                            {/* Review content skeleton */}
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-200/50 rounded w-full" />
                                <div className="h-4 bg-gray-200/50 rounded w-3/4" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReviewSkeleton;