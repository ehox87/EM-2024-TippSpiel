const spiele = [
    {datum: "14. Juni", teamA: "Deutschland", teamB: "Schottland"},
    {datum: "15. Juni", teamA: "Ungarn", teamB: "Schweiz"},
    // Weitere Spiele hier hinzufügen...
];

const users = [];
const tips = {};

function register() {
    const name = document.getElementById('name').value.trim();
    if (name && !users.includes(name)) {
        users.push(name);
        document.getElementById('registration').style.display = 'none';
        document.getElementById('tippabgabe').style.display = 'block';
        document.getElementById('name').value = '';
        populateSpiele(name);
    } else {
        alert("Name ist ungültig oder bereits vergeben!");
    }
}

function populateSpiele(name) {
    const spieleDiv = document.getElementById('spiele');
    spieleDiv.innerHTML = '';
    spiele.forEach((spiel, index) => {
        const spielDiv = document.createElement('div');
        spielDiv.innerHTML = `
            <p>${spiel.datum}: ${spiel.teamA} vs ${spiel.teamB}</p>
            <input type="number" id="teamA_${index}" placeholder="${spiel.teamA} Tore">
            <input type="number" id="teamB_${index}" placeholder="${spiel.teamB} Tore">
        `;
        spieleDiv.appendChild(spielDiv);
    });
    document.getElementById('spiele').dataset.user = name;
}

function submitTips() {
    const user = document.getElementById('spiele').dataset.user;
    tips[user] = spiele.map((spiel, index) => {
        const teamA = document.getElementById(`teamA_${index}`).value;
        const teamB = document.getElementById(`teamB_${index}`).value;
        return {spiel, teamA, teamB};
    });
    updateLeaderboard();
    alert("Tipps erfolgreich abgegeben!");
    document.getElementById('tippabgabe').style.display = 'none';
    document.getElementById('registration').style.display = 'block';
}

function updateLeaderboard() {
    const leaderboardDiv = document.getElementById('leaderboard');
    leaderboardDiv.innerHTML = '';
    users.forEach(user => {
        const userTips = tips[user];
        if (userTips) {
            const userDiv = document.createElement('div');
            userDiv.innerHTML = `<strong>${user}</strong>: ${JSON.stringify(userTips)}`;
            leaderboardDiv.appendChild(userDiv);
        }
    });
}