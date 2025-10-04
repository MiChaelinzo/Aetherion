import { useState } from 'react';
import { Calculator, AlertTriangle, Target, Zap, Users, Building2, TrendingDown } from 'lucide-react';

export function ImpactSimulator() {
  const [diameter, setDiameter] = useState(100);
  const [velocity, setVelocity] = useState(20);
  const [angle, setAngle] = useState(45);
  const [density, setDensity] = useState(3000);
  const [impactType, setImpactType] = useState<'land' | 'ocean'>('land');

  const calculateImpact = () => {
    const mass = (4/3) * Math.PI * Math.pow(diameter/2, 3) * density;
    const kineticEnergy = 0.5 * mass * Math.pow(velocity * 1000, 2);
    const megatonsTNT = kineticEnergy / (4.184e15);

    const craterDiameter = Math.pow(megatonsTNT, 0.25) * 100;
    const craterDepth = craterDiameter * 0.3;

    const effectiveRadius = {
      total_destruction: craterDiameter * 2,
      severe_damage: craterDiameter * 5,
      moderate_damage: craterDiameter * 10,
      light_damage: craterDiameter * 20
    };

    const seismicMagnitude = 0.67 * Math.log10(megatonsTNT) + 5.87;

    const airblastRadius = Math.pow(megatonsTNT, 0.33) * 2;

    const thermalRadius = Math.pow(megatonsTNT, 0.41) * 1.5;

    const estimatedCasualties = impactType === 'land'
      ? Math.floor(Math.PI * Math.pow(effectiveRadius.severe_damage, 2) * 100)
      : Math.floor(Math.PI * Math.pow(effectiveRadius.severe_damage, 2) * 20);

    return {
      energy: megatonsTNT,
      craterDiameter,
      craterDepth,
      effectiveRadius,
      seismicMagnitude,
      airblastRadius,
      thermalRadius,
      estimatedCasualties
    };
  };

  const results = calculateImpact();

  const getRiskLevel = () => {
    if (results.energy < 1) return { level: 'Very Low', color: 'text-green-600 bg-green-50', description: 'Minimal threat - similar to small meteor' };
    if (results.energy < 15) return { level: 'Low', color: 'text-yellow-600 bg-yellow-50', description: 'Local damage possible' };
    if (results.energy < 1000) return { level: 'Moderate', color: 'text-orange-600 bg-orange-50', description: 'Regional catastrophe' };
    if (results.energy < 100000) return { level: 'High', color: 'text-red-600 bg-red-50', description: 'Continental disaster' };
    return { level: 'Extreme', color: 'text-red-900 bg-red-100', description: 'Global extinction event' };
  };

  const risk = getRiskLevel();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="bg-gradient-to-br from-red-900 via-orange-800 to-red-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Calculator className="w-12 h-12" />
            <h1 className="text-5xl font-bold">Impact Simulator</h1>
          </div>
          <p className="text-xl text-red-100">
            Calculate the potential effects of an interstellar object impact on Earth
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Target className="w-6 h-6 text-red-600" />
                Impact Parameters
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Object Diameter: {diameter} meters
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="1000"
                    value={diameter}
                    onChange={(e) => setDiameter(Number(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>10m</span>
                    <span>500m</span>
                    <span>1000m</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Impact Velocity: {velocity} km/s
                  </label>
                  <input
                    type="range"
                    min="11"
                    max="72"
                    value={velocity}
                    onChange={(e) => setVelocity(Number(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>11 km/s</span>
                    <span>40 km/s</span>
                    <span>72 km/s</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Impact Angle: {angle}°
                  </label>
                  <input
                    type="range"
                    min="15"
                    max="90"
                    value={angle}
                    onChange={(e) => setAngle(Number(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>15° (Shallow)</span>
                    <span>45°</span>
                    <span>90° (Vertical)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Object Density: {density} kg/m³
                  </label>
                  <input
                    type="range"
                    min="1000"
                    max="8000"
                    step="100"
                    value={density}
                    onChange={(e) => setDensity(Number(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Ice (1000)</span>
                    <span>Rock (3000)</span>
                    <span>Iron (8000)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Impact Location
                  </label>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setImpactType('land')}
                      className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                        impactType === 'land'
                          ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Land Impact
                    </button>
                    <button
                      onClick={() => setImpactType('ocean')}
                      className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                        impactType === 'ocean'
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Ocean Impact
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className={`rounded-xl shadow-lg p-6 border-2 ${risk.color}`}>
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle className="w-8 h-8" />
                <div>
                  <h3 className="text-2xl font-bold">Risk Level: {risk.level}</h3>
                  <p className="text-sm font-medium">{risk.description}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Zap className="w-6 h-6 text-orange-600" />
                Impact Results
              </h2>

              <div className="space-y-4">
                <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-4 border border-red-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Impact Energy</span>
                    <Zap className="w-5 h-5 text-orange-600" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{results.energy.toFixed(2)} MT</p>
                  <p className="text-sm text-gray-600 mt-1">Megatons of TNT equivalent</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <span className="text-xs font-medium text-gray-600">Crater Diameter</span>
                    <p className="text-xl font-bold text-gray-900 mt-1">{results.craterDiameter.toFixed(1)} m</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <span className="text-xs font-medium text-gray-600">Crater Depth</span>
                    <p className="text-xl font-bold text-gray-900 mt-1">{results.craterDepth.toFixed(1)} m</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <span className="text-xs font-medium text-gray-600">Seismic Magnitude</span>
                  <p className="text-xl font-bold text-gray-900 mt-1">{results.seismicMagnitude.toFixed(1)} Richter</p>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-200">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <TrendingDown className="w-5 h-5 text-red-600" />
                    Damage Radii
                  </h3>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                      <span className="text-sm text-gray-700">Total Destruction</span>
                      <span className="font-bold text-red-600">{results.effectiveRadius.total_destruction.toFixed(1)} km</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
                      <span className="text-sm text-gray-700">Severe Damage</span>
                      <span className="font-bold text-orange-600">{results.effectiveRadius.severe_damage.toFixed(1)} km</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                      <span className="text-sm text-gray-700">Moderate Damage</span>
                      <span className="font-bold text-yellow-600">{results.effectiveRadius.moderate_damage.toFixed(1)} km</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                      <span className="text-sm text-gray-700">Light Damage</span>
                      <span className="font-bold text-blue-600">{results.effectiveRadius.light_damage.toFixed(1)} km</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-orange-600" />
                      <span className="text-xs font-medium text-gray-600">Thermal Radius</span>
                    </div>
                    <p className="text-xl font-bold text-gray-900">{results.thermalRadius.toFixed(1)} km</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-medium text-gray-600">Airblast Radius</span>
                    </div>
                    <p className="text-xl font-bold text-gray-900">{results.airblastRadius.toFixed(1)} km</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="w-6 h-6 text-purple-600" />
                Human Impact Assessment
              </h3>
              <div className="space-y-4">
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <span className="text-sm font-semibold text-gray-700">Estimated Casualties</span>
                  <p className="text-2xl font-bold text-purple-900 mt-1">
                    ~{results.estimatedCasualties.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {impactType === 'land' ? 'Based on average population density' : 'Coastal flooding and tsunami effects'}
                  </p>
                </div>

                {impactType === 'ocean' && (
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-semibold text-gray-700">Tsunami Warning</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      Ocean impact would generate massive tsunamis affecting coastal regions within thousands of kilometers.
                      Wave heights could exceed 10 meters on nearby coastlines.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Important Notes</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-orange-600 rounded-full mt-1.5 flex-shrink-0"></span>
              <span>These calculations are simplified models. Actual impacts would vary based on numerous factors including atmospheric entry angle, object composition, and local geology.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-orange-600 rounded-full mt-1.5 flex-shrink-0"></span>
              <span>Casualty estimates are highly approximate and assume no warning or evacuation. Early detection would significantly reduce human impact.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-orange-600 rounded-full mt-1.5 flex-shrink-0"></span>
              <span>The probability of a large interstellar object impact is extremely low. This tool is for educational purposes to understand potential scenarios.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
