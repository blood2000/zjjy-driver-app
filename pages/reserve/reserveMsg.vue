<!-- 预约信息 -->
<template>
  <div class="content">
    <div class="overview-box">
      <div class="overview-box-item">
        <div class="overview-box-item-value"> {{overviewData.curNum}} </div>
        <div class="overview-box-item-name">当前叫号</div>
      </div>
      <div class="overview-box-item">
        <div class="overview-box-item-value"> {{overviewData.reserveNum}} </div>
        <div class="overview-box-item-name">预约号码</div>
      </div>
      <div class="overview-box-item">
        <div class="overview-box-item-value red-value"> {{overviewData.outNum}} <span class="overview-unit">辆</span> </div>
        <div class="overview-box-item-name">场外候车</div>
      </div>
      <div class="overview-box-item">
        <div class="overview-box-item-value"><span class="overview-emphasis">{{overviewData.inNum}}</span>/{{overviewData.fullNum}} </div>
        <div class="overview-box-item-name">场内车辆</div>
      </div>
    </div>
    <div class="main">
      <Map></Map>
    </div>
    <div class="btn-box fixed-bottom">
      <div class="as-btn" @click="cancel">取消预约</div>
    </div>
  </div>
</template>

<script>
import Map from "../../components/Map.vue";
export default {
  data () {
    return {
      mapId: 0,
      overviewData: {
        curNum: 122,
        reserveNum: 130,
        outNum: 20,
        inNum: 13,
        fullNum: 30,
      },
    };
  },

  components: {Map},

  computed: {},

  onShow() {
    this.getLocationInfo()
  },


  methods: {
    // 获取地理位置
    getLocationInfo() {
      var that = this;
      uni.getLocation({
        type: "wgs84",
        // type: "gcj02",
        success: (res) => {
          console.log("位置信息: ", res);
          that.latitude = res.latitude;
          that.longitude = res.longitude;
          //标记点
          that.markers = [
            {
              id: 1,
              latitude: res.latitude,
              longitude: res.longitude,
              iconPath: "../static/reserve/map.png",
            },
          ];
          // that.circles = [{ //在地图上显示圆
          // 	latitude: res.latitude,
          // 	longitude: res.longitude,
          // 	fillColor: "#D9E6EF", //填充颜色
          // 	color: "#A7B6CB", //描边的颜色
          // 	radius: 50, //半径
          // 	strokeWidth: 2 //描边的宽度
          // }]
        },
      });
    },
  }
}

</script>
<style lang='scss' scoped>
.main {
  padding: 0;
}
</style>