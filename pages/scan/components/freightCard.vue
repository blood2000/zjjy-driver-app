<template>
  <div class="zjjy-box-freughtCard order-box">
    <div class="zjjy-box-title" :class="isCur ? 'zjjy-box-title-cur' : ''">
      {{ title }}
    </div>
    <div class="zjjy-box-main">
      <div class="zjjy-box-main-floor">
        <!-- :class="typesFreight ===0?'status1':'status2'" -->
        <div class="zjjy-floor-left status">
          <image :src="freightImage" alt="" />
        </div>
        <div class="zjjy-floor-right addr">
          <div class="floor-start">{{ pageData.sedCompanyName }}</div>
          <div class="rotate-right">
            <uni-icons type="pulldown" size="24" color="#b9d0fd"></uni-icons>
          </div>
          <div class="floor-end">{{ pageData.recCompanyName }}</div>
        </div>
      </div>
      <div class="zjjy-box-main-floor">
        <div class="zjjy-floor-left">计划名称</div>
        <div class="zjjy-floor-right">{{ pageData.planName }}</div>
      </div>
      <div class="zjjy-box-main-floor">
        <div class="zjjy-floor-left">商品类型</div>
        <div class="zjjy-floor-right">{{ pageData.goodsName }}</div>
      </div>
      <div class="zjjy-box-main-floor">
        <div class="zjjy-floor-left">运输公司</div>
        <div class="zjjy-floor-right">
          <image
            v-if="
              pageData.transCompany === 'chy' ||
              pageData.transCompany === '超好运'
            "
            style="width: 136rpx; height: 28rpx"
            :src="companyImage"
          />
          <span v-else>{{ pageData.transCompany }}</span>
        </div>
      </div>
      <div class="unload-floor" v-if="indexShow && isAllowUnload" @click="toUnload">
        <div class="allow-floor">称重已完成，确认卸货</div>
      </div>
      <div class="unload-floor" v-if="indexShow && !isAllowUnload">
				<div class="not-floor">称重未完成，请进行称重</div>
			</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "本次扫码要接的运单",
    },
    isCur: {
      //是否当前运单
      type: Boolean,
      default: false,
    },
		isAllowUnload: {
			type: Boolean,
			default: false,
		},
    indexShow: {
      //是否当前运单
      type: Boolean,
      default: false,
    },
    typesFreight: {
      type: Number,
      default: 0,
    },
    pageData: {
      type: Object,
      default: {},
    },
  },
  computed: {
    freightImage() {
      return this.typesFreight == 1
        ? "../../../static/order/Receiving.png"
        : "../../../static/order/shipments.png";
    },
    companyImage() {
      return "../../../static/order/chy.png";
    },
  },
};
</script>

<style scoped>
.rotate-right {
  width: 16%;
  text-align: center;
  transform: rotate(-90deg);
}

.floor-start,
.floor-end {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 42%;
}

.order-box {
  padding: 0;
}

.status {
  width: 127rpx;
  height: 36rpx;
}

.status1 {
  background: #febe4d;
}

.status2 {
  background: #24b1b8;
}

.addr {
  width: 70%;
}

.unload-floor {
  width: 500rpx;
  padding: 20rpx 0 10rpx;
	margin: 20rpx auto 0;
  border-top: 1rpx solid rgba(211, 224, 252, .5);
  font-size: 28rpx;
	display: flex;
	justify-content: center;
}

.allow-floor {
	padding-left: 40rpx;
	color: #2366F2;
	background: url('../../../static/index_allow.png') no-repeat;
	background-size: 30rpx 30rpx;
	background-position: left center;
}
.not-floor {
	padding-left: 40rpx;
	color: #999;
	background: url('../../../static/index_not.png') no-repeat;
	background-size: 30rpx 30rpx;
	background-position: left center;
}
</style>
