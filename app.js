/* ==========================================================
   SOLARMIND AI — Application Engine (v2.0)
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initLoadingScreen();
});

// App State
const state = {
  theme: "dark",
  prediction: {
    irradiance: 750,
    temperature: 28,
    cloud: 15,
    humidity: 45,
    wind: 12
  },
  charts: {},
  realtimeTimer: null
};

// ==========================================
// 1. LOADING SCREEN & ROUTING
// ==========================================
function initLoadingScreen() {
  const loadingScreen = document.getElementById("loadingScreen");
  const loadingStatus = document.getElementById("loadingStatus");
  const loadingBar = document.getElementById("loadingBar");
  const loadingPercent = document.getElementById("loadingPercent");
  const app = document.getElementById("app");

  const steps = [
    { percent: 15, status: "Establishing link to Solar Grid..." },
    { percent: 35, status: "Retrieving historical weather data..." },
    { percent: 55, status: "Bootstrapping Random Forest trees..." },
    { percent: 75, status: "Syncing photovoltaic panel telemetry..." },
    { percent: 90, status: "Calibrating Neural Net forecasting models..." },
    { percent: 100, status: "System Ready. Initializing Dashboard." }
  ];

  let currentStep = 0;
  let currentPercent = 0;

  const interval = setInterval(() => {
    if (currentStep < steps.length) {
      const target = steps[currentStep].percent;
      loadingStatus.textContent = steps[currentStep].status;

      if (currentPercent < target) {
        currentPercent += Math.floor(Math.random() * 3) + 1;
        if (currentPercent > target) currentPercent = target;
        loadingBar.style.width = `${currentPercent}%`;
        loadingPercent.textContent = `${currentPercent}%`;
      } else {
        currentStep++;
      }
    } else {
      clearInterval(interval);
      setTimeout(() => {
        loadingScreen.classList.add("hidden");
        app.classList.remove("hidden");
        // Trigger initialization of the application
        initApp();
      }, 500);
    }
  }, 35);
}

function initApp() {
  initParticles();
  initTheme();
  initNavigation();
  initNumbersCounter();
  initCharts();
  initPredictionEngine();
  initPanelsMonitor();
  initAISentinel();
  initVoiceInterface();
  initExport();
  startRealtimeSimulation();

  // Initial toast notifications
  setTimeout(() => showToast("⚡ Cybernetic grid connected successfully.", "info"), 1000);
  setTimeout(() => showToast("🌦️ Cloud cover forecast revised: -5% expected.", "info"), 4000);
  setTimeout(() => showToast("⚠️ Panel 07 efficiency dropped below threshold.", "warning"), 8000);
}

// ==========================================
// 2. PARTICLE NETWORK CANVAS
// ==========================================
function initParticles() {
  const canvas = document.getElementById("particleCanvas");
  const ctx = canvas.getContext("2d");
  let particles = [];
  const maxParticles = 60;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.radius = Math.random() * 1.5 + 0.5;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
      if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = state.theme === "dark" ? "rgba(0, 240, 255, 0.4)" : "rgba(0, 143, 168, 0.3)";
      ctx.fill();
    }
  }

  for (let i = 0; i < maxParticles; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const alpha = (100 - dist) / 100 * 0.08;
          ctx.strokeStyle = state.theme === "dark" 
            ? `rgba(0, 240, 255, ${alpha})` 
            : `rgba(0, 143, 168, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
}

// ==========================================
// 3. NAVIGATION & THEME SYSTEM
// ==========================================
function initTheme() {
  const themeToggle = document.getElementById("themeToggle");
  
  // Set default theme from DOM state
  state.theme = document.documentElement.getAttribute("data-theme") || "dark";

  themeToggle.addEventListener("click", () => {
    state.theme = state.theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", state.theme);
    
    // Re-initialize charts with matching styles
    initCharts();
    initPanelsMonitor();
    
    // Update theme toggle icon
    themeToggle.innerHTML = state.theme === "dark" 
      ? `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
      : `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>`;

    showToast(`🎨 Theme switched to ${state.theme.toUpperCase()} mode.`, "info");
  });
}

function initNavigation() {
  const links = document.querySelectorAll(".nav-link");
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      links.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
      
      const targetId = link.getAttribute("data-section");
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Track active section on scroll
  window.addEventListener("scroll", () => {
    let scrollPos = window.scrollY + 120;
    const sections = document.querySelectorAll("section[id]");
    
    sections.forEach(sec => {
      if (scrollPos >= sec.offsetTop && scrollPos < (sec.offsetTop + sec.offsetHeight)) {
        const id = sec.getAttribute("id");
        links.forEach(l => {
          l.classList.remove("active");
          if (l.getAttribute("data-section") === id) {
            l.classList.add("active");
          }
        });
      }
    });
  });
}

// Stats counter roll animation
function initNumbersCounter() {
  const elements = document.querySelectorAll(".stat-value, .gs-number");
  
  elements.forEach(el => {
    const target = parseFloat(el.getAttribute("data-target"));
    const prefix = el.getAttribute("data-prefix") || "";
    const suffix = el.getAttribute("data-suffix") || "";
    let current = 0;
    const step = target / 30; // 30 steps animation
    
    const countInterval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(countInterval);
      }
      
      if (Number.isInteger(target)) {
        el.textContent = `${prefix}${Math.round(current).toLocaleString()}${suffix}`;
      } else {
        el.textContent = `${prefix}${current.toFixed(1)}${suffix}`;
      }
    }, 25);
  });
}

// ==========================================
// 4. CHART GENERATION (CHART.JS)
// ==========================================
function getThemeColors() {
  const isDark = state.theme === "dark";
  return {
    gridColor: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
    textColor: isDark ? "#8888b5" : "#475569",
    mainGlow: isDark ? "rgba(0, 240, 255, 0.3)" : "rgba(59, 130, 246, 0.15)",
    orangeGlow: isDark ? "rgba(255, 106, 0, 0.3)" : "rgba(224, 83, 0, 0.15)"
  };
}

function initCharts() {
  const c = getThemeColors();
  
  // Destroy existing charts to reload them cleanly
  Object.keys(state.charts).forEach(key => {
    if (state.charts[key]) state.charts[key].destroy();
  });

  Chart.defaults.color = c.textColor;
  Chart.defaults.font.family = "'Rajdhani', sans-serif";
  Chart.defaults.font.size = 11;

  // Chart 1: 24h Generation Forecast
  const fcCtx = document.getElementById("forecastChart").getContext("2d");
  const gradientActual = fcCtx.createLinearGradient(0, 0, 0, 300);
  gradientActual.addColorStop(0, "rgba(255, 106, 0, 0.4)");
  gradientActual.addColorStop(1, "rgba(255, 106, 0, 0.0)");

  const gradientPredicted = fcCtx.createLinearGradient(0, 0, 0, 300);
  gradientPredicted.addColorStop(0, "rgba(0, 240, 255, 0.3)");
  gradientPredicted.addColorStop(1, "rgba(0, 240, 255, 0.0)");

  state.charts.forecast = new Chart(fcCtx, {
    type: "line",
    data: {
      labels: Array.from({length: 24}, (_, i) => `${String(i).padStart(2, '0')}:00`),
      datasets: [
        {
          label: "Actual Yield",
          data: [0, 0, 0, 0, 0, 10, 45, 150, 320, 510, 680, 780, 840, 810, 720, 560, 380, 180, 50, 5, 0, 0, 0, 0],
          borderColor: "#ff6a00",
          backgroundColor: gradientActual,
          fill: true,
          tension: 0.4,
          borderWidth: 2,
          pointBackgroundColor: "#ffbe00"
        },
        {
          label: "AI Predicted Yield",
          data: [0, 0, 0, 0, 2, 18, 55, 170, 340, 530, 710, 810, 850, 825, 740, 590, 400, 195, 60, 8, 0, 0, 0, 0],
          borderColor: "#00f0ff",
          backgroundColor: gradientPredicted,
          fill: true,
          tension: 0.4,
          borderWidth: 2,
          pointBackgroundColor: "#00c9a7",
          borderDash: [5, 5]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "top" }
      },
      scales: {
        x: { grid: { color: c.gridColor } },
        y: { grid: { color: c.gridColor }, ticks: { callback: value => `${value} kW` } }
      }
    }
  });

  // Chart 2: Temp-Irradiance Correlation Scatter
  const tiCtx = document.getElementById("tempIrradChart").getContext("2d");
  state.charts.tempIrrad = new Chart(tiCtx, {
    type: "scatter",
    data: {
      datasets: [{
        label: "Operational Panels",
        data: Array.from({length: 40}, () => ({
          x: Math.random() * 800 + 300,
          y: Math.random() * 25 + 15
        })),
        backgroundColor: "#a855f7"
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { title: { display: true, text: "Irradiance (W/m²)" }, grid: { color: c.gridColor } },
        y: { title: { display: true, text: "Temperature (°C)" }, grid: { color: c.gridColor } }
      }
    }
  });

  // Chart 3: Cloud Impact
  const ciCtx = document.getElementById("cloudImpactChart").getContext("2d");
  state.charts.cloudImpact = new Chart(ciCtx, {
    type: "line",
    data: {
      labels: ["0%", "20%", "40%", "60%", "80%", "100%"],
      datasets: [{
        label: "Efficiency Reduction Curve",
        data: [100, 92, 75, 45, 20, 5],
        borderColor: "#ff2d95",
        backgroundColor: "rgba(255, 45, 149, 0.1)",
        fill: true,
        tension: 0.3,
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { grid: { color: c.gridColor } },
        y: { grid: { color: c.gridColor }, ticks: { callback: v => `${v}%` } }
      }
    }
  });

  // Chart 4: Monthly Generation
  const monCtx = document.getElementById("monthlyChart").getContext("2d");
  state.charts.monthly = new Chart(monCtx, {
    type: "bar",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [{
        label: "Energy generated (MWh)",
        data: [12.4, 14.2, 18.5, 22.4, 26.8, 29.5, 30.1, 28.4, 23.5, 19.1, 14.5, 11.2],
        backgroundColor: "rgba(0, 240, 255, 0.65)",
        borderColor: "#00f0ff",
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { grid: { color: c.gridColor } },
        y: { grid: { color: c.gridColor } }
      }
    }
  });

  // Chart 5: Seasonal Pattern Radar
  const seaCtx = document.getElementById("seasonalChart").getContext("2d");
  state.charts.seasonal = new Chart(seaCtx, {
    type: "radar",
    data: {
      labels: ["Spring", "Summer", "Autumn", "Winter"],
      datasets: [
        {
          label: "Optimal Predicted Curve",
          data: [85, 100, 70, 45],
          borderColor: "#ffbe00",
          backgroundColor: "rgba(255, 190, 0, 0.1)"
        },
        {
          label: "Current Year Performance",
          data: [88, 97, 68, 48],
          borderColor: "#00ff88",
          backgroundColor: "rgba(0, 255, 136, 0.1)"
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          grid: { color: c.gridColor },
          angleLines: { color: c.gridColor },
          pointLabels: { color: c.textColor }
        }
      }
    }
  });

  // Chart 6: Peak vs Off-Peak Polar
  const peakCtx = document.getElementById("peakChart").getContext("2d");
  state.charts.peak = new Chart(peakCtx, {
    type: "polarArea",
    data: {
      labels: ["Peak (10:00-15:00)", "Mid-Peak", "Off-Peak"],
      datasets: [{
        data: [65, 25, 10],
        backgroundColor: [
          "rgba(255, 106, 0, 0.7)",
          "rgba(168, 85, 247, 0.7)",
          "rgba(59, 130, 246, 0.7)"
        ]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          grid: { color: c.gridColor }
        }
      }
    }
  });

  // Chart 7: Array Efficiency Over Time
  const effCtx = document.getElementById("efficiencyChart").getContext("2d");
  state.charts.efficiency = new Chart(effCtx, {
    type: "line",
    data: {
      labels: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"],
      datasets: [{
        label: "Grid Conversion Ratio",
        data: [91.2, 92.5, 93.8, 94.7, 94.2, 93.9, 92.1, 90.5],
        borderColor: "#00ff88",
        backgroundColor: "rgba(0, 255, 136, 0.05)",
        tension: 0.3,
        borderWidth: 2,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { grid: { color: c.gridColor } },
        y: { min: 80, max: 100, grid: { color: c.gridColor }, ticks: { callback: v => `${v}%` } }
      }
    }
  });

  // Chart 8: Renewable Energy Mix Doughnut
  const mixCtx = document.getElementById("renewableMixChart").getContext("2d");
  state.charts.renewableMix = new Chart(mixCtx, {
    type: "doughnut",
    data: {
      labels: ["Solar PV", "Wind Turbine", "Hydroelectric", "Bio-Energy"],
      datasets: [{
        data: [42, 31, 20, 7],
        backgroundColor: [
          "#ff6a00",
          "#00f0ff",
          "#3b82f6",
          "#a855f7"
        ]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "right" }
      }
    }
  });

  // Chart 9: Capacity Growth line
  const growthCtx = document.getElementById("growthChart").getContext("2d");
  state.charts.growth = new Chart(growthCtx, {
    type: "line",
    data: {
      labels: ["2021", "2022", "2023", "2024", "2025", "2026 (Est)"],
      datasets: [{
        label: "Solar Capacity (GW)",
        data: [720, 890, 1050, 1185, 1340, 1550],
        borderColor: "#00f0ff",
        backgroundColor: "rgba(0, 240, 255, 0.1)",
        tension: 0.2,
        borderWidth: 2,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { grid: { color: c.gridColor } },
        y: { grid: { color: c.gridColor } }
      }
    }
  });

  // Initialize gauge circle layouts
  const gauges = document.querySelectorAll(".gauge-fill");
  gauges.forEach(gauge => {
    const pct = parseInt(gauge.getAttribute("data-percent"));
    // 339.29 is full ring. Subtract relative portion.
    const offset = 339.29 - (339.29 * pct / 100);
    gauge.style.strokeDashoffset = offset;
  });
}

// ==========================================
// 5. FORECAST / PREDICTION ENGINE
// ==========================================
function initPredictionEngine() {
  const sliders = ["irradiance", "temperature", "cloud", "humidity", "wind"];
  
  sliders.forEach(id => {
    const slider = document.getElementById(id);
    const valDisplay = document.getElementById(`${id}Val`);
    
    slider.addEventListener("input", () => {
      let suffix = "";
      if (id === "irradiance") suffix = " W/m²";
      else if (id === "temperature") suffix = "°C";
      else if (id === "cloud" || id === "humidity") suffix = "%";
      else if (id === "wind") suffix = " km/h";
      
      valDisplay.textContent = `${slider.value}${suffix}`;
      state.prediction[id] = parseInt(slider.value);
    });
  });

  const predictBtn = document.getElementById("predictBtn");
  predictBtn.addEventListener("click", () => {
    runModelPrediction();
    showToast("🧠 AI Neural model executed forecast computation.", "info");
  });

  // Run initial prediction
  runModelPrediction();
}

function runModelPrediction() {
  const p = state.prediction;
  
  // Custom formula simulated model representing solar forecasting
  // High irradiance = high output, high temperature = slight efficiency penalty
  // High cloud cover = severe output reduction
  const baseEfficiency = 0.22; // 22% panel efficiency
  const panelArea = 4000; // 4000 square meters of arrays
  
  // Temp coefficient: -0.4% efficiency per degree above 25°C
  const tempCorrection = p.temperature > 25 ? (1 - (p.temperature - 25) * 0.004) : 1;
  const cloudLoss = 1 - (p.cloud * 0.0085);
  const humidityLoss = 1 - (p.humidity * 0.001);
  
  let predictedkW = (p.irradiance * panelArea * baseEfficiency * tempCorrection * cloudLoss * humidityLoss) / 1000;
  predictedkW = Math.max(0, predictedkW);
  
  // Update prediction output circles/metrics
  const valueDisplay = document.getElementById("predictionValue");
  const ring = document.getElementById("predictionRing");
  
  // Smooth slide count animation
  animateValue(valueDisplay, Math.round(predictedkW));
  
  // Maximum theoretical output is around 1000 kW
  const percent = Math.min(100, (predictedkW / 1000) * 100);
  const offset = 339.29 - (339.29 * percent / 100);
  ring.style.strokeDashoffset = offset;

  // Confidence calculations
  const confidence = Math.max(70, 98 - (p.cloud * 0.15) - (Math.abs(25 - p.temperature) * 0.2)).toFixed(1);
  const mse = (0.015 + (p.cloud * 0.0004)).toFixed(3);
  const r2 = (0.98 - (p.humidity * 0.0002)).toFixed(3);
  
  document.getElementById("predConfidence").textContent = `${confidence}%`;
  document.getElementById("predMSE").textContent = mse;
  document.getElementById("predR2").textContent = r2;
  
  const genKWh = Math.round(predictedkW * 7.5).toLocaleString();
  document.getElementById("predYield").textContent = `${genKWh} kWh`;
}

function animateValue(obj, end, duration = 800) {
  let start = parseInt(obj.textContent) || 0;
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.textContent = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// ==========================================
// 6. PHOTOVOLTAIC PANEL GRID MONITOR
// ==========================================
function initPanelsMonitor() {
  const panelGrid = document.getElementById("panelGrid");
  panelGrid.innerHTML = ""; // Clear existing

  for (let i = 1; i <= 12; i++) {
    const id = `PV-${String(i).padStart(3, '0')}`;
    const health = i === 7 ? 68 : Math.floor(Math.random() * 8) + 92;
    const output = i === 7 ? 35 : Math.floor(Math.random() * 25) + 65;
    let statusClass = "active";
    if (health < 80) statusClass = "fault";
    else if (health < 95) statusClass = "warning";

    const pCard = document.createElement("div");
    pCard.className = "panel-card";
    pCard.innerHTML = `
      <span class="panel-id">${id}</span>
      <span class="panel-status-dot ${statusClass}"></span>
      <div class="panel-icon-wrap">
        <svg viewBox="0 0 24 24" class="panel-svg" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <line x1="3" y1="9" x2="21" y2="9"/>
          <line x1="3" y1="15" x2="21" y2="15"/>
          <line x1="9" y1="3" x2="9" y2="21"/>
          <line x1="15" y1="3" x2="15" y2="21"/>
        </svg>
      </div>
      <div class="panel-metrics">
        <span class="panel-output">${output} kW</span>
        <span class="panel-health">${health}% H</span>
      </div>
      <div class="panel-grid-footer">
        <span>Temp: ${(26 + Math.random() * 6).toFixed(1)}°</span>
        <span>A: ${((output * 1000) / 400).toFixed(0)}A</span>
      </div>
    `;
    panelGrid.appendChild(pCard);
  }
}

// ==========================================
// 7. REAL-TIME DATA SIMULATION ENGINE
// ==========================================
function startRealtimeSimulation() {
  if (state.realtimeTimer) clearInterval(state.realtimeTimer);
  
  state.realtimeTimer = setInterval(() => {
    // 1. Update live metrics slightly
    const kwElement = document.querySelector("#statPower .stat-value");
    const effElement = document.querySelector("#statEfficiency .stat-value");
    const tempElement = document.querySelector("#statTemp .stat-value");
    
    let baseKW = 840 + (Math.random() * 20 - 10);
    let baseEff = 94 + (Math.random() * 2 - 1);
    let baseTemp = 32 + (Math.random() * 2 - 1);
    
    kwElement.textContent = `${baseKW.toFixed(1)} kW`;
    effElement.textContent = `${baseEff.toFixed(1)}%`;
    tempElement.textContent = `${baseTemp.toFixed(1)}°C`;

    // 2. Randomly jitter the chart forecast slightly to make it alive
    if (state.charts.forecast) {
      const actualDataset = state.charts.forecast.data.datasets[0].data;
      const hours = new Date().getHours();
      // Jitter the actual yield around current hour index
      if (actualDataset[hours] !== undefined && actualDataset[hours] > 0) {
        actualDataset[hours] += (Math.random() * 10 - 5);
        state.charts.forecast.update("none"); // Update silently without animation refresh
      }
    }

    // 3. Occasionally trigger random toast alerts
    if (Math.random() > 0.85) {
      const weatherEvents = [
        "🌦️ Weather telemetry updated: humidity rising.",
        "⚡ Power surge handled by inverter network.",
        "🤖 SolarMind AI optimized battery load profile.",
        "🌍 Carbon offset checkpoint completed."
      ];
      const randomEvent = weatherEvents[Math.floor(Math.random() * weatherEvents.length)];
      showToast(randomEvent, "info");
    }

  }, 3500);
}

// ==========================================
// 8. AI SENTINEL CHAT DRAWED LOGIC
// ==========================================
function initAISentinel() {
  const chatToggle = document.getElementById("chatToggle");
  const chatClose = document.getElementById("chatClose");
  const chatPanel = document.getElementById("chatPanel");
  const chatInput = document.getElementById("chatInput");
  const chatSend = document.getElementById("chatSend");
  const chatMessages = document.getElementById("chatMessages");

  chatToggle.addEventListener("click", () => chatPanel.classList.toggle("open"));
  chatClose.addEventListener("click", () => chatPanel.classList.remove("open"));

  function appendMessage(text, sender) {
    const msgDiv = document.createElement("div");
    msgDiv.className = `chat-msg ${sender}`;
    msgDiv.innerHTML = `<div class="msg-bubble">${text}</div>`;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  async function handleSend() {
    const text = chatInput.value.trim();
    if (!text) return;
    appendMessage(text, "user");
    chatInput.value = "";

    // Show a typing indicator message
    const tempId = "typing-" + Date.now();
    const typingDiv = document.createElement("div");
    typingDiv.className = "chat-msg bot";
    typingDiv.id = tempId;
    typingDiv.innerHTML = `<div class="msg-bubble" style="opacity: 0.6;">Searching telemetry satellite grid...</div>`;
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    try {
      const response = await generateAIResponse(text);
      document.getElementById(tempId).remove();
      appendMessage(response, "bot");
    } catch (err) {
      document.getElementById(tempId).remove();
      appendMessage("Unable to complete weather query.", "bot");
    }
  }

  chatSend.addEventListener("click", handleSend);
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSend();
  });
}

const STATE_MAPPINGS = {
  "jammu and kashmir": "Srinagar",
  "jammu kashmir": "Srinagar",
  "maharashtra": "Mumbai",
  "california": "Sacramento",
  "texas": "Austin",
  "new york": "Albany",
  "florida": "Tallahassee",
  "punjab": "Chandigarh",
  "haryana": "Chandigarh",
  "delhi": "New Delhi",
  "goa": "Panaji",
  "karnataka": "Bengaluru",
  "tamil nadu": "Chennai",
  "uttar pradesh": "Lucknow",
  "bihar": "Patna",
  "west bengal": "Kolkata",
  "rajasthan": "Jaipur",
  "gujarat": "Gandhinagar",
  "madhya pradesh": "Bhopal",
  "kerala": "Thiruvananthapuram",
  "telangana": "Hyderabad",
  "andhra pradesh": "Amaravati",
  "assam": "Dispur",
  "himachal pradesh": "Shimla",
  "uttarakhand": "Dehradun",
  "odisha": "Bhubaneswar",
  "chhattisgarh": "Raipur",
  "jharkhand": "Ranchi"
};

async function fetchRealTimeWeather(locationName) {
  try {
    let searchName = locationName.toLowerCase().trim();
    
    // Check if the search matches a state mapping to route to its capital
    if (STATE_MAPPINGS[searchName]) {
      console.log(`Mapping state ${locationName} to capital ${STATE_MAPPINGS[searchName]}`);
      searchName = STATE_MAPPINGS[searchName];
    }
    
    let latitude, longitude, locationFullName;
    
    // 1. Try Nominatim Geocoding API first (authenticated with user email to prevent 403 blocks)
    try {
      const nominatimUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchName)}&format=json&limit=1&email=harshsingh359800@gmail.com`;
      const nomResponse = await fetch(nominatimUrl);
      const nomData = await nomResponse.json();
      
      if (nomData && nomData.length > 0) {
        latitude = parseFloat(nomData[0].lat);
        longitude = parseFloat(nomData[0].lon);
        locationFullName = nomData[0].display_name;
      }
    } catch (nomErr) {
      console.warn("Nominatim geocoding failed, trying Open-Meteo:", nomErr);
    }
    
    // 2. Fallback to Open-Meteo Geocoding
    if (latitude === undefined || longitude === undefined) {
      const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchName)}&count=1&language=en&format=json`;
      const geoResponse = await fetch(geocodeUrl);
      const geoData = await geoResponse.json();
      
      if (geoData.results && geoData.results.length > 0) {
        const location = geoData.results[0];
        latitude = location.latitude;
        longitude = location.longitude;
        const { name, country, admin1 } = location;
        locationFullName = admin1 ? `${name}, ${admin1}, ${country}` : `${name}, ${country}`;
      }
    }
    
    // 3. Check coordinates
    if (latitude === undefined || longitude === undefined) {
      return `I could not locate "${locationName}" on the weather grid. Please verify the state or country spelling.`;
    }
    
    // 4. Fetch current weather from coordinates using Open-Meteo
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`;
    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();
    
    if (!weatherData.current) {
      return `Telemetry retrieval failed for ${locationFullName}.`;
    }
    
    const temp = weatherData.current.temperature_2m;
    const humidity = weatherData.current.relative_humidity_2m;
    const windSpeed = weatherData.current.wind_speed_10m;
    const code = weatherData.current.weather_code;
    
    // Simple code to text mapping in English
    const weatherConditions = {
      0: "Clear sky",
      1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
      45: "Foggy", 48: "Depositing rime fog",
      51: "Light drizzle", 53: "Moderate drizzle", 55: "Dense drizzle",
      61: "Slight rain", 63: "Moderate rain", 65: "Heavy rain",
      71: "Slight snow", 73: "Moderate snow", 75: "Heavy snow",
      77: "Snow grains",
      80: "Slight rain showers", 81: "Moderate rain showers", 82: "Violent rain showers",
      85: "Slight snow showers", 86: "Heavy snow showers",
      95: "Thunderstorm", 96: "Thunderstorm with slight hail", 99: "Thunderstorm with heavy hail"
    };

    // Hindi weather condition mapping
    const weatherConditionsHindi = {
      0: "साफ आसमान",
      1: "मुख्य रूप से साफ", 2: "आंशिक रूप से बादल", 3: "घने बादल",
      45: "कोहरा", 48: "बर्फीला कोहरा",
      51: "हल्की बूंदाबांदी", 53: "मध्यम बूंदाबांदी", 55: "घनी बूंदाबांदी",
      61: "हल्की बारिश", 63: "मध्यम बारिश", 65: "भारी बारिश",
      71: "हल्की बर्फबारी", 73: "मध्यम बर्फबारी", 75: "भारी बर्फबारी",
      77: "ओले",
      80: "हल्की बौछारें", 81: "मध्यम बौछारें", 82: "तेज बौछारें",
      85: "हल्की बर्फ की बौछारें", 86: "भारी बर्फ की बौछारें",
      95: "गरज के साथ आंधी", 96: "ओलों के साथ आंधी", 99: "भारी ओलों के साथ तूफान"
    };
    
    // Format the display name nicely
    let displayName = locationFullName;
    if (STATE_MAPPINGS[locationName.toLowerCase().trim()]) {
      displayName = `${locationName} (${searchName})`;
    } else if (displayName.length > 50) {
      const parts = displayName.split(", ");
      if (parts.length > 3) {
        displayName = parts.slice(0, 3).join(", ");
      }
    }

    const isHindi = state.voiceLang === "hi-IN";
    
    if (isHindi) {
      const conditionHindi = weatherConditionsHindi[code] || "बदलते मौसम की स्थिति";
      return `${displayName} के लिए मौसम की जानकारी: वर्तमान में तापमान ${temp}°C है, हवा में नमी ${humidity}% है, हवा की गति ${windSpeed} किमी प्रति घंटा है, और मौसम: ${conditionHindi} है।`;
    } else {
      const condition = weatherConditions[code] || "variable atmospheric conditions";
      return `Weather telemetry for ${displayName}: Currently ${temp}°C with ${humidity}% humidity, wind speed at ${windSpeed} km/h, experiencing ${condition}.`;
    }
  } catch (error) {
    console.error(error);
    const isHindi = state.voiceLang === "hi-IN";
    return isHindi 
      ? `सैटेलाइट ग्रिड कनेक्टिविटी में समस्या है। ${locationName} का मौसम नहीं मिल सका।`
      : `Satellite grid connectivity error. Unable to get real-time parameters for ${locationName}.`;
  }
}

async function generateAIResponse(q) {
  const lowercaseQ = q.toLowerCase();
  const isHindi = state.voiceLang === "hi-IN";
  
  // Hindi Query Handling
  if (isHindi) {
    if (lowercaseQ.includes("मौसम") || lowercaseQ.includes("तापमान") || lowercaseQ.includes("ताप")) {
      let cleaned = lowercaseQ;
      const hindiToRemove = [
        "का मौसम बताएं", "का मौसम", "का तापमान बताएं", "का तापमान", "मौसम बताएं", "तापमान बताएं", 
        "मौसम", "तापमान", "ताप", "कैसा है", "क्या है", "बताएं", "कृपया", "दिखाएं"
      ];
      hindiToRemove.forEach(kw => {
        cleaned = cleaned.replaceAll(kw, "");
      });
      
      const connectors = ["का", "की", "के", "में", "से", "पर", "को", "है"];
      connectors.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'g');
        cleaned = cleaned.replace(regex, "");
      });
      
      cleaned = cleaned.replace(/[?.!,]/g, "");
      const locationInput = cleaned.replace(/\s+/g, " ").trim();
      
      if (locationInput.length >= 2) {
        return await fetchRealTimeWeather(locationInput);
      }
    }
    
    if (lowercaseQ.includes("पूर्वानुमान") || lowercaseQ.includes("उत्पादन") || lowercaseQ.includes("बिजली")) {
      return "हमारा न्यूरल फोरकास्ट आज दोपहर 13:00 बजे लगभग 850 kW के पीक जेनरेशन की भविष्यवाणी करता है। सौर ग्रिड पूरी तरह से एक्टिव है।";
    }
    if (lowercaseQ.includes("पैनल") || lowercaseQ.includes("एफिशिएंसी") || lowercaseQ.includes("स्वास्थ्य")) {
      return "सिस्टम में 12 सब-एरे हैं। सब-एरे PV-007 में 38.2°C का तापमान है, जिससे इसकी स्थानीय एफिशिएंसी घटकर 68% हो गई है।";
    }
    if (lowercaseQ.includes("बचत") || lowercaseQ.includes("कमाई") || lowercaseQ.includes("राजस्व")) {
      return "आपने आज 2.34 टन कार्बन डाइऑक्साइड बचाया है। यह स्मार्ट ग्रिड के माध्यम से लगभग $1,892 का नेट राजस्व देता है।";
    }
    return "क्वेरी पूरी हो गई है। ग्रिड के सभी आंकड़े सामान्य हैं। बताएं यदि आपको किसी विशेष पैनल या मौसम की जानकारी चाहिए।";
  }
  
  // English & Hinglish Query Handling (Default fallback)
  if (
    lowercaseQ.includes("weather") || 
    lowercaseQ.includes("temp") || 
    lowercaseQ.includes("temperature") || 
    lowercaseQ.includes("vedar") || 
    lowercaseQ.includes("mausam")
  ) {
    let cleaned = lowercaseQ;
    
    // Remove English and Hinglish command prefixes
    const keywordsToRemove = [
      "can you tell me the", "can you tell me", "what is the", "give me the", 
      "show me the", "tell me the", "how is the", "show me", "tell me", "give me",
      "kya mujhe aap", "kya aap mujhe", "bata sakte ho", "bata sakte hai", "bata sakte hain", 
      "bata sakte ha", "bata sakte", "weather", "temperature", "temp", "vedar", "mausam",
      "forecast", "report", "conditions"
    ];
    keywordsToRemove.forEach(kw => {
      cleaned = cleaned.replaceAll(kw, "");
    });
    
    // Remove standalone connector and helper words in English and Hinglish
    const connectors = [
      "in", "of", "for", "at", "is", "current", "today", "now", "the", 
      "a", "an", "about", "please", "state", "country", "region", "province",
      "ka", "ki", "ke", "ko", "se", "me", "mein", "par", "ho", "ha", "hai", "hain", "kya", "aap", "mujhe", "bata"
    ];
    connectors.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'g');
      cleaned = cleaned.replace(regex, "");
    });
    
    // Remove punctuation
    cleaned = cleaned.replace(/[?.!,]/g, "");
    
    // Clean spaces and trim
    const locationInput = cleaned.replace(/\s+/g, " ").trim();
    
    if (locationInput.length >= 2) {
      return await fetchRealTimeWeather(locationInput);
    }
  }
  
  if (lowercaseQ.includes("forecast") || lowercaseQ.includes("generation")) {
    return "Our neural forecasting predicts a peak yield of around 850 kW today at 13:00 under the current atmospheric settings. Clear weather yields are fully nominal.";
  }
  if (lowercaseQ.includes("panel") || lowercaseQ.includes("efficiency")) {
    return "The system consists of 12 sub-arrays. Sub-array PV-007 is experiencing a thermal warning of 38.2°C, causing a local efficiency dip to 68%. Standard grid cleaning is advised.";
  }
  if (lowercaseQ.includes("saving") || lowercaseQ.includes("revenue") || lowercaseQ.includes("co2")) {
    return "You have saved 2.34 tons of carbon dioxide today. This translates to roughly $1,892 in net revenue generated through smart grid returns.";
  }
  return "Query processed. Grid metrics are nominal. Let me know if you need to run specific predictions or troubleshoot panel health.";
}

// ==========================================
// 9. WEB SPEECH VOICE INTERFACE
// ==========================================
function initVoiceInterface() {
  const voiceBtn = document.getElementById("voiceBtn");
  const voiceModal = document.getElementById("voiceModal");
  const voiceClose = document.getElementById("voiceClose");
  const voiceMicBtn = document.getElementById("voiceMicBtn");
  const voiceStatus = document.getElementById("voiceStatus");
  const voiceTranscript = document.getElementById("voiceTranscript");
  const voiceResponse = document.getElementById("voiceResponse");

  // Setup Language toggle
  const langEn = document.getElementById("langEn");
  const langHi = document.getElementById("langHi");

  state.voiceLang = "en-US"; // Default language

  langEn.addEventListener("click", () => {
    state.voiceLang = "en-US";
    langEn.classList.add("active");
    langHi.classList.remove("active");
    voiceStatus.textContent = "Language set to English";
  });

  langHi.addEventListener("click", () => {
    state.voiceLang = "hi-IN";
    langHi.classList.add("active");
    langEn.classList.remove("active");
    voiceStatus.textContent = "भाषा हिन्दी चुनी गई";
  });

  voiceBtn.addEventListener("click", () => {
    voiceModal.classList.add("open");
  });

  voiceClose.addEventListener("click", () => {
    voiceModal.classList.remove("open");
    stopListening();
  });

  // Web Speech API check
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    voiceStatus.textContent = "Voice speech not supported by your browser.";
    voiceMicBtn.disabled = true;
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;

  let listening = false;

  function stopListening() {
    recognition.stop();
    voiceModal.classList.remove("listening");
    listening = false;
    voiceStatus.textContent = state.voiceLang === "hi-IN" ? "बोलने के लिए टैप करें" : "Tap to speak";
  }

  voiceMicBtn.addEventListener("click", () => {
    if (listening) {
      stopListening();
    } else {
      voiceTranscript.textContent = "";
      voiceResponse.textContent = "";
      voiceModal.classList.add("listening");
      voiceStatus.textContent = state.voiceLang === "hi-IN" ? "सुन रहा हूँ..." : "Listening...";
      recognition.lang = state.voiceLang;
      recognition.start();
      listening = true;
    }
  });

  recognition.onresult = async (event) => {
    const text = event.results[0][0].transcript;
    voiceTranscript.textContent = `"${text}"`;
    voiceResponse.textContent = state.voiceLang === "hi-IN" ? "प्रोसेसिंग वॉयस टेलीमेट्री..." : "Processing voice telemetry...";
    
    // Process response
    try {
      const botResponse = await generateAIResponse(text);
      voiceResponse.textContent = botResponse;
      speak(botResponse);
    } catch (err) {
      voiceResponse.textContent = state.voiceLang === "hi-IN" ? "वॉयस डेटा पार्स नहीं हो सका।" : "Could not parse voice payload.";
    }

    stopListening();
  };

  recognition.onerror = () => {
    stopListening();
    voiceStatus.textContent = state.voiceLang === "hi-IN" ? "त्रुटि हुई। फिर से प्रयास करें।" : "Error occurred. Try again.";
  };

  recognition.onend = () => {
    stopListening();
  };
}

function speak(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel(); // Cancel any existing speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 0.9;
    utterance.rate = 1.0;
    utterance.lang = state.voiceLang; // Match voice output language
    
    // Attempt to select a native Hindi voice if Hindi is chosen
    if (state.voiceLang === "hi-IN") {
      const voices = window.speechSynthesis.getVoices();
      const hindiVoice = voices.find(v => v.lang.startsWith("hi"));
      if (hindiVoice) {
        utterance.voice = hindiVoice;
      }
    }
    
    window.speechSynthesis.speak(utterance);
  }
}

// ==========================================
// 10. PDF EXPORT UTILITY
// ==========================================
function initExport() {
  const exportBtn = document.getElementById("exportBtn");
  exportBtn.addEventListener("click", () => {
    showToast("📥 Preparing PDF export report...", "info");
    
    const element = document.getElementById("app");
    
    // Temporarily hide elements not needed in PDF
    const nav = document.getElementById("mainNav");
    nav.style.display = "none";
    
    html2canvas(element, {
      backgroundColor: state.theme === "dark" ? "#030308" : "#f0f2f7",
      scale: 1.5,
      logging: false
    }).then(canvas => {
      nav.style.display = "flex";
      
      const link = document.createElement("a");
      link.download = `SolarMind-Forecast-Report-${new Date().toISOString().slice(0,10)}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      
      showToast("✅ SolarMind report exported as image.", "info");
    }).catch(err => {
      nav.style.display = "flex";
      showToast("❌ Export failed.", "error");
    });
  });
}

// ==========================================
// 11. NOTIFICATION SYSTEM
// ==========================================
function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span class="toast-content">${message}</span>
    <button class="toast-close">&times;</button>
  `;

  container.appendChild(toast);

  // Play subtle sound if audio allows
  if (type === "warning" || type === "error") {
    playBeepSound(150);
  }

  // Handle Close
  toast.querySelector(".toast-close").addEventListener("click", () => {
    toast.style.animation = "fade-out 0.3s forwards";
    setTimeout(() => toast.remove(), 300);
  });

  // Auto remove
  setTimeout(() => {
    if (toast.parentNode) {
      toast.style.animation = "fade-out 0.3s forwards";
      setTimeout(() => toast.remove(), 300);
    }
  }, 6000);
}

// Retro computer audio beep using Web Audio API
function playBeepSound(duration) {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.type = "sine";
    oscillator.frequency.value = 650; // Cyber alert tone
    gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime); // Low volume
    
    oscillator.start();
    setTimeout(() => {
      oscillator.stop();
      audioCtx.close();
    }, duration);
  } catch (e) {
    // Audio Context blocked by browser policy until interaction
  }
}
