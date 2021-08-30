<template>
  <div class="home">
    <Header class="push-bottom" />
    
    <div class="my-content-area">
      <div class="container-fluid">
        <div class="row bg-light shadow-sm">

          <div class="col-sm no-padding">
            <div class="tab-container">
              <div class="tab-item text-dark" :class="{active:selected_group=='ship'}"      @click="groupTabClick('ship')">SHIP</div>
              <div class="tab-item text-dark" :class="{active:selected_group=='submarine'}" @click="groupTabClick('submarine')">SUBMARINE</div>
              <div class="tab-item text-dark" :class="{active:selected_group=='carrier'}"   @click="groupTabClick('carrier')">CARRIER</div>
            </div>
          </div>
          
          <div class="col-sm no-padding">
            <div class="tab-container">
              <div class="tab-item text-dark" :class="{active:selected_tier==0}" @click="tierTabClick(0)">ALL</div>
              <div class="tab-item text-dark" :class="{active:selected_tier==1}" @click="tierTabClick(1)">TIER-1</div>
              <div class="tab-item text-dark" :class="{active:selected_tier==2}" @click="tierTabClick(2)">TIER-2</div>
              <div class="tab-item text-dark" :class="{active:selected_tier==3}" @click="tierTabClick(3)">TIER-3</div>
            </div>
          </div>
          
          <div class="col-sm no-padding">
            <select class="bg-light border-0 rounded-0 text-dark shadow-none" v-model="selected_sort_key">
              <option v-for="(sort_key,index) in applicable_sort_keys" :key="index" :value="sort_key.value">{{sort_key.name}}</option>
            </select>
            <select class="bg-light border-0 rounded-0 text-dark shadow-none" v-model="selected_sort_order">
              <option value="desc">MAX</option>
              <option value="asc">MIN</option>
            </select>
          </div>
        </div>

        <div class="row bg-light push-bottom">
          <div class="col-sm  no-padding">
            <input v-model="search_keyword" type="text" class="form-control formtrol-sm border-1 border-primary border-top-0 border-start-0 border-end-0 border-bottom bg-light rounded-0 shadow-none" placeholder="Type here to search">
          </div>
        </div>

        <div class="row">
          <div class="col-sm no-padding text-light small">
            Found {{filtered_ships.length}} {{selected_group}}{{ filtered_ships.length > 1 ? 's':'' }}<span v-if="search_keyword!=''"> for "{{ search_keyword }}"</span>.
            Sorted by "{{selected_sort_key}}".
          </div>
        </div>

        <ShipCard v-for="(ship,index) in filtered_ships" :shipData="ship" :highlight="selected_sort_key" :key="index" :rank="getRank(index)" />
        
      </div>
    </div>


  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import ShipCard from '@/components/ShipCard.vue';

