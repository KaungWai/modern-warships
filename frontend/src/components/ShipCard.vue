<template>
  <div id="ShipCard" class="row push-bottom clickable border shadow-sm bg-light" @click="goToDetail(shipData.id)">
    <div class="col-sm-8 no-padding">
      <div class="bg-light text-dark">
        <span class="ship-rank bg-dark text-light">#{{rank}}</span>
        <strong> {{ shipData.name }}</strong>
      </div>
      <div class="ship-info small text-secondary">
        <span class="ship-ability" :class="{highlight:highlight=='durability'}" >Durability : {{zeroToNA(shipData.durability)}};</span><!-- ALL -->
        <span class="ship-ability" :class="{highlight:highlight=='speed'}">Speed : {{shipData.speed}};</span> <!-- ALL -->
        <span class="ship-ability" :class="{highlight:highlight=='maneuvering_ability'}">Maneuverability : {{zeroToNA(shipData.maneuvering_ability)}};</span> <!-- ALL -->
        <span class="ship-ability" :class="{highlight:highlight=='radar_range'}">Radar Range : {{zeroToNA(shipData.radar_range)}};</span> <!-- ALL -->
        <span class="ship-ability" :class="{highlight:highlight=='sonar_range'}" v-if="shipData.group=='submarine'" >Sonar Range : {{zeroToNA(shipData.sonar_range)}};</span> <!-- SUB -->
        <span class="ship-ability" :class="{highlight:highlight=='o2_capacity'}" v-if="shipData.group=='submarine'" >O2 Capacity : {{zeroToNA(shipData.o2_capacity)}};</span> <!-- SUB -->
        <span class="ship-ability" :class="{highlight:highlight=='cannon'}" v-if="shipData.group=='ship'" >Cannon : {{zeroToNA(shipData.cannon)}};</span> <!-- SHIP -->
        <span class="ship-ability" :class="{highlight:highlight=='auto_cannon'}" v-if="shipData.group!='submarine'" >Auto-cannon : {{zeroToNA(shipData.auto_cannon)}};</span> <!-- SHIP --> <!-- CAR -->
        <span class="ship-ability" :class="{highlight:highlight=='grenade_launcher'}" v-if="shipData.group!='submarine'" >Grenade Launcher : {{zeroToNA(shipData.grenade_launcher)}};</span> <!-- SHIP --> <!-- CAR -->
        <span class="ship-ability" :class="{highlight:highlight=='torpedo_launcher'}" v-if="shipData.group!='carrier'" >Torpedo Launcher : {{zeroToNA(shipData.torpedo_launcher)}};</span> <!-- SHIP --> <!-- SUB -->
        <span class="ship-ability" :class="{highlight:highlight=='missile_battery'}" >Missile Battery : {{zeroToNA(shipData.missile_battery)}};</span> <!-- ALL -->
        <span class="ship-ability" :class="{highlight:highlight=='air_defense'}" v-if="shipData.group!='submarine'" >Air Defense : {{zeroToNA(shipData.air_defense)}};</span> <!-- SHIP --> <!-- CAR -->
        <span class="ship-ability" :class="{highlight:highlight=='fighter'}" v-if="shipData.group=='carrier'" >Fighter : {{zeroToNA(shipData.fighter)}};</span> <!-- CAR -->
        <span class="ship-ability" :class="{highlight:highlight=='strike_fighter'}" v-if="shipData.group=='carrier'" >Strike Fighter : {{zeroToNA(shipData.strike_fighter)}};</span> <!-- CAR -->
        <span class="ship-ability" :class="{highlight:highlight=='drone'}" v-if="shipData.group=='carrier'" >Drone : {{zeroToNA(shipData.drone)}};</span> <!-- CAR -->
        <span class="ship-ability" :class="{highlight:highlight=='bomber'}" v-if="shipData.group=='carrier'" >Bomber : {{zeroToNA(shipData.bomber)}};</span> <!-- CAR -->
        <span class="ship-ability" :class="{highlight:highlight=='helicopter'}" v-if="shipData.group!='submarine'" >Helicopter : {{zeroToNA(shipData.helicopter)}};</span> <!-- SHIP --> <!-- CAR -->
      </div>
    </div>
    <div class="col-sm-4 no-padding image-container">
      <span class="ship-role text-light small">{{shipData.type}}</span>
      <span class="ship-tier text-light small">TIER-{{shipData.tier}}</span>
      <span class="ship-launch-date text-light small">{{shipData.launch_date}}</span>
      <img :src="getFlagURL(shipData.navy)" alt="" class="nation-flag">
      <img
        :src="shipData.image_url"
        alt="cn_type_054_jiankai"
        width="100%"
      />
    </div>
  </div>
</template>

<script>
export default {
  props :{
    shipData:Object,
    highlight:String,
    rank:Number
  },
  methods:{
    zeroToNA(value){
      let strValue = value.toString()
      if(strValue == '0'){
        return 'N/A'
      } else {
        return value
      }
    },
    getFlagURL(navy){
      return this.$UrlUtils.getFlagUrl(navy)
    },
    goToDetail(shipId){
      this.$router.push({ name: 'Detail', params: { id: shipId } })
    }
  }
};
</script>

<style scoped>
.ship-rank {
  padding-left: 5px;
  padding-right: 5px;
  display: inline-block;
}
.image-container{
  position: relative;
}
.ship-info{
  padding: 10px;
} 
.ship-ability{
  display: inline-block;
  padding-right: 10px;
}
.clickable{
  cursor: pointer;
}
</style>