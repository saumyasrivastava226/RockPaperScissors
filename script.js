document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.choice-btn');
    const resultDiv = document.getElementById('result');
    const headerDiv=document.querySelector('.header-content');
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
    const nextButton= document.querySelector(".next-btn");
    let userScore = localStorage.getItem('userScore') || 0;
    let computerScore = localStorage.getItem('computerScore') || 0;
    const resultDivs = document.querySelectorAll(".results__result");
    const playAgainBtn = document.querySelector(".play-again");
    const trophyDiv=document.querySelector(".trophy");
    const backgroundDiv= document.querySelector(".background-setup");
    const trophyPlayAgainBtn = document.querySelector(".trophy .play-again");

   
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
            backgroundDiv.classList.add("hidden");

            
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
            resultText.innerHTML = '<div class="results-text-main">You win</div> <div class="line">against PC</div>';
            userChoiceDiv.classList.toggle('winner');
            userChoiceDiv.classList.add('show-animation');
            rulesButton.classList.toggle("rules-btn-after");
            nextButton.classList.toggle("hidden");
            console.log(userChoiceDiv);
        } else if (winner == 'computer') {
            resultText.innerHTML = '<div class="results-text-main">You lost</div> <div class="line">against PC</div>';
            computerChoiceDiv.classList.toggle('winner');
            computerChoiceDiv.classList.add('show-animation');
            console.log(computerChoiceDiv);
        } else {
            resultText.innerText = 'Tie Up!';
            playAgainBtn.innerText = 'Replay';
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
    trophyPlayAgainBtn.addEventListener("click", () => {
      gameDiv.classList.remove("hidden");
      backgroundDiv.classList.remove("hidden");
      resultsDiv.classList.add("hidden");
      userChoiceDiv.classList.remove("show-animation");
      computerChoiceDiv.classList.remove("show-animation")
      userChoiceDiv.classList.remove("winner");
      computerChoiceDiv.classList.remove("winner")
      resultDivs.forEach((resultDiv) => {
        resultDiv.innerHTML = "";
      });
      playAgainBtn.innerText='Play Again'
      resultText.innerText = "";
      resultWinner.classList.add("hidden");
      resultsDiv.classList.remove("show-winner");
      rulesButton.classList.remove("rules-btn-after");
      nextButton.classList.add("hidden"); 
      trophyDiv.classList.add("hidden");
      headerDiv.classList.remove("hidden");
    });
    nextButton.addEventListener('click',function(){
       
        headerDiv.classList.add("hidden");
        trophyDiv.classList.remove("hidden");
        gameDiv.classList.add("hidden");
        resultsDiv.classList.add("hidden");
        userChoiceDiv.classList.remove("show-animation");
        computerChoiceDiv.classList.remove("show-animation")
        userChoiceDiv.classList.remove("winner");
        computerChoiceDiv.classList.remove("winner")
        resultDivs.forEach((resultDiv) => {
          resultDiv.innerHTML = "";
        });
        
        resultText.innerText = "";
        resultWinner.classList.toggle("hidden");
        resultsDiv.classList.toggle("show-winner");
        rulesButton.classList.remove("rules-btn-after");
        nextButton.classList.add("hidden"); 
        playAgainBtn.classList.remove("hidden");
    })
    playAgainBtn.addEventListener("click", () => {
        gameDiv.classList.toggle("hidden");
        backgroundDiv.classList.remove("hidden");
        resultsDiv.classList.toggle("hidden");
        userChoiceDiv.classList.remove("show-animation");
        computerChoiceDiv.classList.remove("show-animation")
        userChoiceDiv.classList.remove("winner");
        computerChoiceDiv.classList.remove("winner")
        resultDivs.forEach((resultDiv) => {
          resultDiv.innerHTML = "";
        });
        playAgainBtn.innerText='Play Again'
        resultText.innerText = "";
        resultWinner.classList.toggle("hidden");
        resultsDiv.classList.toggle("show-winner");
        rulesButton.classList.remove("rules-btn-after");
        nextButton.classList.add("hidden"); 
      });
      

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
