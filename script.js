const players = [
    {
        name: "360Mall",
        rank: 1,
        title: "Combat Ace",
        points: 146,
        region: "AS/AU",
        tiers: [
            { mode: "Crystal", level: "LT2", type: "lt" },
            { mode: "Sword", level: "HT3", type: "ht" },
            { mode: "Axe", level: "LT3", type: "lt" }
        ]
    },
    {
        name: "signetxh",
        rank: 2,
        title: "Combat Specialist",
        points: 98,
        region: "AS/AU",
        tiers: [
            { mode: "Crystal", level: "LT2", type: "lt" },
            { mode: "Axe", level: "HT3", type: "ht" }
        ]
    }
];

function render() {
    const list = document.getElementById('playerList');
    list.innerHTML = players.map(p => `
        <div class="player-card">
            <div class="rank-number">${p.rank}</div>
            <img class="avatar" src="https://mc-heads.net/avatar/${p.name}">
            <div class="player-info">
                <div class="player-name">${p.name}</div>
                <div class="player-title">✦ ${p.title}</div>
            </div>
            <div class="tiers-container">
                ${p.tiers.map(t => `
                    <div class="tier-dot tier-${t.type}">
                        <span>${t.level}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

render();
