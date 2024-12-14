const MenuSectionSkeleton = () => {
    // Create mock sections with multiple cards each
    const mockSections = Array(3).fill(null);
    const cardsPerSection = Array(4).fill(null);

    return (
        <div className="font-notoTC -top-12 relative min-h-screen flex flex-col items-center justify-center container mx-auto p-4">
            {mockSections.map((_, sectionIndex) => (
                <div key={`section-${sectionIndex}`} className="w-full mb-8">
                    {/* Category name skeleton */}
                    <div className="h-8 bg-gray-200/50 rounded w-40 mb-4 animate-pulse" />

                    {/* Grid of card skeletons */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {cardsPerSection.map((_, cardIndex) => (
                            <div
                                key={`card-${sectionIndex}-${cardIndex}`}
                                className="relative flex rounded-lg p-4 w-full items-start min-h-[142px] bg-white/30 backdrop-blur-sm animate-pulse"
                            >
                                {/* Image skeleton */}
                                <div className="w-20 h-26 rounded-lg flex-shrink-0 bg-gray-200/50" />

                                {/* Content container */}
                                <div className="ml-4 flex min-w-0 flex-col h-full flex-grow">
                                    {/* Title */}
                                    <div className="h-6 bg-gray-200/50 rounded w-3/4 mb-2" />

                                    {/* Description */}
                                    <div className="h-4 bg-gray-200/50 rounded w-1/2 mb-2" />

                                    {/* Price */}
                                    <div className="absolute bottom-[15px] h-6 bg-gray-200/50 rounded w-16" />
                                </div>

                                {/* Action button skeleton */}
                                <div className="absolute bottom-[15px] right-[15px] h-8 w-24 bg-gray-200/50 rounded" />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MenuSectionSkeleton;