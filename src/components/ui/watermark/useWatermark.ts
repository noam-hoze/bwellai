import { useEffect, useRef } from "react";

export interface BaseWatermarkProps {
  text?: string;
  textCoords?: [number, number];
  width?: string;
  height?: string;

  canvasProps?: {
    textAlign?: CanvasTextAlign;
    textBaseline?: CanvasTextBaseline;
    font?: string;
    fillStyle?: string;
    globalAlpha?: number;
  };
  rotate?: number;
  zIndex?: number;
}

export function useWatermark({ waterMarkText = "Under development" }) {
  const mutationObserver = useRef<MutationObserver>();

  useEffect(() => {
    return () => {
      mutationObserver.current?.disconnect();
    };
  }, []);

  // Function to update the watermark
  const updateWatermark = (
    options: { container: HTMLElement } & BaseWatermarkProps
  ) => {
    if (!options.container) return;
    if (mutationObserver.current) mutationObserver.current.disconnect();

    const {
      container = document.body,
      width = "210px",
      height = "200px",
      text = waterMarkText,
      textCoords = [0, parseInt(height) - 100], // Text coordinates
      canvasProps = {},
      rotate = -20, // Rotation angle
      zIndex = 1000,
    } = options;

    const canvas = document.createElement("canvas");
    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    ctx.globalAlpha = canvasProps.globalAlpha || 0.3;
    ctx.textAlign = canvasProps.textAlign || "left";
    ctx.textBaseline = canvasProps.textBaseline || "bottom";
    ctx.font = canvasProps.font || "16px Microsoft Yahei";
    ctx.fillStyle = canvasProps.fillStyle || "#000";
    ctx.rotate((Math.PI / 180) * rotate); // Convert angle to radians
    ctx.fillText(text, textCoords[0], textCoords[1]); // Adjust text position as needed

    const base64Url = canvas.toDataURL(); // Convert canvas to URL

    const watermarkDiv =
      document.querySelector(".__wm") || document.createElement("div");
    const styleStr = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: ${zIndex};
      pointer-events: none;
      background-repeat: repeat;
      background-image: url('${base64Url}')
    `;
    watermarkDiv.setAttribute("style", styleStr);
    watermarkDiv.classList.add("__wm"); // Add class name for identification

    // Avoid adding repeatedly
    if (!document.querySelector(".__wm")) {
      container.style.position = "relative";
      container.appendChild(watermarkDiv);
    }
    // Use MutationObserver to monitor DOM changes and protect the watermark from being removed
    mutationObserver.current = new MutationObserver(() => {
      const __wm = document.querySelector(".__wm");
      // Only reapply if __wm element changes
      if (
        (__wm && __wm.getAttribute("style") !== styleStr) ||
        !__wm ||
        container.style.position !== "relative"
      ) {
        // Avoid continuous triggering
        mutationObserver.current?.disconnect();
        updateWatermark(options);
      }
    });

    mutationObserver.current.observe(container, {
      attributes: true,
      childList: true,
      subtree: true,
    });
  };

  return { updateWatermark };
}
