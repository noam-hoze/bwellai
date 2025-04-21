
import React from "react";

const PrivacyStep = () => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Data Stays Secure</h2>
      <p className="text-gray-600 text-center mb-6">Your privacy is our priority. We use end-to-end encryption and don't share your data with third parties.</p>
      
      <div className="w-full mb-6 space-y-4">
        <div className="grid grid-cols-1 gap-0">
          <div className="bg-green-50 rounded-lg p-4 flex items-center">
            <img src="/lovable-uploads/0690f910-2ca1-41d4-bd77-a4f0d70ebad7.png" alt="End-to-End Encryption" className="w-full rounded-lg" loading="lazy" />
          </div>
          
          <div className="bg-green-50 rounded-lg p-4 flex items-center">
            <img src="/lovable-uploads/db252eb4-83be-4c44-81b4-3021a1b06524.png" alt="Fully Anonymized Data" className="w-full rounded-lg" loading="lazy" />
          </div>
          
          <div className="bg-green-50 rounded-lg p-4 flex items-center">
            <img src="/lovable-uploads/254620df-878a-4889-97ef-db25b383c74f.png" alt="You Control Your Data" className="w-full rounded-lg" loading="lazy" />
          </div>
        </div>
      </div>
      
      <div className="flex items-center">
        <input id="privacy-consent" name="privacy-consent" type="checkbox" className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
        <label htmlFor="privacy-consent" className="ml-2 block text-sm text-gray-600">
          I understand and agree to BwellAI's <a href="#" className="text-green-600 hover:underline">Privacy Policy</a>
        </label>
      </div>
    </div>
  );
};

export default PrivacyStep;
