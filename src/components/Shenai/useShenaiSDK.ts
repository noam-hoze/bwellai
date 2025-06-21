import { useRef, useState } from 'react';

export const useShenaiSdk = () => {
  const [shenaiSdk, setShenaiSdk] = useState<any>();
  const sdkRef = useRef<any | null | undefined>(undefined);

  if (sdkRef.current) {
    if (shenaiSdk != sdkRef.current) setShenaiSdk(sdkRef.current);
  } else if (sdkRef.current !== null) {
    sdkRef.current = null;
    if (typeof window !== "undefined") {
      try {
        import("../../../public/shenai-sdk")
          .then((sdk) =>
            sdk.default({
              onRuntimeInitialized: () => {
                console.log("Shen.AI Runtime initialized");
              },
            })
          )
          .then((sdk) => {
            sdkRef.current = sdk;
            setShenaiSdk(sdk);
          });
      } catch (error) {
        console.error("Failed to import Shen.AI SDK:", error);
      }
    }
  }

  return shenaiSdk;
};
