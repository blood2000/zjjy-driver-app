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
        <div class="user-card-right">
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
      <!-- 无数据 -->
      <div class="zjjy-box" v-if="noData">
        <div class="no-data">
          <image
            class="no-reserve"
            src="../../static/reserve/no_data.png"
            mode=""
          ></image>
          <div class="no-data-text">
            <span>暂无排队信息</span>
            <div class="no-data-refresh" @click="refresh"></div>
          </div>
        </div>
      </div>
      <!-- 预约详情 -->
      <div class="zjjy-box" v-else>
        <div class="reserve-box" @click="toReserveMsg">
          <div class="reserve-box-title">
            <div class="reserve-box-title-left">
              <div class="reserve-box-title-icon"></div>
              <div class="reserve-box-title-text">{{ reserveInfo.start }}</div>
            </div>

            <div class="title1">09:30</div>
          </div>
          <div class="reserve-box-floor">
            <div>{{ reserveInfo.material }}</div>
            <div>/</div>
            <div>{{ reserveInfo.end }}</div>
          </div>
          <div class="reserve-box-floor reserve-box-date-floor">
            <div>预约时间:</div>
            <div>{{ reserveInfo.reserveDate }}</div>
          </div>
        </div>

        <div class="reserve-box" @click="toEntryMsg">
          <div class="reserve-box-title">
            <div class="reserve-box-title-left">
              <div class="reserve-box-title-icon"></div>
              <div class="reserve-box-title-text">{{ reserveInfo.start }}</div>
            </div>

            <div class="title1">09:30</div>
          </div>
          <div class="reserve-box-card">
            <div class="reserve-box-card-left">
              {{ reserveInfo.reserveNum }}
            </div>
            <div class="reserve-box-card-right">
              <div><span>当前叫号:</span> {{ reserveInfo.curNum }}</div>
              <div><span>等候车次:</span> {{ reserveInfo.waitNum }}</div>
            </div>
          </div>
          <div class="reserve-box-floor">
            <div>{{ reserveInfo.material }}</div>
            <div>/</div>
            <div>{{ reserveInfo.end }}</div>
          </div>
          <div class="reserve-box-floor reserve-box-date-floor">
            <div>预约时间:</div>
            <div>{{ reserveInfo.reserveDate }}</div>
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
      reserveInfo: {
        start: "五福洗煤厂",
        end: "大道成物流科技有限公司",
        reserveDate: "2021-11-28 13:26:25",
        material: "原煤",
        curNum: 122, //当前叫号
        reserveNum: 130, //预约号码
        waitNum: 8,
      },
      noData: false,
    };
  },

  components: {},

  computed: {
    ...mapState({
      vehicleMsg: (state) => state.user.vehicleMsg,
      userInfo: (state) => state.user.userInfo,
    }),
  },

  onLoad(options) {
    console.log(options)
    
    this.avatar = uni.getStorageSync("avatar") || "../../static/avatar.png";
  },

  methods: {
    back() {
      uni.navigateBack({
        delta: 1,
      });
    },

    refresh() {
      console.log("刷新页面");
      uni.showLoading();
      setTimeout(() => {
        uni.hideLoading();
      }, 1000);
    },
    toReserveMsg() {
      console.log("跳转预约信息");
      uni.navigateTo({
        url: "./reserveMsg",
      });
    },
    jumpModule(item) {
      switch (item.module) {
        case "reserve":
          // uni.navigateTo({
          //   url: "../reserve/reserve",
          // });
          console.log('跳转扫码预约')
          break;
        case "code":
          console.log('跳转现场取号')
          // uni.navigateTo({
          //   url: "../car/carList",
          // });
          break;
      }
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
  overflow-y: auto;
}

.zjjy-box {
  padding: 20rpx;
}
</style>