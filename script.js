// ============================================================
// DISC TEST - MAIN SCRIPT (Most/Least Format)
// ============================================================
let currentQuestion = 0;
// answers[i] = { most: {disc, text}, least: {disc, text} }
let answers = {};
let scores = { D: 0, I: 0, S: 0, C: 0 };
let autoAdvanceTimer = null;

// ---- INIT ----
document.addEventListener("DOMContentLoaded", () => {
  createParticles();
  renderNavDots();
  renderQuestion(0);
});

// ---- PARTICLES ----
function createParticles() {
  const container = document.getElementById("particles-container");
  for (let i = 0; i < 60; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.style.left = Math.random() * 100 + "vw";
    p.style.top = Math.random() * 100 + "vh";
    p.style.width = p.style.height = (Math.random() * 4 + 2) + "px";
    p.style.animationDuration = (Math.random() * 20 + 10) + "s";
    p.style.animationDelay = (Math.random() * 10) + "s";
    p.style.opacity = Math.random() * 0.4 + 0.1;
    container.appendChild(p);
  }
}

// ---- SCREEN SWITCH ----
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  window.scrollTo(0, 0);
}

// ---- START TEST ----
function startTest() {
  if (autoAdvanceTimer) { clearTimeout(autoAdvanceTimer); autoAdvanceTimer = null; }
  currentQuestion = 0;
  answers = {};
  scores = { D: 0, I: 0, S: 0, C: 0 };
  // Reset shuffle state
  QUESTIONS.forEach(q => { delete q._shuffled; });
  renderNavDots();
  renderQuestion(0);
  showScreen("screen-test");
}

// ---- RENDER NAV DOTS ----
function renderNavDots() {
  const container = document.getElementById("nav-dots");
  container.innerHTML = "";
  QUESTIONS.forEach((_, i) => {
    // Thêm separator mỗi 12 câu (phân chia 4 block A-B-C-D)
    if (i > 0 && i % 12 === 0) {
      const sep = document.createElement("div");
      sep.className = "nav-dot-sep";
      container.appendChild(sep);
    }
    const dot = document.createElement("div");
    dot.className = "nav-dot" + (i === 0 ? " active" : "");
    dot.id = "dot-" + i;
    dot.title = `Nhóm ${i + 1}`;
    dot.onclick = () => jumpToQuestion(i);
    container.appendChild(dot);
  });
}

