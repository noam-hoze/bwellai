
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface ComingSoonItem {
  icon: string;
  title: string;
  description: string;
  bgColor: string;
}

interface ComingSoonSectionProps {
  items: ComingSoonItem[];
}

const ComingSoonSection = ({ items }: ComingSoonSectionProps) => {
  return (
    <Card className="bg-white border border-gray-200">
      <CardContent className="p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">🚀 Coming Soon</h2>
        <p className="text-center text-gray-600 mb-8">Exciting new scan types currently in development</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item, index) => (
            <div key={index} className={`${item.bgColor} p-4 rounded-lg border border-gray-200 text-center transition-all duration-300 hover:shadow-md`}>
              <div className="text-3xl mb-2">{item.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-1 text-sm">{item.title}</h3>
              <p className="text-gray-700 text-xs">{item.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ComingSoonSection;
