// import { ShenaiSDKProvider } from "./ShenaiContext";
import { ShenaiSDKView } from "./ShenaiSDKView";

function ShenaiApp({ setStep, setIsShenaiInitialized }) {
  return (
    // <ShenaiSDKProvider>
    // </ShenaiSDKProvider>
    <ShenaiSDKView
      setStep={setStep}
      setIsShenaiInitialized={setIsShenaiInitialized}
    />
  );
}

export default ShenaiApp;
