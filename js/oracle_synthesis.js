/**
 * 麒麟の翼 (KIRIN'S WINGS)
 * 四位一体 統合鑑定アルゴリズム (Oracle Synthesis Engine)
 * 四柱推命 × 西洋占星術 × 数秘術 × タロット
 */

function generateSynthesizedReading(birthDate, tarotCard, queryTheme = "general") {
  const bazi = calculateBaZi(birthDate);
  const astro = calculateAstrology(birthDate);
  const num = calculateNumerology(birthDate, 2026);

  // 1. 五行と天体の共鳴スコア (総合運・仕事運・金運・健康運)
  const baseScore = 70;
  const dominantBonus = bazi.dominantElement === "木" || bazi.dominantElement === "火" ? 8 : 5;
  const cycleBonus = num.personalYear === 1 || num.personalYear === 8 ? 12 : (num.personalYear === 4 || num.personalYear === 7 ? -3 : 6);
  const tarotBonus = tarotCard.isUpright ? 10 : -5;

  const totalFortune = Math.min(99, Math.max(50, baseScore + dominantBonus + cycleBonus + tarotBonus));
  const careerScore = Math.min(99, Math.max(48, baseScore + (num.personalYear === 1 || num.personalYear === 8 ? 15 : 4) + (astro.modality === "活動宮" ? 8 : 3)));
  const wealthScore = Math.min(99, Math.max(45, baseScore + (bazi.dayMasterInfo.element === "金" || bazi.dayMasterInfo.element === "土" ? 12 : 5) + (tarotCard.name === "女帝" || tarotCard.name === "運命の輪" || tarotCard.name === "太陽" ? 14 : 2)));
  const spiritScore = Math.min(99, Math.max(52, baseScore + (astro.element === "水" || astro.element === "地" ? 10 : 4) + (bazi.dayMasterInfo.element === "水" ? 8 : 2)));

  // 2. 統合パーソナリティ（魂の肖像）
  const soulTitle = `【${bazi.dayMasterKan}（${bazi.dayMasterInfo.nature}）】×【${astro.sunSign}（${astro.ruler}の守護）】×【数秘 ${num.lifePath}（${num.lifePathDetail.title}）】`;

  // 魂の光と人知れぬ「孤独・葛藤（シャドウ）」の深層言語化
  const shadowMap = {
    "木": "周囲を引っ張る責任感が強い反面、頼れる人がおらず『すべて一人で背負い込む孤独』に陥りがちです。思い通りに進まない時に頑迷になり、自分を追い詰める傾向があります。",
    "火": "情熱と明るさで人々を鼓舞しますが、夜になるとふと『誰からも本当の自分を理解されていないのではないか』という冷たい虚無感を覚えることがあります。感情の起伏によるエネルギー切れに注意が必要です。",
    "土": "大地のように周囲を温かく受け止めますが、頼まれごとを断れず、他人の重荷まで抱え込んでしまう優しさの罠があります。安定を求めるあまり、変化への一歩を恐れてしまう葛藤を抱えています。",
    "金": "鋭い審美眼と正義感を持ちますが、自分にも他人にも厳しすぎるあまり、妥協を許せず孤独な孤立を選んでしまう癖があります。傷つきやすさを隠すために、あえて冷徹に振る舞うことがあります。",
    "水": "深海のように底知れぬ知性と包容力がありますが、感情の波に飲まれやすく、過去の後悔や漠然とした未来の不安に心が揺らぎやすい傾向があります。本音を霧の中に隠してしまいがちです。"
  };

  const soulNarrative = `
あなたは東洋の命式において、天を突く『${bazi.dayMasterKan}』の氣を核に持ち、**${bazi.dayMasterInfo.nature}**を生まれ持った本質としています。
そこに西洋占星術における${astro.sunSign}の**「${astro.trait}」**が重なり、直感的な行動力と深遠な洞察力が絶妙なバランスで共存しています。
さらにピタゴラス数秘術のライフパスナンバーは『${num.lifePath}』。あなたの魂は**「${num.lifePathDetail.mission}」**という壮大な使命を帯びてこの世に生を受けました。

【魂の深層と人知れぬ葛藤（シャドウ）】
${shadowMap[bazi.dayMasterInfo.element]}
五行バランスにおいて、現在は『${bazi.dominantElement}』のエネルギーが最も充実している一方、『${bazi.weakestElement}』の要素を補うことで運気の循環が最大化され、あらゆる葛藤が調和へ向かいます。
  `.trim();

  // 3. 現在地（2026年のバイオリズム）
  const yearNarrative = `
2026年、あなたの数秘パーソナルイヤーは『${num.personalYear}』にあたります。
これは古代数秘学における**${num.personalYearTheme}**
四柱推命の五行循環と照らし合わせても、今は足元の岩盤を確かめつつ、大きな次の頂へ向けた準備と決断を下す決定的な転換期に位置しています。
  `.trim();

  // 4. タロット神託と3大具体的処方箋 (事業・投資・対人)
  const isUp = tarotCard.isUpright;
  let actionCareer = "";
  let actionWealth = "";
  let actionRelation = "";

  if (isUp) {
    actionCareer = "【事業・仕事】準備は整いました。温めてきた新提案やプロジェクトを前向きに発信すべき時です。遠慮せずリーダーシップを発揮してください。";
    actionWealth = "【金運・投資】押し目迎撃の好機。恐れずに勝率の高いコア資産へ機動的に配分して吉。ただし一括ではなく、計画的な分割投資を貫いてください。";
    actionRelation = "【対人・絆】感謝の言葉を素直に口にしましょう。あなたが心を開くことで、頼もしい援軍や協力者が自然と引き寄せられます。";
  } else {
    actionCareer = "【事業・仕事】今はアクセルを踏み込む時ではありません。契約書類やデータの細部を総点検し、足元のミスを未然に防ぐ防衛策に徹してください。";
    actionWealth = "【金運・投資】キャッシュ比率を高めに維持し、様子見を貫くべき局面。甘い儲け話や突発的な飛びつき買いは厳に慎み、守りを固めてください。";
    actionRelation = "【対人・絆】感情的な議論は避け、一呼吸置いてから返答しましょう。無理に白黒つけようとせず、相手の立場に一度立つことで摩擦を回避できます。";
  }

  const tarotSynthesis = `
本日引かれたカードは**『${tarotCard.number}: ${tarotCard.name}（${tarotCard.orientation}）』**です。
このカードは、あなたの現在の星回りである${astro.sunSign}（守護星：${astro.ruler}）と数秘サイクル『${num.personalYear}』の波動に共鳴して顕現しました。

**【天からのサイン】**:
${tarotCard.detail.meaning}

**【明日から使える3大実戦処方箋】**:
• ${actionCareer}
• ${actionWealth}
• ${actionRelation}
  `.trim();

  // 5. 五行調整・開運処方箋
  const elementRemedy = {
    "木": { color: "フォレストグリーン・エメラルド", item: "観葉植物・木製アイテム・森林浴", direction: "東" },
    "火": { color: "クリムゾンレッド・オレンジ", item: "キャンドル・香辛料・太陽光を浴びる", direction: "南" },
    "土": { color: "アースブラウン・キャメル・ゴールド", item: "陶器・天然石・登山や土に触れること", direction: "中央・南西" },
    "金": { color: "プラチナホワイト・シルバー", item: "金属時計・貴金属・研ぎ澄まされた刃物", direction: "西" },
    "水": { color: "ディープネイビー・ブラック", item: "名水・ドリップコーヒー・温泉・海や川を眺める", direction: "北" }
  };
  const remedy = elementRemedy[bazi.weakestElement];

  // 6. プレミアム深層鑑定用（生涯10年年表シミュレーション）
  const startYear = 2026;
  const tenYearsTimeline = [];
  for (let i = 0; i < 10; i++) {
    const targetY = startYear + i;
    const pYear = calculateNumerology(birthDate, targetY).personalYear;
    let fortuneRank = "安泰運";
    let advice = "着実に歩みを進める年。";
    if (pYear === 1) { fortuneRank = "🌟 大飛躍運"; advice = "9年に一度の新しい種まき・新事業スタートの年。"; }
    else if (pYear === 8) { fortuneRank = "💎 大収穫運"; advice = "富と名声が結実する最大のマネーサクセス期。"; }
    else if (pYear === 9) { fortuneRank = "🍂 完結・大掃除"; advice = "不要な縁や資産を整理し、次の9年へ備える年。"; }
    else if (pYear === 4) { fortuneRank = "🛡️ 堅牢・地固め"; advice = "健康管理と基盤整備に徹する守りの年。"; }

    tenYearsTimeline.push({
      year: targetY,
      cycle: pYear,
      rank: fortuneRank,
      advice: advice
    });
  }

  return {
    soulTitle,
    soulNarrative,
    yearNarrative,
    tarotSynthesis,
    bazi,
    astro,
    num,
    tarotCard,
    scores: {
      total: totalFortune,
      career: careerScore,
      wealth: wealthScore,
      spirit: spiritScore
    },
    remedy: {
      lackingElement: bazi.weakestElement,
      color: remedy.color,
      item: remedy.item,
      direction: remedy.direction
    },
    tenYearsTimeline,
    dailyCompass: generateDailyCompass(birthDate, new Date(), bazi, num, tarotCard),
    elementsProfile: generateElementsProfile(bazi)
  };
}

