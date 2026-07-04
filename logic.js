let clues = [];
let room = "";
let clue = "";
function roomClick(name){
    room = name;
    if(name == "Kitchen"){
        clue = "🖐 Fingerprint";
    }

    else if(name == "Bedroom"){
        clue = "🔘 Broken Button";
    }
    else if(name == "Garden"){
        clue = "👞 Shoe Print";
    }

    else{
        clue = "📄 Secret Letter";
    }
    if(clues.includes(clue)){
        document.getElementById("msg").innerHTML =
        "You already searched the " + name + ".";
        return;

    }

    document.getElementById("roomName").innerHTML = room;
    document.getElementById("clueName").innerHTML = clue;
    document.getElementById("popup").style.display = "flex";
}

function collect(){
    clues.push(clue);
    show();
    document.getElementById("popup").style.display = "none";

    document.getElementById("msg").innerHTML =
    clue + " collected successfully.";
}

function show(){
    let list = document.getElementById("list");
    list.innerHTML = "";

    for(let i=0;i<clues.length;i++){
        list.innerHTML += "<li>" + clues[i] + "</li>";
    }
}

function ask(name){
    let text="";
    if(name=="Butler"){
        text="I was cleaning the living room when the diamond disappeared";
    }
    else if(name=="Chef"){

        text="I was cooking dinner. No one came into the kitchen";

    }
    else{

        text="I was watering the plants outside the mansion";

    }

    document.getElementById("person").innerHTML=name;
    document.getElementById("answer").innerHTML=text;
    document.getElementById("popup").style.display="flex";

}

function closeBox(){
    document.getElementById("popup").style.display="none";
}

function check(){
    let person = document.getElementsByName("person");
    let answer = "";
    for(let i=0;i<person.length;i++){
        if(person[i].checked){
            answer = person[i].value;
        }
    }

    if(answer==""){
        document.getElementById("result").innerHTML =
        "Please select a suspect.";
    }

    else if(answer=="Chef"){
        window.location = "solved.html";
    }

    else{
        document.getElementById("result").innerHTML =
        "❌ Wrong! The thief escaped.";
    }

}