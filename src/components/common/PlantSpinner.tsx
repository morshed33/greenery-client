import React from "react";

const PlantSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative w-48 h-48">
        {" "}
        {/* Increased the overall size */}
        {/* Sun-like center */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-20 h-20 rounded-full bg-yellow-300 animate-bounce"></div>{" "}
          {/* Increased the size */}
        </div>
        {/* Rotating Leaf 1 */}
        <div className="absolute inset-0 flex justify-center items-center transform animate-ping">
          <svg
            className="w-16 h-16 text-green-500 transform rotate-45"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 2C8 2 5 9 5 12s3 10 7 10 7-8 7-10S16 2 12 2z"
            />
          </svg>
        </div>
        {/* Rotating Leaf 2 */}
        <div className="absolute inset-0 flex justify-center items-center transform animate-ping">
          <svg
            className="w-14 h-14 text-green-600 transform -rotate-45"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 2C9.5 2 6 8 6 12s3.5 10 6 10 6-8 6-10S14.5 2 12 2z"
            />
          </svg>
        </div>
        {/* Rotating Leaf 3 */}
        <div className="absolute inset-0 flex justify-center items-center transform  animate-ping ">
          <svg
            className="w-12 h-12 text-green-400 transform rotate-90"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 2C9.58 2 8 9 8 12s2.58 10 5 10 5-8 5-10S14.42 2 12 2z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PlantSpinner;
