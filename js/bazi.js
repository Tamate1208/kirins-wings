/**
 * 四柱推命（八字・BaZi）精密計算モジュール
 * 原典：『淵海子平』『滴天髄』
 */

const KAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const SHI = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

const KAN_ELEMENT = {
  "甲": { element: "木", yinyang: "陽", nature: "大樹・独立心・向上心", color: "#10b981" },
  "乙": { element: "木", yinyang: "陰", nature: "草花・柔軟性・協調性", color: "#34d399" },
  "丙": { element: "火", yinyang: "陽", nature: "太陽・情熱・カリスマ", color: "#f97316" },
  "丁": { element: "火", yinyang: "陰", nature: "灯火・知性・繊細な直感", color: "#fb923c" },
  "戊": { element: "土", yinyang: "陽", nature: "名峰・包容力・泰然自若", color: "#eab308" },
  "己": { element: "土", yinyang: "陰", nature: "田園・育む心・多才多芸", color: "#facc15" },
  "庚": { element: "金", yinyang: "陽", nature: "鋼鉄・剛毅・変革の意志", color: "#94a3b8" },
  "辛": { element: "金", yinyang: "陰", nature: "宝石・美意識・誇り高き審美眼", color: "#cbd5e1" },
  "壬": { element: "水", yinyang: "陽", nature: "大海・壮大な構想・自由闊達", color: "#38bdf8" },
  "癸": { element: "水", yinyang: "陰", nature: "慈雨・智慧・深奥なる洞察", color: "#60a5fa" }
};

const SHI_ELEMENT = {
  "子": "水", "丑": "土", "寅": "木", "卯": "木",
  "辰": "土", "巳": "火", "午": "火", "未": "土",
  "申": "金", "酉": "金", "戌": "土", "亥": "水"
};

// ユリウス日 (Julian Day) 計算
function getJulianDay(year, month, day) {
  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const a = Math.floor(y / 100);
  const b = 2 - a + Math.floor(a / 4);
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524.5;
}

/**
 * 生年月日から日干支・年干支・月干支を算出
 */