// ---- RENDER QUESTION (Most/Least Format) ----
function renderQuestion(index) {
  const q = QUESTIONS[index];
  const blockNames = ["A – Phong Cách Cơ Bản", "B – Giao Tiếp & Quan Hệ", "C – Lãnh Đạo & Nhóm", "D – Giá Trị & Tư Duy"];
  const blockLabel = blockNames[Math.floor(index / 12)] || "Tổng Hợp";
  document.getElementById("q-category").textContent = blockLabel;
  document.getElementById("q-number").textContent = `Nhóm ${q.id} / ${QUESTIONS.length}`;
  document.getElementById("current-q").textContent = index + 1;
  document.getElementById("total-q").textContent = QUESTIONS.length;

  // Ẩn q-text (không dùng nữa trong format Most/Least)
  const qTextEl = document.getElementById("q-text");
  if (qTextEl) qTextEl.style.display = "none";

  // Progress bar
  const pct = Math.round((index / QUESTIONS.length) * 100);
  document.getElementById("progress-fill").style.width = pct + "%";
  document.getElementById("progress-percent").textContent = pct + "%";

  // Shuffle ổn định
  if (!q._shuffled) q._shuffled = [...q.options].sort(() => Math.random() - 0.5);
  const shuffled = q._shuffled;

  const savedAnswer = answers[index] || {}; // { most: {disc,text}, least: {disc,text} }

  const grid = document.getElementById("options-grid");
  grid.innerHTML = "";

  // Header chỉ dẫn
  const header = document.createElement("div");
  header.className = "ml-header";
  header.innerHTML = `
    <div class="ml-instruction">
      <div class="ml-badge most-badge">✅ Mô tả NHẤT</div>
      <div class="ml-badge least-badge">❌ Ít mô tả nhất</div>
    </div>
    <p class="ml-hint">Chọn một từ mô tả bạn <strong>nhiều nhất</strong> và một từ mô tả bạn <strong>ít nhất</strong></p>
  `;
  grid.appendChild(header);

  // Render 4 từ
  shuffled.forEach((opt) => {
    const row = document.createElement("div");
    row.className = "ml-row";
    row.id = `ml-row-${index}-${opt.disc}`;

    const isMost = savedAnswer.most && savedAnswer.most.disc === opt.disc;
    const isLeast = savedAnswer.least && savedAnswer.least.disc === opt.disc;

    row.innerHTML = `
      <span class="ml-word ${isMost ? 'word-most' : ''} ${isLeast ? 'word-least' : ''}"
            id="word-${index}-${opt.disc}">${opt.text}</span>
      <div class="ml-btns">
        <button class="ml-btn most-btn ${isMost ? 'active-most' : ''}"
                onclick="selectMostLeast(${index}, '${opt.disc}', '${opt.text}', 'most')"
                title="Mô tả tôi nhiều nhất">✅</button>
        <button class="ml-btn least-btn ${isLeast ? 'active-least' : ''}"
                onclick="selectMostLeast(${index}, '${opt.disc}', '${opt.text}', 'least')"
                title="Ít mô tả tôi nhất">❌</button>
      </div>
    `;
    grid.appendChild(row);
  });

  // Trạng thái hoàn thành
  updateMLStatus(index);

  // Nav state
  document.getElementById("btn-prev").disabled = index === 0;
  const isDone = savedAnswer.most && savedAnswer.least;
  document.getElementById("btn-next").disabled = !isDone;
  document.getElementById("submit-section").style.display = "none";

  // Update dots
  document.querySelectorAll(".nav-dot").forEach((d, i) => {
    d.classList.remove("active", "answered");
    if (i === index) d.classList.add("active");
    if (answers[i] && answers[i].most && answers[i].least) d.classList.add("answered");
  });

  // Animate card
  const card = document.getElementById("question-card");
  card.classList.remove("slide-in");
  void card.offsetWidth;
  card.classList.add("slide-in");
}

// ---- MOST/LEAST SELECTION ----
function selectMostLeast(qIndex, disc, text, type) {
  if (autoAdvanceTimer) { clearTimeout(autoAdvanceTimer); autoAdvanceTimer = null; }

  if (!answers[qIndex]) answers[qIndex] = {};
  const ans = answers[qIndex];

  // Không cho chọn cùng một từ cho cả most và least
  if (type === 'most' && ans.least && ans.least.disc === disc) {
    ans.least = null; // Reset least nếu trùng
  }
  if (type === 'least' && ans.most && ans.most.disc === disc) {
    ans.most = null; // Reset most nếu trùng
  }

  ans[type] = { disc, text };

  // Re-render trực tiếp không re-render toàn bộ
  const q = QUESTIONS[qIndex];
  q._shuffled.forEach(opt => {
    const isMost = ans.most && ans.most.disc === opt.disc;
    const isLeast = ans.least && ans.least.disc === opt.disc;
    const wordEl = document.getElementById(`word-${qIndex}-${opt.disc}`);
    const row = document.getElementById(`ml-row-${qIndex}-${opt.disc}`);
    if (wordEl) {
      wordEl.className = `ml-word ${isMost ? 'word-most' : ''} ${isLeast ? 'word-least' : ''}`;
    }
    if (row) {
      row.querySelectorAll('.most-btn').forEach(b => b.classList.toggle('active-most', isMost));
      row.querySelectorAll('.least-btn').forEach(b => b.classList.toggle('active-least', isLeast));
    }
  });

  updateMLStatus(qIndex);

  const isDone = ans.most && ans.least;
  document.getElementById("btn-next").disabled = !isDone;
  const dot = document.getElementById("dot-" + qIndex);
  if (dot) dot.classList.toggle("answered", !!isDone);

  // Auto-advance khi đã chọn cả Most và Least
  if (isDone && qIndex < QUESTIONS.length - 1) {
    autoAdvanceTimer = setTimeout(() => {
      autoAdvanceTimer = null;
      if (currentQuestion === qIndex) {
        currentQuestion = qIndex + 1;
        renderQuestion(currentQuestion);
      }
    }, 800);
  } else if (isDone && qIndex === QUESTIONS.length - 1) {
    document.getElementById("submit-section").style.display = "flex";
    document.getElementById("progress-fill").style.width = "100%";
    document.getElementById("progress-percent").textContent = "100%";
  }
}

