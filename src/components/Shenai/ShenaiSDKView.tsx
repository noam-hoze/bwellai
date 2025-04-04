import { useRealtimeHeartRate } from "./ShenaiContext";

export const ShenaiSDKView = () => {
  const hr = useRealtimeHeartRate();

  console.log({ hr: "s" });

  return (
    <div
      className="first-dioce"
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
        padding: "1em",
      }}
    >
      <canvas
        id="mxcanvas"
        style={{
          aspectRatio: 7 / 12,
          maxWidth: "100%",
          maxHeight: "85%",
          border: "1px solid black",
        }}
      ></canvas>
      <div className="hr-tile">
        Current Heart Rate: <br />
        {/* <strong>{hr ? `${hr} BPM` : "0"}</strong> */}
      </div>
    </div>
  );
};
