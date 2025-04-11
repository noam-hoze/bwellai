// import { useRealtimeHeartRate } from "./ShenaiContext";
import { useEffect, useRef, useState } from "react";
import style from "./shenCanvas.module.css";
import { useShenaiSdk } from "./useShenaiSDK";
import { getEnumName } from "@/utils/shenaiHelper";
import { Button } from "../ui/button";
import { useFaceScan } from "@/contexts/FaceScanContext";

export const ShenaiSDKView = ({ setStep }) => {
  // const hr = useRealtimeHeartRate();
  const shenaiSDK = useShenaiSdk();

  const { setFaceScanData } = useFaceScan();

  const [initializationSettings, setInitializationSettings] = useState<any>();
  const [cameraScanningFinished, setCameraScanningFinished] = useState(false); // false
  const [pendingInitialization, setPendingInitialization] = useState(false);
  const [customConfig, setCustomConfig] = useState();
  const canvasTopRef = useRef<HTMLDivElement>(null);

  const [sdkState, setSdkState] = useState<any>();

  const [colorTheme, setColorTheme] = useState({
    themeColor: "#56A0A0",
    textColor: "#000000",
    backgroundColor: "#E6E6E6",
    tileColor: "#FFFFFF",
  });

  const initializeSdk = (
    apiKey: string,
    settings: any,
    onSuccess?: () => void
  ) => {
    if (!shenaiSDK) return;
    setPendingInitialization(true);
    shenaiSDK.initialize(apiKey, "", settings, (res) => {
      if (res === shenaiSDK.InitializationResult.OK) {
        console.log("Shen.AI License result: ", res);
        shenaiSDK.attachToCanvas("#mxcanvas");
        onSuccess?.();
        // scrollToCanvas();
      } else {
        message.error(
          "License initialization problem: " +
            getEnumName(shenaiSDK.InitializationResult, res, "UNKNOWN")
        );
      }
      setPendingInitialization(false);
    });
  };

  const initialize = () => {
    // if (isAuthenticated) {
    initializeSdk(
      "54b5be95e558424984258cac146a1fbf",
      initializationSettings ?? {},
      () => {
        if (!shenaiSDK) return;
        shenaiSDK.setCustomColorTheme(colorTheme);
        if (
          initializationSettings?.measurementPreset ==
            shenaiSDK.MeasurementPreset.CUSTOM &&
          customConfig
        ) {
          shenaiSDK.setCustomMeasurementConfig(customConfig);
        }
      }
    );
    // }
  };

  useEffect(() => {
    if (!shenaiSDK) return;
    const settings: any = {
      precisionMode: shenaiSDK.PrecisionMode.STRICT,
      operatingMode: shenaiSDK.OperatingMode.POSITIONING,
      measurementPreset: shenaiSDK.MeasurementPreset.ONE_MINUTE_BETA_METRICS,
      cameraMode: shenaiSDK.CameraMode.FACING_USER,
      onboardingMode: shenaiSDK.OnboardingMode.SHOW_ONCE,
      showUserInterface: true,
      showFacePositioningOverlay: true,
      showVisualWarnings: true,
      enableCameraSwap: true,
      showFaceMask: true,
      showBloodFlow: true,
      hideShenaiLogo: true,
      enableStartAfterSuccess: true,
      enableSummaryScreen: false,
      enableHealthRisks: true,
      showOutOfRangeResultIndicators: true,
      showTrialMetricLabels: true,
      enableFullFrameProcessing: false,
    };
    setInitializationSettings(settings);
  }, [shenaiSDK]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (shenaiSDK) {
        // setSdkVersion(shenaiSDK.getVersion());

        const isInitialized = shenaiSDK.isInitialized();

        if (!isInitialized) {
          // setSdkState(undefined);
          return;
        }

        const newState = {
          isInitialized,

          operatingMode: shenaiSDK.getOperatingMode(),
          precisionMode: shenaiSDK.getPrecisionMode(),
          measurementPreset: shenaiSDK.getMeasurementPreset(),
          cameraMode: shenaiSDK.getCameraMode(),
          faceState: shenaiSDK.getFaceState(),
          screen: shenaiSDK.getScreen(),

          showUserInterface: shenaiSDK.getShowUserInterface(),
          showFacePositioningOverlay: shenaiSDK.getShowFacePositioningOverlay(),
          showVisualWarnings: shenaiSDK.getShowVisualWarnings(),
          enableCameraSwap: shenaiSDK.getEnableCameraSwap(),
          showFaceMask: shenaiSDK.getShowFaceMask(),
          showBloodFlow: shenaiSDK.getShowBloodFlow(),
          hideShenaiLogo: shenaiSDK.getHideShenaiLogo(),
          enableStartAfterSuccess: shenaiSDK.getEnableStartAfterSuccess(),
          showOutOfRangeResultIndicators:
            shenaiSDK.getShowOutOfRangeResultIndicators(),
          showTrialMetricLabels: shenaiSDK.getShowTrialMetricLabels(),

          bbox: shenaiSDK.getNormalizedFaceBbox(),
          measurementState: shenaiSDK.getMeasurementState(),
          progress: shenaiSDK.getMeasurementProgressPercentage(),

          hr10s: shenaiSDK.getHeartRate10s(),
          hr4s: shenaiSDK.getHeartRate4s(),
          realtimeHr: shenaiSDK.getRealtimeHeartRate(),
          realtimeHrvSdnn: shenaiSDK.getRealtimeHrvSdnn(),
          realtimeCardiacStress: shenaiSDK.getRealtimeCardiacStress(),
          results: shenaiSDK.getMeasurementResults(),

          realtimeHeartbeats: shenaiSDK.getRealtimeHeartbeats(100),

          recordingEnabled: shenaiSDK.getRecordingEnabled(),

          badSignal: shenaiSDK.getTotalBadSignalSeconds(),
          signalQuality: shenaiSDK.getCurrentSignalQualityMetric(),

          textureImage: shenaiSDK.getFaceTexturePng(),
          signalImage: shenaiSDK.getSignalQualityMapPng(),
          metaPredictionImage: shenaiSDK.getMetaPredictionImagePng(),

          rppgSignal: shenaiSDK.getFullPpgSignal(),
        };
        setFaceScanData({ results: newState?.results });
        setSdkState(newState);
        //console.log(newState);
      }
    }, 200);
    return () => clearInterval(interval);
  }, [shenaiSDK]);

  useEffect(() => {
    console.log(
      getEnumName(
        shenaiSDK?.MeasurementState,
        sdkState?.measurementState,
        "UNKNOWN"
      )
    );
    if (
      getEnumName(
        shenaiSDK?.MeasurementState,
        sdkState?.measurementState,
        "UNKNOWN"
      ) === "FINISHED"
    ) {
      setStep("results");
      setCameraScanningFinished(true);
    }
  }, [shenaiSDK?.getMeasurementState()]);

  return (
    <div className="wrapper">
      <div ref={canvasTopRef} className={style.mxcanvasTopHelper} />
      <canvas id="mxcanvas" className={style.mxcanvas} />

      <Button variant="accent" onClick={initialize} className="w-full mt-4">
        {/* <X className="mr-2 h-4 w-4" /> */}
        Start Scan
      </Button>
    </div>
  );
};
