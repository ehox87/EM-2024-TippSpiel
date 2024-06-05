const spiele = [
    {datum: "14. Juni", teamA: "Deutschland", teamB: "Schottland"},
    {datum: "15. Juni", teamA: "Ungarn", teamB: "Schweiz"},
    // Weitere Gruppenspiele hier hinzufügen...
];

let users = [];
let tips = {};

function startTipping() {
    const name = document.getElementById('name').value.trim();
    if (name && !users.includes(name)) {
        users.push(name);
        document.getElementById('registration').style.display = 'none';
        document.getElementById('tippabgabe').style.display = 'block';
        document.getElementById('name').value = '';
        populateGroupGames(name);
    } else {
        alert("Name ist ungültig oder bereits vergeben!");
    }
}

function populateGroupGames(name) {
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
    document.getElementById('tippabgabe').dataset.user = name;
}

function submitGroupTips() {
    const user = document.getElementById('tippabgabe').dataset.user;
    tips[user] = spiele.map((spiel, index) => {
        const teamA = document.getElementById(`teamA_${index}`).value;
        const teamB = document.getElementById(`teamB_${index}`).value;
        return {spiel, teamA, teamB};
    });
    document.getElementById('tippabgabe').style.display = 'none';
    document.getElementById('ko-runden').style.display = 'block';
}

function submitFinalTips() {
    const team1 = document.getElementById('team1').value;
    const team1goals = document.getElementById('team1goals').value;
    const team2 = document.getElementById('team2').value;
    const team2goals = document.getElementById('team2goals').value;
    // Speichere die Finaltipps oder berechne die Punkte
    document.getElementById('ko-runden').style.display = 'none';
    document.getElementById('finalspiel').style.display = 'none';
    document.getElementById('rangliste').style.display = 'block';
    updateLeaderboard();
}

function updateLeaderboard() {
    const leaderboardDiv = document.getElementById('leaderboard');
    leaderboardDiv.innerHTML = '';
    users.forEach(user => {
        const userTips = tips[user];
        if (userTips) {
            let score = 0;
            userTips.forEach(tip => {
                // Hier kannst du die Punkte für korrekte Tipps berechnen
                // Z.B. +3 Punkte für korrektes Ergebnis
                if (tip.teamA === correctResult.teamA && tip.teamB === correctResult.teamB) {
                    score += 3;
                }
            });
            const userDiv = document.createElement('div');
            userDiv.innerHTML = `<strong>${user}</strong>: ${score} Punkte`;
            leaderboardDiv.appendChild(userDiv);
        }
    });
}



