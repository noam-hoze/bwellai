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
  fitbit: {
    name: "https://api-media-root.s3.us-east-2.amazonaws.com/static/img/fitbit.png",
    alt: "Fitbit logo",
  },
  oura: {
    name: "https://api-media-root.s3.us-east-2.amazonaws.com/static/img/oura.png",
    alt: "Oura Ring logo",
  },
  flo: {
    name: "https://api.tryterra.co/v2/static/assets/img/app_icons/flo.webp",
    alt: "Flo logo",
  },
  myfitnesspal: {
    name: "/lovable-uploads/b53703fa-3d8b-4f5f-9ff3-a4b1773d5701.png",
    alt: "MyFitnessPal logo",
  },
  strava: {
    name: "https://api.tryterra.co/v2/static/assets/img/app_icons/strava.webp",
    alt: "Strava logo",
  },
  googlefit: {
    name: "https://api.tryterra.co/v2/static/assets/img/app_icons/google.webp",
    alt: "Google Fit logo",
  },
  garmin: {
    name: "https://api-media-root.s3.us-east-2.amazonaws.com/static/img/garmin.png",
    alt: "Garmin logo",
  },
  polar: {
    name: "https://api-media-root.s3.us-east-2.amazonaws.com/static/img/polar.png",
    alt: "Polar logo",
  },
  EATTHISMUCH: {
    name: "https://api.tryterra.co/v2/static/assets/img/app_icons/eatthismuch.webp",
    alt: "Polar logo",
  },
  whoop: {
    name: "https://api-media-root.s3.us-east-2.amazonaws.com/static/img/whoop.png",
    alt: "Polar logo",
  },
  HUAWEI: {
    name: "https://api.tryterra.co/v2/static/assets/img/app_icons/huawei.webp",
    alt: "Polar logo",
  },
  dexcom: {
    name: "https://api.tryterra.co/v2/static/assets/img/app_icons/dexcom.webp",
    alt: "Polar logo",
  },
  // Add more app logos as needed
};

const AppLogo = ({
  app,
  size = 24,
  className = "",
  fallbackIcon: FallbackIcon,
}: AppLogoProps) => {
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
        crossOrigin="anonymous"
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
      className={`w-${size / 4} h-${
        size / 4
      } rounded-full bg-blue-500 flex items-center justify-center text-white font-bold ${className}`}
      style={{ width: size, height: size }}
    >
      {normalizedAppId.charAt(0).toUpperCase()}
    </div>
  );
};

export default AppLogo;
