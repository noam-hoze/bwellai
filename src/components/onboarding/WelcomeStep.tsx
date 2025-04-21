
import React from "react";

const WelcomeStep = () => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Complete Health Companion</h2>
      <p className="text-gray-600 text-center mb-6">Track your health journey and get personalized insights to live better.</p>
      
      <div className="w-full space-y-6 mb-6">
        <img src="/lovable-uploads/5f4b65d2-15ca-47c6-a1c3-876102135de4.png" alt="Health features illustration" className="w-full rounded-xl shadow-sm" />
      </div>
    </div>
  );
};

export default WelcomeStep;
