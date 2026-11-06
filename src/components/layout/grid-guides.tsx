/** Faint column guides behind the page: the studio's working grid, left visible. */
export function GridGuides() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <div className="px-gutter mx-auto grid h-full max-w-[1600px] grid-cols-4 lg:grid-cols-12">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={
              "h-full border-l border-white/[0.035] last:border-r " + (i >= 4 ? "hidden lg:block" : "")
            }
          />
        ))}
      </div>
    </div>
  );
}
