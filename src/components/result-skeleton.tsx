"use client";

export function ResultSkeleton() {
  return (
    <div className="space-y-8 animate-fade-up">
      {["intent", "keywords", "ideas", "outline", "meta"].map((key) => (
        <div key={key} className="bg-surface rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="skeleton-block h-6 w-40 mb-6" />
          {key === "keywords" ? (
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="skeleton-block h-8 rounded-full"
                  style={{ width: `${80 + Math.random() * 60}px` }}
                />
              ))}
            </div>
          ) : key === "outline" ? (
            <div className="space-y-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div
                    className="skeleton-block h-5 rounded"
                    style={{ width: `${50 + Math.random() * 40}%` }}
                  />
                  {i % 2 === 0 && (
                    <div className="ml-6 space-y-1.5">
                      {Array.from({ length: 2 }).map((__, j) => (
                        <div
                          key={j}
                          className="skeleton-block h-4 rounded"
                          style={{ width: `${40 + Math.random() * 35}%` }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="skeleton-block h-4 rounded"
                  style={{ width: `${70 + Math.random() * 25}%` }}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
