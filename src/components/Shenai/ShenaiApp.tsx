// import { ShenaiSDKProvider } from "./ShenaiContext";
import { useEffect, useState } from "react";
import { ShenaiSDKView } from "./ShenaiSDKView";

function ShenaiApp({ setStep, setIsShenaiInitialized }) {
  const [shenAiSDK, setShenAiSDK] = useState(null);

  useEffect(() => {
    return () => {
      if (shenAiSDK) {
        shenAiSDK.deinitialize();
      }
    };
  }, [shenAiSDK]);

  return (
    // <ShenaiSDKProvider>
    // </ShenaiSDKProvider>
    <ShenaiSDKView
      setStep={setStep}
      setShenAiSDK={setShenAiSDK}
      setIsShenaiInitialized={setIsShenaiInitialized}
    />
  );
}

export default ShenaiApp;
