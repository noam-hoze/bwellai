
import React from "react";

const ProfileStep = () => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Tell Us About Yourself</h2>
      <p className="text-gray-600 text-center mb-6">This helps us provide accurate health insights tailored just for you.</p>
      
      <div className="w-full space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
          <div className="relative">
            <input type="number" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500" placeholder="Your age" />
          </div>
          <p className="mt-1 text-xs text-gray-500">For age-appropriate recommendations</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <p className="mt-1 text-xs text-gray-500">For more relevant health information</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
          <div className="relative">
            <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500" placeholder="Your height (cm or ft/in)" />
          </div>
          <p className="mt-1 text-xs text-gray-500">For accurate physical metrics</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
          <div className="relative">
            <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500" placeholder="Your weight (kg or lbs)" />
          </div>
          <p className="mt-1 text-xs text-gray-500">For nutrition and activity recommendations</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileStep;
