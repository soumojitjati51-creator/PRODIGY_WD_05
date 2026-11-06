const WeatherSkeleton = () => {
    return (
        <div className="mt-10 animate-pulse space-y-8">

            {/* Current Weather Skeleton */}
            <div className="rounded-3xl border border-white/10 bg-slate-800 p-8">
                <div className="h-5 w-40 rounded bg-slate-700" />

                <div className="mt-8 h-16 w-36 rounded-xl bg-slate-700" />

                <div className="mt-4 h-5 w-32 rounded bg-slate-700" />

                <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="h-20 rounded-2xl bg-slate-700" />
                    <div className="h-20 rounded-2xl bg-slate-700" />
                </div>
            </div>

            {/* Hourly Forecast Skeleton */}
            <div className="rounded-3xl border border-white/10 bg-slate-800 p-6">
                <div className="h-6 w-40 rounded bg-slate-700" />

                <div className="mt-6 flex gap-4 overflow-hidden">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div
                            key={index}
                            className="h-32 min-w-24 rounded-2xl bg-slate-700"
                        />
                    ))}
                </div>
            </div>

            {/* Daily Forecast Skeleton */}
            <div className="rounded-3xl border border-white/10 bg-slate-800 p-6">
                <div className="h-6 w-40 rounded bg-slate-700" />

                <div className="mt-6 space-y-3">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="h-16 rounded-2xl bg-slate-700"
                        />
                    ))}
                </div>
            </div>

        </div>
    );
};

export default WeatherSkeleton;