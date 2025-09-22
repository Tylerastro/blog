export default function ScrollProgressBar() {
  return (
    <div
      className="fixed top-0 left-0 w-full h-1 bg-gray-200  z-50"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div className="h-full bg-primary progress-bar-animated" />
    </div>
  );
}
