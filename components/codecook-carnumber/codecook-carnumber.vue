<template>
  <view class="car-number">
    <!-- <view class="new-energy">新能源</view> -->
    <view class="wrap" @tap="focusHandler">
      <view
        :class="[
          'cell',
          { last: index === length - 1 },
          { 'no-border': index === length - 1 || index === length - 2 },
          { active: index === current },
        ]"
        v-for="(val, index) in fill"
        :key="index"
        @tap.stop="focusHandler(index)"
      >
        <view class="val" :class="index == 7 && !val ? 'grays' : ''">{{
          index == 7 && !val ? "新" : val
        }}</view>
        <view class="border"></view>
      </view>
    </view>
    <view class="bans" :class="current >= 7?'bans-ok':'bans-no'">确认添加</view>

    <key-board
      v-if="focus"
      :type="kType"
      @on-delete="keyDeleteHandler"
      @on-input="keyInputHandler"
      @on-hide="keyHideHandler"
    ></key-board>
  </view>
</template>

<script>
import KeyBoard from "../codecook-keyboard/codecook-keyboard.vue";

export default {
  name: "CarNumber",
  components: {
    KeyBoard,
  },
  props: {
    value: {
      type: String,
      default: "",
    },
    length: {
      type: Number,
      default: 8,
    },
  },
  data() {
    return {
      focus: false,
      current: 0,
      fill: new Array(this.length).fill(""),
    };
  },
  computed: {
    kType() {
      return this.current === 0 ? "provinces" : "areas";
    },
  },
  watch: {
    fill(val) {
      this.$emit("input", val.join(""));
      this.$emit("change", val);
    },
  },
  methods: {
    focusHandler(index = 0) {
      this.focus = true;

      this.current = index;
      console.log(this.current);
    },
    keyDeleteHandler() {
      this.$set(this.fill, this.current, "");

      if (this.current <= 0) {
        return;
      }

      this.current -= 1;
    },
    keyInputHandler(key) {
      this.$set(this.fill, this.current, key);

      if (this.current >= this.length - 1) {
        return;
      }

      this.current += 1;
    },
    keyHideHandler() {
      this.focus = false;
    },
  },
  beforeMount() {
    if (this.value) {
      this.value.split("").forEach((key, index) => {
        if (index >= this.length) {
          return;
        }
        this.$set(this.fill, index, key);
      });

      this.current = Math.min(this.value.length, this.length - 1);
    }
  },
  mounted() {
    this.focus = true;
  },
};
</script>

<style lang="scss" scoped>
.car-number {
  position: relative;
  width: 100%;

  .wrap {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    box-sizing: border-box;
    border-radius: 8rpx;
    padding: 15rpx 0;
  }

  .new-energy {
    font-size: 24rpx;
    color: #333232;
    margin-bottom: 13rpx;
    display: flex;
    flex-direction: row-reverse;
    padding-right: 5rpx;
  }

  .cell {
    box-sizing: border-box;
    color: #666666;
    font-size: 34rpx;
    background: #ffffff;
    text-align: center;
    border: 4rpx solid transparent;
    align-items: center;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    position: relative;
    border-radius: 13rpx;
    height: 70rpx;
    width: 70rpx;
    box-shadow: 0px 8px 7px 0px rgba(152, 152, 152, 0.1);
    .val {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &.active {
      border-color: #9fbaf2;
    }
  }
}
.grays {
  color: rgb(152, 152, 152);
}
.bans {
  width: 702rpx;
  height: 90rpx;
  
  border-radius: 10rpx;
  font-size: 32rpx;
  font-family: PingFang SC;
  font-weight: bold;
  
  line-height: 90rpx;
  text-align: center;
  margin-top: 81rpx;
}
.bans-ok{
background: #2366f2;
color: #ffffff;
}
.bans-no{
background: #DBDCDD;
color: #BFBFBF;

}
</style>
