export const LoadingMessage = () => {
  return (
    <div className="space-y-6">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className={`flex items-start gap-3 animate-pulse ${
            index % 2 === 0 ? "" : "flex-row-reverse"
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-gray-200"></div>
          <div
            className={`flex flex-col gap-2 max-w-[80%] ${
              index % 2 === 0 ? "" : "items-end"
            }`}
          >
            <div
              className={`${
                index % 2 === 0 ? "w-48" : "w-60"
              } h-4 rounded-full bg-gray-200`}
            ></div>
            <div
              className={`${
                index % 2 === 0 ? "w-32" : "w-40"
              } h-3 rounded-full bg-gray-200`}
            ></div>
            <div className="w-16 h-2 rounded-full bg-gray-200"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const LoadingConversation = () => {
  return (
    <div className="space-y-4">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="p-4 border rounded-lg hover:bg-gray-50 animate-pulse"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gray-200"></div>
              <div className="space-y-2">
                <div className="w-32 h-4 rounded-full bg-gray-200"></div>
                <div className="w-24 h-3 rounded-full bg-gray-200"></div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-16 h-4 rounded-full bg-gray-200"></div>
              {index % 2 === 0 && (
                <div className="w-6 h-6 rounded-full bg-blue-200"></div>
              )}
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div
              className={`w-${
                index % 2 === 0 ? "full" : "3/4"
              } h-3 rounded-full bg-gray-200`}
            ></div>
            <div
              className={`w-${
                index % 2 === 0 ? "2/3" : "1/2"
              } h-3 rounded-full bg-gray-200`}
            ></div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="w-24 h-3 rounded-full bg-gray-200"></div>
            <div className="w-8 h-8 rounded-full bg-gray-200"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
