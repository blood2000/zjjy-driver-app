<!-- 预约排号主页 -->
<template>
  <div class="content">
    <div class="tab-header">
      <image src="../../static/reserve/header_bg.png" mode=""></image>
      <div class="tab-back" @click="back"><uni-icons type="back" size="24" color="#333"></uni-icons></div>
      <view class="header-title">预约排号</view>

      <div class="user-card">
        <div class="user-card-left">
          <div class="avatar">
            <img :src="avatar" alt="" />
          </div>
          <div class="user-card-msg">
            <div class="user-name-box">
              <div class="user-name">{{ vehicleMsg.name }}</div>
              <div class="user-name-icon">
                <!-- <div class="user-name-icon-left">V</div>
                <div class="user-name-icon-right">
                  {{ vehicleMsg.auth ? "已认证" : "未认证" }}
                </div> -->
              </div>
            </div>
            <div class="user-tel">{{ vehicleMsg.phone }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="user-box">
      <div class="reserve-card"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import MyModal from "../../components/MyModal.vue";
import urlConfig from "../../config/urlConfig.js";
import { uniRequest } from "../../config/request.js";
export default {
  data () {
    return {
      avatar: '',
    };
  },

  components: {},

  computed: {
    ...mapState({
      vehicleMsg: (state) => state.user.vehicleMsg,
      userInfo: (state) => state.user.userInfo,
    }),
  },

  onLoad() {
    this.avatar = uni.getStorageSync("avatar") || "../../static/avatar.png";
  },


  methods: {
    back() {
      uni.navigateBack({
      	delta: 1
      })
    },
  }
}

</script>
<style lang='scss' scoped>
.header-title {
  color: #333;
  text-align: center;
  bottom: 274rpx;
}

.tab-back {
  bottom: 270rpx;
}

.user-card {
  width: 100%;
  padding: 0 4%;
  border-radius: 0;
  background: transparent;
  top: 160rpx;
  left: 0;
  box-shadow: none;
}

.user-card-left {
  .user-name-box {
    .user-name {
      color: #333;
    }
  }
  .user-tel {
    color: #363636;
    opacity: .7;
  }
}
</style>