const OptionCardSkeleton = () => {
    // Create mock options array
    const mockOptions = Array(4).fill(null);

    return (
        <div className="border rounded-lg p-4 max-w-sm mx-auto mb-8 mt-8">
            {/* Title and Required Tag */}
            <div className="flex items-center space-x-2 mb-2">
                <div className="h-6 bg-gray-200/50 rounded w-32 animate-pulse" />
                <div className="h-4 bg-gray-200/50 rounded w-8 animate-pulse" />
            </div>

            {/* Description */}
            <div className="h-4 bg-gray-200/50 rounded w-48 mb-4 animate-pulse" />

            {/* Options */}
            <div className="mt-4 space-y-4">
                {mockOptions.map((_, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between bg-white/30 backdrop-blur-sm p-2 rounded animate-pulse"
                    >
                        {/* Checkbox and Option Name */}
                        <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 bg-gray-200/50 rounded" />
                            <div className="h-5 bg-gray-200/50 rounded w-24" />
                        </div>

                        {/* Price */}
                        <div className="h-5 bg-gray-200/50 rounded w-16" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OptionCardSkeleton;