import { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';

interface TrajectoryVisualizationProps {
  objectName: string;
  trajectoryData: any;
  velocity: number;
  eccentricity: number;
}

export function TrajectoryVisualization({ objectName, trajectoryData, velocity, eccentricity }: TrajectoryVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    const drawOrbit = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.scale(zoom, zoom);
      ctx.rotate(rotation);

      ctx.shadowBlur = 30;
      ctx.shadowColor = '#fbbf24';
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(0, 0, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      const a = 150;
      const b = a * Math.sqrt(Math.abs(1 - eccentricity * eccentricity));
      const c = a * eccentricity;

      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();

      if (eccentricity > 1) {
        const angle = Math.atan(1 / eccentricity);
        for (let t = -angle + 0.1; t < angle - 0.1; t += 0.01) {
          const r = (a * (eccentricity * eccentricity - 1)) / (1 + eccentricity * Math.cos(t));
          const x = r * Math.cos(t) - c;
          const y = r * Math.sin(t);
          if (t === -angle + 0.1) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
      } else {
        ctx.ellipse(-c, 0, a, b, 0, 0, Math.PI * 2);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      const time = Date.now() * 0.001;
      const t = isPlaying ? time * 0.3 : 0;
      let objectX, objectY;

      if (eccentricity > 1) {
        const angle = Math.atan(1 / eccentricity);
        const tClamped = ((t % (2 * angle)) - angle) * 0.5;
        const r = (a * (eccentricity * eccentricity - 1)) / (1 + eccentricity * Math.cos(tClamped));
        objectX = r * Math.cos(tClamped) - c;
        objectY = r * Math.sin(tClamped);
      } else {
        objectX = a * Math.cos(t) - c;
        objectY = b * Math.sin(t);
      }

      ctx.shadowBlur = 20;
      ctx.shadowColor = '#06b6d4';
      ctx.fillStyle = '#06b6d4';
      ctx.beginPath();
      ctx.arc(objectX, objectY, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#e2e8f0';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(objectName, objectX + 15, objectY - 10);

      const gridSize = 50;
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let i = -width; i < width; i += gridSize) {
        ctx.beginPath();
        ctx.moveTo(i, -height);
        ctx.lineTo(i, height);
        ctx.stroke();
      }
      for (let i = -height; i < height; i += gridSize) {
        ctx.beginPath();
        ctx.moveTo(-width, i);
        ctx.lineTo(width, i);
        ctx.stroke();
      }

      ctx.restore();

      ctx.fillStyle = '#e2e8f0';
      ctx.font = '14px sans-serif';
      ctx.fillText(`Velocity: ${velocity.toFixed(2)} km/s`, 10, 30);
      ctx.fillText(`Eccentricity: ${eccentricity.toFixed(3)}`, 10, 50);
      ctx.fillText(`Orbit: ${eccentricity > 1 ? 'Hyperbolic' : 'Elliptical'}`, 10, 70);

      if (isPlaying) {
        animationRef.current = requestAnimationFrame(drawOrbit);
      }
    };

    drawOrbit();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [zoom, rotation, isPlaying, objectName, velocity, eccentricity]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const reset = () => {
    setZoom(1);
    setRotation(0);
    setIsPlaying(false);
  };

  return (
    <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-700">
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        <h3 className="text-lg font-bold text-white">Trajectory Visualization</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white" />}
          </button>
          <button
            onClick={() => setZoom(Math.min(zoom + 0.2, 3))}
            className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
          >
            <ZoomIn className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={() => setZoom(Math.max(zoom - 0.2, 0.5))}
            className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
          >
            <ZoomOut className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={reset}
            className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
      <canvas
        ref={canvasRef}
        width={800}
        height={500}
        className="w-full cursor-move"
        onMouseDown={(e) => {
          const startX = e.clientX;
          const startRotation = rotation;

          const handleMouseMove = (e: MouseEvent) => {
            const deltaX = e.clientX - startX;
            setRotation(startRotation + deltaX * 0.01);
          };

          const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
          };

          document.addEventListener('mousemove', handleMouseMove);
          document.addEventListener('mouseup', handleMouseUp);
        }}
      />
    </div>
  );
}
