<template>
  <view class="map-content">
    <map
      :scale="17"
      id="myMap"
      style="width: 750rpx; height: 100vh;"
      :longitude="locationInfo.longitude"
      :latitude="locationInfo.latitude"
      :markers="markers"
    >
    </map>
  </view>
</template>

<script>
//:markers="locationInfo.markers"
import { mapState } from "vuex";
export default {
  data() {
    return {
      mapHeight: "",
      
      markers: [
        {
          id: 1,
          latitude: 26.0528,
          longitude: 119.3142,
          iconPath: "../static/reserve/map.png",
          width: 32,
          height: 32
        },
        {
          id: 2,
          latitude: 26.0527,
          longitude: 119.3141,
          iconPath: "../static/reserve/map.png",
          width: 32,
          height: 32
        },
      ],
      longitude: "",
      latitude: "",
      circles: [
        {
          latitude: 26.0628,
          longitude: 119.3242,
          fillColor: "#aabbcc", //填充颜色
          color: "#A7B6CB", //描边的颜色
          radius: 6, //半径
          strokeWidth: 2, //描边的宽度
        },
      ],
    };
  },

  computed: {
    ...mapState({
      locationInfo: (state) => state.user.locationInfo,
    }),
  },

  mounted() {
    console.log(this.locationInfo)
  },
  
  props: {
    
  },



  methods: {
    
  },
};
</script>

<style>
.map-content {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

/* map {
  width: 100%;
  height: 100%;
} */
</style>
