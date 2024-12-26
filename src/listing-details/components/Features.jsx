import React from "react";
import { FaCheck } from "react-icons/fa";

function Features({ features }) {
  // Ensure features is not undefined or null
  const featuresData = features || {};

  return (
    <div className="p-10 my-7 rounded-xl border shadow-md">
      <h2 className="font-medium text-2xl">Features</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 mt-5 lg:grid-cols-4 gap-5">
        {Object.entries(featuresData).map(([feature, value]) => (
          <div key={feature}>
            <div className="flex gap-2 items-center">
              <FaCheck className="text-lg p-1 rounded-full bg-blue-100 text-primary" />
              <h2>{feature}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;
