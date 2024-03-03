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

    // Update UI with initial scores
    userScoreDiv.textContent = `${userScore}`;
    computerScoreDiv.textContent = `${computerScore}`;

    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            const userChoice = button.id;
            const computerChoice = generateComputerChoice();
            const result = determineWinner(userChoice, computerChoice);

            displayChoice(userChoice, userChoiceDiv);
            displayChoice(computerChoice, computerChoiceDiv);
            displayWinner(result);
            

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
            return "TIE UP!";
        } else if (
            (userChoice === 'rock' && computerChoice === 'scissors') ||
            (userChoice === 'paper' && computerChoice === 'rock') ||
            (userChoice === 'scissors' && computerChoice === 'paper')
        ) {
            return "You win against pc";
        } else {
            return "You lost against pc";
        }
    }
    function displayWinner(result) {
        setTimeout(() => {
          const winner= result;
      
          
            resultText.innerText = result;
           
       
          
          resultWinner.classList.toggle("hidden");
          resultsDiv.classList.toggle("show-winner");
        }, 1000);
      }

    rulesButton.addEventListener('click', function(){
        rulesModal.classList.toggle('show-modal')
    })
    closeButton.addEventListener('click', function(){
        rulesModal.classList.toggle('show-modal')
    })

    function displayChoice(choice, container) {
        // Clear previous choice
        container.innerHTML = '';
    
        // Create div element
        const choiceDiv = document.createElement('div');
        choiceDiv.classList.add('choice', choice);
    
        // Create image element
        const img = document.createElement('img');
        img.src = `./assets/${choice}.png`;
        img.alt = choice.charAt(0).toUpperCase() + choice.slice(1); // Capitalize first letter
        img.classList.add('choice-img');
    
        // Append image to choice div
        choiceDiv.appendChild(img);
    
        // Append choice div to container
        container.appendChild(choiceDiv);
    }
    
});
