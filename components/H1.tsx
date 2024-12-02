interface HackyHRProps {
  className?: string;
}

export function H1({ className = "" }: HackyHRProps) {
  return (
    <div
      className={`my-16 flex items-center justify-center ${className}`}
      role="separator"
      aria-orientation="horizontal"
    >
      <div className="relative w-full max-w-3xl">
        <div className="relative flex justify-center">
          <span className="bg-background px-2 text-sm text-muted-foreground"></span>
        </div>
        <div
          className="absolute inset-0 flex items-center justify-around pointer-events-none"
          aria-hidden="true"
        >
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-primary rounded-full  animate-pulse"
              style={{ animationDelay: `${i * 0.15}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
