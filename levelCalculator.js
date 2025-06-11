const expTables = {
    tantou: {
        offset: 445300,
        max: 62184826,
    },
    wakizashi: {
        offset: 540800,
        max: 68403309,
    },
    "uchigatana-r2": {
        offset: 648800,
        max: 74621791,
    },
    "uchigatana-r3": {
        offset: 648800,
        max: 80840274,
    },
    tachi: {
        offset: 770800,
        max: 87058756,
    },
    ootachi: {
        offset: 907800,
        max: 93277239,
    },
    yari: {
        offset: 540800,
        max: 68403309,
    },
    naginata: {
        offset: 540800,
        max: 68403309,
    }
};

function calculateLevel() {
    const type = document.getElementById("type").value;
    const totalExp = parseInt(document.getElementById("exp").value, 10);
    const resultDiv = document.getElementById("result");

    if (isNaN(totalExp) || totalExp <= 0) {
        resultDiv.textContent = "有効な経験値を入力してください。";
        return;
    }

    const table = expTables[type];
    const baseExp = totalExp - table.offset;

    if (baseExp <= 0) {
        resultDiv.textContent = "修行直後（レベル35未満）です。";
        return;
    }

    const maxExp = table.max;
    const level = Math.floor((baseExp / maxExp) * 64) + 35;

    if (level >= 99) {
        resultDiv.textContent = "推定レベル: 99 (カンスト)";
    } else {
        resultDiv.textContent = `推定レベル: ${level}`;
    }
}
