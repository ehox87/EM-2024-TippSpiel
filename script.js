const spiele = [
    { datum: "14. Juni", teamA: "Deutschland", teamB: "Schottland" },
    { datum: "15. Juni", teamA: "Ungarn", teamB: "Schweiz" },
    // Weitere Gruppenspiele hier hinzufügen...
    { datum: "16. Juni", teamA: "Spanien", teamB: "Portugal" },
    { datum: "17. Juni", teamA: "Frankreich", teamB: "Italien" },
    // Weitere Gruppenspiele hier hinzufügen...
];

let users = [];
let tips = {};

window.onload = function () {
    if (localStorage.getItem('tips')) {
        tips = JSON.parse(localStorage.getItem('tips'));
        updateLeaderboard();
    }
}

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
        return { spiel, teamA, teamB };
    });
    updateLeaderboard();
    localStorage.setItem('tips', JSON.stringify(tips));
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
            let formattedTips = '';
            userTips.forEach(tip => {
                formattedTips += `<p>${tip.spiel.datum}: ${tip.teamA} - ${tip.teamB}</p>`;
            });
            userDiv.innerHTML = `<strong>${user}</strong>: ${formattedTips}`;
            leaderboardDiv.appendChild(userDiv);
        }
    });
}


