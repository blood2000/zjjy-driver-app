<template>
	<view v-if="appointInfo">
		<view class="topAppointmentView">
			<view class="companyView">
				<image :src="companyIcon" style="width: 50rpx; height: 50rpx;"></image>
				<text class="companyText">{{appointInfo.companyName}}</text>
				<img :src="deleteIcon" class="deleteImg"></img>
			</view>
			<view class="divilerView">
				<view class="circle"></view>
				<view class="diviler"></view>
				<view class="circle"></view>
			</view>
			<view class="infoView">
				<text class="infoLabel">场站信息:</text>
				<text class="infoValue">{{getAddressText()?getAddressText():"暂无数据"}}</text>
			</view>
			<view class="infoView">
				<text class="infoLabel">货品类型:</text>
				<text class="infoValue">{{appointInfo.goodsName?appointInfo.goodsName:"暂无数据"}}</text>
			</view>
			<view class="infoView">
				<text class="infoLabel">总车次:</text>
				<text class="infoValue">{{appointInfo.reserveNumber}}</text>
			</view>
			<view class="infoView">
				<text class="infoLabel">预约时段:</text>
				<text class="infoValue">{{getTimeText()}}</text>
			</view>
			<view class="infoView">
				<text class="infoLabel">已承运数:</text>
				<view>
					<text class="infoValue">{{appointInfo.admissionNumber?appointInfo.admissionNumber:"0"}}</text>
					<text v-if="displayViewEnter" class="infoValueClick" @click="viewDetail">(查看出入区)</text>
				</view>
			</view>
			<view class="timePicker">
				<slot name="timePicker"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			//是否显示下方时间选择
			displayTime: {
				type: Boolean,
				default: false,
			},
			//是否显示查看出入区
			displayViewEnter: {
				type: Boolean,
				default: false,
			},
			appointInfo: {
				type: Object,
				default: null,
			}
		},
		data() {
			return {
				companyIcon: "/static/appointment/appointment_company.png",
				deleteIcon: "/static/appointment/ic_close.png",
				addressText: null,
				textLimit: 18,
			}
		},
		methods: {
			timeClick(item, index) {
				this.timeData.map(item => {
					item.select = false
				})
				this.timeData[index].select = true
			},
			getAddressText() {
				var totalName = "";
				if (this.appointInfo && this.appointInfo.buildingInfoVos) {
					for (var i = 0; i < this.appointInfo.buildingInfoVos.length; i++) {
						var sub = this.appointInfo.buildingInfoVos[i]
						totalName += sub.buildingName;
						if (i < this.appointInfo.buildingInfoVos.length - 1) {
							totalName += ","
						}
					}
				}
				//限制20个字符
				if (totalName.length > this.textLimit) {
					totalName = totalName.substring(0, this.textLimit) + "..."
				}
				return totalName;
			},
			viewDetail() {
				uni.navigateTo({
					url: "../../pages/appointment/appointmentVoucherDetail?appointInfo=" + this.appointInfo.code,
				});
			},
			getTimeText() {
				let startTime = this.appointInfo.effectiveDate ? this.appointInfo.effectiveDate : "暂无数据"
				let endTime = this.appointInfo.expirationDate ? this.appointInfo.expirationDate : "暂无数据"
				return startTime + " ~ " + endTime
			},
		}
	}
</script>

<style scoped>
	.topAppointmentView {
		background-color: #FFF;
		border-radius: 20rpx;
		padding-top: 29rpx;
		padding-bottom: 29rpx;
	}

	.companyView {
		display: flex;
		margin-left: 32rpx;
		margin-right: 32rpx;
		align-items: center;
	}

	.companyText {
		font-weight: bold;
		margin-left: 16rpx;
		font-size: 32rpx;
	}

	.deleteImg {
		height: 22rpx;
		width: 22rpx;
		position: absolute;
		right: 64rpx;
	}

	.circle {
		background-color: #F3F3F3;
		width: 20rpx;
		height: 20rpx;
		margin-left: -10rpx;
		margin-right: -10rpx;
		border-radius: 50rpx;
	}

	.divilerView {
		margin-top: 14rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.diviler {
		height: 1rpx;
		width: 100%;
		margin-left: 32rpx;
		margin-right: 32rpx;
		border-top: 1rpx solid #F0F0F0;
	}

	.infoView {
		width: 90%;
		display: flex;
		padding-left: 32rpx;
		padding-right: 32rpx;
		margin-top: 26rpx;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.infoLabel {
		font-size: 28rpx;
		color: #999999;
	}

	.infoValue {
		font-size: 28rpx;
		font-weight: bold;
		color: #333333;
		white-space: nowrap;
		word-wrap: break-word;
	}

	.infoValueClick {
		font-size: 28rpx;
		font-weight: bold;
		color: #2366F2;
	}

	.appointmentTimeView {
		font-size: 28rpx;
		color: #999999;
		margin-top: 13rpx;
		margin-left: 32rpx;
	}

	.radioGroup {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin-left: 17rpx;
		margin-right: 17rpx;
		justify-content: flex-start;
	}

	.timeSelectDisabled {
		width: 135rpx;
		height: 64rpx;
		margin-left: 15rpx;
		margin-right: 15rpx;
		margin-top: 30rpx;
		font-size: 28rpx;
		color: #999999;
	}

	.timeSelectNormal {
		width: 135rpx;
		height: 64rpx;
		margin-left: 15rpx;
		margin-top: 30rpx;
		margin-right: 15rpx;
		font-size: 28rpx;
		background-color: #FFF;
		border: 1rpx dashed #DDDDDD;
		color: #333333;
	}

	.timeSelectSelect {
		width: 135rpx;
		height: 64rpx;
		margin-left: 15rpx;
		margin-right: 15rpx;
		margin-top: 30rpx;
		font-size: 28rpx;
		background-color: #2366F2;
		color: #FFF;
	}
</style>
