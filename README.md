# ✨ 麒麟の翼 (THE WINGS OF KIRIN) ✨
### 東西四位一体 統合運命鑑定殿 ― The Grand Quad-Synthesis Destiny Oracle

古今東西の正統文献（四柱推命・西洋占星術・ピタゴラス数秘術・神聖タロット）を融合させた、世界最高水準のWeb運命鑑定アプリケーション。

![The Wings of Kirin](https://raw.githubusercontent.com/tamate1208/kirins-wings/main/assets/preview.png)

---

## 🌌 概要 (Overview)

従来の占いアプリにありがちな「抽象的なバーナム効果」や「一方的な定型文」を完全排除。  
生年月日の数理解析と本日の星辰、そしてユーザーが無意識の直感で引き寄せるタロット神託を四位一体に統合し、**「なぜそうなるのか」という論理的根拠**と**「今日どう動くべきか」という実践的処方箋**を提示します。

---

## 🔮 主な機能 (Key Features)

### 1. 🧭 麒麟のデイリーコンパス (本日の行動指南)
- **通変星気流解析**: あなたの日干（魂の核）× 本日の日辰（六十干支）の五行生剋から本日のエネルギー（比肩・偏財・偏官など）を算出。
- **天乙貴人の勝負時間帯**: 四柱推命最大の吉星が巡る刻（例：13:00〜15:00）を特定し、重要決断や商談に最大の天恵が宿る時間を明示。
- **3大行動プロトコル**: 【事業・決断】【投資・財運】【対人・対話】の3軸での立ち回りを具体的に指南。
- **地雷回避（禁忌）＆ 微量開運チャージ**: 今日やってはいけないNG行動と開運食・アクション。

### 2. 🌌 本格立体3D天球儀 (3D Armillary Sphere)
- **完全な3次元モデリング**: CSS 3Dエンジン（`perspective: 1200px` ＋ `preserve-3d`）を駆使。
- **天文学的構造**: 垂直子午線環、水平赤道環、**黄道傾斜角23.5度で斜めに傾いた黄道帯（十二宮シンボル刻印）**、地軸極棒、中心で脈動する地球・太陽コア。
- **3D視差パララックス**: マウスの動きにリアルタイムに追従して奥行きを持って傾くインタラクション。
- **高速自転召喚シーケンス**: 鑑定開始時およびカード選択後、天球儀が3次元軸でギュルギュルと加速スピンするドラマチックな演出。

### 3. ☯️ 五行エネルギー分布＆プロファイル解析
- **蔵干（Hidden Stems）完全分解**: 十二支の内包蔵干（余気・中気・本気）を厳密に配分し、0点欠落を解消。
- **相生（流通循環）ボーナス**: 強い五行が次世代五行を生み出すエネルギー循環を反映した生きたペンタゴンレーダー。
- **滴天髄の哲学プロファイル**: 「有病方為貴（偏りがあってこそ非凡な器となる）」に基づき、あなたの突出した才能（碧樹開拓型、赫炎カリスマ型など）と不足を補う開運処方箋を明文化。

### 4. 🔀 神聖タロットシャッフル＆3Dオープン
- **念を込めるシャッフル**: カードが左右前後に交差して舞い散る本格的な切るアニメーション。
- **ウェイト版大アルカナ22枚**: 正位置・逆位置の深層シンボル解釈。
- **引いた後の神託統合**: カード判明後、天球儀が再び降臨して命式と神託を融合する儀式シーケンス。

### 5. 📜 生涯10年バイオリズム年表＆A4印刷対応
- 9年周期のパーソナルイヤー推移シミュレーション。
- ブラウザ印刷ボタンで、余計なUIを省いた白背景の美麗なA4鑑定書としてPDF保存・印刷可能。

### 6. 🪽 SNSシェア用神聖オラクルカード (Holy Card)
- 鑑定結果のハイライトをスマートフォン向けカードとして美しくレンダリング。

---

## 🛠️ 技術スタック (Tech Stack)

- **Frontend Core**: HTML5 (Semantic), Vanilla JavaScript (ES6+ Modules)
- **Styling**: Vanilla CSS (CSS 3D Transforms, Backdrop Filter, Glassmorphism)
- **Graphics**: HTML5 Canvas API (星空パーティクル、五行発光ペンタゴンレーダー)
- **Design Philosophy**: Cyber Luxury, Vanta Black, Warm Amber & Electric Cyan
- **Deployment**: Render Static Site / Vercel / GitHub Pages (Zero Config)

---

## 🚀 デプロイとローカル実行

### ローカル実行
特別なビルドツールやNode環境は不要です。ブラウザで直接 `index.html` を開くだけで即座に動作します。

```bash
# クローン
git clone https://github.com/tamate1208/kirins-wings.git
cd kirins-wings

# ブラウザで開く (Mac)
open index.html
```

### Render へのデプロイ
1. Render（[dashboard.render.com](https://dashboard.render.com/)）にアクセス。
2. 「New +」→「Static Site」を選択。
3. このGitHubリポジトリ（`kirins-wings`）を連携。
4. 設定：
   - **Build Command**: 空欄
   - **Publish Directory**: `.`
5. 「Create Static Site」をクリックすると、約1分で世界中にCDN配信されます。

---

## 📜 ライセンス (License)

MIT License © 2026 KIRIN'S WINGS Project.
