# 🌞 SolarMind AI — Cyberpunk Neural Grid Dashboard

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Vanilla JS](https://img.shields.io/badge/Core-Vanilla%20JS-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/Styling-Vanilla%20CSS-ff69b4.svg)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Chart.js](https://img.shields.io/badge/Charts-Chart.js%20v4-green.svg)](https://www.chartjs.org/)

**SolarMind AI** is a premium, retro-futuristic, cyberpunk-themed solar power forecasting and grid monitoring platform. Built entirely using high-performance vanilla web technologies, it provides interactive AI-driven simulations, sensor telemetry feeds, voice command support, and comprehensive data visualizations.

---

## 🚀 Key Features

*   **⚡ Live Telemetry Stats**: Monitors real-time power generation (kW), conversion efficiency (%), online panels, revenue, temperature, and cumulative daily carbon offset (CO₂ tons) with animated counter metrics.
*   **🎛️ AI Forecast Slider Engine**: Adjust parameters like Solar Irradiance, Temperature, Cloud Cover, Humidity, and Wind Speed to immediately run a simulated Random Forest regression model that predicts solar array yield.
*   **📊 Multi-Dimensional Data Visualizations**: Powered by **Chart.js** with customized neon gradients and glow filters:
    *   *24h actual vs. predicted* generation line charts with confidence intervals.
    *   *Temperature vs. Irradiance* scatter correlation.
    *   *Cloud cover efficiency impact* curve.
    *   *Monthly generation* breakdown, *seasonal patterns* radar charts, and *peak generation* polar coordinates.
*   **🤖 AI Sentient Chatbot**: A slide-in utility panel answering complex questions regarding grid health, savings, panel thermal levels, and weather impacts.
*   **🎤 Voice Commands**: Native Web Speech API integration offering voice recognition prompts and spoken responses.
*   **📈 Sub-Array Health Monitoring**: Independent diagnostic tiles showing real-time health (%), voltage, and current indicators for a 12-panel system.
*   **🌍 Hotspot Interactive Globe**: Pulsing hotspots mapping global solar capacities on a rotating wireframe grid.
*   **📥 Canvas Report PDF Export**: Generates and downloads snapshot PNG/PDF summary reports of the entire live UI state.
*   **🎨 Theme Control**: Instantly toggles between Dark Neon Cyberpunk and Clean Futuristic Light Mode.
*   **🔔 System Sound Alerts**: Triggers retro low-volume alert synths upon critical system state changes or warning notifications.

---

## 🛠️ Technology Stack

*   **HTML5 / CSS3**: Hand-crafted Glassmorphism styling (`backdrop-filter`), CSS custom variables, `@keyframes` neon glow pulses, and glitch text effects.
*   **Vanilla JavaScript**: Zero heavy framework overhead (no React/Vue) keeping UI response speeds instantaneous.
*   **Canvas API**: Dynamic background particle animation networks.
*   **Chart.js**: Client-side rendering of high-fidelity dashboard charts.
*   **Web Speech API**: In-browser speech synthesis and recognition.
*   **html2canvas**: PDF/Image reporting generation.
*   **Node.js**: Includes a lightweight, dependency-free static file server (`server.js`).

---

## 💻 Local Installation & Usage

### 1. Direct Web Browser (No Installation)
Because the codebase uses CDN-loaded libraries, you can run the dashboard locally without installing any tools:
1. Download or clone this repository.
2. Double-click `index.html` to open it in any modern browser.

### 2. Run Local Server (Node.js)
To avoid local CORS browser security restrictions (especially for some web speech and file features), you can run the integrated server:
```bash
# Clone the repository
git clone https://github.com/Harshsingh2598/solarmind-ai.git

# Navigate into directory
cd solarmind-ai

# Start the zero-dependency server
node server.js
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 📁 Project Structure

```
├── index.html       # UI structure and components
├── style.css        # Cyberpunk stylesheet (variables, glassmorphism, keyframes)
├── app.js           # Chart logic, prediction equations, and chat/voice engine
├── server.js        # Lightweight static HTTP server
└── .gitignore       # Untracked files list
```

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
