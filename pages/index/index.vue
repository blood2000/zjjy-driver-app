<template>
  <view class="content">
    <div class="tab-header">
      <image src="../../static/header-bg.png" mode=""></image>
      <view class="header-title">至简集运司机端</view>
    </div>
    <div class="user-box">
      <div class="user-card">
        <div class="user-card-left">
          <div class="avatar">
            <!-- <img :src="avatar" alt="" /> -->

            <open-data
              type="userAvatarUrl"
              :default-avatar="avatar"
            ></open-data>
            <!-- <button
              class="avatar-btn"
              open-type="chooseAvatar"
              bind:chooseavatar="onChooseAvatar"
            ></button> -->
          </div>
          <div class="user-card-msg">
            <div class="user-name-box">
              <div class="user-name">{{ vehicleMsg.name }}</div>
              <div
                class="user-name-icon"
                :class="vehicleMsg.auth === 3 ? '' : 'no-auth'"
              >
                <!-- <div class="user-name-icon-left">V</div>
                <div class="user-name-icon-right">
                  {{ vehicleMsg.auth ? "已认证" : "未认证" }}
                </div> -->
              </div>
            </div>
            <div class="user-tel">{{ vehicleMsg.phone }}</div>
          </div>
        </div>
        <div class="user-card-right">
          {{ vehicleMsg.vehicleCode || "暂无车辆" }}
        </div>
      </div>
      <div class="zjjy-box">
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

      <div class="order-box" v-if="showOrder">
        <freight-card
          :title="orderTitle"
          :typesFreight="typesFreight"
          :indexShow="true"
          :isAllowUnload="isAllowUnload"
          :pageData="unloadData"
        />
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

    <!-- 卸货单提示 -->
    <!-- <div class="modal" v-if="showUnloadModal" @click="cancelUnloadModal">
      <div class="modal-box">
        <freight-card
          :title="unloadTitle"
          :typesFreight="typesFreight"
          :pageData="unloadData"
        />
        <div
          class="unload-modal-btn unload-allow"
          v-if="isAllowUnload"
          @click="toUnload"
        >
          <div>称重已完成，确认卸货</div>
        </div>
        <div class="unload-modal-btn unload-not" v-else>
          <div>称重未完成，请先完成称重再进行卸货</div>
        </div>
      </div>
    </div> -->
  </view>
</template>

<script>
import { mapState } from "vuex";
import MyModal from "../../components/MyModal.vue";
import urlConfig from "../../config/urlConfig.js";
import { uniRequest } from "../../config/request.js";
import FreightCard from "../scan/components/freightCard.vue";
export default {
  components: { MyModal, FreightCard },
  data() {
    return {
      avatar: "",
      orderMsg: "",
      orderTitle: "正在进行的运单",
      unloadData: {
        planName: "",
        recCompanyName: "",
        goodsName: "",
        receiveType: 1,
        sedCompanyName: "",
        transCompany: "",
      },
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
      showOrder: false,
      isAllowUnload: true, //是否可以卸货
      typesFreight: 1,
    };
  },

  compontents: { MyModal, FreightCard },

  computed: {
    ...mapState({
      vehicleMsg: (state) => state.user.vehicleMsg,
      userInfo: (state) => state.user.userInfo,
      scanInfo: (state) => state.user.scanInfo,
    }),
  },

  onLoad() {
    console.log("已获取的链接参数code==>", this.scanInfo);
    //TODO: 判断是否扫码跳转：跳转到扫码接单页面
    this.avatar = uni.getStorageSync("avatar") || "../../static/avatar.png";
    if (this.scanInfo.code) {
      uni.navigateTo({
        // url: "../scan/index?code=" + code,
        url: `../scan/index?code=${this.scanInfo.code}&type=${this.scanInfo.type}`,
      });
      // return;
    }
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

  onChooseAvatar(e) {
      this.avatar = e.detail;
      console.log(e);
      uni.setStorageSync("avatar", this.avatar);
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
        if (res.data.code === 200 && res.data.data) {
          let vehicleInfo = {
            name: res.data.data.driverInfoVo.name,
            phone: res.data.data.driverInfoVo.telphone,
            auth: res.data.data.driverInfoVo.authStatus,
            userCode: res.data.data.driverInfoVo.userCode,
          };
          console.log("车辆信息", res.data.data.driverInfoVo.vehicleInfoVo);
          if (res.data.data.driverInfoVo.vehicleInfoVo) {
            vehicleInfo.vehicleCode =
              res.data.data.driverInfoVo.vehicleInfoVo.licenseNumber;
          }
          this.$store.commit("setVehicleMsg", vehicleInfo);
          if (res.data.data.jyzWaybillInfoVo) {
            //卸货处理
            this.handleUnload(res.data.data.jyzWaybillInfoVo);
          } else {
            this.showOrder = false;
            this.unloadData = null;
          }
        }
      });
    },
    toVehicle() {
      uni.navigateTo({
        url: "./vehicle",
      });
    },
    toChoose() {
      uni.navigateTo({
        url: "./choose",
      });
    },
    toScanOrder() {
      uni.navigateTo({
        url: "../scan/scanOrder",
      });
    },
    toScanOrderInfo() {
      uni.navigateTo({
        url: "../scan/orderInfo",
      });
    },
    toScanOrderChange() {
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
            url: "../appointment/index",
          });
          break;
        case "vehicle":
          console.log(2);
          uni.navigateTo({
            url: "../car/carList",
          });
          break;
        case "auth":
          uni.navigateTo({
            url: "../scan/authInfo",
          });
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
    openUnloadModal() {
      this.showUnloadModal = true;
    },
    cancelUnloadModal() {
      this.showUnloadModal = false;
    },
    handleUnload(unloadMsg) {
      // if (this.scanInfo.code) {
      //   this.showOrder = false;
      //   return;
      // }
      this.showOrder = true;
      this.typesFreight = unloadMsg.receiveType;
      this.isAllowUnload = unloadMsg.weighingStatus;
      this.unloadData = {
        receiveType: unloadMsg.receiveType,
        sedCompanyName: unloadMsg.sedCompanyName,
        recCompanyName: unloadMsg.recCompanyName,
        goodsName: unloadMsg.goodsBigType,
        transCompany: unloadMsg.companyName,
        // vehicleInfoCode: unloadMsg.vehicleInfoCode,
        driverInfoCode: unloadMsg.driverInfoCode,
        planName: unloadMsg.planName,
      };
    },
    //卸货
    toUnload() {
      let data = {
        vehicleInfoCode: this.vehicleMsg.vehicleCode,
        driverInfoCode: this.unloadData.driverInfoCode,
        userCode: this.vehicleMsg.userCode,
      };

      const config = {
        url: "unload",
        method: "POST",
        // data: this.queryParamsToRequest(),
        data: data,
      };
      uniRequest(config).then((res) => {
        console.log("卸货res", res);
        //清楚beforeWaybillCode
        if (res.data.code === 200) {
          uni.navigateTo({
            url: `../scan/orderSucceed?data=${JSON.stringify(
              res.data.data
            )}&&orderType=1`,
          });
        } else {
          uni.showModal({
            title: "提示",
            content: res.data.msg,
            showCancel: false,
          });
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.main {
  padding-top: 0;
  overflow-y: auto;
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
