import React, { useEffect, useRef } from "react";
import { useWatermark } from "./useWatermark";
import type { BaseWatermarkProps } from "./useWatermark";

type WatermarkProps = BaseWatermarkProps & {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  waterMarkText?: string;
};

const Watermark = (props: WatermarkProps) => {
  const { children, style, waterMarkText, ...restProps } = props;
  const watermarkRef = useRef<HTMLDivElement>(null);

  const { updateWatermark } = useWatermark({
    waterMarkText: waterMarkText,
  });

  useEffect(() => {
    updateWatermark({ container: watermarkRef.current, ...restProps });
  }, [
    restProps.text,
    restProps.textCoords,
    restProps.width,
    restProps.height,
    restProps.canvasProps,
    restProps.rotate,
    restProps.zIndex,
  ]);

  return (
    <div ref={watermarkRef} style={{ position: "relative", ...style }}>
      {children}
    </div>
  );
};

export default Watermark;
