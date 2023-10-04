let attempts = 3;
let countdown = 240;
let motsDePasseIncorrects = [];
let motProche = [];

const password = "34167910X4CARU38270063615"; // Remplacez ceci par votre mot de passe

const countdownElement = document.getElementById("countdown");
const teamNameInput = document.getElementById("teamNameInput");
const passwordInput = document.getElementById("passwordInput");
const submitButton = document.getElementById("submitButton");
const attemptsLeftElement = document.getElementById("attemptsLeft");

const updateAttemptsLeft = () => {
    attemptsLeftElement.textContent = attempts;
};

//////////
function calculerPourcentageCorrespondance(motDePasseSaisi, motDePasseCorrect) {
    // Implémentez ici votre algorithme pour calculer le pourcentage de correspondance.
    // Vous pouvez utiliser des algorithmes de comparaison de chaînes ou de similarité.
    // Un exemple simple pourrait être la comparaison caractère par caractère.
    let correspondances = 0;
    for (let i = 0; i < motDePasseCorrect.length; i++) {
        if (motDePasseCorrect[i] === motDePasseSaisi[i]) {
            correspondances++;
        }
    }
    return (correspondances / motDePasseCorrect.length) * 100;
}

//function motProche() {
    // Trouver le mot de passe avec le pourcentage le plus élevé
  //  let motProche = motsDePasseIncorrects.reduce((prev, current) => (prev.pourcentage > current.pourcentage) ? prev : current);
    //console.log("Le mot de passe le plus proche était : " + motProche.motDePasse + " avec un pourcentage de correspondance de " + motProche.pourcentage + "%");
//}


//////////

const showResultPage = (isWin) => {
    const resultPage = document.createElement("div");
    resultPage.id = isWin ? "win-page" : "lose-page";

    const message = document.createElement("p");
    message.textContent = isWin
        ? `Congratulations, ${teamNameInput.value} ! You found the password at ${new Date().toLocaleTimeString()}.`
        : `Sorry, your most close response was ${motProche.motDePasse}, with a match percentage of ${motProche.pourcentage}%`;

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
        let pourcentageCorrespondance = calculerPourcentageCorrespondance(userPassword, password);
        motsDePasseIncorrects.push({ motDePasse: userPassword, pourcentage: pourcentageCorrespondance });
        if (attempts === 0) {
            motProche = motsDePasseIncorrects.reduce((prev, current) => (prev.pourcentage > current.pourcentage) ? prev : current);
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