function calculateBaZi(birthDate) {
  const year = birthDate.getFullYear();
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();

  // 1. 日干支 (ユリウス日アルゴリズム: 基準日とのモジュロ60)
  const jd = getJulianDay(year, month, day);
  // 甲子(0) 基準補正
  const dayCycle = Math.floor(jd + 0.5 + 49) % 60;
  const dayKan = KAN[dayCycle % 10];
  const dayShi = SHI[dayCycle % 12];

  // 2. 年干支 (立春考慮簡易近似: 2月4日以前は前年)
  let yearAdjusted = year;
  if (month === 1 || (month === 2 && day < 4)) {
    yearAdjusted -= 1;
  }
  const yearCycle = (yearAdjusted - 4) % 60;
  const yearKan = KAN[(yearCycle % 10 + 10) % 10];
  const yearShi = SHI[(yearCycle % 12 + 12) % 12];

  // 3. 月干支 (節気近似)
  // 寅月(2月)から開始
  const monthOffsets = [11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // 1月=丑, 2月=寅...
  const monthShi = SHI[monthOffsets[month - 1]];
  
  // 五虎遁月（年干から月干を決定する法則）
  // 甲己年->丙寅, 乙庚年->戊寅, 丙辛年->庚寅, 丁壬年->壬寅, 戊癸年->甲寅
  const yearKanIndex = KAN.indexOf(yearKan);
  const startMonthKanIndex = ((yearKanIndex % 5) * 2 + 2) % 10;
  const monthKan = KAN[(startMonthKanIndex + monthOffsets[month - 1]) % 10];

// 十二支の内包蔵干（余気・中気・本気）の五行比率 (正統原典準拠)
const HIDDEN_STEMS_ELEMENTS = {
  "子": { "水": 1.0 },
  "丑": { "土": 0.6, "水": 0.2, "金": 0.2 },
  "寅": { "木": 0.6, "火": 0.2, "土": 0.2 },
  "卯": { "木": 1.0 },
  "辰": { "土": 0.6, "木": 0.2, "水": 0.2 },
  "巳": { "火": 0.6, "土": 0.2, "金": 0.2 },
  "午": { "火": 0.6, "土": 0.4 },
  "未": { "土": 0.6, "火": 0.2, "木": 0.2 },
  "申": { "金": 0.6, "水": 0.2, "土": 0.2 },
  "酉": { "金": 1.0 },
  "戌": { "土": 0.6, "金": 0.2, "火": 0.2 },
  "亥": { "水": 0.7, "木": 0.3 }
};

const ELEMENT_GENERATES_MAP = { "木": "火", "火": "土", "土": "金", "金": "水", "水": "木" };

  // 日主（あなたを象徴する魂のコア）
  const dayMaster = KAN_ELEMENT[dayKan];

  // 五行バランス（木・火・土・金・水）の精密集計
  // 1. 生命基礎潜在値（各五行 +15点：ゼロ欠落を防ぐ生命基底エネルギー）
  const elements = { "木": 15, "火": 15, "土": 15, "金": 15, "水": 15 };
  
  // 2. 日干（魂の核：重み30）
  elements[dayMaster.element] += 30;

  // 3. 月令（月支・蔵干配分：季節と気候の強大な支配力 重み28）
  const monthHidden = HIDDEN_STEMS_ELEMENTS[monthShi] || { [SHI_ELEMENT[monthShi]]: 1.0 };
  Object.entries(monthHidden).forEach(([elem, ratio]) => {
    elements[elem] += 28 * ratio;
  });

  // 4. 天干（年干・月干：顕在意識 重み各10）
  elements[KAN_ELEMENT[yearKan].element] += 10;
  elements[KAN_ELEMENT[monthKan].element] += 10;

  // 5. 地支（年支・日支の蔵干配分：潜在意識と足腰 重み8, 10）
  const yearHidden = HIDDEN_STEMS_ELEMENTS[yearShi] || { [SHI_ELEMENT[yearShi]]: 1.0 };
  Object.entries(yearHidden).forEach(([elem, ratio]) => {
    elements[elem] += 8 * ratio;
  });
  const dayHidden = HIDDEN_STEMS_ELEMENTS[dayShi] || { [SHI_ELEMENT[dayShi]]: 1.0 };
  Object.entries(dayHidden).forEach(([elem, ratio]) => {
    elements[elem] += 10 * ratio;
  });

  // 6. 五行相生の流通循環ボーナス（生じられた次世代五行へのエネルギー流出）
  const circulationBonus = {};
  Object.keys(elements).forEach(elem => {
    const nextElem = ELEMENT_GENERATES_MAP[elem];
    circulationBonus[nextElem] = (circulationBonus[nextElem] || 0) + (elements[elem] * 0.12);
  });
  Object.keys(circulationBonus).forEach(elem => {
    elements[elem] += circulationBonus[elem];
  });

  // 整数値に丸め
  const roundedScores = {};
  Object.keys(elements).forEach(k => {
    roundedScores[k] = Math.round(elements[k]);
  });

  const sortedElements = Object.entries(roundedScores).sort((a, b) => b[1] - a[1]);
  const dominant = sortedElements[0][0];
  const weakest = sortedElements[sortedElements.length - 1][0];

  return {
    yearPillar: `${yearKan}${yearShi}`,
    monthPillar: `${monthKan}${monthShi}`,
    dayPillar: `${dayKan}${dayShi}`,
    dayMasterKan: dayKan,
    dayMasterInfo: dayMaster,
    elementScores: roundedScores,
    dominantElement: dominant,
    weakestElement: weakest,
  };
}

if (typeof module !== "undefined") {
  module.exports = { calculateBaZi, KAN_ELEMENT };
}
