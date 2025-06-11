const levelTable = [
  0, 1000, 3000, 6000, 10000, 15000, 21000, 28000, 36000, 45000, 55000, 66000,
  78000, 91000, 105000, 120000, 136000, 153000, 171000, 190000, 210000, 231000,
  253000, 276000, 300000, 325000, 351000, 378000, 406000, 435000, 465000, 496000,
  528000, 561000, 595000, 630000, 666000, 703000, 741000, 780000, 820000, 861000,
  903000, 946000, 990000, 1035000, 1081000, 1128000, 1176000, 1225000, 1275000,
  1326000, 1378000, 1431000, 1485000, 1540000, 1596000, 1653000, 1711000, 1770000,
  1830000, 1891000, 1953000, 2016000, 2080000, 2145000, 2211000, 2278000, 2346000,
  2415000, 2485000, 2556000, 2628000, 2701000, 2775000, 2850000, 2926000, 3003000,
  3081000, 3160000, 3240000, 3321000, 3403000, 3486000, 3570000, 3655000, 3741000,
  3828000, 3916000, 4005000, 4095000, 4186000, 4278000, 4371000, 4465000, 4560000,
  4656000, 4753000, 4851000, 4950000
];

const expOffset = {
  tantou: 445300,
  wakizashi: 540800,
  uchigatana2: 646000,
  uchigatana3: 754000,
  tachi: 870000,
  ootachi: 987000,
  yari: 540800,
  naginata: 540800,
};

document.getElementById("level-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const type = document.getElementById("type").value;
  let exp = parseInt(document.getElementById("exp").value, 10);
  const offset = expOffset[type] || 0;
  exp = Math.max(0, exp - offset);

  let level = 1;
  let cumulative = 0;
  for (let i = 1; i < levelTable.length; i++) {
    cumulative += levelTable[i];
    if (exp < cumulative) {
      level = i;
      break;
    }
    level = i + 1;
  }

  document.getElementById("result").innerHTML = `
    <h2>予測レベル: ${level}</h2>
  `;
});
