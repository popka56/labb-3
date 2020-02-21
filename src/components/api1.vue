<template>
  <div class="mainApi">
    <h2 class="apih2">En Kortlek</h2>
    <!--Jag vill nämna att alla dessa v-if och v-else bara är en fullösning för jag var lat...-->
    <p v-if="this.$store.state.deckId==null" id="21-cards">Blanda ny lek för att se hur många kort är kvar!</p>
    <p v-else id="21-cards">Kort kvar: {{ this.$store.state.remainingCards }}</p>
    <p>
      <button v-if="this.$store.state.deckId==null" id="shuffleBtn" @click="shuffleNewDeck">Blanda ny lek</button>
      <button v-else id="shuffleBtn" disabled @click="shuffleNewDeck">Blanda ny lek</button>
      <button v-if="this.$store.state.deckId==null" disabled id="drawBtn" @click="drawCard">Dra ett kort</button>
      <button v-else id="drawBtn" @click="drawCard">Dra ett kort</button>
      <button v-if="this.$store.state.deckId==null" disabled id="quitBtn" @click="endGame">Avsluta</button>
      <button v-else id="quitBtn" @click="endGame">Avsluta</button><br>
    </p>
    <p v-if='this.$store.state.cardResult==""' id="21-result">Börja dra kort för att se vad du får!</p>
    <p v-else id="21-result">Resultat: {{ this.$store.state.cardResult }}</p>
  </div>
</template>

<script>
export default {
  methods: {
    shuffleNewDeck() {
      fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then(response => response.json())
    .then(myDeck => {
        this.$store.commit('saveDeckId', myDeck.deck_id);
        this.$store.commit('saveRemainingCards', 52);
        this.$store.commit('saveCardResult', "");

        document.getElementById("21-cards").innerHTML = "Kort kvar: " + this.$store.state.remainingCards;
        document.getElementById("21-result").innerHTML = "Börja dra kort för att se vad du får!";
        document.getElementById("drawBtn").removeAttribute("disabled");
        document.getElementById("quitBtn").removeAttribute("disabled");
      })

        document.getElementById("21-cards").innerHTML = "Laddar...";
        document.getElementById("21-result").innerHTML = "Laddar...";
        document.getElementById("shuffleBtn").setAttribute("disabled", "");
    },
    drawCard() {
      fetch("https://deckofcardsapi.com/api/deck/" + this.$store.state.deckId + "/draw/?count=1")
    .then(response => response.json())
    .then(myCard => {
      this.$store.commit('saveRemainingCards', myCard.remaining);

      if(this.$store.state.remainingCards >= 0){
        this.$store.commit('saveCardResult', myCard.cards[0].suit + " " + myCard.cards[0].value);
        document.getElementById("21-cards").innerHTML = "Kort kvar: " + this.$store.state.remainingCards;
        document.getElementById("21-result").innerHTML = "Resultat: " + this.$store.state.cardResult;
        if(this.$store.state.remainingCards != 0){
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
      document.getElementById("21-result").innerHTML = "Du drog " + (52 - this.$store.state.remainingCards) + " kort!";
      this.$store.commit('saveDeckId', null);
      this.$store.commit('saveRemainingCards', 0);
      this.$store.commit('saveCardResult', "");
    }
  }
}
</script>