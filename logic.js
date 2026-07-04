
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
let asked=[];
function loadSuspects(){

    let name=localStorage.getItem("case");
    game=data[name];
    document.getElementById("s1").innerHTML=game.suspects[0];
    document.getElementById("s2").innerHTML=game.suspects[1];
    document.getElementById("s3").innerHTML=game.suspects[2];

}

function ask(i){
    document.getElementById("person").innerHTML=game.suspects[i];

    document.getElementById("answer").innerHTML=game.answers[i];
    document.getElementById("popup").style.display="flex";
    if(!asked.includes(i)){
        asked.push(i);

    }
    if(asked.length==3){
        document.getElementById("reportBtn").disabled=false;
    }
}
function close(){
    document.getElementById("popup").style.display="none";
}