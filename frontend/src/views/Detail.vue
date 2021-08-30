<template>
  <div id="Detail">
      <Header class="push-bottom"/>
      <div class="my-content-area">
        <div class="container-fluid push-bottom">
          <div class="row bg-light border shadow-sm">
            <div class="col-sm no-padding" >
              <div style="position:relative;">
                <img :src="shipData.image_url" alt="" width="100%">
                <span class="ship-role text-light small">{{shipData.type}}</span>
                <span class="ship-tier text-light small">TIER-{{shipData.tier}}</span>
                <span class="ship-launch-date text-light small">{{shipData.launch_date}}</span>
                <img :src="getFlagUrl(shipData.navy)" alt="" class="nation-flag">
              </div>
            </div>
            <div class="col-sm padding">
              <h5 class="text-dark text-center">{{shipData.name}}</h5>
              <span class="text-danger">BODY</span>
              <table class="table text-secondary">
                <tr>
                  <td>LENGTH({{ api_result_body ? api_result_body.units.length : '' }})</td>
                  <td class="text-end">{{shipData.length}}</td>
                </tr>
                <tr>
                  <td>WIDTH({{ api_result_body ? api_result_body.units.width : '' }})</td>
                  <td class="text-end">{{shipData.width}}</td>
                </tr>
                <tr>
                  <td>DISPLACEMENT({{ api_result_body ? api_result_body.units.displacement : '' }})</td>
                  <td class="text-end">{{shipData.displacement}}</td>
                </tr>
                <tr>
                  <td>DURABILITY</td>
                  <td class="text-end">{{shipData.durability}}</td>
                </tr>
                <tr>
                  <td>SPEED({{ api_result_body ? api_result_body.units.speed : '' }})</td>
                  <td class="text-end">{{shipData.speed}}</td>
                </tr>
                <tr>
                  <td>MANEUVERABILITY</td>
                  <td class="text-end">{{shipData.maneuvering_ability}}</td>
                </tr>
                <tr>
                  <td>RADAR RANGE({{ api_result_body ? api_result_body.units.radar_range : '' }})</td>
                  <td class="text-end">{{shipData.radar_range}}</td>
                  <td></td>
                </tr>
                <tr v-if="shipData.sonar_range>0">
                  <td>SONAR RANGE({{ api_result_body ? api_result_body.units.sonar_range : '' }})</td>
                  <td class="text-end">{{shipData.sonar_range}}</td>
                </tr>
                <tr v-if="shipData.o2_capacity>0">
                  <td>O2 CAPACITY</td>
                  <td class="text-end">{{shipData.o2_capacity}}</td>
                </tr>
              </table>
              <span class="text-danger">ARMAMENT</span>
              <table class="table text-secondary">
                <tr v-if="shipData.cannon>0">
                  <td>CANNON</td>
                  <td class="text-end">{{shipData.cannon}}</td>
                </tr>
                <tr v-if="shipData.auto_cannon>0">
                  <td>AUTO-CANNON</td>
                  <td class="text-end">{{shipData.auto_cannon}}</td>
                </tr>
                <tr v-if="shipData.auto_cannon_variant>0">
                  <td>AUTO-CANNON SLOT</td>
                  <td class="text-end">{{shipData.auto_cannon_variant}}</td>
                </tr>
                <tr v-if="shipData.grenade_launcher>0">
                  <td>GRENADE LAUNCHER</td>
                  <td class="text-end">{{shipData.grenade_launcher}}</td>
                </tr>
                <tr v-if="shipData.torpedo_launcher>0">
                  <td>TORPEDO LAUNCHER</td>
                  <td class="text-end">{{shipData.torpedo_launcher}}</td>
                </tr>
                <tr v-if="shipData.torpedo_launcher_variant>0">
                  <td>TORPEDO LAUNCHER SLOT</td>
                  <td class="text-end">{{shipData.torpedo_launcher_variant}}</td>
                </tr>
                <tr v-if="shipData.missile_battery>0">
                  <td>MISSILE BATTERY</td>
                  <td class="text-end">{{shipData.missile_battery}}</td>
                </tr>
                <tr v-if="shipData.missile_battery_variant>0">
                  <td>MISSILE BATTERY SLOT</td>
                  <td class="text-end">{{shipData.missile_battery_variant}}</td>
                </tr>
                <tr v-if="shipData.air_defense>0">
                  <td>AIR DEFENSE</td>
                  <td class="text-end">{{shipData.air_defense}}</td>
                </tr>
                <tr v-if="shipData.air_defense_variant>0">
                  <td>AIR DEFENSE SLOT</td>
                  <td class="text-end">{{shipData.air_defense_variant}}</td>
                </tr>
              </table>
              <span class="text-danger" v-if="isEmbarkmentExist()">EMBARKMENT</span>
              <table class="table text-secondary" v-if="isEmbarkmentExist()">
                <tr v-if="shipData.helicopter > 0">
                  <td>HELICOPTER</td>
                  <td class="text-end">{{shipData.helicopter}}</td>
                </tr>
                <tr v-if="shipData.fighter > 0">
                  <td>FIGHTER</td>
                  <td class="text-end">{{shipData.fighter}}</td>
                </tr>
                <tr v-if="shipData.strike_fighter > 0">
                  <td>STRIKE FIGHTER</td>
                  <td class="text-end">{{shipData.strike_fighter}}</td>
                </tr>
                <tr v-if="shipData.drone > 0">
                  <td>DRONE</td>
                  <td class="text-end">{{shipData.drone}}</td>
                </tr>
                <tr v-if="shipData.bomber > 0">
                  <td>BOMBER</td>
                  <td class="text-end">{{shipData.bomber}}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <router-link to="/"><button class="btn btn-outline-danger bg-light shadow-none push-bottom">← BACK</button></router-link>
      </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
export default {
    components : {
        Header
    },
    data(){
      return{
        api_url:'https://modern-warships.web.app/data.json',
        api_result_body : null,
        shipData : {}
      }
    },
    methods:{
      loadData(){
        let ship_id = this.$route.params.id
        let apiUrl = this.$UrlUtils.getAPIUrl()
        fetch(apiUrl, {mode: 'cors'})
          .then(response => response.json())
          .then((data) => {
            // get all ships
            this.api_result_body = data
            let ships = data.ships.filter(item => item.id == ship_id)
            this.shipData = ships[0]
          })
      },
      getFlagUrl(navy){
        return this.$UrlUtils.getFlagUrl(navy)
      },
      isEmbarkmentExist(){
        let count = 0
        count += this.shipData.helicopter
        count += this.shipData.fighter
        count += this.shipData.strike_fighter
        count += this.shipData.drone
        count += this.shipData.bomber

        if(count>0){
          return true
        } else {
          return false
        }
      }
    },
    mounted(){
      this.loadData()
    },
    computed:{
      getShipData(){
        return this.shipData
      }
    }

}
</script>

<style scoped>
.padding{
  padding: 5px 10px 5px 10px;
}
</style>