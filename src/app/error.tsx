"use client"; // Error components must be Client Components

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col justify-center items-center min-h-[500px]">
      <h2 className="font-bold text-3xl mb-2">PAGE NOT FOUND</h2>
      <p>
        Looks like you’ve followed a broken link or entered a URL that doesn’t
        exist on this site.
      </p>
      <div className="flex gap-4 mt-4">
        <button className="btn btn-primary btn-sm" onClick={() => reset()}>
          Click here to retry
        </button>
        <button className="btn btn-primary btn-sm">Go to Home Page</button>
      </div>
    </div>
  );
}