// Cập nhật trạng thái hoàn thành của câu
function updateMLStatus(qIndex) {
  const ans = answers[qIndex] || {};
  const isDone = ans.most && ans.least;
  const statusEl = document.getElementById("ml-status-" + qIndex);
  // Tạo/cập nhật status bar nếu cần
  let statusBar = document.getElementById("ml-status-bar");
  if (!statusBar) {
    statusBar = document.createElement("div");
    statusBar.id = "ml-status-bar";
    statusBar.className = "ml-status-bar";
    const grid = document.getElementById("options-grid");
    if (grid) grid.appendChild(statusBar);
  }
  const hasMost = !!ans.most;
  const hasLeast = !!ans.least;
  statusBar.innerHTML = `
    <span class="ml-status-item ${hasMost ? 'done' : ''}">✅ Mô tả nhất: ${ans.most ? '<strong>' + ans.most.text + '</strong>' : '<em>chưa chọn</em>'}</span>
    <span class="ml-status-item ${hasLeast ? 'done' : ''}">❌ Ít mô tả: ${ans.least ? '<strong>' + ans.least.text + '</strong>' : '<em>chưa chọn</em>'}</span>
  `;
}

// ---- NAVIGATION ----
function nextQuestion() {
  if (autoAdvanceTimer) { clearTimeout(autoAdvanceTimer); autoAdvanceTimer = null; }
  if (currentQuestion < QUESTIONS.length - 1) {
    currentQuestion++;
    renderQuestion(currentQuestion);
  }
}

function prevQuestion() {
  if (autoAdvanceTimer) { clearTimeout(autoAdvanceTimer); autoAdvanceTimer = null; }
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion(currentQuestion);
  }
}

function jumpToQuestion(index) {
  if (autoAdvanceTimer) { clearTimeout(autoAdvanceTimer); autoAdvanceTimer = null; }
  currentQuestion = index;
  renderQuestion(index);
}

// ---- SUBMIT TEST ----
function submitTest() {
  if (autoAdvanceTimer) { clearTimeout(autoAdvanceTimer); autoAdvanceTimer = null; }
  const answeredCount = Object.keys(answers).length;
  if (answeredCount < QUESTIONS.length) {
    const remaining = QUESTIONS.length - answeredCount;
    if (!confirm(`Bạn còn ${remaining} câu chưa trả lời. Vẫn muốn xem kết quả?`)) return;
  }

  showScreen("screen-loading");
  animateLoadingSteps();

  // Tính điểm Most/Least: Most = +2, Least = -1
  scores = { D: 0, I: 0, S: 0, C: 0 };
  Object.values(answers).forEach(a => {
    if (a.most && scores[a.most.disc] !== undefined) scores[a.most.disc] += 2;
    if (a.least && scores[a.least.disc] !== undefined) scores[a.least.disc] -= 1;
  });
  // Đảm bảo không có điểm âm
  Object.keys(scores).forEach(k => { if (scores[k] < 0) scores[k] = 0; });

  setTimeout(() => {
    buildResults();
    showScreen("screen-results");
    callPollinationsAI(); // Gọi AI miễn phí, không cần key
  }, 3000);
}

// ---- ANIMATE LOADING STEPS ----
function animateLoadingSteps() {
  const steps = ["step-1", "step-2", "step-3", "step-4"];
  steps.forEach((id, i) => {
    setTimeout(() => {
      document.querySelectorAll(".load-step").forEach(s => s.classList.remove("active"));
      document.getElementById(id).classList.add("active", "done");
    }, i * 700);
  });
}

