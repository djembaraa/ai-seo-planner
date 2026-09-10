"use client";

const SKELETON_WIDTHS = [
  ["85%", "60%", "75%"],
  ["70%", "55%", "80%"],
  ["90%", "65%", "72%"],
  ["60%", "78%", "68%"],
  ["75%", "50%", "85%"],
];

const TAG_WIDTHS = [95, 110, 80, 120, 88, 105, 92, 115, 78, 130];

export function ResultSkeleton() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16 space-y-8 animate-fade-up">
      {["intent", "keywords", "ideas", "outline", "meta"].map(
        (key, sectionIdx) => (
          <div
            key={key}
            className="bg-surface rounded-2xl p-6 sm:p-8 shadow-sm"
          >
            <div className="skeleton-block h-6 w-40 mb-6" />
            {key === "keywords" ? (
              <div className="flex flex-wrap gap-2">
                {TAG_WIDTHS.map((w, i) => (
                  <div
                    key={i}
                    className="skeleton-block h-8 rounded-full"
                    style={{ width: `${w}px` }}
                  />
                ))}
              </div>
            ) : key === "outline" ? (
              <div className="space-y-4">
                {SKELETON_WIDTHS[sectionIdx % SKELETON_WIDTHS.length].map(
                  (width, i) => (
                    <div key={i} className="space-y-2">
                      <div
                        className="skeleton-block h-5 rounded"
                        style={{ width }}
                      />
                      {i % 2 === 0 && (
                        <div className="ml-6 space-y-1.5">
                          <div className="skeleton-block h-4 rounded w-2/5" />
                          <div className="skeleton-block h-4 rounded w-3/5" />
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {SKELETON_WIDTHS[sectionIdx % SKELETON_WIDTHS.length].map(
                  (width, i) => (
                    <div
                      key={i}
                      className="skeleton-block h-4 rounded"
                      style={{ width }}
                    />
                  )
                )}
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
}
