import { ShenaiSDKProvider } from "./ShenaiContext";
import { ShenaiSDKView } from "./ShenaiSDKView";

function ShenaiApp() {
  return (
    <ShenaiSDKProvider>
      <ShenaiSDKView />
    </ShenaiSDKProvider>
  );
}

export default ShenaiApp;
