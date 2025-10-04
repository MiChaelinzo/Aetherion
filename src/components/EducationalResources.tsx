import { BookOpen, Telescope, Rocket, Atom, GraduationCap, ExternalLink } from 'lucide-react';

export function EducationalResources() {
  const resources = [
    {
      category: 'Understanding Interstellar Objects',
      icon: Telescope,
      color: 'from-blue-600 to-cyan-600',
      items: [
        {
          title: 'What Makes an Object Interstellar?',
          description: 'Learn how scientists identify objects from beyond our solar system using orbital mechanics and velocity measurements.',
          content: 'Interstellar objects are identified by their hyperbolic orbits (eccentricity > 1) and high velocities that exceed the solar system escape velocity. These characteristics prove they originated from another star system.'
        },
        {
          title: 'Detection Methods',
          description: 'Discover the advanced telescopes and techniques used to spot these rare cosmic visitors.',
          content: 'Detection relies on wide-field survey telescopes like Pan-STARRS that continuously scan the sky. Advanced algorithms analyze trajectory data to distinguish interstellar objects from asteroids and comets.'
        },
        {
          title: 'Orbital Mechanics',
          description: 'Understand how scientists calculate trajectories and predict paths through our solar system.',
          content: 'Using precise astrometric measurements and gravitational calculations, astronomers can determine if an object is gravitationally bound to our Sun or passing through on a hyperbolic trajectory from interstellar space.'
        }
      ]
    },
    {
      category: 'Famous Interstellar Visitors',
      icon: Rocket,
      color: 'from-purple-600 to-pink-600',
      items: [
        {
          title: '\'Oumuamua - The First Confirmed Visitor',
          description: 'The groundbreaking discovery that changed our understanding of interstellar objects.',
          content: 'Discovered in 2017, \'Oumuamua surprised scientists with its elongated shape and unexplained acceleration. Its reddish color suggests a surface altered by cosmic radiation over millions of years in interstellar space.'
        },
        {
          title: '2I/Borisov - The Interstellar Comet',
          description: 'How this comet confirmed theories about planetary system formation across the galaxy.',
          content: 'Borisov displayed clear cometary activity with a prominent tail, proving that comets exist throughout the galaxy. Its chemical composition was remarkably similar to solar system comets, suggesting universal formation processes.'
        },
        {
          title: 'The Search Continues',
          description: 'Current efforts to detect and study future interstellar visitors.',
          content: 'Next-generation telescopes like the Vera C. Rubin Observatory will dramatically increase detection rates, potentially finding dozens of interstellar objects annually once operational.'
        }
      ]
    },
    {
      category: 'Scientific Importance',
      icon: Atom,
      color: 'from-green-600 to-emerald-600',
      items: [
        {
          title: 'Windows to Other Star Systems',
          description: 'What interstellar objects tell us about planetary systems around other stars.',
          content: 'These objects are samples from other planetary systems, offering direct physical evidence of conditions around distant stars. They provide insights into planet formation, composition, and evolution across the galaxy.'
        },
        {
          title: 'Panspermia Hypothesis',
          description: 'Could life spread between star systems on interstellar objects?',
          content: 'Scientists study whether microorganisms could survive the harsh conditions of interstellar space protected within these objects, potentially seeding life across different star systems.'
        },
        {
          title: 'Galactic Chemistry',
          description: 'Understanding the chemical composition of material from other star systems.',
          content: 'Spectroscopic analysis of interstellar objects reveals the chemical makeup of material formed around other stars, helping us understand the diversity of chemistry in our galaxy.'
        }
      ]
    },
    {
      category: 'Future Research',
      icon: GraduationCap,
      color: 'from-orange-600 to-red-600',
      items: [
        {
          title: 'Sample Return Missions',
          description: 'Plans to intercept and study interstellar objects up close.',
          content: 'Future missions like the proposed Comet Interceptor could rendezvous with newly discovered interstellar objects, collecting samples and conducting detailed in-situ analysis.'
        },
        {
          title: 'Advanced Detection Networks',
          description: 'Next-generation sky surveys that will find many more interstellar visitors.',
          content: 'Projects like the Legacy Survey of Space and Time (LSST) will survey the entire visible sky every few nights, dramatically increasing the discovery rate of transient objects including interstellar visitors.'
        },
        {
          title: 'Artificial Origin Investigations',
          description: 'How scientists would determine if an interstellar object is artificial.',
          content: 'The search for technosignatures includes looking for unusual shapes, materials, trajectories, or signals that might indicate artificial origin. This requires careful analysis to distinguish natural phenomena from technology.'
        }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-4 mb-4">
          <BookOpen className="w-10 h-10 text-cyan-400" />
          <h2 className="text-4xl font-bold">Educational Resources</h2>
        </div>
        <p className="text-xl text-gray-300 leading-relaxed">
          Dive deep into the science of interstellar objects. Learn about detection methods, famous discoveries,
          and the groundbreaking research that helps us understand these mysterious visitors from beyond our solar system.
        </p>
      </div>

      {resources.map((section, idx) => {
        const Icon = section.icon;
        return (
          <div key={idx} className="space-y-4">
            <div className={`bg-gradient-to-r ${section.color} rounded-xl p-6 text-white shadow-lg`}>
              <div className="flex items-center gap-3">
                <Icon className="w-8 h-8" />
                <h3 className="text-2xl font-bold">{section.category}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.items.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow"
                >
                  <h4 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h4>
                  <p className="text-sm text-gray-600 mb-4 font-medium">{item.description}</p>
                  <p className="text-gray-700 leading-relaxed">{item.content}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 border border-blue-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <ExternalLink className="w-6 h-6 text-blue-600" />
          Glossary of Terms
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold text-gray-900 mb-2">Astronomical Unit (AU)</h4>
            <p className="text-gray-700 text-sm">The average distance from Earth to the Sun, approximately 150 million kilometers. Used to measure distances within our solar system.</p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">Eccentricity</h4>
            <p className="text-gray-700 text-sm">A measure of how elliptical an orbit is. Values greater than 1 indicate hyperbolic trajectories that escape the solar system.</p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">Perihelion</h4>
            <p className="text-gray-700 text-sm">The point in an object orbit where it is closest to the Sun.</p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">Inclination</h4>
            <p className="text-gray-700 text-sm">The tilt of an object orbit relative to Earth orbital plane, measured in degrees.</p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">Cometary Activity</h4>
            <p className="text-gray-700 text-sm">Outgassing of volatile materials creating a visible coma and tail as the object is heated by the Sun.</p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">Hyperbolic Orbit</h4>
            <p className="text-gray-700 text-sm">An open orbital path with eccentricity greater than 1, indicating the object will not return and originated from outside the solar system.</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-8 border border-amber-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Did You Know?</h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></span>
            <span className="text-gray-700">Scientists estimate that at any given time, there may be thousands of interstellar objects passing through our solar system, but most are too small or faint to detect.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></span>
            <span className="text-gray-700">Interstellar objects travel for millions of years through the vast emptiness of space before briefly passing through another star system.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></span>
            <span className="text-gray-700">The naming convention for interstellar objects uses "I" (for Interstellar) followed by a number and optional proper name, like 1I/\'Oumuamua.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></span>
            <span className="text-gray-700">Future telescopes could potentially detect interstellar objects years before they reach our solar system, allowing time to plan interception missions.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
