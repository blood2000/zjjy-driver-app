<!-- 上拉列表组件 -->
<template>
	<div>
		<div class="modal" v-if="showModal" @click="cancelModal"></div>
		<div class="type-modal-box" v-if="showModal">
			<view class="titleView">
				<image src="../../static/appointment/qrTitle_left.png" mode="aspectFill"
					style="height:2upx;width:90upx;">
				</image>
				<text class="titleView_stationName">{{appointInfo.station}}</text>
				<image src="../../static/appointment/qrTitle_right.png" mode="aspectFill"
					style="height:2upx;width:90upx;">
				</image>
			</view>
			<view class="licenseNumberView">
				<view class="licenseNumberValue">{{appointInfo.station}}</view>
				<view class="heapNumberValue">{{appointInfo.station}}</view>
			</view>
			<view class="qr" :class="cbData && cbData.transRelType == 'chy' ? 'chy' : ''" @tap.stop>
				<image :src="qrcode.src" mode="aspectFill" style="height:400upx;width:400upx"></image>
				<tki-qrcode :show="false" cid="qrcode1" ref="qrcode" :val="qrcode.val" :size="qrcode.size"
					:unit="qrcode.unit" :background="qrcode.background" :foreground="qrcode.foreground"
					:pdground="qrcode.pdground" :icon="qrcode.icon" :iconSize="qrcode.iconsize" :lv="qrcode.lv"
					:onval="qrcode.onval" :loadMake="qrcode.loadMake" :usingComponents="true" @result="result" />
			</view>
			<view class="contents">
				<view class="contents-top ly-flex ly-flex-pack-justify ly-flex-align-start">
					<view class="name g-double-row">{{ qrcodeInfo.companyName }}</view>
				</view>
				<view class="contents-bottom ly-flex ly-flex-pack-justify ly-flex-align-center">
					<view class="g-single-row text">{{ qrcodeInfo.dateStr }}</view>
				</view>
			</view>
		</div>
		<view class="closeBtn">
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
				appointInfo: null,
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
		},
	};
</script>
<style lang='scss' scoped>
	.type-modal-box {
		position: fixed;
		left: calc((100vw - 580upx)/2.0);
		top: calc((100vh - 740upx)/2.0);
		width: 580upx;
		height: 741upx;
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
	}

	.licenseNumberValue {
		font-size: 28upx;
		font-weight: bold;
		color: #FFFFFF;
		position: relative;
		left: -120upx;
	}

	.heapNumberValue {
		font-size: 24upx;
		color: #FFFFFF;
		text-align: right;
		border-radius: 17upx;
		border: 2upx solid #FFFFFF;
		padding-left: 14upx;
		padding-right: 14upx;
		position: relative;
		right: -120upx;
	}

	.qr {
		border-radius: 12rpx;
		width: 480rpx;
		height: 470rpx;
		background-color: #FFFFFF;
		padding: 35upx 40upx;

		&.chy {
			width: 480upx;
			height: 520upx;
			// background: url('../../static/transportPlan/box-bg.png') no-repeat;
			background-size: 100% 100%;
			padding: 94upx 40upx 26upx 40upx;
		}
	}

	.contents {
		width: 480upx;
		background: rgba(255, 255, 255, 0);
		border-radius: 12upx;
		margin-top: 35upx;
		padding: 0 22upx;

		.contents-top {
			font-size: 26upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #FFFFFF;
			line-height: 38upx;
			margin: 22upx 0;

			.tag {
				width: 60upx;
				height: 27upx;
				line-height: 27upx;
				text-align: center;
				background: #FFFFFF;
				border-radius: 16upx 14upx 14upx 0upx;
				font-size: 20upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #3A65FF;
				margin-top: 5upx;
			}

			.name {
				width: calc(100% - 68upx);
			}
		}

		.contents-bottom {
			font-size: 28upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #FFFFFF;
			padding: 24upx 0 10upx;
			border-top: 2upx solid rgba(255, 255, 255, 0.15);

			.img {
				height: 16upx;
				width: 64upx;
				margin: 0 22upx;
			}

			.text {
				width: calc(100% - 68upx);
			}
		}
	}

	.message {
		color: #FFFFFF;
		line-height: 50rpx;
		text-align: center;
		margin: 32upx 0 0;
		font-size: 28upx;
	}

	.btn {
		width: 500upx;

		button {
			width: 230upx;
			height: 80upx;
			line-height: 80upx;
			font-size: 28upx;
			font-weight: bold;
			padding: 0;

			&:first-child {
				color: #FFFFFF;
				background-color: transparent;
				border: 2upx solid #FFFFFF;
				line-height: 76upx;

				&:active {
					background-color: #6c88e5;
				}
			}

			&:last-child {
				color: #3c65fd;
			}
		}
	}
</style>
