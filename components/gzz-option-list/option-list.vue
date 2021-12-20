<template>
  <view class="list-box">
    <view
      v-for="(item) in dataList"
      :key="item.code"
      class="item"
      style="height: 168rpx"
      @tap="tap(item)"
      @touchstart="touchstart(item, $event)"
      @touchmove="touchmove"
      @touchend="touchend()"
    >
      <view class="option-box">
        <view
          v-for="(oItem, index) in options"
          :key="oItem.text"
          class="option-item"
          :class="options && options.length - 1 === index ? 'last-r' : ''"
          @tap.stop="optionClick(item, oItem)"
          :style="{
            color: oItem.color || '#ffffff',
            width: oItem.width ? oItem.width + 'rpx' : '100rpx',
            backgroundColor: oItem.bgColor || '#409EFF',
          }"
          >{{ oItem.text }}</view
        >
      </view>
      <view
        class="item-container"
        :style="{
          transform: item.transformVal,
          transition: item.transitionVal,
        }"
      >
        <!-- <slot :item="item"></slot> -->
        <view class="list-item">
          <image
            :src="item.vehicle_image"
            v-if="item.vehicle_image"
            mode="aspectFill"
          />
          <image
            v-else
            src="../../static/order/vehicle-moren.png"
            mode="aspectFill"
          />
          <div class="list-item-content">
            <div class="list-item-content-top">
              <div class="title22">{{ item.license_number }}</div>
              <img
                v-if="item.auth_status > 2"
                src="../../static/order/svip.png"
                alt=""
              />
            </div>
            <div class="list-item-content-bottom">
              车型：{{ item.vehicle_type || '暂未选择车型' }}
            </div>
          </div>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    itemHeight: {
      type: [Number],
      default: 120,
    },
    options: {
      type: Array,
      default: () => [],
    },
    threshold: {
      type: [Number],
      default: 50,
    },
  },
  data() {
    return {
      multipleSlots: true,
      dataList: [],
      dragTargetX: 0,
      offsetWidth: 0,
      activeItem: null,
      translateX: 0,
    };
  },
  watch: {
    list: {
      immediate: true,
      deep: true,
      handler(list) {
        this.setList(list);
      },
    },
  },
  methods: {
  
    touchstart(item, e) {
      console.log('touchstart item',item)
      if (this.translateX != 0 && this.activeItem.item_id != item.item_id) {
        this.tap();
      }
      this.dragTargetX = e.touches[0].pageX;
      this.activeItem = item;
      if (!this.offsetWidth) {
        const res = uni.getSystemInfoSync();
        let screenWidth = res.screenWidth;
        this.offsetWidth = 0;
        this.options.forEach((item) => {
          this.offsetWidth += (screenWidth / 750) * item.width;
        });
      }
    },
    touchmove(e) {
      let newX = e.touches[0].pageX;
      let d = newX - this.dragTargetX;

      if (
        (this.translateX < -this.offsetWidth && d < 0) ||
        (this.translateX > 0 && d > 0)
      ) {
        if (this.translateX > 0) {
          d = (d * 1) / this.translateX;
        } else {
          d = (d * 1) / (Math.abs(this.translateX) - this.offsetWidth);
        }
      }

      this.translateX += d;
      this.setBounceTransition(true);

      this.dragTargetX = newX;
    },
    touchend() {
      if (this.translateX >= 0 || Math.abs(this.translateX) < this.threshold) {
        this.translateX = 0;
        this.setBounceTransition();
      } else {
        this.translateX = -this.offsetWidth;
        this.setBounceTransition();
      }
    },
    tap(item) {
      this.translateX = 0;
      this.setBounceTransition();
      this.$emit("click", item);
    },
    setBounceTransition(flag) {
      if (flag) {
        this.activeItem.transitionVal = "none";
      } else {
        this.activeItem.transitionVal = "all 0.4s cubic-bezier(.62,1.69,.7,1)";
      }
      this.activeItem.transformVal = "translateX(" + this.translateX + "px)";
    },
    setList(list) {
      this.dataList = [];
      this.dataList = list.map((item, index) => {
        return {
          ...item,
          transformVal: "",
          transitionVal: "",
          item_id: index,
        };
      });
    },
    optionClick(item, oitem) {
      console.log(item.license_number,oitem)
      this.translateX = 0;
      this.setBounceTransition();
      this.$emit("optionClick", item, oitem);
    },
  },
};
</script>

<style lang="scss" scoped>
.list-box {
  width: 702rpx;
  margin: 0 24rpx;
  .item {
    width: 100%;
    border-bottom: 1rpx solid #f5f5f5;
    position: relative;
    margin-top: 24rpx;
    .item-container {
      width: 100%;
      height: 100%;
      position: relative;
      background-color: #ffffff;
      border-radius: 20rpx;
      // transition: all 0.3s cubic-bezier(.34,1.06,.78,1.1);
    }
    .option-box {
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      .option-item {
        // width: 50px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 34rpx;
      }
    }
  }
}
.last-r {
  border-bottom-right-radius: 25rpx;
  border-top-right-radius: 25rpx;
}
.list-item {
  width: 100%;
  height: 100%;
  padding: 18rpx;
  display: flex;
  & > image {
    width: 156rpx;
    height: 132rpx;
  }
  &-content {
    flex: 1;
    margin-left: 18rpx;
    &-top,
    &-bottom {
      display: flex;
      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 42rpx;
    }
    &-top {
      margin-top: 12rpx;
      margin-bottom: 35rpx;
      align-items: center;
      & > img {
        padding-left: 18rpx;
        width: 102rpx;
        height: 32rpx;
      }
    }
  }
}
.title22 {
  font-size: 32rpx;
  font-family: PingFang SC;
  font-weight: bold;
  color: #333333;
}
</style>
