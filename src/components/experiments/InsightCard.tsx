import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export const InsightCard = ({
  label,
  content,
  icon,
  borderColor,
}: {
  label: string;
  content: string;
  icon: React.ReactNode;
  borderColor: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="rounded-lg border-l-4 bg-white p-4 text-sm flex-1"
      style={{ borderLeftColor: borderColor, 
        maxHeight: isOpen ? undefined : '50px'
       }}
      
    >
      <button
        className="flex items-center justify-between w-full font-semibold text-left text-gray-800"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="flex items-center">
          <span className="w-4 h-4 mr-2 text-gray-600">{icon}</span>
          {label}
        </span>
        {isOpen ? (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-500" />
        )}
      </button>

      {isOpen && (
        <div
          className="mt-2 text-gray-700 leading-snug"
          dangerouslySetInnerHTML={{
            __html: content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
          }}
        />
      )}
    </div>
  );
};
