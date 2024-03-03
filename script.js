document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.choice-btn');
    const resultDiv = document.getElementById('result');
    const userChoiceDiv = document.getElementById('user-choice');
    const computerChoiceDiv = document.getElementById('computer-choice');
    const userScoreDiv = document.querySelector('.user-score');
    const computerScoreDiv = document.querySelector('.computer-score');

    // Initialize scores from localStorage or default to 0
    let userScore = localStorage.getItem('userScore') || 0;
    let computerScore = localStorage.getItem('computerScore') || 0;

    // Update UI with initial scores
    userScoreDiv.textContent = `${userScore}`;
    computerScoreDiv.textContent = `${computerScore}`;

    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            const userChoice = button.id;
            const computerChoice = generateComputerChoice();
            const result = determineWinner(userChoice, computerChoice);

            userChoiceDiv.textContent = `Your choice: ${userChoice}`;
            computerChoiceDiv.textContent = `Computer's choice: ${computerChoice}`;
            resultDiv.textContent = result;

            // Update scores
            if (result === "You win!") {
                userScore++;
                localStorage.setItem('userScore', userScore);
            } else if (result === "Computer wins!") {
                computerScore++;
                localStorage.setItem('computerScore', computerScore);
            }

            
            userScoreDiv.textContent = `${userScore}`;
            computerScoreDiv.textContent = `${computerScore}`;
        });
    });

    function generateComputerChoice() {
        const choices = ['rock', 'paper', 'scissors'];
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    }

    function determineWinner(userChoice, computerChoice) {
        if (userChoice === computerChoice) {
            return "It's a tie!";
        } else if (
            (userChoice === 'rock' && computerChoice === 'scissors') ||
            (userChoice === 'paper' && computerChoice === 'rock') ||
            (userChoice === 'scissors' && computerChoice === 'paper')
        ) {
            return "You win!";
        } else {
            return "Computer wins!";
        }
    }
});
