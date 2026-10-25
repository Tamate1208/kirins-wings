/**
 * ピタゴラス・カバラ数秘術モジュール
 */

const LIFE_PATH_DICT = {
  1: {
    title: "開拓者・先駆者 (The Leader)",
    core: "独立心、意志の強さ、ゼロから道を拓く突破力",
    mission: "前人未到の山嶺に最初の一歩を刻み、他者を導くこと",
    color: "#ef4444"
  },
  2: {
    title: "調和者・共鳴者 (The Diplomat)",
    core: "受容性、繊細な直感、人と人を結ぶ架け橋の力",
    mission: "対立を癒し、見えない細部に美と秩序をもたらすこと",
    color: "#f59e0b"
  },
  3: {
    title: "創造者・表現者 (The Creator)",
    core: "創造的衝動、陽気なインスピレーション、希望を灯す言葉",
    mission: "自らの喜びと感性を表現し、世界に彩りを与えること",
    color: "#eab308"
  },
  4: {
    title: "構築者・守護者 (The Builder)",
    core: "堅実、規律、嵐に揺るがぬ盤石な基盤を築く力",
    mission: "一歩一歩の足場を固め、永続する信頼の城を築くこと",
    color: "#10b981"
  },
  5: {
    title: "冒険者・変革者 (The Catalyst)",
    core: "自由、適応力、境界線を越えて風を起こす機動力",
    mission: "停滞を打破し、未知の世界を旅して新風を吹き込むこと",
    color: "#06b6d4"
  },
  6: {
    title: "慈愛者・調停者 (The Nurturer)",
    core: "責任感、献身、美しい調和と安心を育む温もり",
    mission: "仲間や居場所を守り、美と愛の秩序を整えること",
    color: "#3b82f6"
  },
  7: {
    title: "探求者・賢者 (The Seeker)",
    core: "深い洞察、孤独を愛する知性、本質を見抜く眼力",
    mission: "表面的な現象の奥にある真理と宇宙の法則を解き明かすこと",
    color: "#8b5cf6"
  },
  8: {
    title: "統率者・成就者 (The Powerhouse)",
    core: "現実的達成力、豊かさの循環、巨大なエネルギーの統御",
    mission: "高い山頂を制覇し、物質と精神の豊かな実りを地上に還元すること",
    color: "#ec4899"
  },
  9: {
    title: "完成者・博愛者 (The Humanitarian)",
    core: "全人的理解、手放す勇気、時代や世代を超える大いなる視座",
    mission: "執着を手放し、次のサイクルへ向けた統合と昇華を促すこと",
    color: "#a855f7"
  },
  11: {
    title: "霊的直感者 (Master 11 - The Intuitive)",
    core: "鋭敏な天啓、インスピレーション、時代を先取りするアンテナ",
    mission: "高次の直感を地上に降ろし、人々の意識を覚醒させること",
    color: "#f43f5e"
  },
  22: {
    title: "巨星・具現者 (Master 22 - Master Builder)",
    core: "壮大なる理想を寸分の狂いもなく現実に落とし込む力",
    mission: "社会全体の礎となる巨大なビジョンを物質化すること",
    color: "#14b8a6"
  },
  33: {
    title: "宇宙の導き手 (Master 33 - Master Healer)",
    core: "無条件の愛、普遍の慈悲、常識を超えたスケールの包容力",
    mission: "損得を超越した愛で世界を照らし、魂の自由を説くこと",
    color: "#f59e0b"
  }
};

const YEAR_CYCLE_DICT = {
  1: "「種まき・胎動の年」：新しい挑戦を開始する絶好の好機。過去の延長ではなく未知へ踏み出せ。",
  2: "「受容・育みの年」：焦らず関係性を深め、水面下で根を張る時期。協調と観察が鍵。",
  3: "「開花・社交の年」：蒔いた種が芽吹き、人脈とアイデアが広がる明るい躍動期。",
  4: "「地固め・基盤作りの年」：足元を点検し、不要なものを省いて岩盤を固める点検の年。",
  5: "「飛翔・転機の年」：予期せぬ変化と冒険の波。古い殻を破り、柔軟に波に乗る年。",
  6: "「責任・調和の年」：身近な大切な人やコミュニティへの貢献。美と絆の充実。",
  7: "「内省・休息・学びの年」：外へ急がず、内面と専門性を深く掘り下げる山頂の思索期。",
  8: "「結実・大収穫の年」：これまでの努力が現実の成果・富・権威として実を結ぶクライマックス。",
  9: "「完結・浄化の年」：1つのサイクルの終幕。次の10年に持っていかない荷物を手放す整理の時期。"
};

function reduceDigits(num, allowMaster = true) {
  let sum = num;
  while (sum > 9) {
    if (allowMaster && (sum === 11 || sum === 22 || sum === 33)) {
      break;
    }
    sum = String(sum)
      .split("")
      .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  }
  return sum;
}

function calculateNumerology(birthDate, currentYear = 2026) {
  const y = birthDate.getFullYear();
  const m = birthDate.getMonth() + 1;
  const d = birthDate.getDate();

  // ライフパスナンバー (全桁合算)
  const allDigits = `${y}${m < 10 ? "0" + m : m}${d < 10 ? "0" + d : d}`
    .split("")
    .reduce((acc, cur) => acc + parseInt(cur, 10), 0);
  const lifePath = reduceDigits(allDigits, true);

  // パーソナルイヤーナンバー (当年の年数 + 誕生月 + 誕生日)
  const yearSum = `${currentYear}${m < 10 ? "0" + m : m}${d < 10 ? "0" + d : d}`
    .split("")
    .reduce((acc, cur) => acc + parseInt(cur, 10), 0);
  const personalYear = reduceDigits(yearSum, false);

  return {
    lifePath,
    lifePathDetail: LIFE_PATH_DICT[lifePath] || LIFE_PATH_DICT[reduceDigits(lifePath, false)],
    personalYear,
    personalYearTheme: YEAR_CYCLE_DICT[personalYear] || ""
  };
}

if (typeof window !== "undefined") {
  window.reduceDigits = reduceDigits;
}

if (typeof module !== "undefined") {
  module.exports = { calculateNumerology, LIFE_PATH_DICT, YEAR_CYCLE_DICT, reduceDigits };
}
