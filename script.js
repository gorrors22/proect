const guessInput = document.getElementById('guessInput');
const guessButton = document.getElementById('guessButton');
const message = document.getElementById('message');
const attemptsDisplay = document.getElementById('attempts');
const settingsButton = document.getElementById('settingsButton');
const settingsModal = document.getElementById('settingsModal');
const closeSettings = document.querySelector('.close');
const saveSettingsButton = document.getElementById('saveSettings');
const maxAttemptsInput = document.getElementById('maxAttemptsInput');

let secretNumber;
let attempts;
let maxAttempts = 7; //  Начальное значение по умолчанию

function startGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    attemptsDisplay.textContent = attempts;
    message.textContent = '';
    guessInput.value = '';
    guessInput.focus();
}

function checkGuess() {
  const guess = parseInt(guessInput.value);

  if (isNaN(guess) || guess < 1 || guess > 100) {
      message.textContent = 'Введите число от 1 до 100!';
      return;
  }

  attempts++;
  attemptsDisplay.textContent = attempts;

  if (attempts > maxAttempts) {
      message.textContent = `Вы проиграли! Загаданное число было ${secretNumber}.`;
      guessButton.disabled = true;
      return;
  }

  if (guess === secretNumber) {
      message.textContent = `Поздравляю! Вы угадали число ${secretNumber} за ${attempts} попыток!`;
      guessButton.disabled = true;
  } else if (guess < secretNumber) {
      message.textContent = 'Загаданное число больше!';
  } else {
      message.textContent = 'Загаданное число меньше!';
  }
  guessInput.value = '';
  guessInput.focus();
}

guessInput.addEventListener('keypress', function(event) {
    if (event.keyCode === 13) {
        checkGuess();
        event.preventDefault();
    }
});

guessButton.addEventListener('click', checkGuess);

// Модальное окно
settingsButton.addEventListener('click', function() {
  settingsModal.style.display = 'block';
});

closeSettings.addEventListener('click', function() {
  settingsModal.style.display = 'none';
});

window.addEventListener('click', function(event) {
  if (event.target === settingsModal) {
    settingsModal.style.display = 'none';
  }
});

saveSettingsButton.addEventListener('click', function(){
    const newMaxAttempts = parseInt(maxAttemptsInput.value);
        if (newMaxAttempts >= 5 && newMaxAttempts <= 10) {
            maxAttempts = newMaxAttempts;
            settingsModal.style.display = 'none'; // закрыть модальное окно
            startGame();
        } else {
            alert('Пожалуйста, введите число от 5 до 10.'); // Сообщение об ошибке если ввели неверное число
        }
});
startGame();