// ---- BUILD RESULTS ----
function buildResults() {
  const profileKey = getProfileKey(scores);
  const profile = DISC_PROFILES[profileKey];
  const percentages = getScorePercentages(scores);

  // ─ Header
  document.getElementById("result-profile-name").textContent = `${profile.emoji} ${profile.name}`;
  document.getElementById("result-profile-tagline").textContent = profile.tagline;

  // ─ Score bars (CSS vars: score-bar-item / score-bar-label / score-bar-name / score-bar-value / score-bar-fill)
  const barsContainer = document.getElementById("score-bars");
  barsContainer.innerHTML = "";
  const discColors = { D: "var(--d)", I: "var(--i)", S: "var(--s)", C: "var(--c)" };
  const barClass  = { D: "d-bar", I: "i-bar", S: "s-bar", C: "c-bar" };
  const discLabels = { D: "Dominance", I: "Influence", S: "Steadiness", C: "Conscientiousness" };
  const discEmoji  = { D: "🔴", I: "🟠", S: "🟢", C: "🔵" };
  const sorted = ["D","I","S","C"].sort((a,b) => scores[b] - scores[a]);

  sorted.forEach((key, idx) => {
    const bar = document.createElement("div");
    bar.className = "score-bar-item";
    bar.style.setProperty("--delay", idx * 180 + "ms");
    bar.innerHTML = `
      <div class="score-bar-label">
        <span class="score-bar-name" style="color:${discColors[key]}">${discEmoji[key]} ${key} – ${discLabels[key]}</span>
        <span class="score-bar-value" style="color:${discColors[key]}">${scores[key]}pt &nbsp;${percentages[key]}%</span>
      </div>
      <div class="score-bar-track">
        <div class="score-bar-fill ${barClass[key]}" style="width:0%" data-w="${percentages[key]}%"></div>
      </div>`;
    barsContainer.appendChild(bar);
  });

  // animate bars after DOM paint
  requestAnimationFrame(() => {
    setTimeout(() => {
      document.querySelectorAll(".score-bar-fill").forEach((b, i) => {
        setTimeout(() => { b.style.width = b.dataset.w; }, i * 180);
      });
    }, 100);
  });

  // ─ Radar Chart (animated)
  drawRadarChart(percentages);

  // ─ Traits – use trait-card / trait-tag structure
  const traitsGrid = document.getElementById("traits-grid");
  traitsGrid.innerHTML = `
    <div class="trait-card">
      <div class="trait-card-title">✅ Điểm Mạnh</div>
      <div class="trait-tags-wrap">
        ${profile.strengths.map(s => `<span class="trait-tag strength">${s}</span>`).join("")}
      </div>
    </div>
    <div class="trait-card">
      <div class="trait-card-title">⚠️ Thách Thức</div>
      <div class="trait-tags-wrap">
        ${profile.challenges.map(c => `<span class="trait-tag weakness">${c}</span>`).join("")}
      </div>
    </div>`;

  // animate trait cards in
  traitsGrid.querySelectorAll(".trait-card").forEach((el, i) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    setTimeout(() => {
      el.style.transition = "opacity 0.4s ease, transform 0.4s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 400 + i * 120);
  });

  // ─ Compatibility
  const compatGrid = document.getElementById("compat-grid");
  compatGrid.innerHTML = "";
  const discColorHex = { D: "#f87171", I: "#fb923c", S: "#34d399", C: "#60a5fa" };
  const discBg       = { D: "var(--d-bg)", I: "var(--i-bg)", S: "var(--s-bg)", C: "var(--c-bg)" };

  Object.entries(profile.compatibility).forEach(([type, info], idx) => {
    const col = discColorHex[type];
    const score = info.score;
    const div = document.createElement("div");
    div.className = "compat-card";
    div.style.cssText = `background:${discBg[type]};border-color:${col}33;opacity:0;transform:translateY(14px);transition:opacity 0.4s ease ${idx*100}ms,transform 0.4s ease ${idx*100}ms`;
    div.innerHTML = `
      <div class="compat-letter" style="color:${col}">${type}</div>
      <div class="compat-label">${{ D:"Dominance", I:"Influence", S:"Steadiness", C:"Conscientiousness" }[type]}</div>
      <div class="compat-pct" style="color:${col}">${score}%</div>
      <div class="compat-bar" style="background:${col}33"><div style="height:4px;border-radius:2px;width:0%;background:${col};transition:width 0.9s ease ${idx*120+300}ms" data-w="${score}%"></div></div>
      <div class="compat-note-text">${info.level} – ${info.note}</div>`;
    compatGrid.appendChild(div);
    requestAnimationFrame(() => {
      setTimeout(() => {
        div.style.opacity = "1";
        div.style.transform = "translateY(0)";
        const fill = div.querySelector("[data-w]");
        if (fill) fill.style.width = fill.dataset.w;
      }, 50 + idx * 100);
    });
  });

  // ─ Career Tags
  const careerContainer = document.getElementById("career-tags");
  careerContainer.innerHTML = profile.careers.map((c, i) =>
    `<span class="career-tag" style="animation-delay:${i*60}ms">${c}</span>`
  ).join("");

  // ─ Not Match box (inside career-section)
  const existingNM = document.querySelector(".not-match-section");
  if (existingNM) existingNM.remove();
  if (profile.notMatch && profile.notMatch.length) {
    const notMatchDiv = document.createElement("div");
    notMatchDiv.className = "not-match-section";
    notMatchDiv.innerHTML = `
      <div class="not-match-title">❌ Không Phù Hợp Với</div>
      <div class="not-match-tags">
        ${profile.notMatch.map(n => `<span class="not-match-tag">${n}</span>`).join("")}
      </div>`;
    document.querySelector(".career-section").appendChild(notMatchDiv);
  }

  // ─ Insights (pressure + comm tip)
  const existingIns = document.querySelector(".insight-section-block");
  if (existingIns) existingIns.remove();
  if (profile.behaviorUnderPressure || profile.communicationTip) {
    const insightDiv = document.createElement("div");
    insightDiv.className = "insight-section-block";
    insightDiv.innerHTML = `
      <h2 class="section-title">💡 Hiểu Sâu Về Bạn</h2>
      <div class="insight-section">
        ${profile.behaviorUnderPressure ? `
        <div class="insight-card">
          <h4>⚡ Khi Bị Áp Lực</h4>
          <p>${profile.behaviorUnderPressure}</p>
        </div>` : ""}
        ${profile.communicationTip ? `
        <div class="insight-card">
          <h4>🗣️ Mẹo Giao Tiếp Với Nhóm ${profile.letter}</h4>
          <p>${profile.communicationTip}</p>
        </div>` : ""}
      </div>`;
    document.querySelector(".career-section").after(insightDiv);
    // style it like other sections
    insightDiv.style.cssText = "background:var(--glass);border:1px solid var(--border);border-radius:var(--radius);padding:22px 24px;backdrop-filter:blur(14px)";
  }
}

// ---- RADAR CHART (with draw animation) ----
function drawRadarChart(pct) {
  const canvas = document.getElementById("disc-radar");
  const ctx = canvas.getContext("2d");
  const W = canvas.width, H = canvas.height;
  const cx = W / 2, cy = H / 2;
  const r = Math.min(W, H) / 2 - 38;

  const labels = ["D", "I", "S", "C"];
  const values = [pct.D, pct.I, pct.S, pct.C];
  const colors = ["#f87171", "#fb923c", "#34d399", "#60a5fa"];
  const angles = labels.map((_, i) => (Math.PI * 2 * i) / labels.length - Math.PI / 2);

  function drawStatic() {
    ctx.clearRect(0, 0, W, H);
    // Grid rings
    for (let ring = 1; ring <= 5; ring++) {
      ctx.beginPath();
      angles.forEach((a, i) => {
        const x = cx + (r * ring / 5) * Math.cos(a);
        const y = cy + (r * ring / 5) * Math.sin(a);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.strokeStyle = "rgba(255,255,255,0.07)";
      ctx.lineWidth = 1;
      ctx.stroke();
      // Ring label
      if (ring % 2 === 0) {
        ctx.font = "9px Inter,sans-serif";
        ctx.fillStyle = "rgba(255,255,255,0.25)";
        ctx.textAlign = "center";
        ctx.fillText((ring * 20) + "%", cx + 4, cy - (r * ring / 5) + 10);
      }
    }
    // Axes
    angles.forEach(a => {
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
      ctx.strokeStyle = "rgba(255,255,255,0.14)";
      ctx.lineWidth = 1;
      ctx.stroke();
    });
  }

  function drawData(progress) {
    ctx.clearRect(0, 0, W, H);
    drawStatic();

    // Filled polygon (animated)
    ctx.beginPath();
    angles.forEach((a, i) => {
      const val = (values[i] / 100) * progress;
      const x = cx + r * val * Math.cos(a);
      const y = cy + r * val * Math.sin(a);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.closePath();
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    grad.addColorStop(0, "rgba(99,102,241,0.55)");
    grad.addColorStop(1, "rgba(139,92,246,0.18)");
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.strokeStyle = "#818cf8";
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Glow effect on stroke
    ctx.shadowBlur = 12;
    ctx.shadowColor = "rgba(99,102,241,0.6)";
    ctx.stroke();
    ctx.shadowBlur = 0;

    if (progress >= 1) {
      // Data points
      angles.forEach((a, i) => {
        const val = values[i] / 100;
        const x = cx + r * val * Math.cos(a);
        const y = cy + r * val * Math.sin(a);
        // Outer glow
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fillStyle = colors[i] + "33";
        ctx.fill();
        // Core dot
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = colors[i];
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.9)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });
      // Labels
      ctx.font = "bold 14px Outfit,sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      angles.forEach((a, i) => {
        const lx = cx + (r + 26) * Math.cos(a);
        const ly = cy + (r + 26) * Math.sin(a);
        ctx.fillStyle = colors[i];
        ctx.shadowBlur = 8;
        ctx.shadowColor = colors[i];
        ctx.fillText(labels[i], lx, ly);
        ctx.shadowBlur = 0;
      });
    }
  }

  // Animate
  let start = null;
  const duration = 900;
  function frame(ts) {
    if (!start) start = ts;
    const p = Math.min((ts - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3); // ease-out cubic
    drawData(ease);
    if (p < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

// ---- CALL AI (thử nhiều nguồn: Gemini → DeepSeek → Pollinations → Offline) ----
async function callPollinationsAI() {
  const profileKey = getProfileKey(scores);
  const profile = DISC_PROFILES[profileKey];
  const percentages = getScorePercentages(scores);
  const skipped = Object.values(answers).filter(a => a.disc === "N").length;

  const prompt = `Bạn là chuyên gia tâm lý học DISC, hãy phân tích kết quả bài test DISC bằng tiếng Việt (250-350 từ).

Kết quả DISC:
- D (Dominance):         ${scores.D} điểm  (${percentages.D}%)
- I (Influence):         ${scores.I} điểm  (${percentages.I}%)
- S (Steadiness):        ${scores.S} điểm  (${percentages.S}%)
- C (Conscientiousness): ${scores.C} điểm  (${percentages.C}%)
- Kiểu tính cách chủ đạo: ${profile.name}
- Số câu bỏ qua (không hợp): ${skipped}

Viết đúng 4 phần với tiêu đề markdown ##:
## 🧠 Tổng quan tính cách
## 💡 Điểm mạnh & Thách thức
## 💼 Nghề nghiệp & Môi trường phù hợp
## 📈 Lời khuyên phát triển bản thân

Giọng văn thân thiện, chuyên nghiệp, dùng bullet points cho dễ đọc. Tổng 250-350 từ.`;

  const showResult = (html) => {
    const loadMsg = document.getElementById("ai-loading-msg");
    const el = document.getElementById("ai-result-text");
    if (loadMsg) loadMsg.style.display = "none";
    if (el) { el.innerHTML = html; el.style.display = "block"; }
    // Add source badge
    const badge = document.getElementById("ai-source-badge");
    if (badge) badge.style.display = "inline-flex";
  };

  const updateStatus = (msg) => {
    const span = document.querySelector("#ai-loading-msg span");
    if (span) span.textContent = msg;
  };

  // ── 1. Google Gemini (gemini-2.0-flash – free tier, no key needed via proxy) ──
  updateStatus("🤖 Gemini AI đang phân tích...");
  try {
    const geminiRes = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBpelGlRSfKeFMGXM7U_B1o7oBOWFaZsrk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { maxOutputTokens: 800, temperature: 0.75 }
      })
    });
    if (geminiRes.ok) {
      const data = await geminiRes.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text && text.length > 80) {
        document.getElementById("ai-source-name").textContent = "Gemini 2.0 Flash";
        showResult(markdownToHTML(text));
        return;
      }
    }
  } catch(e1) { console.warn("Gemini lỗi:", e1.message); }

  // ── 2. Pollinations AI (POST – OpenAI-compatible, free) ──
  updateStatus("🔄 Đang kết nối Pollinations AI...");
  try {
    const polRes = await fetch("https://text.pollinations.ai/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [{ role: "user", content: prompt }],
        model: "openai-large",
        seed: Math.floor(Math.random() * 9999)
      })
    });
    if (polRes.ok) {
      const text = await polRes.text();
      if (text && text.length > 80) {
        document.getElementById("ai-source-name").textContent = "GPT-4o via Pollinations";
        showResult(markdownToHTML(text));
        return;
      }
    }
  } catch(e2) { console.warn("Pollinations POST lỗi:", e2.message); }

  // ── 3. Pollinations GET fallback ──
  updateStatus("🔄 Thử phương án dự phòng...");
  try {
    const enc = encodeURIComponent(prompt.substring(0, 1000));
    const polRes2 = await fetch(`https://text.pollinations.ai/${enc}`);
    if (polRes2.ok) {
      const text = await polRes2.text();
      if (text && text.length > 80) {
        document.getElementById("ai-source-name").textContent = "AI via Pollinations";
        showResult(markdownToHTML(text));
        return;
      }
    }
  } catch(e3) { console.warn("Pollinations GET lỗi:", e3.message); }

  // ── 4. DeepSeek via OpenRouter (free tier) ──
  updateStatus("🔄 Thử DeepSeek AI...");
  try {
    const dsRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer sk-or-v1-free",
        "HTTP-Referer": "https://disc-test.local",
        "X-Title": "DISC Test"
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat:free",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 800
      })
    });
    if (dsRes.ok) {
      const data = await dsRes.json();
      const text = data?.choices?.[0]?.message?.content;
      if (text && text.length > 80) {
        document.getElementById("ai-source-name").textContent = "DeepSeek AI";
        showResult(markdownToHTML(text));
        return;
      }
    }
  } catch(e4) { console.warn("DeepSeek lỗi:", e4.message); }

  // ── 5. Offline fallback ──
  document.getElementById("ai-source-name").textContent = "Phân tích nội bộ";
  showResult(buildOfflineAnalysis(profile, percentages, skipped));
}

