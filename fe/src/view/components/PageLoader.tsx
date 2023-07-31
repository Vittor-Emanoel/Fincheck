import { Spinner } from "./Spinner";

export function PageLoader() {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-0 grid place-items-center">
      <Spinner />
    </div>
  );
}