// -------------------------------------------------------------
// 五行エネルギー特性と偏りの哲学 (Elements Profile Generator)
// -------------------------------------------------------------
function generateElementsProfile(bazi) {
  const dom = bazi.dominantElement;
  const weak = bazi.weakestElement;

  const dominantDict = {
    "木": {
      title: "🌲 碧樹開拓型 (The Pioneer)",
      strength: "天を突く大樹のような独立心と向上心。ゼロから活路を拓く突破力が突出しています。",
      nature: "自ら信じた道を切り拓く強いリーダーシップと、困難にも屈しない不屈の精神。"
    },
    "火": {
      title: "🔥 赫炎カリスマ型 (The Catalyst)",
      strength: "人々を照らす太陽のような情熱と求心力。アイデアを鮮やかに広げる表現力が突出しています。",
      nature: "周囲を巻き込む明るいエネルギーと、時代の先頭に立って変革を促す突破力。"
    },
    "土": {
      title: "🏔️ 泰山重鎮型 (The Anchor)",
      strength: "万物を受け止める大地のような包容力と安定感。信頼と現実的基盤を固める力が突出しています。",
      nature: "目先の乱気流に動じない誠実さと、人や資産を着実に育み蓄積する重厚な信頼感。"
    },
    "金": {
      title: "⚔️ 剛金審美型 (The Strategist)",
      strength: "研ぎ澄まされた刃のような鋭い決断力と正義感。不要なものを削ぎ落とす本質眼が突出しています。",
      nature: "妥協を許さぬプロフェッショナリズムと、混迷した状況を瞬時に断ち切る鋭利な判断力。"
    },
    "水": {
      title: "🌊 滄海知略型 (The Visionary)",
      strength: "深海のような底知れぬ知性と臨機応変の適応力。大局を見通し、自在に形を変える知略が突出しています。",
      nature: "物事の深層心理や時代の潮目を嗅ぎ分ける洞察力と、どんな障害もすり抜けて流れる柔軟性。"
    }
  };

  const lackingDict = {
    "木": {
      title: "【木（始動・決断の氣）の補正】",
      advice: "深く考えすぎて最初の一歩が重くなりがちです。完成度70%でも良いので『まず着手する』スピード感を意識すると、潜在エネルギーが一気に活性化します。"
    },
    "火": {
      title: "【火（情熱・発信の氣）の補正】",
      advice: "胸の内の情熱や成果を内に秘めすぎず、積極的に自己開示・発信してください。あなたの意図を言葉にして伝えることで、強力な援軍が集まります。"
    },
    "土": {
      title: "【土（着実・信用の氣）の補正】",
      advice: "アイデアや理想が先走り、足元の事務や地固めが疎かになりやすい傾向。契約書や数字のダブルチェックを徹底することで、成功の城が盤石になります。"
    },
    "金": {
      title: "【金（果断・規律の氣）の補正】",
      advice: "優しさゆえに情に流されたり、不要な関係を切り損ねがちです。時には冷徹に『NO』を告げる勇気を持つことが、あなたの時間を守る最大の盾となります。"
    },
    "水": {
      title: "【水（柔軟・知性の氣）の補正】",
      advice: "正論や力技で突破しようとしてエネルギーを消耗しがちです。時には柳のように受け流し、静寂の中で一呼吸置いて戦略を練り直す余裕が運を開きます。"
    }
  };

  const dInfo = dominantDict[dom] || dominantDict["木"];
  const lInfo = lackingDict[weak] || lackingDict["水"];

  const philosophy = "四柱推命の原典『滴天髄』は「有病方為貴（偏りがあってこそ非凡な器となる）」と説きます。完全な五行均等な人間は凡庸であり、あなたの五行の凹凸（偏り）こそが他者には真似できない唯一無二の才能の輪郭です。";

  return {
    dominantTitle: dInfo.title,
    dominantDesc: `${dInfo.strength} ${dInfo.nature}`,
    lackingTitle: lInfo.title,
    lackingAdvice: lInfo.advice,
    philosophy,
    dominantElement: dom,
    weakestElement: weak
  };
}

