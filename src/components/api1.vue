<template>
  <div class="mainApi">
    <h2 class="apih2">En Kortlek</h2>
    <p id="21-cards">Blanda ny lek för att se hur många kort är kvar!</p>
    <p>
      <button id="shuffleBtn" @click="shuffleNewDeck">Blanda ny lek</button>
      <button id="drawBtn" disabled @click="drawCard">Dra ett kort</button>
      <button id="quitBtn" disabled @click="endGame">Avsluta</button><br>
    </p>
    <p id="21-result">Börja dra kort för att se vad du får!</p>
  </div>
</template>

<script>
export default {
  methods: {
    shuffleNewDeck() {
      fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then(response => response.json())
    .then(myDeck => {
        let deckId = myDeck.deck_id;
        localStorage.setItem("deckId", deckId);
        localStorage.setItem("remainingCards", 52);

        document.getElementById("21-cards").innerHTML = "Kort kvar: " + localStorage.getItem("remainingCards");
        document.getElementById("21-result").innerHTML = "Börja dra kort för att se vad du får!";
        document.getElementById("drawBtn").removeAttribute("disabled");
        document.getElementById("quitBtn").removeAttribute("disabled");
      })

        document.getElementById("21-cards").innerHTML = "Laddar...";
        document.getElementById("21-result").innerHTML = "Laddar...";
        document.getElementById("shuffleBtn").setAttribute("disabled", "");
    },
    drawCard() {
      fetch("https://deckofcardsapi.com/api/deck/" + localStorage.getItem("deckId") + "/draw/?count=1")
    .then(response => response.json())
    .then(myCard => {
      let remainingCards = myCard.remaining;
      localStorage.setItem("remainingCards", remainingCards);

      if(remainingCards >= 0){
        let cardResult = myCard.cards[0].suit + " " + myCard.cards[0].value;
        localStorage.setItem("cardResult", cardResult);
        document.getElementById("21-cards").innerHTML = "Kort kvar: " + localStorage.getItem("remainingCards");
        document.getElementById("21-result").innerHTML = "Resultat: " + localStorage.getItem("cardResult");
        if(remainingCards != 0){
          document.getElementById("drawBtn").removeAttribute("disabled");
        }
      }
    })

      document.getElementById("21-result").innerHTML = "Laddar...";
      document.getElementById("drawBtn").setAttribute("disabled", "");
    },
    endGame(){
      document.getElementById("shuffleBtn").removeAttribute("disabled");
      document.getElementById("drawBtn").setAttribute("disabled", "");
      document.getElementById("quitBtn").setAttribute("disabled", "");
      document.getElementById("21-cards").innerHTML = "Spelet avslutat!";
      document.getElementById("21-result").innerHTML = "Du drog " + (52 - localStorage.getItem("remainingCards")) + " kort!";
      localStorage.clear();
    }
  },
    checkLocalStorage(){
      if(localStorage.getItem("deckId") === null){
        document.getElementById("21-cards").innerHTML = "Blanda ny lek för att se hur många kort är kvar!";
        document.getElementById("21-result").innerHTML = "Börja dra kort för att se vad du får!";
        document.getElementById("shuffleBtn").removeAttribute("disabled");
        document.getElementById("drawBtn").setAttribute("disabled", "");
        document.getElementById("quitBtn").setAttribute("disabled", "");
      }
      else{

        if(localStorage.getItem("cardResult") === null){
          document.getElementById("21-result").innerHTML = "Börja dra kort för att se vad du får!";
        }
        else{
        document.getElementById("21-result").innerHTML = "Resultat: " + localStorage.getItem("cardResult");
        }

        if(localStorage.getItem("remainingCards") == 0){
          document.getElementById("drawBtn").setAttribute("disabled", "");
        }
        else{
          document.getElementById("drawBtn").removeAttribute("disabled");
        }

        document.getElementById("21-cards").innerHTML = "Kort kvar: " + localStorage.getItem("remainingCards");
        document.getElementById("shuffleBtn").setAttribute("disabled", "");
        document.getElementById("quitBtn").removeAttribute("disabled");
      } 
    }
}
</script>