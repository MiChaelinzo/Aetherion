# Interstellar Watch

## 2025 NASA Space Apps Challenge Submission

A comprehensive web platform for tracking, analyzing, and simulating interstellar objects and near-Earth asteroids, developed for the NASA Space Apps Challenge.

## Overview

Interstellar Watch is an interactive visualization and simulation tool that enables users to explore asteroid impact scenarios, predict consequences, and evaluate mitigation strategies using real data. The platform bridges the gap between complex astronomical science and actionable insights for scientists, policymakers, educators, and the general public.

## Features

### 🌟 Core Modules

1. **Interstellar Objects Gallery**
   - Browse all tracked interstellar objects
   - Advanced search and filtering
   - Bookmark/favorites system
   - Side-by-side comparison tool
   - Statistical dashboard with charts
   - Interactive object detail modals

2. **3D Solar System Viewer**
   - Real-time visualization of planetary orbits
   - Interstellar object trajectory plotting
   - Interactive controls (play/pause, zoom, rotation)
   - Object selection and highlighting
   - Hyperbolic orbit visualization

3. **Planetary Defense System**
   - Comprehensive defense strategies
   - Risk assessment protocols
   - Mitigation techniques database
   - Detection systems overview
   - International coordination frameworks

4. **Impact Simulator**
   - Physics-based impact calculations
   - Adjustable parameters:
     - Object diameter (10m - 1000m)
     - Impact velocity (11 km/s - 72 km/s)
     - Impact angle (15° - 90°)
     - Object density (1000 - 8000 kg/m³)
     - Impact location (land/ocean)
   - Real-time results:
     - Impact energy (megatons TNT)
     - Crater dimensions
     - Damage radii (4 zones)
     - Seismic magnitude
     - Thermal and airblast effects
     - Casualty estimates
   - Risk level assessment
   - Tsunami modeling for ocean impacts

5. **News Feed**
   - Latest asteroid discoveries
   - Research breakthroughs
   - Mission updates
   - Category filtering
   - View tracking
   - Trending articles

6. **Community Forum**
   - Discussion posts by category
   - Comment system
   - Upvoting functionality
   - Author attribution
   - Real-time updates

7. **Educational Resources**
   - Understanding interstellar objects
   - Detection methods
   - Famous discoveries (Oumuamua, 2I/Borisov)
   - Scientific importance
   - Future research initiatives
   - Comprehensive glossary

## Technical Stack

- **Frontend:** React 18 with TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Icons:** Lucide React
- **Build Tool:** Vite
- **Visualization:** Canvas API for 3D rendering

## Database Schema

### Interstellar Objects
- Complete orbital and physical parameters
- Discovery information
- Scientific findings
- Threat assessment data

### News Articles
- Article content and metadata
- Category and tag system
- View tracking
- Related object links

### Community
- Discussion posts
- Comments
- User attribution
- Upvoting system

## NASA Space Apps Challenge Alignment

This project addresses the challenge objectives by:

1. **Interactive Visualization** - 3D viewer with realistic orbital mechanics
2. **Impact Simulation** - Physics-based calculator using established scientific formulas
3. **Data Integration** - Structured database for asteroid parameters and environmental data
4. **Educational Value** - Comprehensive resources explaining complex concepts
5. **User Accessibility** - Intuitive interfaces for both experts and general public
6. **Mitigation Strategies** - Planetary defense system with actionable insights
7. **Community Engagement** - Forum for knowledge sharing and discussion

## Scientific Accuracy

The Impact Simulator uses scientifically validated formulas:
- **Kinetic Energy:** KE = ½mv²
- **TNT Equivalent:** Energy / 4.184×10¹⁵ J/MT
- **Crater Scaling:** Based on impact energy relationships
- **Seismic Magnitude:** 0.67 × log₁₀(MT) + 5.87
- **Damage Radii:** Scaled by energy^0.25 for various effect zones

## Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your Supabase credentials

# Run development server
npm run dev

# Build for production
npm run build
```

## Environment Variables

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Usage

1. **Explore Objects:** Browse the gallery, search for specific objects, and compare them side-by-side
2. **Visualize Trajectories:** Use the 3D viewer to see orbital paths and object positions
3. **Simulate Impacts:** Calculate potential impact scenarios with customizable parameters
4. **Stay Informed:** Read the latest news and research updates
5. **Learn:** Access educational resources to understand the science
6. **Engage:** Join discussions in the community forum

## Key Insights

- All detected interstellar objects have hyperbolic orbits (eccentricity > 1)
- Average velocities significantly exceed typical solar system bodies
- Impact energy scales dramatically with object size and velocity
- Early detection is critical for effective mitigation strategies
- Community awareness and education are essential for preparedness

## Future Enhancements

- Real-time NASA NEO API integration
- USGS elevation data for tsunami modeling
- Advanced deflection strategy simulations
- Machine learning for impact prediction
- Augmented reality features
- Multilingual support
- Mobile app development

## Data Sources

This project is designed to integrate with:
- NASA Near-Earth Object (NEO) Web Service API
- USGS National Earthquake Information Center (NEIC) Catalog
- USGS National Map Elevation Data
- NASA Small-Body Database
- Canadian Space Agency NEOSSAT Data

## Security

Please see [SECURITY.md](SECURITY.md) for our security policy and vulnerability reporting procedures.

## Challenge Information

For detailed information about the NASA Space Apps Challenge requirements and objectives, see [.bolt/challenge-info.md](.bolt/challenge-info.md).

## Disclaimer

This tool is developed for educational and research purposes. NASA does not endorse any non-U.S. Government entity and is not responsible for information contained on non-U.S. Government websites.

## License

This project is open source and available for educational and research purposes.

## Contributing

Contributions are welcome! Please feel free to submit issues, feature requests, or pull requests.

## Team

Developed for the 2025 NASA Space Apps Challenge.

## Acknowledgments

- NASA for providing open data and APIs
- USGS for geological and environmental datasets
- The global space research community
- All contributors to the open-source libraries used in this project

---

**Interstellar Watch** - Tracking Visitors from Beyond Our Solar System
