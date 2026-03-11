const RoomPagination = () => {
  return (
    <div className="mt-12 flex items-center justify-center gap-2">
      {[1, 2, 3].map((page) => (
        <button
          key={page}
          className="h-10 w-10 rounded-lg border border-slate-200"
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default RoomPagination;
