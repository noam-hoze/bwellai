import React, { useState } from 'react';
import { Copy, X } from 'lucide-react';

type ShareModalProps = {
    url: string;
    onClose: () => void;
};

const ShareModal: React.FC<ShareModalProps> = ({ url, onClose }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Copy failed:", err);
        }
    };


    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                >
                    <X />
                </button>
                <h2 className="text-lg font-semibold mb-3">Share Report</h2>
                <p className="text-sm mb-2 text-gray-600">Copy the link below to share the report:</p>
                <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 mb-4">
                    <input
                        type="text"
                        readOnly
                        value={url}
                        className="flex-1 bg-transparent outline-none text-sm text-gray-800"
                    />
                    <div className="relative">
                        <button
                            onClick={handleCopy}
                            className="ml-3 text-blue-600 hover:text-blue-800"
                            title="Copy to clipboard"
                        >
                            <Copy />
                        </button>
                    </div>
                </div>
                {copied && (
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded shadow transition-opacity duration-300 opacity-100">
                        Copied to clipboard
                    </div>
                )}
                <button
                    onClick={onClose}
                    className="w-full mt-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 text-sm"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ShareModal;
