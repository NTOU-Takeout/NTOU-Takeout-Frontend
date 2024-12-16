const LoginRegisterSkeleton = () => {
    return (
        <div className="min-h-screen bg-white flex justify-center pt-20">
            <div className="flex flex-col font-notoTC w-full max-w-md px-4">
                {/* Status Bar Skeleton */}
                <div className="text-center">
                    {/* Title Skeleton */}
                    <div className="h-8 bg-gray-200/50 rounded w-24 mx-auto mb-6 animate-pulse" />

                    {/* Tab Bar Skeleton */}
                    <div className="border border-neutral-500 rounded-md relative flex items-center w-[70vw] mx-auto h-10">
                        {/* Tab Button Skeletons */}
                        <div className="w-1/2 py-2 flex justify-center">
                            <div className="h-5 bg-gray-200/50 rounded w-16 animate-pulse" />
                        </div>
                        <div className="w-1/2 py-2 flex justify-center">
                            <div className="h-5 bg-gray-200/50 rounded w-16 animate-pulse" />
                        </div>
                    </div>
                </div>

                {/* Form Skeleton */}
                <div className="mt-8 space-y-6 w-[70vw] mx-auto">
                    {/* Input Fields Skeleton */}
                    <div className="space-y-4">
                        {/* Email Field */}
                        <div className="space-y-1">
                            <div className="h-4 bg-gray-200/50 rounded w-20 animate-pulse" />
                            <div className="h-10 bg-gray-200/50 rounded w-full animate-pulse" />
                        </div>

                        {/* Password Field */}
                        <div className="space-y-1">
                            <div className="h-4 bg-gray-200/50 rounded w-20 animate-pulse" />
                            <div className="h-10 bg-gray-200/50 rounded w-full animate-pulse" />
                        </div>

                        {/* Additional Field for Register */}
                        <div className="space-y-1">
                            <div className="h-4 bg-gray-200/50 rounded w-20 animate-pulse" />
                            <div className="h-10 bg-gray-200/50 rounded w-full animate-pulse" />
                        </div>
                    </div>

                    {/* Submit Button Skeleton */}
                    <div className="h-12 bg-gray-200/50 rounded w-full animate-pulse" />

                    {/* Additional Links Skeleton */}
                    <div className="flex justify-center space-x-4 mt-4">
                        <div className="h-4 bg-gray-200/50 rounded w-24 animate-pulse" />
                        <div className="h-4 bg-gray-200/50 rounded w-24 animate-pulse" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginRegisterSkeleton;