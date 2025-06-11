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

// 極短刀 Lv1～Lv99までの累積経験値テーブル（レベルインデックス = レベル）
const baseExpTable = [
  0,
  0,
  588,
  1305,
  2194,
  3296,
  4653,
  6307,
  8300,
  10673,
  13468,
  16727,
  20491,
  24802,
  29702,
  35233,
  41436,
  48354,
  56027,
  64498,
  73808,
  84000,
  95114,
  107193,
  120278,
  134411,
  149634,
  165989,
  183517,
  202260,
  222260,
  307195,
  454335,
  660950,
  924310,
  1241685,
  1610345,
  2027560,
  2490600,
  3296435,
  3543558,
  4540107,
  5221051,
  5937387,
  6686113,
  7464226,
  8268722,
  9096598,
  9814852,
  10810481,
  11690481,
  12541690,
  13541982,
  14541690,
  15531008,
  16581584,
  17304441,
  18132662,
  17966772,
  18807296,
  19103235,
  21372370,
  22044290,
  22624529,
  23030495,
  24536944,
  25171977,
  25849517,
  26435464,
  27246595,
  27368707,
  28204456,
  28458293,
  29075594,
  29382086,
  29799605,
  30129714,
  30643648,
  30943049,
  31324522,
  31693918,
  32101580,
  32496190,
  32892726,
  33317806,
  33738398,
  34212191,
  34733323,
  35265324,
  35824412,
  36344044,
  36925022,
  37503656,
  38087916,
  38705894,
  39357797,
  40024206,
  40731494,
  41489543,
  42224934,
  43013709,
  43822223,
  44678579,
  45549768,
  46485129,
  47435301,
  48433826,
  49439186,
  50463844,
  51542158,
  52624651,
  53731042,
  54843442,
  55973191,
  57127135,
  58290992,
  59466129,
  60665396,
  61871827,
  62184826,
];

function calculateLevel() {
  const type = document.getElementById("type").value;
  const totalExpInput = document.getElementById("exp").value.trim();
  const resultDiv = document.getElementById("result");

  if (!totalExpInput) {
    resultDiv.textContent = "累計経験値を入力してください。";
    return;
  }

  const totalExp = Number(totalExpInput);
  if (isNaN(totalExp) || totalExp <= 0) {
    resultDiv.textContent = "有効な経験値を入力してください。";
    return;
  }

  const multiplier = multipliers[type] || 1.0;

  // Lv35までの経験値（短刀基準での累積値）
  const baseOffsetExp = 1241685; // 累積経験値Lv34まで（短刀基準）

  // 入力経験値から修行開始分を引いて計算
  let baseExp = totalExp - baseOffsetExp;

  if (baseExp < 0) {
    resultDiv.textContent = "極修行可能レベル未満です（Lv34以下）。";
    return;
  }

  // 経験値テーブルを倍率で補正
  const expTable = baseExpTable.map((exp) => exp * multiplier);

  // レベル判定
  let level = 34; // Lv34までは共通なので初期値は34
  for (let i = 35; i < expTable.length; i++) {
    if (baseExp < expTable[i]) {
      level = i - 1;
      break;
    }
    if (i === expTable.length - 1) {
      level = i;
    }
  }

  resultDiv.textContent = `推定極レベル: ${level}`;
}