// -------------------------------------------------------------
// 本日の行動指南 (Daily Protocol / 麒麟のデイリーコンパス) 生成ロジック
// -------------------------------------------------------------
const STEM_PROP = {
  "甲": { element: "木", yinYang: "陽" },
  "乙": { element: "木", yinYang: "陰" },
  "丙": { element: "火", yinYang: "陽" },
  "丁": { element: "火", yinYang: "陰" },
  "戊": { element: "土", yinYang: "陽" },
  "己": { element: "土", yinYang: "陰" },
  "庚": { element: "金", yinYang: "陽" },
  "辛": { element: "金", yinYang: "陰" },
  "壬": { element: "水", yinYang: "陽" },
  "癸": { element: "水", yinYang: "陰" }
};

const GENERATES = { "木": "火", "火": "土", "土": "金", "金": "水", "水": "木" };
const OVERCOMES = { "木": "土", "土": "水", "水": "火", "火": "金", "金": "木" };

function calculateTenGod(userKan, dayKan) {
  const u = STEM_PROP[userKan];
  const d = STEM_PROP[dayKan];
  if (!u || !d) return { name: "比肩", role: "自己確立・独立・先手必勝", energy: "自主" };

  const samePolarity = u.yinYang === d.yinYang;

  if (u.element === d.element) {
    return samePolarity 
      ? { name: "比肩", reading: "ひけん", role: "独立・自立・先手必勝", energy: "自主" }
      : { name: "劫財", reading: "ごうざい", role: "野心・仲間との連携・大勝負", energy: "競争" };
  } else if (GENERATES[u.element] === d.element) {
    return samePolarity
      ? { name: "食神", reading: "しょくじん", role: "自然体・創造・表現・歓喜", energy: "発露" }
      : { name: "傷官", reading: "しょうかん", role: "鋭利な直感・技術・美意識・舌禍警戒", energy: "変革" };
  } else if (OVERCOMES[u.element] === d.element) {
    return samePolarity
      ? { name: "偏財", reading: "へんざい", role: "商機・機転・流動資産・人脈拡大", energy: "流通" }
      : { name: "正財", reading: "せいざい", role: "着実・信用・固定資産・契約・誠実", energy: "蓄積" };
  } else if (OVERCOMES[d.element] === u.element) {
    return samePolarity
      ? { name: "偏官", reading: "へんかん", role: "突破力・機動力・即断即決・短気戒め", energy: "果断" }
      : { name: "正官", reading: "せいかん", role: "規律・社会的信用・正道・品格", energy: "統率" };
  } else if (GENERATES[d.element] === u.element) {
    return samePolarity
      ? { name: "偏印", reading: "へんいん", role: "独創的着眼・企画力・非日常の探求", energy: "知略" }
      : { name: "印綬", reading: "いんじゅ", role: "学術・深い研究・恩師の助言・精神性", energy: "叡智" };
  }
  return { name: "比肩", reading: "ひけん", role: "自己確立", energy: "自主" };
}

