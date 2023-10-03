let attempts = 3;
let countdown = 180;

const password = "12345"; // Remplacez ceci par votre mot de passe

const countdownElement = document.getElementById("countdown");
const teamNameInput = document.getElementById("teamNameInput");
const passwordInput = document.getElementById("passwordInput");
const submitButton = document.getElementById("submitButton");
const attemptsLeftElement = document.getElementById("attemptsLeft");

const updateAttemptsLeft = () => {
    attemptsLeftElement.textContent = attempts;
};


const showResultPage = (isWin) => {
    const resultPage = document.createElement("div");
    resultPage.id = isWin ? "win-page" : "lose-page";

    const message = document.createElement("p");
    message.textContent = isWin
        ? `Congratulations, ${teamNameInput.value} ! You found the password at ${new Date().toLocaleTimeString()}.`
        : "Sorry, you have exhausted your attempts.";

    resultPage.appendChild(message);
    document.body.innerHTML = "";
    document.body.appendChild(resultPage);
    if (resultPage.id === "win-page" ){
        document.body.style.backgroundImage= 'url(images/ball.jpg)';
        document.body.style.backgroundRepeat = 'no-repeat'
        document.body.style.backgroundSize = 'cover'
    }else{ document.body.style.backgroundImage= 'url(images/Hacker.jpg)';}
};

const updateCountdown = () => {
    countdownElement.textContent = countdown;
    const userPassword = passwordInput.value;
    if (countdown === 0 && userPassword != password) {
        countdownElement.style.color = "red";
        showResultPage(false);
    }
};

const checkPassword = () => {
    const userPassword = passwordInput.value;
    if (userPassword === password) {
        showResultPage(true);
    } else {
        attempts--;
        updateAttemptsLeft();
        if (attempts === 0) {
            showResultPage(false);
        } else {
            passwordInput.value = "";
            updateCountdown();
        }
    }
};
updateAttemptsLeft();

updateCountdown();
setInterval(() => {
    countdown--;
    updateCountdown();
}, 1000);

submitButton.addEventListener("click", checkPassword);
// Ajouter un écouteur d'événements 'keydown' sur le champ de mot de passe
passwordInput.addEventListener("keydown", function(event) {
    // Vérifier si la touche appuyée est la touche "Enter" (code 13)
    if (event.keyCode === 13) {
        // Appeler la fonction checkPassword si la touche "Enter" est pressée
        checkPassword();
    }
});
