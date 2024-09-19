let randomNumber = Math.floor(Math.random() * 100) + 1;                         //Zufällige Zahl wird mit dieser funtion generiert
let attempts = 0;                                                               //Zählt die versuche


const booSound = document.getElementById("booSound");
const clapSound = document.getElementById("clapSound");

function guessNumber() {                                                        //Button bekommt eine funktion zugeschrieben
    let userGuess = parseInt(document.getElementById("guessInput").value);
    attempts++;                                                                   //Versuch wird hinzugfügt

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        document.getElementById("message").innerHTML = "Eingabe UNGÜLTIG. Bitte eine Zahl zwischen 1 und 100 eingeben.";
        return;
    }

    if (userGuess == randomNumber) {
        document.getElementById("message").innerHTML = "Glückwunsch! Die richtige Zahl wurde in " + attempts + " Versuchen erraten!";
        document.getElementById("message").style.color = "green";
        document.getElementById("guessButton").disabled = true;
        document.getElementById("guessButton").classList.add("correct-guess");   //Klasse definiert für CSS für das ausgrauen des Buttons nachdem eraten
        
        clapSound.play();
        updateRangliste(attempts);                        
    } else if (userGuess < randomNumber) {
        document.getElementById("message").innerHTML = "Zu niedrig! Versuch es noch eimal.";
        document.getElementById("message").style.color = "red";
        
        booSound.play();
    } else{
        document.getElementById("message").innerHTML = "Zu hoch! Versuch es noch einmal.";
        document.getElementById("message").style.color = "red";
        
        booSound.play();
    }
}
//Versuche werden gezählt und ausgegeben, Spieler bekommt gefärbtes Feedback je nach eraten der Zahlen. Der Button wird nach dem erraten deaktiviert

function updateRangliste(attempts) {
    let rangListe = JSON.parse(localStorage.getItem('rangListe')) || [];

    rangListe.push(attempts);

    rangListe.sort ((a, b) => a - b);
    rangListe = rangListe.slice(0, 3);

    localStorage.setItem('rangListe', JSON.stringify(rangListe));

    showRangliste(rangListe);
}

function showRangliste(rangListe){
    const rangListeElement = document.getElementById('rangListe')
    rangListeElement.innerHTML = '';

    rangListe.forEach((attempt,index) => {
        const li = document.createElement('li');
        li.textContent = `Platz ${index + 1}: ${attempt} Versuche`;
        rangListeElement.appendChild(li)
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const savedRangliste = JSON.parse(localStorage.getItem(rangListe)) || [];
    showRangliste(savedRangliste);
});


function retryGame() {
    randomNumber = Math.floor(Math.random() * 100) +1;
    attempts = 0;
    document.getElementById("message").innerHTML = "";
    document.getElementById("guessInput").value = "";
    
    const guessButton = document.getElementById("guessButton");
    guessButton.disabled = false;
    guessButton.classList.remove("correct-guess")                                       //Button wird reinstated
}

document.getElementById("guessInput").addEventListener("keydown", function (e) {        //Enter zur Eingabe
    if (e.key === "Enter") {
        e.preventDefault(); 
        guessNumber();       
    }
});