// ---- PHÂN TÍCH OFFLINE (khi không có mạng) ----
function buildOfflineAnalysis(profile, pct, skipped) {
  const secondKey = ["D","I","S","C"]
    .filter(k => k !== profile.letter)
    .sort((a,b) => scores[b] - scores[a])[0];
  const second = DISC_PROFILES[secondKey];
  return markdownToHTML(`## 🧠 Tổng quan tính cách
Bạn mang phong cách **${profile.name}** – ${profile.tagline}. ${profile.description} Yếu tố phụ trội là **${second.letter} (${second.name.split("–")[0].trim()})** giúp bổ sung thêm chiều sâu cho tính cách của bạn.

## 💡 Điểm mạnh & Thách thức
**Điểm mạnh:** ${profile.strengths.slice(0,3).join(" · ")}.
**Thách thức cần cải thiện:** ${profile.challenges.slice(0,2).join(" và ")}.
${skipped > 0 ? `\n> Bạn đã bỏ qua ${skipped} câu – điều này có thể cho thấy bạn đang trong giai đoạn khám phá bản thân.` : ""}

## 💼 Nghề nghiệp phù hợp
Các lĩnh vực phù hợp nhất: **${profile.careers.slice(0,4).join(", ")}**. Bạn làm tốt trong môi trường ${profile.letter === "D" ? "có mục tiêu rõ ràng và quyền tự chủ cao" : profile.letter === "I" ? "năng động, nhiều giao tiếp và sáng tạo" : profile.letter === "S" ? "ổn định, hợp tác và được coi trọng" : "có hệ thống, chú trọng chất lượng và chuẩn mực"}.

## 📈 Lời khuyên phát triển
1. Phát huy điểm mạnh: **${profile.strengths[0]}** là lợi thế cạnh tranh lớn nhất của bạn.
2. Cải thiện: Chú ý đến **${profile.challenges[0]}** – đây là điểm yếu phổ biến nhất của nhóm ${profile.letter}.
3. Kết hợp với nhóm **${Object.entries(profile.compatibility).sort((a,b)=>b[1].score-a[1].score)[0][0]}** để bổ sung điểm mạnh còn thiếu.`);
}

