// 切り替え用フラグ（trueなら本番用、falseならテスト用）
const isProduction = true;

// 本番用の倍率（例: いただいた倍率）
const productionMultipliers = {
  tantou: 1.0,
  wakizashi: 1.1,
  yari: 1.1,
  naginata: 1.1,
  "uchigatana-r2": 1.2,
  "uchigatana-r3": 1.3,
  tachi: 1.4,
  ootachi: 1.5,
};

// テスト用の倍率（例。テスト用に違う倍率を使うならここで変える）
const testMultipliers = {
  tantou: 1.0,
  wakizashi: 1.0,
  yari: 1.0,
  naginata: 1.0,
  "uchigatana-r2": 1.0,
  "uchigatana-r3": 1.0,
  tachi: 1.0,
  ootachi: 1.0,
};

// 本番用経験値テーブル（いただいたものを使う）
const productionExpTable = [
  0, 588, 1305, 2194, 3296, 4653, 6307, 8300, 10673, 13468,
  16727, 20491, 24802, 29702, 35233, 41436, 48354, 56027, 64498, 73808,
  84000, 95114, 107193, 120278, 134411, 149634, 165989, 183517, 202260, 222260,
  307195, 454335, 660950, 924310, 1241685, 1610345, 2027560, 2490600, 2996735, 3543235,
  4127370, 4746410, 5397625, 6078285, 6785660, 7517020, 8269635, 9040775, 9827710, 10627710,
  11429400, 12233306, 13039953, 13849865, 14663567, 15481584, 16304441, 17132662, 17966772, 18807296,
  19654759, 20509686, 21372601, 22244029, 23124495, 24014524, 24914640, 25825368, 26747233, 27680760,
  28626474, 29584899, 30556560, 31541982, 32541690, 33556208, 34586062, 35631776, 36693875, 37772883,
  38869326, 39983728, 41116614, 42268509, 43439937, 44631423, 45843492, 47076669, 48331479, 49608446,
  50908096, 52230953, 53577541, 54948386, 56344012, 57764944, 59211707, 60684826, 62184826
];

// テスト用経験値テーブル（本番と同じでもOK。違うテーブルを使いたいならここで変える）
const testExpTable = [
  0, 500, 1000, 1500, 2100, 2800, 3600, 4500, 5500, 6600,
  7800, 9100, 10500, 12000, 13600, 15300, 17100, 19000, 21000, 23100,
  25300, 27600, 30000, 32500, 35100, 37800, 40600, 43500, 46500, 49600,
  52800, 56100, 59500, 63000, 66600, 70300, 74100, 78000, 82000, 86100,
  90300, 94600, 99000, 103500, 108100, 112800, 117600, 122500, 127500, 132600,
  137800, 143100, 148500, 154000, 159600, 165300, 171100, 177000, 183000, 189100,
  195300, 201600, 208000, 214500, 221100, 227800, 234600, 241500, 248500, 255600,
  262800, 270100, 277500, 285000, 292600, 300300, 308100, 316000, 324000, 332100,
  340300, 348600, 357000, 365500, 374100, 382800, 391600, 400500, 409500, 418600,
  427800, 437100, 446500, 456000, 465600, 475300, 485100, 495000, 505000
];

const multipliers = isProduction ? productionMultipliers : testMultipliers;
const baseExpTable = isProduction ? productionExpTable : testExpTable;

function calculateLevel() {
  const type = document.getElementById("type").value;
  const inputExpStr = document.getElementById("exp").value.trim();
  const resultDiv = document.getElementById("result");

  if (!inputExpStr) {
    resultDiv.textContent = "累計経験値を入力してください。";
    return;
  }

  const inputExp = Number(inputExpStr);
  if (isNaN(inputExp) || inputExp < 0) {
    resultDiv.textContent = "有効な経験値を入力してください。";
    return;
  }

  const multiplier = multipliers[type] || 1.0;

  // 入力経験値を倍率で割って補正
  const adjustedExp = inputExp / multiplier;

  let level = 1; // 最低レベルは1
  for (let i = 1; i < baseExpTable.length; i++) {
    if (adjustedExp < baseExpTable[i]) {
      level = i;
      break;
    }
  }
  // 最大レベルまで到達している場合
  if (adjustedExp >= baseExpTable[baseExpTable.length - 1]) {
    level = baseExpTable.length;
  }

  resultDiv.textContent = `推定極レベル: ${level}`;
}
