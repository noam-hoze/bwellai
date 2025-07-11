// import { useRealtimeHeartRate } from "./ShenaiContext";
import { useEffect, useRef, useState } from "react";
import style from "./shenCanvas.module.css";
import { useShenaiSdk } from "./useShenaiSDK";
import { getEnumName } from "@/utils/shenaiHelper";
import { Button } from "../ui/button";
import { useFaceScan } from "@/contexts/FaceScanContext";
import { Progress } from "../ui/progress";

export const ShenaiSDKView = ({
  setStep,
  setIsShenaiInitialized,
  setShenAiSDK,
}) => {
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
        setShenAiSDK(shenaiSDK);
        console.log("Shen.AI License result: ", res);
        shenaiSDK.attachToCanvas("#mxcanvas");
        onSuccess?.();
        // scrollToCanvas();
      } else {
        // message.error(
        //   "License initialization problem: " +
        //     getEnumName(shenaiSDK.InitializationResult, res, "UNKNOWN")
        // );

        console.log(
          res,
          getEnumName(shenaiSDK.InitializationResult, res, "UNKNOWN")
        );
      }
      setPendingInitialization(false);
    });
  };

  const initialize = () => {
    // if (isAuthenticated) {
    initializeSdk(
      import.meta.env.VITE_SHENAI_KEY,
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
      precisionMode: shenaiSDK.PrecisionMode.RELAXED,
      operatingMode: shenaiSDK.OperatingMode.POSITIONING,
      measurementPreset: shenaiSDK.MeasurementPreset.ONE_MINUTE_BETA_METRICS,
      cameraMode: shenaiSDK.CameraMode.FACING_USER,
      onboardingMode: shenaiSDK.OnboardingMode.HIDDEN,
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
    setIsShenaiInitialized(true);
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
        setFaceScanData({
          results: {
            ...newState?.results,
            hr10s: newState?.hr10s,
            hr4s: newState?.hr4s,
          },
        });
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

  const initializationDisabled =
    !shenaiSDK || sdkState?.isInitialized === true || pendingInitialization;

  const measurementInProgress =
    sdkState &&
    shenaiSDK &&
    [
      shenaiSDK.MeasurementState.FAILED,
      shenaiSDK.MeasurementState.FINISHED,
      shenaiSDK.MeasurementState.NOT_STARTED,
    ].indexOf(sdkState.measurementState) < 0;

  return (
    <div>
      {typeof sdkState?.progress === "number" && measurementInProgress && (
        <div className="w-full mb-5">
          <div className="flex justify-between text-sm mb-1">
            <span>Scanning in progress...</span>
            <span>{sdkState.progress.toFixed(0)}%</span>
          </div>
          <Progress
            value={Number(sdkState.progress.toFixed(0))}
            className="h-2"
          />
        </div>
      )}

      <div
        className="wrapper"
        style={{
          display: `flex`,
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div ref={canvasTopRef} className={style.mxcanvasTopHelper} />
        <canvas id="mxcanvas" className={style.mxcanvas} />

        {!cameraScanningFinished &&
          !initializationDisabled &&
          getEnumName(
            shenaiSDK?.MeasurementState,
            sdkState?.measurementState,
            "UNKNOWN"
          ) === "UNKNOWN" && (
            <div
              style={{
                position: "absolute",
              }}
            >
              <Button
                variant="accent"
                onClick={initialize}
                className="w-40 mt-4 bg-orange-500 hover:bg-orange-600"
              >
                {/* <X className="mr-2 h-4 w-4" /> */}
                Start Scan
              </Button>
            </div>
          )}
      </div>
    </div>
  );
};
