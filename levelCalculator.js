const baseExpTable = [
  0, 588, 1305, 2194, 3296, 4653, 6307, 8300, 10673, 13468,
  16727, 20491, 24802, 29702, 35233, 41436, 48354, 56027, 64498, 73808,
  84000, 95114, 107193, 120278, 134411, 149634, 165989, 183517, 202260, 222260,
  307195, 454335, 660950, 924310, 1241685, 1610345, 2027560, 2490600, 2996735, 3543235,
  4127370, 4746410, 5397625, 6078285, 6785660, 7517020, 8269635, 9040775, 9827710, 10627710,
  11429400, 12233306, 13039953, 13849865, 14663567, 15481584, 16304441, 17132662, 17966772, 18807296,
  19654759, 20509686, 21372601, 22244029, 23124495, 24014524, 24914640, 25825368, 26747233, 27680760,
  28626474, 29584849, 30556360, 31541982, 32541710, 33556169, 34585854, 35631206, 36692589, 37770508,
  38865585, 39978501, 41109861, 42260268, 43430431, 44621042, 45832755, 47066238, 48322143, 49601130,
  50903895, 52231107, 53583464, 54961626, 56366218, 57797944, 59257412, 60745167, 62261826
];

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

  const multiplier = multipliers[type] || 1.0;
  const offset = 1241685; // 修行開始時の35レベル相当の極短刀累計EXP（ここを差し引く）
  const adjustedExp = totalExp - offset;

  if (adjustedExp < 0) {
    resultDiv.textContent = "修行直後（レベル35未満）です。";
    return;
  }

  // 短刀極Lv35～Lv99のテーブル区間の経験値を倍率で拡大
  // テーブルはLv0～99の累積経験値。Lv35からが極修行分。
  // Lv35の累積Expは baseExpTable[35]、それより小さい値はLv35未満と判断済み。

  let level = 35; // 最低レベル35から開始

  // Lv35から99の範囲で該当するレベルを検索
  for (let i = 36; i <= 99; i++) {
    // 極短刀テーブルの差分に倍率をかけたものを合計で計算
    const expRequired = (baseExpTable[i] - baseExpTable[35]) * multiplier;

    if (adjustedExp < expRequired) {
      level = i - 1;
      break;
    }
    if (i === 99) {
      level = 99;
    }
  }

  resultDiv.textContent = `推定レベル: ${level}`;
}
