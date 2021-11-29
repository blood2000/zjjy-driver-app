<template>
  <view class="content">
    <div class="tab-header">
      <image src="../../static/header-bg.png" mode=""></image>
      <view class="header-title">至简集运司机端</view>
    </div>
    <div class="user-box" @click="toScanOrder">
      <div class="user-card">
        <div class="user-card-left">
          <div class="avatar">
            <img  :src="avatar" alt="">
          </div>
          <div class="user-card-msg">
            <div class="user-name-box"> 
              <div class="user-name">{{vehicleMsg.name}}</div>
              <div class="user-name-icon">
                <div class="user-name-icon-left">V</div>
                <div class="user-name-icon-right"> {{vehicleMsg.auth ? '已认证' : '未认证'}} </div>
              </div>
            </div>
            <div class="user-tel"> {{vehicleMsg.phone}} </div>
          </div>
        </div>
        <div class="user-card-right"> {{vehicleMsg.vehicleCode}} </div>
      </div>
      <div class="zjjy-box">
        <div class="item-line">
          <!-- <uni-icons type="email" size="24" color="#2198bd"></uni-icons> -->
          <div class="msg-icon"></div>
          <div class="item-line-msg">您有一条新的系统通知，请及时查看</div>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="main-content">
        <div class="main-content-item" v-for="(item, index) in funcModules" :key="index">
          <div class="title1">{{item.name}} <span class="corner"></span></div>
          <div class="main-content-item-img">
            <image :src="item.img" mode=""></image>
          </div>
        </div>
        
      </div>
    </div>
  </view>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      avatar: '',
      funcModules: [
        {name: '预约排号', img: '../../static/index_queue.png'},
        {name: '我的车辆', img: '../../static/index_vehicle.png'},
        {name: '认证信息', img: '../../static/index_auth.png'},
      ],
    };
  },

  computed: {
    ...mapState({
      vehicleMsg: (state) => state.user.vehicleMsg,
      userInfo: (state) => state.user.userInfo,
    }),
  },

  onLoad() {
    console.log(this.userInfo);
    this.avatar = uni.getStorageSync("avatar") || '../../static/avatar.png';
    
    console.log(this.avatar)
  },

  onShow() {
    // console.log(this.vehicleMsg);
    // if (!this.vehicleMsg.name || !this.vehicleMsg.vehicleCode) {
    //   uni.navigateTo({
    //     url: "./vehicle",
    //   });
    // }
  },

  methods: {

    toVehicle() {
      uni.navigateTo({
        url: "./vehicle",
      });
    },
    toScanOrder() {
      uni.navigateTo({
        url: "../scan/scanOrder",
      });
    },
  },
};
</script>
<style lang="scss" scoped>

.main {
  padding-top: 0;
}

.zjjy-box {
  margin-bottom: 20rpx;
}

.item-line {
  box-sizing: border-box;
  height: 60rpx;
  margin: 0 -10rpx;
  padding: 0 10rpx;
  border-radius: 30rpx;
  background: linear-gradient(93deg, #eff4fe 0%, #fffefe 100%);
}

.msg-icon {
  width: 61rpx;
  height: 54rpx;
  background: url('../../static/msg.png') no-repeat;
  background-size: 100%;
}

</style>
