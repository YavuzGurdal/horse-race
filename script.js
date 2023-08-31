var raceInterval; // Yarış zamanlayıcısı
var isPaused = false; // Duraklatma durumu

function startRace() {
  var windowWidth = window.innerWidth;
  var trackWidth = windowWidth * 0.94; // Ekran genişliğine göre track genişliğini ayarla (%99)

  if (windowWidth < 768 && windowWidth > 480) {
    trackWidth = windowWidth * 0.88; // Ekran genişliğine göre track genişliğini ayarla (%88)
  } else if (windowWidth <= 480) {
    trackWidth = windowWidth * 0.83; // Ekran genişliğine göre track genişliğini ayarla (%83)
  }

  var finishLine = trackWidth - 100; // Bitiş çizgisi

  var horse1 = document.getElementById("horse1");
  var horse2 = document.getElementById("horse2");
  var horse3 = document.getElementById("horse3");

  raceInterval = setInterval(function () {
    var horse1Speed = Math.random() * 8 + 4; // At 1'in hızı (daha hızlı)
    var horse2Speed = Math.random() * 8 + 4; // At 2'nin hızı (daha hızlı)
    var horse3Speed = Math.random() * 8 + 4; // At 3'ün hızı (daha hızlı)

    if (!isPaused) {
      var horse1Position = parseInt(horse1.style.left) || 0;
      var horse2Position = parseInt(horse2.style.left) || 0;
      var horse3Position = parseInt(horse3.style.left) || 0;

      if (
        horse1Position < finishLine &&
        horse2Position < finishLine &&
        horse3Position < finishLine
      ) {
        horse1Position += horse1Speed;
        horse2Position += horse2Speed;
        horse3Position += horse3Speed;

        horse1.style.left = horse1Position + "px";
        horse2.style.left = horse2Position + "px";
        horse3.style.left = horse3Position + "px";
      } else {
        clearInterval(raceInterval);
        announceWinner(horse1Position, horse2Position, horse3Position);
        disableButtons(["startButton", "pauseButton", "resumeButton"]);
        enableButton("resetButton");
      }
    }
  }, 70); // Hızlandırılmış zamanlayıcı (70ms)

  disableButtons(["startButton", "resetButton"]);
  enableButton("pauseButton");
}

function pauseRace() {
  isPaused = true;
  disableButton("pauseButton");
  enableButton("resumeButton");
}

function resumeRace() {
  isPaused = false;
  disableButton("resumeButton");
  enableButton("pauseButton");
}

function announceWinner(horse1Position, horse2Position, horse3Position) {
  var winners = [];

  if (horse1Position >= horse2Position && horse1Position >= horse3Position) {
    winners.push("Horse 1");
  }

  if (horse2Position >= horse1Position && horse2Position >= horse3Position) {
    winners.push("Horse 2");
  }

  if (horse3Position >= horse1Position && horse3Position >= horse2Position) {
    winners.push("Horse 3");
  }

  var message = "Winner(s) of The Race: " + winners.join(", ");
  var winnerMessageDiv = document.getElementById("winnerMessage");

  winnerMessageDiv.textContent = message;
  winnerMessageDiv.style.display = "block";

  disableButton("pauseButton");
  enableButton("resetButton");
}

function disableButton(buttonId) {
  document.getElementById(buttonId).disabled = true;
}

function enableButton(buttonId) {
  document.getElementById(buttonId).disabled = false;
}

function disableButtons(buttonIds) {
  for (var i = 0; i < buttonIds.length; i++) {
    disableButton(buttonIds[i]);
  }
}

function enableButtons(buttonIds) {
  for (var i = 0; i < buttonIds.length; i++) {
    enableButton(buttonIds[i]);
  }
}

// Reset Race butonunu seçin
const resetButton = document.getElementById("resetButton");
const resumeButton = document.getElementById("resumeButton");
const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");

// Reset Race butonuna tıklanma olayını dinleyin
resetButton.addEventListener("click", function () {
  // Atları ilk konumlarına yerleştirin
  const horse1 = document.getElementById("horse1");
  const horse2 = document.getElementById("horse2");
  const horse3 = document.getElementById("horse3");
  horse1.style.left = "0";
  horse2.style.left = "0";
  horse3.style.left = "0";

  // Butonların durumunu sıfırlayın
  startButton.disabled = false;
  pauseButton.disabled = true;
  resumeButton.disabled = true;
  resetButton.disabled = true;

  var winnerMessageDiv = document.getElementById("winnerMessage");
  winnerMessageDiv.style.display = "none";
});
