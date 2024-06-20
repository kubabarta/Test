    //let words = ["debil", "kokot", "pica", "curak", "kripl", "kunda", "krava", "picus", "pitomec", "babis", "hovno", "kurva", "prdel"];
    let selectedWord = "";
    let Guessing = [];
    let Attempts = 0;
    let timer;
    let elapsedTime = 0;
    let alphabet = "qwertzuiopasdfghjklyxcvbnm";

    let wordContainer = document.getElementById("blankTile");
    let keyboard = document.getElementById("keyboard");
    let message = document.getElementById("message");
    let timerDisplay = document.getElementById("timer");
    let startGameButton = document.getElementById("start-game");

    function UpdateWordDisplay() {
        let displayWord = "";
        for (let i = 0; i < selectedWord.length; i++) {
            if (Guessing.includes(selectedWord[i])) {
                displayWord += selectedWord[i];
            } else {
                displayWord += "_";
            }
        }
        wordContainer.innerHTML = displayWord;
    }

    function CheckGameStatus() {
        if (Attempts == 0) {
            message.textContent = `Prohráli jsi! Slovo bylo: ${selectedWord}`;;
            EndGame();
        } else if (!wordContainer.innerHTML.includes("_")) {
            message.textContent = "Vyhráli jsi!";
            EndGame();
        }
    }

    function EndGame() {
        clearInterval(timer);
        document.querySelectorAll(".key").forEach(key => key.removeEventListener("click", KeyClick));
    }

    function KeyClick(event) {
        let letter = event.target.textContent;
        if (selectedWord.includes(letter)) {
            Guessing.push(letter);
            UpdateWordDisplay();
            event.target.classList.add("correct");
        } else {
            Attempts--;
            event.target.classList.add("incorrect");
        }
        CheckGameStatus();
        event.target.removeEventListener("click", KeyClick);
    }

    function Keyboard() {
        keyboard.innerHTML = "";
        for (let i = 0; i < alphabet.length; i++) {
            let key = document.createElement("div");
            key.textContent = alphabet[i];
            key.classList.add("key");
            key.addEventListener("click", KeyClick);
            keyboard.appendChild(key);
        }
    }

    function startTimer() {
        elapsedTime = 0;
        timerDisplay.textContent = `Čas: ${elapsedTime}s`;
        timer = setInterval(() => {
            elapsedTime++;
            timerDisplay.textContent = `Čas: ${elapsedTime}s`;
        }, 1000);
    } ///Vytvořeno AI

    async function startGame() {
        //selectedWord = words[Math.floor(Math.random() * words.length)];
        const res = await fetch("https://random-word-api.vercel.app/api")
        selectedWord = (await res.json())[0]

        Guessing = [];
        Attempts = selectedWord.length + 3;
        if (Attempts > alphabet.length) 
        {
            Attempts = selectedWord.length;
        }
        message.textContent = "";
        UpdateWordDisplay();
        Keyboard();
        startTimer();
    }

    startGameButton.addEventListener("click", startGame);
