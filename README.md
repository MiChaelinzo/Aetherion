***

# Interstellar Watch – README

**Interstellar Watch** is a full-featured web application for tracking, visualizing, and analyzing interstellar objects visiting our solar system, combining scientific data, interactive simulations, and community discussion.

## 🚀 Features

- **Objects Gallery:**  
  - Browse known interstellar objects (1I/'Oumuamua, 2I/Borisov, 3I/Atlas)  
  - Sort, search, and filter by status, threat level, cometary activity  
  - Detailed cards: discovery info, velocity, physical/chemical properties, orbital data  
  - Compare up to 3 objects side-by-side

- **Trajectory Visualization:**  
  - Interactive 3D orbital paths, play/pause, zoom, real-time data overlays

- **Statistics Dashboard:**  
  - Velocity comparisons, threat-level distribution, averages  
  - Dynamic charts and scientific insights

- **Planetary Defense Center:**  
  - 12 defense strategies (Detection, Deflection, Evacuation, Mitigation)  
  - Effectiveness ratings, readiness statuses, cost & tech breakdowns

- **Impact Simulator:**  
  - Real-time calculation for simulated impacts  
  - Adjustable parameters (diameter, velocity, angle)  
  - Visual damage, crater, and casualty estimates

- **Solar System Viewer:**  
  - 3D visualization of planetary motion and interstellar object paths  
  - Real-time animation, starfield backgrounds

- **News Feed:**  
  - Live news, discoveries, and trending articles  
  - Category filtering and quick stats dashboard

- **Community Forum:**  
  - Discussion platform with posts, comments, upvotes, author attribution

- **Educational Resources:**  
  - Learning materials, glossary, fun facts

- **Bookmarks & Social Sharing:**  
  - Favorite objects, native mobile sharing

## 🛠️ Tech Stack

- **Frontend:** React + Vite + Tailwind CSS, Three.js (for 3D visualizations)
- **Backend:** Supabase (PostgreSQL, RLS policies for secure data)
- **Deployment:** Bolt.new / Vercel
- **Database:** Objects, trajectories, news articles, forum posts, user profiles

## ⚡ Getting Started

1. **Clone the repo:**  
   ```bash
   git clone https://github.com/your-username/interstellar-watch.git
   cd interstellar-watch
   ```

2. **Install dependencies:**  
   ```bash
   npm install
   ```

3. **Configure environment:**  
   - Add Supabase keys to `.env`
   - Update `src/config.ts` with API endpoints

4. **Run locally:**  
   ```bash
   npm run dev
   ```

5. **Build for production:**  
   ```bash
   npm run build
   ```

## 🗄️ Database Schema

- `interstellar_objects`: core object data (name, type, props)
- `trajectories`: orbital data, velocity, eccentricity
- `defense_strategies`: mitigation/evacuation/technical info
- `news`: articles, tags, views count
- `users`: profiles, preferences
- `forum`: posts, threads, comments

## 🙌 Contributing

- Fork and clone repo
- Create a feature branch: `git checkout -b feature-xyz`
- Write clear, concise docs and code comments
- Submit PR with description of changes

## 📝 Roadmap

- Real-time alerts & notifications
- Impact simulator upgrades
- Timeline of interstellar discoveries
- Enhanced educational content
- User tracking preferences

## 🦾 Security

- All data stored securely with RLS policies
- Public/private separation for sensitive data

## 📄 License

GNU Affero General Public License v3.0 – see [LICENSE](LICENSE)

## 📢 Support & Community

- [Live Demo](https://interstellar-object-gdrz.bolt.host)
- Join our [Community Forum](#)
- Issues/Bugs: submit via GitHub

