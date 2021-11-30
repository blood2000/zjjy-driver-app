<!-- 预约排号主页 -->
<template>
  <div class="content">
    <div class="tab-header">
      <image src="../../static/reserve/header_bg.png" mode=""></image>
      <div class="tab-back" @click="back">
        <uni-icons type="back" size="24" color="#333"></uni-icons>
      </div>
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
      <!-- 预约信息卡片 -->
      <div class="reserve-card">
        <div class="reserve-card-left">
          <div class="reserve-card-left-item">
            <div class="reserve-card-left-item-name">预约</div>
            <div class="reserve-card-left-item-value">
              26 <span class="reserve-card-unit">次</span>
            </div>
          </div>
          <div class="reserve-card-left-item">
            <div class="reserve-card-left-item-name">取消</div>
            <div class="reserve-card-left-item-value">
              9 <span class="reserve-card-unit">次</span>
            </div>
          </div>
        </div>
        <div class="user-card-right" @click="toScanOrderInfo">
          {{ vehicleMsg.vehicleCode }}
        </div>
      </div>
      <div class="reserve-content-box">
        <div
          class="main-content-item"
          v-for="(item, index) in funcModules"
          :key="index"
          @click="jumpModule(item)"
        >
          <div class="title1">{{ item.name }} <span class="corner"></span></div>
          <div class="main-content-item-img">
            <image :src="item.img" mode=""></image>
          </div>
        </div>
      </div>
    </div>
    <!-- 预约项展示区域 -->
    <div class="main">
      <div class="zjjy-box">
        <div class="reserve-box">
          <div class="reserve-box-title">
            <div class="reserve-box-title-left">
              <div class="reserve-box-title-icon"></div>
              <div class="reserve-box-title-text">五福洗煤厂</div>
            </div>

            <div class="title1">09:30</div>
          </div>
          <div class="reserve-box-floor">
            <div>原煤</div>
            <div>/</div>
            <div>大道成物流科技有限公司</div>
          </div>
          <div class="reserve-box-floor reserve-box-date-floor">
            <div>预约实际:</div>
            <div>2021-11-28 13:26:25</div>
          </div>
        </div>

        <div class="reserve-box">
          <div class="reserve-box-title">
            <div class="reserve-box-title-left">
              <div class="reserve-box-title-icon"></div>
              <div class="reserve-box-title-text">五福洗煤厂</div>
            </div>

            <div class="title1">09:30</div>
          </div>
          <div class="reserve-box-floor">
            <div>原煤</div>
            <div>/</div>
            <div>大道成物流科技有限公司</div>
          </div>
          <div class="reserve-box-floor reserve-box-date-floor">
            <div>预约实际:</div>
            <div>2021-11-28 13:26:25</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import MyModal from "../../components/MyModal.vue";
import urlConfig from "../../config/urlConfig.js";
import { uniRequest } from "../../config/request.js";
export default {
  data() {
    return {
      avatar: "",
      funcModules: [
        {
          name: "扫码预约",
          img: "../../static/reserve/scan.png",
          module: "reserve",
        },
        {
          name: "现场取号",
          img: "../../static/reserve/code.png",
          module: "code",
        },
      ],
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
        delta: 1,
      });
    },
  },
};
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

.user-box {
  height: 354rpx;
  padding: 0;
}

.reserve-content-box {
  box-sizing: border-box;
  position: absolute;
  width: 90%;
  left: 5%;
  top: 64rpx;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 100;
}

.main-content-item {
  width: 45%;
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
    opacity: 0.7;
  }
}

.main {
  padding-top: 0;
}

.zjjy-box {
  padding: 20rpx;
}
</style>