let randomNumber = Math.floor(Math.random() * 50) + 1;                        //Zufällige Zahl wird mit dieser funtion generiert
let attempts = 0;                                                               //Zählt die versuche

const booSound = document.getElementById("booSound");
const clapSound = document.getElementById("clapSound");

function guessNumber() {                                                        //Button bekommt eine funktion zugeschrieben
    let userGuess = parseInt(document.getElementById("guessInput").value);
    attempts++;                                                                   //Versuch wird hinzugfügt

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 50) {
        document.getElementById("message").innerHTML = "Eingabe UNGÜLTIG. Bitte eine Zahl zwischen 1 und 50 eingeben.";
        return;
    }

    if (userGuess == randomNumber) {
        document.getElementById("message").innerHTML = "Glückwunsch! Die richtige Zahl wurde in " + attempts + " Versuchen erraten!";
        document.getElementById("message").style.color = "green";
        document.getElementById("guessButton").disabled = true;
        document.getElementById("guessButton").classList.add("correct-guess");   //Klasse definiert für CSS für das ausgrauen des Buttons nachdem eraten
        
        clapSound.play();

        updateRangliste3(attempts);
                        
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


function updateRangliste3(attempts) {
    let rangListe3 = JSON.parse(localStorage.getItem('rangListe3')) || [];

    rangListe3.push(attempts);

    rangListe3.sort ((a, b) => a - b);
    rangListe3 = rangListe3.slice(0, 3);

    localStorage.setItem('rangListe3', JSON.stringify(rangListe3));

    showRangliste3(rangListe3);
}

function showRangliste3(rangListe3){
    const rangListe3Element = document.getElementById('rangListe3')
    rangListe3Element.innerHTML = '';

    rangListe3.forEach((attempt,index) => {
        const li = document.createElement('li');
        li.textContent = `Platz ${index + 1}: ${attempt} Versuche`;
        rangListe3Element.appendChild(li)
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const savedRangliste3 = JSON.parse(localStorage.getItem('rangListe3')) || [];
    showRangliste3(savedRangliste3);
});


function retryGame() {
    randomNumber = Math.floor(Math.random() * 50) +1;
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

