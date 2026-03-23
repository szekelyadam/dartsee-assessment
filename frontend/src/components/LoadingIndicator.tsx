export const LoadingIndicator = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative h-12 w-12">
        <div className="border-primary-container/20 absolute inset-0 rounded-full border-4"></div>
        <div className="border-primary spinner-ring absolute inset-0 animate-spin rounded-full border-4"></div>
      </div>
      <p className="text-primary text-sm font-semibold tracking-wide uppercase">
        Loading...
      </p>
    </div>
  );
};
