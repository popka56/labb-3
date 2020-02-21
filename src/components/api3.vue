<template>
  <div class="mainApi">
    <h2 class="apih2">FFXIV Föremål</h2>
    <p>Skriv in ett ID (1 - 29791)</p>
    <input v-model="s">
    <button id="generateBtn" @click="fetchFFXIV">Hämta data</button>
    <div id="flexyDiv">
      <p v-if="!fetched">{{ message }}</p>
      <ul v-if="fetched">
        <li>Name: {{ ffxivData.Name }}</li>
        <li>ID: {{ ffxivData.ID }}</li>
      </ul>
      <ul v-if="fetched">
        <li v-if="!noDescription">Description:</li>
        <li v-if="!noDescription">"{{ ffxivData.Description }}"</li>
      </ul>
      <ul v-if="fetched">  
        <li>Tradable: {{ ffxivData.IsUntradable }}</li>
        <li>Icon: <iframe :src="ffxivData.Icon"></iframe></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data: function(){
    return {
      s: "1",
      fetched: false,
      message: "",
      noDescription: false,
      ffxivData: {Name: "", Description: "", ID: "", IsUntradable: "", Icon: ""}
    }
  },
    methods: {
    fetchFFXIV(){
      if(this.s < 1 || this.s > 29791 || isNaN(this.s)){
        this.fetched = false
        this.message = "Skriv in ett giltigt ID!"
      }
      else{
        fetch('https://xivapi.com/item/' + this.s)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        this.fetched = true
        this.ffxivData.ID = result.ID
        this.ffxivData.Name = result.Name
        
        if(result.Description == ""){
          this.noDescription = true
          this.ffxivData.Description = ""
        }
        else{
          this.noDescription = false
          this.ffxivData.Description = result.Description
        }

        if(result.IsUntradable == 1){
          this.ffxivData.IsUntradable = "No"
        }
        else{
          this.ffxivData.IsUntradable = "Yes"
        }

        this.ffxivData.Icon = "https://xivapi.com/" + result.Icon
      })
      console.log("Fetchar...")
    }
  }
}

      }
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
  font-size: 5vh
}
iframe{
  height: 40px;
  width: 40px;
  border: none;
}
</style>