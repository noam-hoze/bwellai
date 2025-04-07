import { useRealtimeHeartRate } from "./ShenaiContext";
import style from "./shenCanvas.module.css";

export const ShenaiSDKView = () => {
  const hr = useRealtimeHeartRate();

  console.log({ hr: "s" });

  return (
    <div className="wrapper">
      <div className={style.title}>
        <h1>Shen.AI SDK</h1>
        <h2>React + Vite example</h2>
      </div>
      <canvas id="mxcanvas"></canvas>
      <div className={style["hr-tile"]}>
        Current Heart Rate: <br />
        <strong>{hr ? `${hr} BPM` : "-"}</strong>
      </div>
    </div>
  );
};
