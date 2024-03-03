document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.choice-btn');
    const resultDiv = document.getElementById('result');
   
    const userScoreDiv = document.querySelector('.user-score');
    const computerScoreDiv = document.querySelector('.computer-score');
    const rulesButton=document.querySelector(".rules-btn");
    const closeButton=document.querySelector(".close-btn");
   const rulesModal=document.querySelector(".modal");
   const gameDiv=document.querySelector(".game");
   const resultsDiv=document.querySelector(".results")
   const userChoiceDiv = document.getElementById('user-choice');
   const computerChoiceDiv = document.getElementById('computer-choice');
   const resultWinner=document.querySelector(".results-winner");
   const resultText=document.querySelector(".results-text");
    // Initialize scores from localStorage or default to 0
    let userScore = localStorage.getItem('userScore') || 0;
    let computerScore = localStorage.getItem('computerScore') || 0;
    const resultDivs = document.querySelectorAll(".results__result");

    // Update UI with initial scores
    userScoreDiv.textContent = `${userScore}`;
    computerScoreDiv.textContent = `${computerScore}`;

    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            const userChoice = button.id;
            const computerChoice = generateComputerChoice();
            const result = determineWinner(userChoice, computerChoice);

            displayChoice(userChoice, userChoiceDiv,result);
            displayChoice(computerChoice, computerChoiceDiv,result);
            displayWinner(result);
            

            // Update scores
            if (result === "user") {
                userScore++;
                localStorage.setItem('userScore', userScore);
            } else if (result === "computer") {
                computerScore++;
                localStorage.setItem('computerScore', computerScore);
            }

            
            userScoreDiv.textContent = `${userScore}`;
            computerScoreDiv.textContent = `${computerScore}`;
            gameDiv.classList.toggle('hidden');
            resultsDiv.classList.toggle('hidden');
        });
    });

    function generateComputerChoice() {
        const choices = ['rock', 'paper', 'scissors'];
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    }

    function determineWinner(userChoice, computerChoice) {
        if (userChoice === computerChoice) {
            return "tie";
        } else if (
            (userChoice === 'rock' && computerChoice === 'scissors') ||
            (userChoice === 'paper' && computerChoice === 'rock') ||
            (userChoice === 'scissors' && computerChoice === 'paper')
        ) {
            return "user";
        } else {
            return "computer";
        }
    }
    function displayWinner(result) {
        setTimeout(() => {
          const winner = result;
          console.log("winner", winner);
          if (winner == 'user') {
            resultText.innerText = 'You win against pc';
            userChoiceDiv.classList.toggle('winner');
            userChoiceDiv.classList.add('show-animation'); 
            console.log(userChoiceDiv);
          } else if (winner == 'computer') {
            resultText.innerText = 'You lost against pc';
            computerChoiceDiv.classList.toggle('winner');
            computerChoiceDiv.classList.add('show-animation'); 
            console.log(computerChoiceDiv);
          } else {
            resultText.innerText = 'Tie Up!';
          }
      
          resultWinner.classList.toggle("hidden");
          resultsDiv.classList.toggle("show-winner");
        }, 100);
      }
      
    rulesButton.addEventListener('click', function(){
        rulesModal.classList.toggle('show-modal')
    })
    closeButton.addEventListener('click', function(){
        rulesModal.classList.toggle('show-modal')
    })

    function displayChoice(choice, container) {
        
        container.innerHTML = '';
    
        
        const choiceDiv = document.createElement('div');
        choiceDiv.classList.add('choice', choice);
        const img = document.createElement('img');
        img.src = `./assets/${choice}.png`;
        img.alt = choice.charAt(0).toUpperCase() + choice.slice(1); 
        img.classList.add('choice-img');
        choiceDiv.appendChild(img);
    container.appendChild(choiceDiv);
    }
    
});
