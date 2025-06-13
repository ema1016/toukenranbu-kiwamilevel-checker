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

const minRequiredExp = {
  tantou: 445300,
  wakizashi: 540800,
  yari: 540800,
  naginata: 540800,
  "uchigatana-r2": 648800,
  "uchigatana-r3": 648800,
  tachi: 770800,
  ootachi: 907800,
};

const baseExpTable = [
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

function calculateLevel() {
  const type = document.getElementById("type").value;
  const inputExpStr = document.getElementById("exp").value.trim();
  const resultDiv = document.getElementById("result");

  if (!inputExpStr) {
    resultDiv.innerHTML = `<span style="font-size: 15px; color: #2c3e50;">累計経験値を入力してください。</span>`;
    return;
  }

  const inputExp = Number(inputExpStr);
  if (isNaN(inputExp) || inputExp < 0) {
    resultDiv.innerHTML = `<span style="font-size: 15px; color: #2c3e50;">有効な経験値を入力してください。</span>`;
    return;
  }

  const multiplier = multipliers[type] || 1.0;
  const adjustedExp = inputExp / multiplier;
  const requiredExp = minRequiredExp[type];

  if (inputExp < requiredExp) {
    resultDiv.innerHTML = `<span style="color: red; font-size: 0.9em; font-weight: normal;">
      修行に出すには、まだ経験値が足りないようです。<br>
      （必要な累計経験値：${requiredExp.toLocaleString()}）
    </span>`;
    return;
  }

  let level = 1;
  for (let i = 1; i < baseExpTable.length; i++) {
    if (adjustedExp < baseExpTable[i]) {
      level = i;
      break;
    }
  }

  resultDiv.style.color = "#2c3e50";

if (adjustedExp >= baseExpTable[baseExpTable.length - 1]) {
  level = baseExpTable.length;
  resultDiv.innerHTML = `
    <div style="font-size: 18px; font-weight: 600;">推定極レベル: ${level}</div>
    <div style="color: red; font-size: 14px; margin-top: 12px; line-height: 1.6;">レベリングお疲れ様でした！</div>
  `;
}
  } else {
    resultDiv.innerHTML = `<div style="font-size: 18px; font-weight: 600;">推定極レベル: ${level}</div>`;
  }
}
