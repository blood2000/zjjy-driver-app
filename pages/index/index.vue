<template>
  <view class="content">
    <div class="tab-header">
      <image src="../../static/header-bg.png" mode=""></image>
      <view class="header-title">至简集运司机端</view>
    </div>
    <div class="user-box" >
      <div class="user-card">
        <div class="user-card-left" @click="toScanOrder">
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
        <div class="user-card-right"  @click="toScanOrderInfo">{{ vehicleMsg.vehicleCode }}</div>
      </div>
      <div class="zjjy-box"  @click="toScanOrderChange">
        <div class="item-line">
          <!-- <uni-icons type="email" size="24" color="#2198bd"></uni-icons> -->
          <div class="msg-icon"></div>
          <div class="item-line-msg">{{ orderMsg || "暂无新消息" }}</div>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="main-content">
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
    <!-- 弹窗 -->
    <my-modal
      v-if="showModal"
      :content="modalContent"
      @closeModal="closeModal"
      @confirmModal="confirmModal"
    >
      <div class="zjjy-modal-slot">
        排队号: <span> {{ queueCode }} </span>
      </div>
    </my-modal>
  </view>
</template>

<script>
import { mapState } from "vuex";
import MyModal from "../../components/MyModal.vue";
import urlConfig from "../../config/urlConfig.js";
import { uniRequest } from "../../config/request.js";
export default {
  components: { MyModal },
  data() {
    return {
      avatar: "",
      orderMsg: "您有一条新的系统通知，请及时查看",
      funcModules: [
        {
          name: "预约排号",
          img: "../../static/index_queue.png",
          module: "reserve",
        },
        {
          name: "我的车辆",
          img: "../../static/index_vehicle.png",
          module: "vehicle",
        },
        {
          name: "认证信息",
          img: "../../static/index_auth.png",
          module: "auth",
        },
      ],
      showModal: false,
      modalContent:
        "您已进入排队等候区，系统已为您自动分配排队号，请按照排队号码顺序依次有序进场。感谢您的配合！如不按顺序进场将根据场区管理制度进行相应处罚！",
      queueCode: 30,
    };
  },

  compontents: { MyModal },

  computed: {
    ...mapState({
      vehicleMsg: (state) => state.user.vehicleMsg,
      userInfo: (state) => state.user.userInfo,
    }),
  },

  onLoad() {
    console.log(this.userInfo);
    this.avatar = uni.getStorageSync("avatar") || "../../static/avatar.png";
    this.getDriverInfo();
    console.log(this.avatar);
  },

  onPullDownRefresh() {
    console.log("refresh");
    this.getDriverInfo();
    setTimeout(function () {
      uni.stopPullDownRefresh();
    }, 1000);
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
    getDriverInfo() {
      const config = {
        url: "driverInfo",
        method: "GET",
      };
      uniRequest(config).then((res) => {
        console.log("首页获取司机信息", res);
        if (res.data.code === 200) {
          let vehicleInfo = {
            name: res.data.data.name,
            vehicleCode: res.data.data.vehicleInfoVo.licenseNumber,
            phone: res.data.data.telphone,
            auth: res.data.data.authStatus,
          };
          this.$store.commit("setVehicleMsg", vehicleInfo);
        }
      });
    },
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
    toScanOrderInfo(){
       uni.navigateTo({
        url: "../scan/orderInfo",
      });
    },
    toScanOrderChange(){
       uni.navigateTo({
        url: "../scan/changeDriverInfo",
      });
    },

    jumpModule(item) {
      console.log(item);
      switch (item.module) {
        case "reserve":
          uni.navigateTo({
            // url: "../reserve/reserveMsg",
            url: "../reserve/reserve",
          });
          break;
        case "vehicle":
          console.log(2);
          break;
      }
    },

    closeModal() {
      this.showModal = false;
    },

    confirmModal() {
      //TODO...
      this.showModal = false;
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
  background: url("../../static/msg.png") no-repeat;
  background-size: 100%;
}

.zjjy-modal-slot {
  margin-bottom: 30rpx;
  > span {
    font-size: 40rpx;
    font-weight: bold;
    color: #2366f2;
    padding-left: 20rpx;
  }
}
</style>
