// 極短刀のLv1～99までの累積経験値テーブル（例として短刀のみ）
// 他の刀種は倍率で調整する形で実装
const tantouExpTable = [
  0, 588, 1305, 2194, 3296, 4653, 6307, 8300, 10673, 13468,
  16727, 20491, 24802, 29702, 35233, 41436, 48354, 56027, 64498, 73808,
  84000, 95114, 107193, 120278, 134411, 149634, 165989, 183517, 202260, 222260,
  307195, 454335, 660950, 924310, 1241685, 1610345, 2027560, 2490600, 2996735, 3543235,
  4127370, 4746410, 5397625, 6078285, 6785660, 7517020, 8269635, 9040775, 9827710, 10627710,
  11429684, 12233584, 13039488, 13847426, 14657492, 15469742, 16284202, 17100928, 17919904, 18741249,
  19564996, 20391191, 21219861, 22051044, 22884773, 23721086, 24560017, 25401610, 26245912, 27092971,
  27942837, 28795556, 29651183, 30509767, 31371367, 32236039, 33103847, 33974854, 34849122, 35726718,
  36607711, 37492167, 38380156, 39271749, 40167018, 41066039, 41968886, 42875632, 43786353, 44701124,
  45620015, 46543102, 47470461, 48402167, 49338296, 50278924, 51224126, 52173980, 53128561, 54087945,
  55052207
];

// 短刀最大累積経験値
const baseMaxExp = tantouExpTable[tantouExpTable.length - 1];

// 各刀種の倍率
const multipliers = {
  tantou: 1.0,
  wakizashi: 1.1,
  yari: 1.1,
  naginata: 1.1,
  "uchigatana-r2": 1.2,
  "uchigatana-r3": 1.3,
  tachi: 1.4,
  ootachi: 1.5,
};

function calculateLevel() {
  const type = document.getElementById("type").value;
  const totalExp = parseInt(document.getElementById("exp").value, 10);
  const resultDiv = document.getElementById("result");

  if (isNaN(totalExp) || totalExp <= 0) {
    resultDiv.textContent = "有効な経験値を入力してください。";
    return;
  }

  // オフセット経験値（修行開始時点＝Lv35の無印経験値）
  const offset = 445300;

  // 累積経験値からオフセット分を引く（極化直後Lv1相当の経験値）
  const baseExp = totalExp - offset;
  if (baseExp < 0) {
    resultDiv.textContent = "修行直後（レベル35未満）です。";
    return;
  }

  // 短刀基準の経験値テーブルに倍率をかけて現在の刀種の経験値テーブルを生成
  const multiplier = multipliers[type] || 1.0;
  const expTable = tantouExpTable.map(exp => Math.floor(exp * multiplier));

  // baseExpがどのレベル間にあるかを判定してレベルを計算
  let level = 0;
  for (let i = 1; i < expTable.length; i++) {
    if (baseExp < expTable[i]) {
      level = i; // baseExpはexpTable[i-1]以上expTable[i]未満なのでレベルはi-1の次のレベルi
      break;
    }
  }
  if (baseExp >= expTable[expTable.length - 1]) {
    level = 99; // 最大レベル
  }

  // レベルが35未満の場合は別表示
  if (level < 35) {
    resultDiv.textContent = "修行直後（レベル35未満）です。";
    return;
  }

  resultDiv.textContent = `推定レベル: ${level}`;
}