// ---- MARKDOWN TO HTML (fixed) ----
function markdownToHTML(text) {
  if (!text) return "";
  // 1. Blockquotes
  text = text.replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>");
  // 2. Headings
  text = text.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  text = text.replace(/^## (.+)$/gm,  "<h2>$1</h2>");
  text = text.replace(/^# (.+)$/gm,   "<h1>$1</h1>");
  // 3. Bold / italic
  text = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  text = text.replace(/\*([^*\n]+?)\*/g, "<em>$1</em>");
  // 4. Numbered list items
  text = text.replace(/^\d+\.\s+(.+)$/gm, "<li class=\"ol-item\">$1</li>");
  // 5. Bullet list items
  text = text.replace(/^[-\u2022]\s+(.+)$/gm, "<li>$1</li>");
  // 6. Wrap consecutive <li> runs in <ul>
  text = text.replace(/((?:<li[^>]*>.*<\/li>\n?)+)/g, "<ul>$1</ul>");
  // 7. Wrap remaining non-tag blocks in <p>
  const lines = text.split("\n");
  const out = [];
  let inPara = false;
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) { if (inPara) { out.push("</p>"); inPara = false; } continue; }
    if (/^<[h1-6\/ubl]/.test(trimmed)) { if (inPara) { out.push("</p>"); inPara = false; } out.push(trimmed); }
    else { if (!inPara) { out.push("<p>"); inPara = true; } out.push(trimmed); }
  }
  if (inPara) out.push("</p>");
  return out.join("\n");
}

