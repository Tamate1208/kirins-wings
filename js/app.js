// 麒麟の翼 (KIRIN'S WINGS) メインコントローラー

document.addEventListener("DOMContentLoaded", () => {
  initStarCanvas();

  const birthYearSelect = document.getElementById("birth-year");
  const birthMonthSelect = document.getElementById("birth-month");
  const birthDaySelect = document.getElementById("birth-day");
  const queryThemeSelect = document.getElementById("query-theme");
  const btnStart = document.getElementById("btn-start");

  const inputSection = document.getElementById("input-section");
  const tarotSection = document.getElementById("tarot-section");
  const decreeSection = document.getElementById("decree-section");
  const deckContainer = document.getElementById("deck-container");

  // 年・月・日のセレクトボックス初期化
  initDateDropdowns();

  function initDateDropdowns() {
    const currentYear = 2026;
    const startYear = 1925;
    const defaultYear = 1980;

    birthYearSelect.innerHTML = "";
    for (let y = currentYear; y >= startYear; y--) {
      const opt = document.createElement("option");
      opt.value = y;
      opt.textContent = `${y}年`;
      if (y === defaultYear) opt.selected = true;
      birthYearSelect.appendChild(opt);
    }

    birthMonthSelect.innerHTML = "";
    for (let m = 1; m <= 12; m++) {
      const opt = document.createElement("option");
      opt.value = m;
      opt.textContent = `${m}月`;
      if (m === 1) opt.selected = true;
      birthMonthSelect.appendChild(opt);
    }

    updateDays();
    birthYearSelect.addEventListener("change", updateDays);
    birthMonthSelect.addEventListener("change", updateDays);
  }

  function updateDays() {
    const year = parseInt(birthYearSelect.value, 10);
    const month = parseInt(birthMonthSelect.value, 10);
    const daysInMonth = new Date(year, month, 0).getDate();
    const currentSelectedDay = parseInt(birthDaySelect.value, 10) || 1;

    birthDaySelect.innerHTML = "";
    for (let d = 1; d <= daysInMonth; d++) {
      const opt = document.createElement("option");
      opt.value = d;
      opt.textContent = `${d}日`;
      if (d === Math.min(currentSelectedDay, daysInMonth)) {
        opt.selected = true;
      }
      birthDaySelect.appendChild(opt);
    }
  }

  let currentBirthDate = null;
  let currentTheme = "general";

  const summoningOverlay = document.getElementById("summoning-overlay");
  const summonStepText = document.getElementById("summon-step-text");
  const summonBarFill = document.querySelector(".summon-bar-fill");

  // Step 1: 召喚ボタンクリック (古代天球儀の高速自転シーケンス)
  btnStart.addEventListener("click", () => {
    const y = parseInt(birthYearSelect.value, 10);
    const m = parseInt(birthMonthSelect.value, 10);
    const d = parseInt(birthDaySelect.value, 10);

    if (!y || !m || !d) {
      alert("生年月日を選択してください。");
      return;
    }
    currentBirthDate = new Date(y, m - 1, d);
    currentTheme = queryThemeSelect.value;

    // 天球儀召喚オーバーレイ起動
    if (summoningOverlay) {
      summoningOverlay.classList.add("active");
      if (summonBarFill) {
        summonBarFill.style.width = "0%";
        setTimeout(() => { summonBarFill.style.width = "100%"; }, 50);
      }

      if (summonStepText) {
        summonStepText.innerText = "四柱推命・八字の命式を算出しています…";
        setTimeout(() => {
          summonStepText.innerText = "カバラ数秘・パーソナルサイクルを同調中…";
        }, 700);
        setTimeout(() => {
          summonStepText.innerText = "古代天球儀が星辰を捉えました。タロット神託を開放します！";
        }, 1400);
      }

      setTimeout(() => {
        summoningOverlay.classList.remove("active");
        inputSection.style.display = "none";
        tarotSection.style.display = "block";
        window.scrollTo({ top: tarotSection.offsetTop - 40, behavior: "smooth" });
        renderTarotDeck();
      }, 2100);
    } else {
      inputSection.style.display = "none";
      tarotSection.style.display = "block";
      window.scrollTo({ top: tarotSection.offsetTop - 40, behavior: "smooth" });
      renderTarotDeck();
    }
  });

  let shuffleCount = 0;
  const btnShuffle = document.getElementById("btn-shuffle");
  const shuffleCountBadge = document.getElementById("shuffle-count-badge");

  if (btnShuffle) {
    btnShuffle.addEventListener("click", () => {
      if (deckContainer.classList.contains("shuffling")) return;
      btnShuffle.disabled = true;
      deckContainer.classList.add("shuffling");

      setTimeout(() => {
        deckContainer.classList.remove("shuffling");
        shuffleCount++;
        if (shuffleCountBadge) {
          shuffleCountBadge.innerText = `シャッフル済: ${shuffleCount}回`;
        }
        btnShuffle.disabled = false;
        // カードのシンボル順をシャッフルして再描画
        renderTarotDeck();
      }, 850);
    });
  }

  // Step 2: タロットデッキ生成（6枚のカードに3Dパララックス傾斜を適用）
  function renderTarotDeck() {
    deckContainer.innerHTML = "";
    // シンボルのランダムシャッフル
    const baseSymbols = ["🪽", "✨", "🌙", "☀️", "👁️", "🪐", "⚡", "🔮", "🌌", "💎"];
    const shuffledSymbols = [...baseSymbols].sort(() => Math.random() - 0.5).slice(0, 6);

    for (let i = 0; i < 6; i++) {
      const cardEl = document.createElement("div");
      cardEl.className = "tarot-card";
      cardEl.dataset.index = i;

      cardEl.innerHTML = `
        <div class="card-back">
          <div class="card-back-pattern">
            ${shuffledSymbols[i]}
          </div>
        </div>
        <div class="card-front">
          <div class="card-front-number">ORACLE</div>
          <div class="card-front-symbol">🌟</div>
          <div class="card-front-name">運命のカード</div>
        </div>
      `;

      // 3Dパララックス・チルト（マウス追従）
      cardEl.addEventListener("mousemove", (e) => {
        if (cardEl.classList.contains("flipped")) return;
        const rect = cardEl.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotateX = (-y / rect.height) * 25;
        const rotateY = (x / rect.width) * 25;
        cardEl.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
      });

      cardEl.addEventListener("mouseleave", () => {
        if (cardEl.classList.contains("flipped")) return;
        cardEl.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
      });

      cardEl.addEventListener("click", () => {
        handleCardSelect(cardEl);
      }, { once: true });

      deckContainer.appendChild(cardEl);
    }
  }

  // Step 3: カード選択とフリップ演出 ＆ 引いた後の立体3D天球儀「神託統合」シーケンス
  function handleCardSelect(selectedCard) {
    if (btnShuffle) btnShuffle.disabled = true;

    document.querySelectorAll(".tarot-card").forEach(c => {
      if (c !== selectedCard) {
        c.style.pointerEvents = "none";
        c.style.opacity = "0.25";
        c.style.transform = "scale(0.85)";
      }
    });

    const drawn = drawCard();

    const front = selectedCard.querySelector(".card-front");
    front.innerHTML = `
      <div class="card-front-number">${drawn.number}</div>
      <div class="card-front-symbol">${getCardEmoji(drawn.id)}</div>
      <div class="card-front-name">${drawn.name}</div>
      <div style="font-size:11px; color:#f59e0b; margin-top:4px;">${drawn.isUpright ? "正位置" : "逆位置"}</div>
    `;

    selectedCard.style.transform = "rotateY(180deg) scale(1.15)";
    selectedCard.classList.add("flipped");

    // カード判明後（1.1秒後）、立体3D天球儀が再起動して「神託統合」シーケンスを発動！
    setTimeout(() => {
      if (summoningOverlay) {
        const summonTitle = summoningOverlay.querySelector(".summon-title");
        if (summonTitle) summonTitle.innerText = "神託と星辰を統合中…";
        if (summonStepText) {
          summonStepText.innerText = `引かれた神託『${drawn.number}: ${drawn.name} (${drawn.orientation})』の波動に天球儀が同調しています…`;
        }
        if (summonBarFill) {
          summonBarFill.style.width = "0%";
          setTimeout(() => { summonBarFill.style.width = "100%"; }, 50);
        }
        summoningOverlay.classList.add("active");

        setTimeout(() => {
          summoningOverlay.classList.remove("active");
          revealDecree(drawn);
        }, 1800);
      } else {
        revealDecree(drawn);
      }
    }, 1100);
  }

  function getCardEmoji(id) {
    const emojis = [
      "🤹", "🪄", "📜", "👑", "🏛️", "🕊️", "❤️", "🏎️",
      "🦁", "🏔️", "🎡", "⚖️", "🧗", "⏳", "🏺", "⛓️",
      "⚡", "⭐", "🌙", "☀️", "🎺", "🌍"
    ];
    return emojis[id] || "🌟";
  }

  // Step 4: 統合鑑定書レンダリング
  function revealDecree(drawnCard) {
    const reading = generateSynthesizedReading(currentBirthDate, drawnCard, currentTheme);

    tarotSection.style.display = "none";
    decreeSection.style.display = "block";
    window.scrollTo({ top: decreeSection.offsetTop - 20, behavior: "smooth" });

    // スコアアニメーション
    animateScore("score-total", reading.scores.total);
    animateScore("score-career", reading.scores.career);
    animateScore("score-wealth", reading.scores.wealth);
    animateScore("score-spirit", reading.scores.spirit);

    // テキストコンテンツ
    document.getElementById("decree-soul-title").innerText = reading.soulTitle;
    document.getElementById("decree-soul-text").innerText = reading.soulNarrative;
    document.getElementById("decree-year-text").innerText = reading.yearNarrative;
    document.getElementById("decree-tarot-text").innerText = reading.tarotSynthesis;

    // 🧭 麒麟のデイリーコンパス (本日の行動指南) 反映
    if (reading.dailyCompass) {
      const dc = reading.dailyCompass;
      document.getElementById("compass-date-badge").innerText = dc.dateStr;
      document.getElementById("compass-vibe-title").innerText = dc.vibeTitle;
      document.getElementById("compass-vibe-sub").innerText = dc.vibeSub;
      animateScore("compass-energy-val", dc.energyLevel);
      document.getElementById("compass-peak-val").innerText = dc.peakTime;
      document.getElementById("compass-peak-desc").innerText = dc.peakDesc;
      document.getElementById("compass-protocol-career").innerText = dc.protocolCareer;
      document.getElementById("compass-protocol-wealth").innerText = dc.protocolWealth;
      document.getElementById("compass-protocol-relation").innerText = dc.protocolRelation;
      document.getElementById("compass-taboo-text").innerText = dc.taboo;
      document.getElementById("compass-lucky-text").innerText = dc.luckyCharge;
    }

    // 五行レーダーチャート描画 ＆ プロファイル解説反映
    drawElementsRadar(reading.bazi.elementScores);
    if (reading.elementsProfile) {
      const ep = reading.elementsProfile;
      document.getElementById("elements-profile-title").innerText = ep.dominantTitle;
      document.getElementById("elements-profile-desc").innerText = ep.dominantDesc;
      document.getElementById("elements-remedy-title").innerText = ep.lackingTitle;
      document.getElementById("elements-remedy-text").innerText = ep.lackingAdvice;
    }

    // 処方箋
    document.getElementById("remedy-element").innerText = `不足の氣：『${reading.remedy.lackingElement}』`;
    document.getElementById("remedy-color").innerText = reading.remedy.color;
    document.getElementById("remedy-item").innerText = reading.remedy.item;
    document.getElementById("remedy-direction").innerText = reading.remedy.direction;

    // 10年バイオリズム年表テーブル
    renderTimelineTable(reading.tenYearsTimeline);

    // SNSシェア用神聖オラクルカード
    renderHolyCard(reading);
  }

  function animateScore(id, target) {
    const el = document.getElementById(id);
    let cur = 0;
    const interval = setInterval(() => {
      cur += 2;
      if (cur >= target) {
        cur = target;
        clearInterval(interval);
      }
      el.innerText = cur;
    }, 20);
  }

  // 五行発光レーダーチャートの描画 (Canvas)
  function drawElementsRadar(scores) {
    const canvas = document.getElementById("elements-radar-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2 + 5;
    const r = 85;

    ctx.clearRect(0, 0, w, h);

    const labels = ["木", "火", "土", "金", "水"];
    const values = labels.map(l => scores[l] || 20);
    const maxVal = Math.max(...values, 80);

    // 背景の五角形グリッド (3重)
    for (let level = 1; level <= 3; level++) {
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = (Math.PI * 2 / 5) * i - Math.PI / 2;
        const dist = (r / 3) * level;
        const x = cx + dist * Math.cos(angle);
        const y = cy + dist * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // 軸ライン
    for (let i = 0; i < 5; i++) {
      const angle = (Math.PI * 2 / 5) * i - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      ctx.stroke();

      // ラベル配置
      const lx = cx + (r + 22) * Math.cos(angle);
      const ly = cy + (r + 22) * Math.sin(angle);
      ctx.font = "bold 13px 'Noto Serif JP', serif";
      ctx.fillStyle = "#38bdf8";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`${labels[i]} (${Math.round(values[i])}pt)`, lx, ly);
    }

    // データポリゴン (ゼロ落ちを防ぎ、多角形面を美しく保つダイナミックスケール)
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const angle = (Math.PI * 2 / 5) * i - Math.PI / 2;
      const ratio = Math.min(1.0, Math.max(0.1, values[i] / maxVal));
      const dist = r * (0.25 + 0.75 * ratio);
      const x = cx + dist * Math.cos(angle);
      const y = cy + dist * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = "rgba(245, 158, 11, 0.35)";
    ctx.fill();
    ctx.strokeStyle = "#fbbf24";
    ctx.lineWidth = 2.5;
    ctx.shadowBlur = 12;
    ctx.shadowColor = "rgba(245, 158, 11, 0.8)";
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  // 10年バイオリズム年表テーブル描画
  function renderTimelineTable(timeline) {
    const tbody = document.getElementById("timeline-tbody");
    if (!tbody) return;
    tbody.innerHTML = "";
    timeline.forEach(item => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td style="font-weight:700; color:#fbbf24;">${item.year}年</td>
        <td>第${item.cycle}年期</td>
        <td style="color:#38bdf8;">${item.rank}</td>
        <td>${item.advice}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  // SNSシェア用神聖オラクルカード描画
  function renderHolyCard(reading) {
    const titleEl = document.getElementById("holy-card-title");
    const tarotEl = document.getElementById("holy-card-tarot");
    const metaEl = document.getElementById("holy-card-meta");
    if (!titleEl) return;

    titleEl.innerText = `${reading.astro.sunSign} × 魂主「${reading.bazi.dayMasterKan}」`;
    tarotEl.innerText = `${getCardEmoji(reading.tarotCard.id)} ${reading.tarotCard.name}`;
    metaEl.innerHTML = `
      数秘ライフパス: <b>${reading.num.lifePath}</b> ｜ 2026年運勢: <b>第${reading.num.personalYear}周期</b><br>
      守護氣: <b>${reading.remedy.lackingElement}</b> ｜ 総合運気スコア: <b>${reading.scores.total}点</b>
    `;
  }

  // 再鑑定ボタン
  document.getElementById("btn-reset").addEventListener("click", () => {
    decreeSection.style.display = "none";
    inputSection.style.display = "block";
    shuffleCount = 0;
    if (shuffleCountBadge) shuffleCountBadge.innerText = "シャッフル済: 0回";
    if (summoningOverlay) {
      const summonTitle = summoningOverlay.querySelector(".summon-title");
      if (summonTitle) summonTitle.innerText = "時空の天球儀が同調中…";
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // 印刷・PDF保存ボタン
  document.getElementById("btn-print").addEventListener("click", () => {
    window.print();
  });

  // 3D立体天球儀のマウス視差パララックス (Parallax 3D Tilt)
  const armillaryViewport = document.querySelector(".armillary-viewport");
  if (armillaryViewport) {
    let ticking = false;
    window.addEventListener("mousemove", (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const cx = window.innerWidth / 2;
          const cy = window.innerHeight / 2;
          const dx = (e.clientX - cx) / cx;
          const dy = (e.clientY - cy) / cy;
          const tiltX = -dy * 14;
          const tiltY = dx * 18;
          armillaryViewport.style.transform = `translate(-50%, -50%) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
          ticking = false;
        });
        ticking = true;
      }
    });
  }
});

// 星空Canvasアニメーション
function initStarCanvas() {
  const canvas = document.getElementById("star-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let w, h;
  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  const stars = [];
  const numStars = 160;

  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random(),
      speed: Math.random() * 0.015 + 0.005,
      direction: Math.random() > 0.5 ? 1 : -1
    });
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);

    stars.forEach(star => {
      star.alpha += star.speed * star.direction;
      if (star.alpha > 1) {
        star.alpha = 1;
        star.direction = -1;
      } else if (star.alpha < 0.1) {
        star.alpha = 0.1;
        star.direction = 1;
      }

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245, 158, 11, ${star.alpha * 0.8})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = "rgba(245, 158, 11, 0.6)";
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }
  animate();
}
