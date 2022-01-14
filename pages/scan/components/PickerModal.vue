<!-- 上拉列表组件 -->
<template>
  <div>
    <div class="modal" v-if="showModal" @click="cancelModal"></div>
    <div class="type-modal-box" :class="showModal ? 'show-modal' : ''">
      <div class="type-box">
        <div class="type-box-title title1">
          车辆
          <div class="type-back" @click="cancelModal">
            <uni-icons type="back" size="28" color="#666"></uni-icons>
          </div>
        </div>
        <view class="modal-input-box">
          <uni-icons type="search" color="#878787" size="18"></uni-icons>
          <input
            class="my-search-input"
            type="text"
            placeholder="请输入车牌号搜索"
            confirm-type="search"
            v-model="searchNumber"
            @input="searchVehicle"
            @confirm="searchVehicle"
          />
        </view>
        <div class="type-main">
          <div
            class="type-main-item"
            v-for="(item, index) in searchList"
            :key="index"
            :class="
              item.licenseNumber === licenseNumber ? 'active-type-item' : ''
            "
            @click="chooseVehicle(item)"
          >
            {{ item.licenseNumber }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      licenseNumber: [], //选中的车牌号
      searchNumber: "",
      searchList: [],
    };
  },

  props: {
    showModal: {
      type: Boolean,
      required: true,
    },
    pickerData: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  components: {},

  computed: {},

  mounted() {
    console.log("picker show");
  },

  watch: {
    pickerData(val) {
      console.log('组件车牌号数组变化', val)
      this.searchList = JSON.parse(JSON.stringify(val));
      if (this.searchList.length === 1) {
        this.licenseNumber = this.searchList[0].licenseNumber;
        this.chooseVehicle(this.searchList[0]);
      } else {
        this.chooseVehicle({
          licenseNumber: "",
          vehicleCode: "",
        });
      }
    },
  },

  methods: {
    cancelModal() {
      this.searchNumber = "";
      this.searchList = JSON.parse(JSON.stringify(this.pickerData));
      this.$emit("cancelModal");
    },
    chooseVehicle(item) {
      this.licenseNumber = item.licenseNumber;
      this.$emit("chooseVehicle", item);
      this.cancelModal();
    },
    searchVehicle() {
      let searchList = [];
      this.pickerData.map((item) => {
        if (item.licenseNumber.indexOf(this.searchNumber) !== -1) {
          searchList.push(item);
        }
      });
      this.searchList = searchList;
    },
  },
};
</script>
<style lang='scss' scoped>
.type-modal-box {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0;
  background: #ffffff;
  border-radius: 24rpx 24rpx 0 0;
  z-index: 102;
  overflow: hidden;
  transition: all 0.2s linear;
}

.show-modal {
  height: 480rpx;
}

.modal-input-box {
  box-sizing: border-box;
  width: 100%;
  height: 60rpx;
  margin: 0 auto 20rpx;
  padding-left: 20rpx;
  background: #f6f6f6;
  border-radius: 10rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.type-box {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 40rpx 30rpx 30rpx;
  overflow-y: auto;
}

.type-box-title {
  position: relative;
  text-align: center;
  margin-bottom: 30rpx;
}

.type-back {
  position: absolute;
  width: 30rpx;
  height: 30rpx;
  left: 0;
  top: 50%;
  text-align: center;
  line-height: 30rpx;
  font-weight: 100;
  transform: translateY(-50%);
}

.type-main {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.type-main-item {
  box-sizing: border-box;
  width: 100%;
  height: 60rpx;
  line-height: 60rpx;
  text-align: center;
  background: #fff;
  font-size: 28rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 10rpx;
}

.active-type-item {
  // background: #3a65ff;
  color: #3a65ff;
}
</style>