// import { ShenaiSDKProvider } from "./ShenaiContext";
import { ShenaiSDKView } from "./ShenaiSDKView";

function ShenaiApp({ setStep }) {
  return (
    // <ShenaiSDKProvider>
    // </ShenaiSDKProvider>
    <ShenaiSDKView setStep={setStep} />
  );
}

export default ShenaiApp;