export default {
  name: "Home",
  components: {
    Header,
    ShipCard
  },
  data() {
    return {
      api_url:'https://modern-warships.web.app/data.json',
      api_result_body : null,
      all_ships : [],

      selected_group : 'ship',
      selected_tier : 0,

      all_sort_keys : [
           {value:"durability",name:"DURABILITY", ship_applicable:true, submarine_applicable:true, carrier_applicable:true}
          ,{value:"speed",name:"SPEED", ship_applicable:true, submarine_applicable:true, carrier_applicable:true}
          ,{value:"maneuvering_ability",name:"MANEUVERABILITY", ship_applicable:true, submarine_applicable:true, carrier_applicable:true}
          ,{value:"radar_range",name:"RADAR RANGE", ship_applicable:true, submarine_applicable:true, carrier_applicable:true}          
          ,{value:"sonar_range",name:"SONAR RANGE", ship_applicable:false, submarine_applicable:true, carrier_applicable:false} 
          ,{value:"o2_capacity",name:"O2 CAPACITY", ship_applicable:false, submarine_applicable:true, carrier_applicable:false}   
          ,{value:"cannon",name:"CANNON", ship_applicable:true, submarine_applicable:false, carrier_applicable:false}
          ,{value:"auto_cannon",name:"AUTO-CANNON", ship_applicable:true, submarine_applicable:false, carrier_applicable:true}
          ,{value:"grenade_launcher",name:"GRENADE LAUNCHER", ship_applicable:true, submarine_applicable:false, carrier_applicable:true}
          ,{value:"torpedo_launcher",name:"TORPEDO LAUNCHER", ship_applicable:true, submarine_applicable:true, carrier_applicable:false}
          ,{value:"missile_battery",name:"MISSILE BATTERY", ship_applicable:true, submarine_applicable:true, carrier_applicable:true}
          ,{value:"air_defense",name:"AIR DEFENSE", ship_applicable:true, submarine_applicable:false, carrier_applicable:true}
          ,{value:"helicopter",name:"HELICOPTER", ship_applicable:true, submarine_applicable:false, carrier_applicable:true}
          ,{value:"fighter",name:"FIGHTER", ship_applicable:false, submarine_applicable:false, carrier_applicable:true}
          ,{value:"strike_fighter",name:"STRIKE FIGHTER", ship_applicable:false, submarine_applicable:false, carrier_applicable:true}
          ,{value:"drone",name:"DRONE", ship_applicable:false, submarine_applicable:false, carrier_applicable:true}
          ,{value:"bomber",name:"BOMBER", ship_applicable:false, submarine_applicable:false, carrier_applicable:true}
        ],
      applicable_sort_keys : [],
      
      selected_sort_key : 'durability',
      selected_sort_order : 'desc',

      search_keyword : ''
    };
  },
  methods: {
    loadData(){
      let apiUrl = this.$UrlUtils.getAPIUrl()
      fetch(apiUrl, {mode: 'cors'})
      .then(response => response.json())
      .then((data) => {
        this.api_result_body = data
        // get all ships
        this.all_ships = this.api_result_body.ships
        // defaut group => ship
        this.groupTabClick('ship')
        // default tier => all
        this.tierTabClick(0)
      })
    },
    groupTabClick(group){
      this.selected_group = group

      if(this.selected_group == 'ship'){
        this.applicable_sort_keys = this.all_sort_keys.filter(item => item.ship_applicable)
      } else if (this.selected_group == 'submarine'){
        this.applicable_sort_keys = this.all_sort_keys.filter(item => item.submarine_applicable)
      } else if (this.selected_group == 'carrier'){
        this.applicable_sort_keys = this.all_sort_keys.filter(item => item.carrier_applicable)
      }

      let found = this.applicable_sort_keys.find(item => item.value == this.selected_sort_key)
      if(!found) { this.selected_sort_key = 'durability'}

    },
    tierTabClick(tier){
      this.selected_tier = tier
    },
    getRank(index){
      if(this.selected_sort_order == "desc"){
        return index+1
      } else {
        return this.filtered_ships.length - index
      }
    }
  },
  mounted() {
    this.loadData()
  },
  computed : {
    filtered_ships(){
      let ships = this.all_ships

      // group filter
      ships = ships.filter(item => item.group == this.selected_group)

      // tier filter
      if(this.selected_tier > 0)
        ships = ships.filter(item => item.tier == this.selected_tier)

      // sorting
      if(this.selected_sort_order == "desc"){
        ships.sort((a,b) => b[this.selected_sort_key] - a[this.selected_sort_key])
      } else {
        ships.sort((a,b) => a[this.selected_sort_key] - b[this.selected_sort_key])
      }

      if(this.search_keyword != ""){
        ships = ships.filter(item => item.name.toLowerCase().includes(this.search_keyword.toLowerCase()))
      }

      return ships
    }
  }
};
</script>

<style scoped>
.tab-container{
  padding-top: 3px;
  padding-bottom:3px;
}
.tab-item{
  display: inline-block;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom: 2px solid  var(--bs-light-rgb);
  cursor: pointer;
}
.active, .tab-item:hover{
  border-bottom: 2px solid #dc3545;
}
</style>