function getNobleHour(userKan) {
  const nobleHours = {
    "甲": { hours: "13:00 〜 15:00", branch: "未の刻", note: "午後一番の商談・決断に最大の天恵" },
    "戊": { hours: "13:00 〜 15:00", branch: "未の刻", note: "午後一番の商談・決断に最大の天恵" },
    "庚": { hours: "13:00 〜 15:00", branch: "未の刻", note: "午後一番の商談・決断に最大の天恵" },
    "乙": { hours: "15:00 〜 17:00", branch: "申の刻", note: "夕刻前の重要連絡・契約締結に最大の天恵" },
    "己": { hours: "15:00 〜 17:00", branch: "申の刻", note: "夕刻前の重要連絡・契約締結に最大の天恵" },
    "丙": { hours: "17:00 〜 19:00", branch: "酉の刻", note: "夕暮れの会合・打ち解けた対話に最大の天恵" },
    "丁": { hours: "17:00 〜 19:00", branch: "酉の刻", note: "夕暮れの会合・打ち解けた対話に最大の天恵" },
    "壬": { hours: "09:00 〜 11:00", branch: "巳の刻", note: "午前中の重要方針発表・第一声に最大の天恵" },
    "癸": { hours: "09:00 〜 11:00", branch: "巳の刻", note: "午前中の重要方針発表・第一声に最大の天恵" },
    "辛": { hours: "11:00 〜 13:00", branch: "午の刻", note: "正午のトップ会談・勝負の意思決定に最大の天恵" }
  };
  return nobleHours[userKan] || { hours: "11:00 〜 13:00", branch: "午の刻", note: "正午の太陽が昇り詰める刻" };
}

