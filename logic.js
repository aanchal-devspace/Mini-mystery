
function startCase(name) {
    localStorage.setItem("case", name);
    window.location = "game.html";
}
let data = {
    diamond: {
        no: "101",
        title: "The Black Diamond",
        victim: "Richard Brown",
        item: "Black Diamond",
        rooms: ["Kitchen", "Bedroom", "Garden", "Study"],
        clues: ["🖐 Fingerprint", "👞 Shoe Print", "📄 Secret Letter", "🔘 Broken Button"],
        suspects: ["Butler", "Chef", "Gardener"],
        answers: [
            "I was cleaning the living room.",
            "I was preparing dinner.",
            "I was watering the plants."
        ],
        thief: "Chef",
        story: [
            "8:00 PM - Dinner started.",
            "8:30 PM - Richard showed everyone the Black Diamond.",
            "8:45 PM - The Chef secretly copied the cabinet key.",
            "9:00 PM - The Butler left the room.",
            "9:05 PM - The Chef stole the diamond.",
            "9:08 PM - His uniform button broke.",
            "9:10 PM - He left fingerprints on the cabinet.",
            "9:15 PM - He escaped through the garden."
        ]
    },
    painting: {
        no: "102",
        title: "The Missing Painting",
        victim: "Emily Carter",
        item: "Royal Painting",
        rooms: ["Gallery", "Office", "Store Room", "Hall"],
        clues: ["🎨 Paint Stain", "🔑 Duplicate Key", "📷 CCTV Photo", "📱 Phone Message"],
        suspects: ["Security Guard", "Art Dealer", "Cleaner"],
        answers: [
            "I stayed at the main gate.",
            "I came to see the exhibition.",
            "I was cleaning the gallery."
        ],
        thief: "Art Dealer",
        story: [
            "6:00 PM - Gallery closed.",
            "6:20 PM - The Art Dealer distracted the guard.",
            "6:25 PM - He unlocked the storage room.",
            "6:28 PM - He replaced the painting with a fake.",
            "6:30 PM - CCTV captured him leaving.",
            "6:35 PM - Paint stains remained on his jacket."
        ]
    },
    office: {
        no: "103",
        title: "Office Data Theft",
        victim: "TechNova Ltd.",
        item: "Project Files",
        rooms: ["Cabin", "Server Room", "Meeting Room", "Reception"],
        clues: ["💾 USB Drive", "📄 Printed File", "🖥 Login Record", "📧 Suspicious Email"],
        suspects: ["Manager", "Intern", "IT Engineer"],
        answers: [
            "I was checking reports.",
            "I was learning the new software.",
            "I was fixing the server."
        ],
        thief: "Manager",

        story: [
            "5:45 PM - Employees left.",
            "6:00 PM - The Manager returned.",
            "6:05 PM - He copied files to a USB.",
            "6:10 PM - He emailed the files.",
            "6:12 PM - Login records saved his activity.",
            "6:15 PM - The USB was found in his drawer."

        ]
    }
};

let game;
let clues = [];
let clue = "";
let room = "";

function loadCase() {
    let name = localStorage.getItem("case");

    game = data[name];
    document.getElementById("caseTitle").innerHTML = game.title;
    document.getElementById("caseNo").innerHTML = game.no;
    document.getElementById("victim").innerHTML = game.victim;
    document.getElementById("item").innerHTML = game.item;

    document.getElementById("b1").innerHTML = game.rooms[0];
    document.getElementById("b2").innerHTML = game.rooms[1];
    document.getElementById("b3").innerHTML = game.rooms[2];
    document.getElementById("b4").innerHTML = game.rooms[3];

}

function roomClick(i) {

    room = game.rooms[i];
    clue = game.clues[i];

    if (clues.includes(clue)) {
        document.getElementById("msg").innerHTML = "You already searched " + room;
        return;
    }

    document.getElementById("roomName").innerHTML = room;
    document.getElementById("clueName").innerHTML = clue;
    document.getElementById("popup").style.display = "flex";

}

function collect() {
    clues.push(clue);
    let list = document.getElementById("list");

    list.innerHTML = "";
    for (let i = 0; i < clues.length; i++) {
        list.innerHTML += "<li>" + clues[i] + "</li>";
    }
    document.getElementById("popup").style.display = "none";
    document.getElementById("msg").innerHTML = clue + " collected.";
    if (clues.length == 4) {
        document.getElementById("askBtn").disabled = false;
    }

}
let asked = [];
function loadSuspects() {

    let name = localStorage.getItem("case");
    game = data[name];
    document.getElementById("s1").innerHTML = game.suspects[0];
    document.getElementById("s2").innerHTML = game.suspects[1];
    document.getElementById("s3").innerHTML = game.suspects[2];

}

function ask(i) {
    document.getElementById("person").innerHTML = game.suspects[i];

    document.getElementById("answer").innerHTML = game.answers[i];
    document.getElementById("popup").style.display = "flex";
    if (!asked.includes(i)) {
        asked.push(i);

    }
    if (asked.length == 3) {
        document.getElementById("reportBtn").disabled = false;
    }
}
function closeBox() {
    document.getElementById("popup").style.display = "none";
}
function loadReport() {
    let name = localStorage.getItem("case");
    game = data[name];
    document.getElementById("caseTitle").innerHTML = game.title;
    let box = document.getElementById("suspectList");
    box.innerHTML = "";

    for (let i = 0; i < game.suspects.length; i++) {
        box.innerHTML += `
        <p>
        <input type="radio" name="person" value="${game.suspects[i]}">
        ${game.suspects[i]}
        </p>
        `;
    }

}
function checkAnswer() {
    let person = document.getElementsByName("person");
    let ans = "";

    for (let i = 0; i < person.length; i++) {
        if (person[i].checked) {
            ans = person[i].value;
        }

    }
    if (ans == "") {
        document.getElementById("msg").innerHTML = "Please select a suspect.";

        return;
    }
    if (ans == game.thief) {
        localStorage.setItem("winner", "yes");
        fetch("/report", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                case: game.title,
                criminal: ans
            })
        });
        window.location = "solved.html";
    }
    else {
        document.getElementById("msg").innerHTML = "❌ Wrong Guess! Try Again.";

    }
}

function loadStory() {

    let name = localStorage.getItem("case");
    game = data[name];
    document.getElementById("caseName").innerHTML = game.title;
    let box = document.getElementById("story");
    box.innerHTML = "";
    for (let i = 0; i < game.story.length; i++) {
        box.innerHTML += "<p>✔ " + game.story[i] + "</p>";

    }
    box.innerHTML += "<br><h3>Criminal : " + game.thief + "</h3>";

}