const baseMaxExp = 62184826; // 極短刀の最大累積経験値 Lv99

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
  const maxExp = baseMaxExp * multiplier;

  // 修行開始時点の経験値（35レベル相当のオフセット）
  const offset = 445300;
  const baseExp = totalExp - offset;

  if (baseExp <= 0) {
    resultDiv.textContent = "修行直後（レベル35未満）です。";
    return;
  }

  // 35〜99レベルまでの簡易線形補間
  let level = Math.floor((baseExp / maxExp) * 64) + 35;

  if (level > 99) level = 99;

  resultDiv.textContent = `推定レベル: ${level}`;
}