function generateDailyCompass(birthDate, currentDate, bazi, num, tarotCard) {
  const today = currentDate || new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const dayOfWeekStr = ["日", "月", "火", "水", "木", "金", "土"][today.getDay()];
  const formattedDate = `${year}.${month < 10 ? "0" + month : month}.${day < 10 ? "0" + day : day} (${dayOfWeekStr})`;

  // 今日の干支
  const todayBazi = calculateBaZi(today);
  const userKan = bazi.dayMasterKan;
  const todayKan = todayBazi.dayMasterKan;
  const todayShi = todayBazi.bazi ? todayBazi.bazi.dayShi : "辰";
  const tenGod = calculateTenGod(userKan, todayKan);

  // 数秘パーソナルデイ (Personal Day 1〜9)
  const reduceHelper = typeof reduceDigits === "function" ? reduceDigits : (val) => {
    let s = val;
    while (s > 9) {
      s = String(s).split("").reduce((acc, d) => acc + parseInt(d, 10), 0);
    }
    return s;
  };
  const pDay = reduceHelper(num.personalYear + month + day, false);

  // 天乙貴人勝負時間
  const noble = getNobleHour(userKan);

  // アイコンと強度
  const vibeIcons = {
    1: "⚡️", 2: "🤝", 3: "🎨", 4: "🛡️", 5: "🌪️", 6: "🕊️", 7: "🔭", 8: "👑", 9: "🍂"
  };
  const icon = vibeIcons[pDay] || "🧭";
  const energyLevel = Math.min(98, Math.max(72, 70 + (pDay === 1 || pDay === 8 ? 16 : (pDay === 4 || pDay === 7 ? 6 : 12)) + (tarotCard.isUpright ? 10 : -4)));

  let careerProto = "";
  let wealthProto = "";
  let relationProto = "";
  let tabooText = "";
  let luckyCharge = "";

  if (tenGod.name === "比肩" || pDay === 1) {
    careerProto = "他人の意見に流されず、自分の直感を信じて先手を打つべき日。温めてきた企画の一歩を踏み出すに最適です。";
    wealthProto = "守りに入りすぎず、成長性の高い投資対象をリサーチして吉。ただし即決せず、指値注文で冷静に待ち構えてください。";
    relationProto = "曖昧な返答は避け、自分の意思をはっきりと誠実に伝えることで、周囲からの信頼が一気に高まります。";
    tabooText = "「先延ばし」「他責の言葉」── 今日決断を避けると、後々まで停滞を引きずります。";
    luckyCharge = "【開運食】ブラックコーヒー、ナッツ類 ｜ 【行動】靴を磨いて足元を清める";
  } else if (tenGod.name === "劫財" || pDay === 8) {
    careerProto = "目標を高く掲げ、チームを巻き込んで大勝負に出る日。リーダーシップを前面に押し出してください。";
    wealthProto = "押し目迎撃の絶好機。資金配分を守りつつ、確信度の高い資産への断行が吉。ただし見栄による大判振る舞いは厳禁。";
    relationProto = "互いの利害を一致させる交渉が成立しやすい時。ギブ＆テイクの対等なパートナーシップを築いてください。";
    tabooText = "「感情的な衝動買い」「無理な高値掴み」── 勢い余っての過剰リスクに要注意。";
    luckyCharge = "【開運食】赤身肉、スパイシー料理 ｜ 【行動】背筋を伸ばし深呼吸を3回行う";
  } else if (tenGod.name === "食神" || pDay === 3) {
    careerProto = "堅苦しさを捨て、遊び心と柔軟な発想で課題にアプローチして吉。雑談の中にブレイクスルーの種が眠っています。";
    wealthProto = "自己投資や体験への支出が未来の大きなリターンに化ける日。ケチケチせず、心を満たす良質な消費を。";
    relationProto = "ユーモアと笑顔を意識して吉。あなたが場の空気を和ませることで、頑なだった相手の心が解けます。";
    tabooText = "「過度な深刻化」「愚痴の同調」── 眉間にシワを寄せると良運が逃げます。";
    luckyCharge = "【開運食】柑橘類、ハーブティー ｜ 【行動】デスク周りの拭き掃除と換気";
  } else if (tenGod.name === "傷官" || pDay === 5) {
    careerProto = "直感が研ぎ澄まされる日。既存の非効率な業務や仕組みを根本から改善するアイデアが冴え渡ります。";
    wealthProto = "相場の急な値動きに即応できる機動性あり。ただし短気は損気。テクニカル指標のシグナルを厳格に順守してください。";
    relationProto = "正論であっても相手を論破しないこと。言葉の刃を収め、オブラートに包んだ建設的な提案を心がけてください。";
    tabooText = "「皮肉・不用意な批判」「急な予定変更の強要」── 舌禍（言葉のトラブル）に最大の警戒を。";
    luckyCharge = "【開運食】緑茶、ミント、和菓子 ｜ 【行動】クラシックや環境音楽を聴いて心を鎮める";
  } else if (tenGod.name === "偏財" || tenGod.name === "正財") {
    careerProto = "周囲のニーズを的確に察知し、相手の期待以上の価値を提供できる日。営業・プレゼン・契約締結に強い追い風。";
    wealthProto = "金運の気流が最も滑らか。家計やポートフォリオのバランスを点検し、無駄な固定費を削減する絶好の機会。";
    relationProto = "日頃お世話になっている人へ感謝のメッセージを一報入れて吉。小さな気配りが大きな恩返しとなって還ります。";
    tabooText = "「安易な口約束」「曖昧な金銭貸借」── 数字と契約条件は書面で再確認すること。";
    luckyCharge = "【開運食】根菜類、玄米・雑穀 ｜ 【行動】財布の中のレシートを整理し整える";
  } else if (tenGod.name === "偏官" || tenGod.name === "正官") {
    careerProto = "責任ある役割を果たすことで評価が急上昇する日。期限厳守と正確な報告・連絡・相談が最大の武器になります。";
    wealthProto = "守りのポートフォリオを強化すべき日。キャッシュ比率を確保し、突発的な市場の嵐に備える要塞化を意識して吉。";
    relationProto = "礼節を重んじ、敬意を持った言葉遣いを徹底してください。目上の人や実力者からの引き立てが得られます。";
    tabooText = "「ルール違反」「勝手な独断専行」── 筋を通さない行動は信用失墜を招きます。";
    luckyCharge = "【開運食】魚料理、豆腐、海藻類 ｜ 【行動】スーツや清潔感ある装いを整える";
  } else {
    careerProto = "インプットと深い思考に最高のエネルギー。一人静かに本質的な戦略を練り、専門書や分析データを読み込むべき日。";
    wealthProto = "大きな売買は控え、情報収集と市場のリサーチに専念して吉。本質的な価値を見抜く鑑識眼が冴えています。";
    relationProto = "無理な飲み会や社交は断り、自分のための静寂を確保して吉。必要な連絡だけを端的に済ませてください。";
    tabooText = "「考えすぎによる麻痺」「雑音への過剰反応」── SNSの過剰チェックを遮断せよ。";
    luckyCharge = "【開運食】具だくさん味噌汁、温かいスープ ｜ 【行動】少し遠回りして公園や木々の間を歩く";
  }

  const vibeTitle = `${icon} ${tenGod.name}（${tenGod.role}）× 循環数【${pDay}】`;
  const vibeSub = `本日の星辰：『${todayKan}${todayShi}』の日 ｜ あなたの核『${userKan}』と共鳴する【${tenGod.energy}】の気流`;

  return {
    dateStr: formattedDate,
    vibeTitle,
    vibeSub,
    tenGodName: tenGod.name,
    personalDay: pDay,
    energyLevel,
    peakTime: noble.hours,
    peakDesc: `${noble.branch}（天乙貴人の刻）：${noble.note}`,
    protocolCareer: careerProto,
    protocolWealth: wealthProto,
    protocolRelation: relationProto,
    taboo: tabooText,
    luckyCharge: luckyCharge
  };
}

if (typeof module !== "undefined") {
  module.exports = { generateSynthesizedReading, generateDailyCompass, calculateTenGod, getNobleHour };
}
