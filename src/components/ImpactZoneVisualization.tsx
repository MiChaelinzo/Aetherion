import { useEffect, useRef } from 'react';

interface ImpactResults {
  craterDiameter: number;
  effectiveRadius: {
    total_destruction: number;
    severe_damage: number;
    moderate_damage: number;
    light_damage: number;
  };
}

interface ImpactZoneVisualizationProps {
  results: ImpactResults;
}

export function ImpactZoneVisualization({ results }: ImpactZoneVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 500;
    canvas.height = 500;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scale = 40; // pixels per km

    // Draw background
    ctx.fillStyle = '#f0f9ff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw light damage zone
    ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
    ctx.beginPath();
    ctx.arc(centerX, centerY, results.effectiveRadius.light_damage * scale, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgb(59, 130, 246)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw moderate damage zone
    ctx.fillStyle = 'rgba(251, 146, 60, 0.3)';
    ctx.beginPath();
    ctx.arc(centerX, centerY, results.effectiveRadius.moderate_damage * scale, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgb(251, 146, 60)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw severe damage zone
    ctx.fillStyle = 'rgba(249, 115, 22, 0.4)';
    ctx.beginPath();
    ctx.arc(centerX, centerY, results.effectiveRadius.severe_damage * scale, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgb(249, 115, 22)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw total destruction zone
    ctx.fillStyle = 'rgba(220, 38, 38, 0.5)';
    ctx.beginPath();
    ctx.arc(centerX, centerY, results.effectiveRadius.total_destruction * scale, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgb(220, 38, 38)';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw crater
    ctx.fillStyle = 'rgba(51, 65, 85, 0.8)';
    ctx.beginPath();
    ctx.arc(centerX, centerY, (results.craterDiameter / 1000) * scale, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw impact center point
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
    ctx.fill();

    // Draw crosshair
    ctx.strokeStyle = 'rgba(191, 191, 191, 0.5)';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(centerX - 40, centerY);
    ctx.lineTo(centerX + 40, centerY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - 40);
    ctx.lineTo(centerX, centerY + 40);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw grid
    ctx.strokeStyle = 'rgba(191, 191, 191, 0.2)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 5; i++) {
      const x = (i * canvas.width) / 4;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();

      const y = (i * canvas.height) / 4;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Draw scale labels
    ctx.fillStyle = '#666666';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('10 km', centerX, 30);
    ctx.fillText('20 km', centerX, 65);
    ctx.fillText('Impact Center', centerX, canvas.height - 10);
  }, [results]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Impact Zone Map</h2>
      <div className="flex flex-col items-center">
        <canvas
          ref={canvasRef}
          className="border-2 border-gray-300 rounded-lg"
        />
        <div className="mt-6 w-full grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-red-600 rounded"></div>
            <span className="text-sm text-gray-700">Total Destruction</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-orange-500 rounded"></div>
            <span className="text-sm text-gray-700">Severe Damage</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-orange-400 rounded"></div>
            <span className="text-sm text-gray-700">Moderate Damage</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-sm text-gray-700">Light Damage</span>
          </div>
        </div>
      </div>
    </div>
  );
}