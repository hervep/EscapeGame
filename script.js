let attempts = 3;
let countdown = 120;

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
        ? `Bravo, ${teamNameInput.value} ! Vous avez trouvé le mot de passe à ${new Date().toLocaleTimeString()}.`
        : "Désolé, vous avez épuisé vos tentatives.";

    resultPage.appendChild(message);
    document.body.innerHTML = "";
    document.body.appendChild(resultPage);
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