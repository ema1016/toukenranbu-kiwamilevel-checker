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

// 極短刀 Lv0～Lv99の累積経験値（0はLv0用、インデックス = レベル）
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

  // 経験値テーブルに倍率を掛けたものを生成
  const adjustedExpTable = baseExpTable.map(exp => Math.floor(exp * multiplier));

  // 入力の累積経験値に最も近いレベルを探す（経験値以下の最大レベル）
  let level = 0;
  for (let i = 1; i < adjustedExpTable.length; i++) {
    if (inputExp < adjustedExpTable[i]) {
      level = i - 1;
      break;
    }
    if (i === adjustedExpTable.length - 1) {
      level = i;
    }
  }

  if (level === 0) {
    resultDiv.textContent = "極修行開始前、または経験値が不足しています。";
    return;
  }

  resultDiv.textContent = `推定極レベル: ${level}`;
}