// ---- RESTART ----
function restartTest() {
  if (autoAdvanceTimer) { clearTimeout(autoAdvanceTimer); autoAdvanceTimer = null; }
  document.querySelectorAll(".not-match-section, .insight-section-block").forEach(el => el.remove());
  QUESTIONS.forEach(q => { delete q._shuffled; });
  answers = {};
  scores = { D:0, I:0, S:0, C:0 };
  currentQuestion = 0;
  document.getElementById("ai-result-text").innerHTML = "";
  document.getElementById("ai-result-text").style.display = "none";
  const loadMsg = document.getElementById("ai-loading-msg");
  if (loadMsg) { loadMsg.style.display = "flex"; }
  const srcBadge = document.getElementById("ai-source-badge");
  if (srcBadge) srcBadge.style.display = "none";
  document.getElementById("score-bars").innerHTML = "";
  document.getElementById("traits-grid").innerHTML = "";
  document.getElementById("compat-grid").innerHTML = "";
  document.getElementById("career-tags").innerHTML = "";
  document.querySelectorAll(".load-step").forEach(s => { s.classList.remove("done", "active"); });
  document.getElementById("step-1").classList.add("active");
  showScreen("screen-welcome");
}

// ---- PRINT ----
function printResult() {
  window.print();
}

// ---- WATERMARK GRID FILL ----
(function fillWatermark() {
  const container = document.querySelector(".watermark-bg");
  if (!container) return;
  // Remove existing text content (was a single text node)
  container.textContent = "";
  // How many spans to fill: estimate based on viewport area
  const cols = Math.ceil(window.innerWidth  / 260) + 4;
  const rows = Math.ceil(window.innerHeight / 80)  + 8;
  const total = cols * rows;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < total; i++) {
    const span = document.createElement("span");
    span.textContent = "ttareal";
    frag.appendChild(span);
  }
  container.appendChild(frag);
})();
