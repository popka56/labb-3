<template>
  <div class="mainApi">
    <h2 class="apih2">Kryptovalutor</h2>
    <div id="flexyDiv">
      <p v-if="!fetched">{{ message }}</p>
      <div id="leftDiv">

      </div>
      <div id="rightDiv">

      </div>
    </div>
  </div>
</template>

<script>
export default {
    data: function(){
      return {
        fetched: false,
        message: "",
      }
    },
    props: {
        amount: {
          type: Number,
          default: 8
      }
    },
    created () {
    this.randomizeCrytpoCurrencies()
    },
    methods: {
    randomizeCrytpoCurrencies(){
      if(this.amount > 8){
          this.fetched = false
          this.message = "Du kan bara generera max 8 kryptovalutor åt gången!"
      }
      else{
        fetch('https://api.coinranking.com/v1/public/coins')
      .then(response => response.json())
      .then(result => {

        let oldCoins = [null, null, null, null, null, null, null, null];
  
        for(let i = 0; i < this.amount; i++){
          let randomCoin = Math.floor((Math.random() * 50));
  
          if(!oldCoins.includes(randomCoin)){
            oldCoins[i] += randomCoin;
  
            let pElement = document.createElement("p");
            let txtElement = document.createTextNode(result.data.coins[randomCoin].name);
    
            if(i < 4){
              document.getElementById("leftDiv").appendChild(pElement);
              pElement.appendChild(txtElement); 
            }
        
            if(i >= 4){
              document.getElementById("rightDiv").appendChild(pElement);
              pElement.appendChild(txtElement);
            }
  
          }
          else{
            i--;
          }
        }
      })
    }
  }
      }
}
</script>