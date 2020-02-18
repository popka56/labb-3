<template>
  <div class="mainApi">
    <h2 class="apih2">Kryptovalutor</h2>
    <button id="generateBtn" @click="randomizeCrytpoCurrencies">Generera Kryptpvalutor</button>
    <div id="flexyDiv">
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
      i: 0,
      pElement: null,
      txtElement: null
    }
  },
    methods: {
    randomizeCrytpoCurrencies(){
        fetch('https://api.coinranking.com/v1/public/coins')
      .then(response => response.json())
      .then(result => {
    
        document.getElementById("generateBtn").setAttribute("disabled", "");
        let oldCoins = [50, 50, 50, 50, 50, 50, 50, 50];
  
        for(this.i = 0; this.i < 8; this.i++){
          let randomCoin = Math.floor((Math.random() * 50));
  
          if(!oldCoins.includes(randomCoin)){
            oldCoins[this.i] += randomCoin;
  
            this.pElement = document.createElement("p");
            this.txtElement = document.createTextNode(result.data.coins[randomCoin].name);
    
            if(this.i < 4){
              document.getElementById("leftDiv").appendChild(this.pElement);
              this.pElement.appendChild(this.txtElement); 
            }
        
            if(this.i >= 4){
              document.getElementById("rightDiv").appendChild(this.pElement);
              this.pElement.appendChild(this.txtElement);
            }
  
          }
          else{
            this.i--;
          }
        }
      })
    }
  }
}
</script>