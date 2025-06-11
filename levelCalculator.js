
const expTables = {
    tantou: {
        baseOffset: 445300,
        max: 62184826,
    },
    wakizashi: {
        baseOffset: 540800,
        max: 68403309,
    },
    "uchigatana-r2": {
        baseOffset: 648800,
        max: 74621791,
    },
    "uchigatana-r3": {
        baseOffset: 648800,
        max: 80840274,
    },
    tachi: {
        baseOffset: 770800,
        max: 87058756,
    },
    ootachi: {
        baseOffset: 907800,
        max: 93277239,
    },
    yari: {
        baseOffset: 540800,
        max: 68403309,
    },
    naginata: {
        baseOffset: 540800,
        max: 68403309,
    }
};

function generateLevelTable(maxExp) {
    const table = [];
    let total = 0;
    for (let lv = 1; lv <= 99; lv++) {
        const next = Math.floor(1000 + Math.pow(lv, 2.2));
        total += next;
        table.push(total);
        if (total > maxExp) break;
    }
    return table;
}

function calculateLevel() {
    const type = document.getElementById('type').value;
    const inputExp = parseInt(document.getElementById('exp').value);
    const result = document.getElementById('result');

    if (isNaN(inputExp)) {
        result.textContent = '有効な経験値を入力してください。';
        return;
    }

    const { baseOffset, max } = expTables[type];
    const realExp = inputExp - baseOffset;

    if (realExp <= 0) {
        result.textContent = '極レベルはまだありません。';
        return;
    }

    const table = generateLevelTable(max);
    let level = 1;

    for (let i = 0; i < table.length; i++) {
        if (realExp >= table[i]) {
            level = i + 2;
        } else {
            break;
        }
    }

    if (level > 99) level = 99;

    result.textContent = `予測レベル: ${level}`;
}
