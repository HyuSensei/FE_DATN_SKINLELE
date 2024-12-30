import React from "react";
import { IoClose } from "react-icons/io5";

const PreviewUpload = ({ files, onRemove }) => {
  const renderPreview = (file) => {
    switch (file.type) {
      case "image":
        return (
          <img
            src={file.url}
            alt={file.name}
            className="w-20 h-20 rounded-lg object-cover"
          />
        );
      case "video":
        return (
          <video src={file.url} className="w-20 h-20 rounded-lg object-cover" />
        );
      case "audio":
        return (
          <div className="w-48 h-20 rounded-lg bg-white shadow-sm border flex items-center justify-center p-3">
            <audio src={file.url} controls className="w-full" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex overflow-x-auto gap-3 max-w-full scrollbar-hide pt-2">
      {files.map((file) => (
        <div key={file.uid} className="relative flex-shrink-0 group">
          {renderPreview(file)}
          <button
            onClick={() => onRemove(file.uid)}
            className="absolute -top-2 -right-1 bg-gray-300/80 text-white rounded-full p-1 
              hover:bg-gray-400/90 transition-all duration-200 backdrop-blur-sm
              opacity-0 group-hover:opacity-100"
          >
            <IoClose size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default PreviewUpload;
