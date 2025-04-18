import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const FriendlyGreeting = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    generateWatercolorTexture(canvas, ctx);
  }, []);

  const generateWatercolorTexture = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) => {
    const colors = ["#ff9d7a", "#ffd97a", "#a3e0cc", "#a5c8e8", "#d5b2e0"];

    ctx.fillStyle = "#fff8ee";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const numBlobs = 10 + Math.floor(Math.random() * 5);

    for (let i = 0; i < numBlobs; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radiusX = 100 + Math.random() * 200;
      const radiusY = 100 + Math.random() * 200;
      const rotation = Math.random() * Math.PI * 2;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const opacity = 0.15 + Math.random() * 0.2;

      drawBlob(ctx, x, y, radiusX, radiusY, rotation, color, opacity);
    }

    addNoiseTexture(ctx, canvas, 0.01);
  };

  const drawBlob = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radiusX: number,
    radiusY: number,
    rotation: number,
    color: string,
    opacity: number
  ) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = opacity;

    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radiusX);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, color + "00");

    ctx.beginPath();

    const points = 12;
    const angleStep = (Math.PI * 2) / points;
    const variationAmount = 0.3;

    for (let i = 0; i < points; i++) {
      const angle = i * angleStep;
      const variation = 1 - Math.random() * variationAmount;
      const xPoint = Math.cos(angle) * radiusX * variation;
      const yPoint = Math.sin(angle) * radiusY * variation;

      if (i === 0) {
        ctx.moveTo(xPoint, yPoint);
      } else {
        const prevAngle = (i - 1) * angleStep;
        const cpX1 =
          Math.cos(prevAngle + angleStep / 3) *
          radiusX *
          (1 - Math.random() * 0.2);
        const cpY1 =
          Math.sin(prevAngle + angleStep / 3) *
          radiusY *
          (1 - Math.random() * 0.2);
        const cpX2 =
          Math.cos(angle - angleStep / 3) * radiusX * (1 - Math.random() * 0.2);
        const cpY2 =
          Math.sin(angle - angleStep / 3) * radiusY * (1 - Math.random() * 0.2);

        ctx.bezierCurveTo(cpX1, cpY1, cpX2, cpY2, xPoint, yPoint);
      }
    }

    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.filter = "blur(15px)";
    ctx.fill();
    ctx.filter = "none";

    ctx.restore();
  };

  const addNoiseTexture = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    opacity: number
  ) => {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const noise = Math.random() * 255 * opacity;
      data[i] = Math.min(255, data[i] + noise);
      data[i + 1] = Math.min(255, data[i + 1] + noise);
      data[i + 2] = Math.min(255, data[i + 2] + noise);
    }

    ctx.putImageData(imageData, 0, 0);
  };

  if (!isVisible) return null;

  return (
    <Card className="w-full mb-6 animate-fade-in overflow-hidden relative rounded-lg group">
      <canvas
        ref={canvasRef}
        width="800"
        height="600"
        className="absolute inset-0 w-full h-full z-0"
      />

      <CardContent className="p-6 relative z-20">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-2xl font-bold" style={{ color: "#1e3a3a" }}>
            Welcome Onboard
          </h2>

          <div className="text-right">
            <p className="text-lg italic" style={{ color: "#3c1361" }}>
              "When diet is wrong, medicine is of no use. When diet is correct,
              medicine is of no need."
            </p>
            <p className="text-sm mt-1" style={{ color: "#3c1361" }}>
              — Ancient Ayurvedic Wisdom
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FriendlyGreeting;
