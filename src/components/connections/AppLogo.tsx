
import React from "react";
import { LucideIcon } from "lucide-react";

type LogoType = {
  name: string;
  alt: string;
  className?: string;
};

interface AppLogoProps {
  app: string;
  size?: number;
  className?: string;
  fallbackIcon?: LucideIcon;
}

// Map of app names to their logo information
const appLogos: Record<string, LogoType> = {
  "fitbit": { 
    name: "/lovable-uploads/bccc1129-92c8-4d4d-b5ea-fec1074a9517.png", 
    alt: "Fitbit logo" 
  },
  "oura": { 
    name: "/lovable-uploads/8f9efb4e-0c52-4936-9179-30fb7f67d272.png", 
    alt: "Oura Ring logo" 
  },
  "flo": { 
    name: "/lovable-uploads/7a148e61-e398-4dad-a6d1-d0065cc3fc1c.png", 
    alt: "Flo logo" 
  },
  "myfitnesspal": { 
    name: "/lovable-uploads/b53703fa-3d8b-4f5f-9ff3-a4b1773d5701.png", 
    alt: "MyFitnessPal logo" 
  },
  "strava": { 
    name: "/lovable-uploads/cb2ddbda-4493-49aa-9cd5-cb3e497afeed.png", 
    alt: "Strava logo" 
  },
  "googlefit": { 
    name: "/lovable-uploads/2e0ddf59-b5a8-4443-bc93-5604ed3f05af.png", 
    alt: "Google Fit logo" 
  },
  "garmin": { 
    name: "/lovable-uploads/0a664aae-aa32-4bcb-8c1c-6787c2fb68c1.png", 
    alt: "Garmin logo" 
  },
  // Add more app logos as needed
};

const AppLogo = ({ app, size = 24, className = "", fallbackIcon: FallbackIcon }: AppLogoProps) => {
  // Normalize app id to lowercase and remove any non-alphanumeric characters
  const normalizedAppId = app.toLowerCase().replace(/[^a-z0-9]/g, "");
  
  // Check if we have a logo for this app
  if (appLogos[normalizedAppId]) {
    const { name, alt } = appLogos[normalizedAppId];
    return (
      <img 
        src={name} 
        alt={alt} 
        width={size} 
        height={size} 
        className={`object-contain ${className}`} 
      />
    );
  }
  
  // If no logo is found and we have a fallback icon, use it
  if (FallbackIcon) {
    return <FallbackIcon size={size} className={className} />;
  }
  
  // Default fallback - a colored circle with the first letter
  return (
    <div 
      className={`w-${size/4} h-${size/4} rounded-full bg-blue-500 flex items-center justify-center text-white font-bold ${className}`}
      style={{ width: size, height: size }}
    >
      {normalizedAppId.charAt(0).toUpperCase()}
    </div>
  );
};

export default AppLogo;
