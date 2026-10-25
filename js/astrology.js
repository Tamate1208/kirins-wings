/**
 * 西洋占星術（Astrology）モジュール
 * 原典：プトレマイオス『テトラビブロス』
 */

const ZODIAC_SIGNS = [
  { name: "牡羊座", latin: "Aries", symbol: "♈", element: "火", modality: "活動宮", ruler: "火星", start: [3, 21], end: [4, 19], trait: "開拓精神・直感・勇敢な突破力" },
  { name: "牡牛座", latin: "Taurus", symbol: "♉", element: "地", modality: "不動宮", ruler: "金星", start: [4, 20], end: [5, 20], trait: "五感の豊かさ・持続力・物質的基盤" },
  { name: "双子座", latin: "Gemini", symbol: "♊", element: "風", modality: "柔軟宮", ruler: "水星", start: [5, 21], end: [6, 21], trait: "知的好奇心・機敏な対話・多角的な視点" },
  { name: "蟹座", latin: "Cancer", symbol: "♋", element: "水", modality: "活動宮", ruler: "月", start: [6, 22], end: [7, 22], trait: "共感力・守護の精神・情緒の深奥" },
  { name: "獅子座", latin: "Leo", symbol: "♌", element: "火", modality: "不動宮", ruler: "太陽", start: [7, 23], end: [8, 22], trait: "自己表現・王者の威厳・惜しみない寛大さ" },
  { name: "乙女座", latin: "Virgo", symbol: "♍", element: "地", modality: "柔軟宮", ruler: "水星", start: [8, 23], end: [9, 22], trait: "分析力・精緻な秩序・奉仕の精神" },
  { name: "天秤座", latin: "Libra", symbol: "♎", element: "風", modality: "活動宮", ruler: "金星", start: [9, 23], end: [10, 23], trait: "美の調和・公平な審美眼・洗練された社交" },
  { name: "蠍座", latin: "Scorpio", symbol: "♏", element: "水", modality: "不動宮", ruler: "冥王星", start: [10, 24], end: [11, 22], trait: "不屈の意志・本質への洞察・徹底的な変容" },
  { name: "射手座", latin: "Sagittarius", symbol: "♐", element: "火", modality: "柔軟宮", ruler: "木星", start: [11, 23], end: [12, 21], trait: "遠大な理想・哲学・未知なる地平への探求" },
  { name: "山羊座", latin: "Capricorn", symbol: "♑", element: "地", modality: "活動宮", ruler: "土星", start: [12, 22], end: [1, 19], trait: "高峰を目指す野心・確固たる責任・歴史の重み" },
  { name: "水瓶座", latin: "Aquarius", symbol: "♒", element: "風", modality: "不動宮", ruler: "天王星", start: [1, 20], end: [2, 18], trait: "独創的変革・普遍的友愛・未来への俯瞰" },
  { name: "魚座", latin: "Pisces", symbol: "♓", element: "水", modality: "柔軟宮", ruler: "海王星", start: [2, 19], end: [3, 20], trait: "無限の受容・霊的インスピレーション・境界の融解" }
];

function getZodiacSign(month, day) {
  for (const sign of ZODIAC_SIGNS) {
    const [sm, sd] = sign.start;
    const [em, ed] = sign.end;
    if (sm <= em) {
      if ((month === sm && day >= sd) || (month === em && day <= ed) || (month > sm && month < em)) {
        return sign;
      }
    } else {
      // 山羊座（年跨ぎ）
      if ((month === sm && day >= sd) || (month === em && day <= ed) || month > sm || month < em) {
        return sign;
      }
    }
  }
  return ZODIAC_SIGNS[9]; // fallback: 山羊座
}

function calculateAstrology(birthDate) {
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();
  const sign = getZodiacSign(month, day);

  return {
    sunSign: sign.name,
    latin: sign.latin,
    symbol: sign.symbol,
    element: sign.element,
    modality: sign.modality,
    ruler: sign.ruler,
    trait: sign.trait
  };
}

if (typeof module !== "undefined") {
  module.exports = { calculateAstrology, ZODIAC_SIGNS };
}
