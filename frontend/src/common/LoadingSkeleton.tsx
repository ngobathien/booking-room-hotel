const LoadingSkeleton = () => {
  return (
    <div className="h-16 flex items-center justify-end gap-4 px-6">
      <div className="w-24 h-8 bg-gray-200 animate-pulse rounded" />
      <div className="w-24 h-8 bg-gray-200 animate-pulse rounded" />
    </div>
  );
};

export default LoadingSkeleton;
