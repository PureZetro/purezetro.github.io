// Mock Database
const players = [
    { name: "PlayerOne", tier: "HT1", status: "Tested" },
    { name: "PvPMaster", tier: "LT3", status: "Tested" },
    { name: "Newbie_01", tier: "None", status: "Untested" },
    { name: "SharpSword", tier: "None", status: "Untested" }
];

const tableBody = document.getElementById('tableBody');
const searchInput = document.getElementById('searchInput');

function displayPlayers(filter = "") {
    tableBody.innerHTML = "";
    
    const filtered = players.filter(p => 
        p.name.toLowerCase().includes(filter.toLowerCase())
    );

    filtered.forEach(p => {
        const row = `
            <tr>
                <td>${p.name}</td>
                <td class="tier-${p.tier.toLowerCase()}">${p.tier}</td>
                <td class="status-${p.status.toLowerCase()}">${p.status}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Search functionality
searchInput.addEventListener('input', (e) => {
    displayPlayers(e.target.value);
});

// Initial load
displayPlayers();
