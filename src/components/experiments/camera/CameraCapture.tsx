
import { useRef, useEffect } from "react";

interface CameraCaptureProps {
  onCapture: (imageData: string) => void;
  onClose: () => void;
}

const CameraCapture = ({ onCapture, onClose }: CameraCaptureProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user" } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      throw err;
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        
        const imageData = canvasRef.current.toDataURL('image/png');
        onCapture(imageData);
        stopCamera();
      }
    }
  };

  useEffect(() => {
    startCamera().catch(() => {
      // Camera error will be handled by parent
    });
    
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="relative">
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        className="w-full h-96 object-cover rounded-lg"
      />
      <canvas ref={canvasRef} className="hidden" />
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <button
          onClick={captureImage}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium"
        >
          Capture
        </button>
      </div>
    </div>
  );
};

export default CameraCapture;
