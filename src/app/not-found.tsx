export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center min-h-[500px]">
      <h2 className="text-lg uppercase">Page Not Found</h2>
      <p>
        Looks like you’ve followed a broken link or entered a URL that doesn’t
        exist on this site.
      </p>
    </div>
  );
}
