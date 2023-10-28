import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  );
};

export default Loading;
