const MenuHeaderSkeleton = () => {
    return (
        <header className="relative top-0 left-0 w-full menu-header">
            {/* Image skeleton */}
            <div className="relative h-64">
                <div className="absolute inset-0 w-full h-full bg-gray-200/50 animate-pulse" />
            </div>

            {/* Back button skeleton */}
            <div className="pt-1 pb-1 pl-2 pr-2 absolute top-10 left-4 transform -translate-y-1/2 bg-white/60 rounded-full w-8 h-8 animate-pulse" />

            {/* Share button skeleton */}
            <div className="pt-1 pb-1 pl-2 pr-2 absolute top-10 right-4 transform -translate-y-1/2 bg-white/60 rounded-full w-8 h-8 animate-pulse" />

            {/* Store information skeleton */}
            <div className="bg-white/30 backdrop-blur-sm rounded-t-2xl p-4 relative -top-8 left-0 right-0 z-10">
                <div className="flex items-center justify-between">
                    {/* Left side content */}
                    <div className="flex flex-col space-y-2">
                        {/* Store name */}
                        <div className="h-7 bg-gray-200/50 rounded w-40 animate-pulse" />
                        {/* Distance */}
                        <div className="h-4 bg-gray-200/50 rounded w-24 animate-pulse" />
                        {/* Average spend */}
                        <div className="h-4 bg-gray-200/50 rounded w-32 animate-pulse" />
                    </div>

                    {/* Right side content */}
                    <div className="flex items-center mt-10">
                        {/* Rating container */}
                        <div className="flex items-center space-x-2">
                            <div className="h-6 w-24 bg-gray-200/50 rounded animate-pulse" />
                        </div>
                    </div>

                    {/* Info icon skeleton */}
                    <div className="absolute top-4 right-4">
                        <div className="w-6 h-6 bg-gray-200/50 rounded-full animate-pulse" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default MenuHeaderSkeleton;