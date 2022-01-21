<!-- 上拉列表组件 -->
<template>
	<div>
		<div class="modal" v-if="showModal" @click="cancelModal"></div>
		<div class="type-modal-box" v-if="showModal">
			<view class="titleView">
				<image src="../../static/appointment/qrTitle_left.png" mode="aspectFill"
					style="height:2upx;width:90upx;">
				</image>
				<text class="titleView_stationName">{{appointInfo.jyzName}}</text>
				<image src="../../static/appointment/qrTitle_right.png" mode="aspectFill"
					style="height:2upx;width:90upx;">
				</image>
			</view>
			<view class="licenseNumberView">
				<view class="licenseNumberValue">{{appointInfo.licenseNumber || "暂无车辆"}}</view>
				<view class="heapNumberValue">{{getStationName(appointInfo)}}</view>
			</view>
			<view class="qr">
				<image class="qr_code" :src="qrcode.src" mode="aspectFill"></image>
				<!-- 				<view class="qr_cion_bg"></view>
				<image class="qr_icon" :src="qrcode.icon" mode="aspectFill"></image> -->
				<tki-qrcode class="qr_code" :show="true" cid="qrcode1" ref="qrcode" :val="qrcode.val" :size="qrcode.size"
					:unit="qrcode.unit" :background="qrcode.background" :foreground="qrcode.foreground"
					:pdground="qrcode.pdground" :icon="qrcode.icon" :iconSize="qrcode.iconsize" :lv="qrcode.lv"
					:onval="qrcode.onval" :loadMake="qrcode.loadMake" :usingComponents="true" @result="result" />
			</view>
			<view class="contents">
				<view class="contents-top">
					<view class="">{{ appointInfo.companyName }}</view>
				</view>
				<view class="contents-bottom">
					<view class="">{{appointInfo.effectiveDate}} ~ {{appointInfo.expirationDate}}</view>
				</view>
			</view>
		</div>
		<view class="closeBtn" v-if="showModal">
			<image class="closeBtn" src="../../static/appointment/qr_close.png" @click="cancelModal">
			</image>
		</view>
	</div>
</template>

<script>
	import TkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue'
	export default {
		data() {
			return {
				textLimit: 10,
				//appointInfo: null,
				qrcode: {
					val: 'www.sina.com', // 要生成的二维码值
					size: 400, // 二维码大小
					unit: 'upx', // 单位
					background: '#FFFFFF', // 背景色
					foreground: '#000000', // 前景色
					pdground: '#000000', // 角标色
					icon: '../../static/jylogo.png', // 二维码中心图标
					iconsize: 53, // 二维码图标大小
					lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
					onval: true, // val值变化时自动重新生成二维码
					loadMake: true, // 组件加载完成后自动生成二维码
					src: ''
					//src: 'https://img2.baidu.com/it/u=2656539769,2055516863&fm=253&fmt=auto&app=138&f=JPG?w=408&h=409' // 二维码生成后的图片地址或base64
				},
			};
		},

		props: {
			showModal: {
				type: Boolean,
				required: true,
			},
			appointInfo: {
				type: Object,
				default: null,
			}
		},

		components: {
			TkiQrcode,
		},

		computed: {},

		mounted() {
			console.log("picker show");
		},

		methods: {
			cancelModal() {
				this.$emit("cancelModal");
			},
			getStationName(appointInfo) {
				if (appointInfo == null) {
					return "";
				}
				var buildingInfoVos = appointInfo.buildingInfoVos
				var totalName = "";
				for (var i = 0; i < buildingInfoVos.length; i++) {
					var sub = buildingInfoVos[i]
					totalName += sub.buildingName;
					if (i < buildingInfoVos.length - 1) {
						totalName += ",";
					}
				}
				//限制20个字符
				if (totalName.length > this.textLimit) {
					totalName = totalName.substring(0, this.textLimit) + "..."
				}
				return totalName;
			},
		},
	};
</script>
<style lang='scss' scoped>
	.type-modal-box {
		position: fixed;
		left: calc((100vw - 580upx)/2.0);
		top: calc((100vh - 740upx)/2.0 - 40upx);
		width: 580upx;
		height: 781upx;
		background: #3A65FF;
		border-radius: 20upx;
		z-index: 102;
		overflow: hidden;
		transition: all 0.2s linear;

		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: flex-start;
	}

	.closeBtn {
		position: fixed;
		width: 72upx;
		height: 72upx;
		z-index: 102;
		left: calc((100vw - 72upx)/2.0);
		top: calc((100vh - 740upx)/2.0 + 740upx + 48upx);
	}

	.titleView {
		margin-top: 36upx;
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: center;
	}

	.titleView_stationName {
		font-size: 36upx;
		font-weight: bold;
		color: #FFFFFF;
		padding-left: 15upx;
		padding-right: 15upx;
	}

	.licenseNumberView {
		margin-top: 27upx;
		margin-bottom: 19upx;
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
	}

	.licenseNumberValue {
		font-size: 28upx;
		font-weight: bold;
		color: #FFFFFF;
		margin-left: 55upx;
	}

	.heapNumberValue {
		font-size: 24upx;
		color: #FFFFFF;
		text-align: right;
		border-radius: 17upx;
		border: 2upx solid #FFFFFF;
		padding-left: 14upx;
		padding-right: 14upx;
		margin-right: 55upx;
	}

	.qr {
		border-radius: 12rpx;
		width: 470upx;
		height: 440upx;
		background-color: #FFFFFF;
		position: relative;
	}

	.qr_code {
		width: 400upx;
		height: 400upx;
		position: static;
		top: 17upx;
		left: 35upx;
		position: absolute;
	}

	.qr_cion_bg {
		background-color: #FFFFFF;
		width: 116upx;
		height: 116upx;
		position: absolute;
		top: 159upx;
		left: 176upx;
		border-radius: 16upx;
	}

	.qr_icon {
		width: 106upx;
		height: 106upx;
		position: absolute;
		top: 163upx;
		left: 182upx;
	}

	.contents {
		width: 480upx;
		background: rgba(255, 255, 255, 0);
		margin-top: 35upx;

		.contents-top {
			font-size: 26upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #FFFFFF;
			line-height: 38upx;
			margin: 8upx 0;
		}

		.contents-bottom {
			font-size: 28upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #FFFFFF;
			padding: 8upx 0 10upx;
			border-top: 2upx solid rgba(255, 255, 255, 0.15);
		}
	}
	
</style>
