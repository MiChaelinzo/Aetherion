import { useEffect, useRef, useState } from 'react';
import { Globe, Play, Pause, RotateCcw, Info } from 'lucide-react';
import type { InterstellarObject } from '../lib/supabase';

interface SolarSystemViewerProps {
  objects: InterstellarObject[];
}

export function SolarSystemViewer({ objects }: SolarSystemViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedObject, setSelectedObject] = useState<string | null>(null);
  const [showOrbits, setShowOrbits] = useState(true);
  const [zoom, setZoom] = useState(1);
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

    const planets = [
      { name: 'Mercury', distance: 40, speed: 0.04, angle: 0, color: '#8C7853', size: 3 },
      { name: 'Venus', distance: 60, speed: 0.015, angle: 0, color: '#FFC649', size: 5 },
      { name: 'Earth', distance: 80, speed: 0.01, angle: 0, color: '#4A90E2', size: 5 },
      { name: 'Mars', distance: 100, speed: 0.008, angle: 0, color: '#E27B58', size: 4 },
      { name: 'Jupiter', distance: 150, speed: 0.002, angle: 0, color: '#C88B3A', size: 12 },
      { name: 'Saturn', distance: 200, speed: 0.001, angle: 0, color: '#FAD5A5', size: 10 },
      { name: 'Uranus', distance: 250, speed: 0.0007, angle: 0, color: '#4FD0E7', size: 8 },
      { name: 'Neptune', distance: 300, speed: 0.0005, angle: 0, color: '#4166F5', size: 8 },
    ];

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = '#0a0e1a';
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < 200; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = Math.random() * 2;
        ctx.fillStyle = 'rgba(255, 255, 255, ' + (Math.random() * 0.5 + 0.5) + ')';
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.scale(zoom, zoom);

      ctx.shadowBlur = 40;
      ctx.shadowColor = '#FDB813';
      ctx.fillStyle = '#FDB813';
      ctx.beginPath();
      ctx.arc(0, 0, 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      if (showOrbits) {
        ctx.strokeStyle = 'rgba(100, 149, 237, 0.2)';
        ctx.lineWidth = 1;
        planets.forEach(planet => {
          ctx.beginPath();
          ctx.arc(0, 0, planet.distance, 0, Math.PI * 2);
          ctx.stroke();
        });
      }

      planets.forEach(planet => {
        if (isPlaying) {
          planet.angle += planet.speed;
        }

        const x = Math.cos(planet.angle) * planet.distance;
        const y = Math.sin(planet.angle) * planet.distance;

        ctx.fillStyle = planet.color;
        ctx.beginPath();
        ctx.arc(x, y, planet.size, 0, Math.PI * 2);
        ctx.fill();

        if (selectedObject === planet.name) {
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(x, y, planet.size + 5, 0, Math.PI * 2);
          ctx.stroke();

          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 12px sans-serif';
          ctx.fillText(planet.name, x + planet.size + 10, y);
        }
      });

      objects.forEach((obj) => {
        if (!obj.current_distance_au || !obj.eccentricity) return;

        const distance = obj.current_distance_au * 20;
        const time = Date.now() * 0.0001;

        if (obj.eccentricity > 1) {
          const angle = Math.atan(1 / obj.eccentricity);
          const t = isPlaying ? time * 0.3 : 0;
          const tClamped = ((t % (2 * angle)) - angle) * 0.3;
          const a = distance * 0.3;
          const r = (a * (obj.eccentricity * obj.eccentricity - 1)) / (1 + obj.eccentricity * Math.cos(tClamped));
          const x = r * Math.cos(tClamped);
          const y = r * Math.sin(tClamped);

          if (showOrbits) {
            ctx.strokeStyle = 'rgba(0, 255, 255, 0.3)';
            ctx.lineWidth = 1;
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            for (let t = -angle + 0.1; t < angle - 0.1; t += 0.01) {
              const r = (a * (obj.eccentricity * obj.eccentricity - 1)) / (1 + obj.eccentricity * Math.cos(t));
              const px = r * Math.cos(t);
              const py = r * Math.sin(t);
              if (t === -angle + 0.1) {
                ctx.moveTo(px, py);
              } else {
                ctx.lineTo(px, py);
              }
            }
            ctx.stroke();
            ctx.setLineDash([]);
          }

          ctx.shadowBlur = 15;
          ctx.shadowColor = '#00ffff';
          ctx.fillStyle = '#00ffff';
          ctx.beginPath();
          ctx.arc(x, y, 6, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;

          if (selectedObject === obj.name) {
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(x, y, 10, 0, Math.PI * 2);
            ctx.stroke();

            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 12px sans-serif';
            ctx.fillText(obj.name, x + 15, y);
          }
        }
      });

      ctx.restore();

      if (isPlaying) {
        animationRef.current = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [objects, isPlaying, selectedObject, showOrbits, zoom]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const reset = () => {
    setZoom(1);
    setSelectedObject(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="bg-gradient-to-br from-blue-900 via-slate-900 to-purple-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Globe className="w-12 h-12 text-cyan-400" />
            <h1 className="text-5xl font-bold">Solar System Viewer</h1>
          </div>
          <p className="text-xl text-blue-100">
            Interactive visualization of our solar system and interstellar object trajectories
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-slate-800 rounded-xl overflow-hidden shadow-2xl border border-slate-700">
          <div className="p-4 border-b border-slate-700 flex items-center justify-between bg-slate-900">
            <h3 className="text-lg font-bold text-white">3D View</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white" />}
              </button>
              <button
                onClick={() => setShowOrbits(!showOrbits)}
                className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                  showOrbits
                    ? 'bg-cyan-600 text-white'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                Orbits
              </button>
              <button
                onClick={() => setZoom(Math.min(zoom + 0.2, 2))}
                className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-white font-medium"
              >
                Zoom +
              </button>
              <button
                onClick={() => setZoom(Math.max(zoom - 0.2, 0.5))}
                className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-white font-medium"
              >
                Zoom -
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
            width={1200}
            height={700}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-cyan-400" />
              Planets
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'].map((planet) => (
                <button
                  key={planet}
                  onClick={() => setSelectedObject(selectedObject === planet ? null : planet)}
                  className={`p-3 rounded-lg text-left transition-all ${
                    selectedObject === planet
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                  }`}
                >
                  <span className="font-semibold">{planet}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-cyan-400" />
              Interstellar Objects
            </h3>
            <div className="space-y-2">
              {objects.map((obj) => (
                <button
                  key={obj.id}
                  onClick={() => setSelectedObject(selectedObject === obj.name ? null : obj.name)}
                  className={`w-full p-3 rounded-lg text-left transition-all ${
                    selectedObject === obj.name
                      ? 'bg-cyan-600 text-white shadow-lg'
                      : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{obj.name}</span>
                    <span className="text-xs">{obj.current_distance_au?.toFixed(1)} AU</span>
                  </div>
                  {obj.common_name && (
                    <span className="text-xs opacity-75">{obj.common_name}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 bg-gradient-to-br from-blue-900 to-cyan-900 rounded-xl p-6 text-white">
          <h3 className="text-lg font-bold mb-3">Visualization Notes</h3>
          <ul className="space-y-2 text-sm text-blue-100">
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0"></span>
              <span>Planetary distances and sizes are not to scale for better visualization</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0"></span>
              <span>Interstellar objects shown in cyan follow hyperbolic trajectories</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0"></span>
              <span>Animation speed is accelerated for demonstration purposes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0"></span>
              <span>Click on any object to highlight and track it</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
