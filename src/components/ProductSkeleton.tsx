export default function ProductSkeleton() {
    return (
      <div className="flex flex-col justify-between h-full border p-4 rounded-lg shadow-md animate-pulse">
        <div className="w-full h-52 bg-gray-300 rounded-md mb-4" />
        <div className="w-3/4 h-5 bg-gray-300 rounded-md mb-2" />
        <div className="w-full h-4 bg-gray-300 rounded-md mb-2" />
        <div className="w-1/2 h-4 bg-gray-300 rounded-md mb-2" />
        <div className="w-1/3 h-5 bg-gray-300 rounded-md mt-2" />
        <div className="w-full h-10 bg-gray-400 rounded-md mt-2" />
      </div>
    );
}