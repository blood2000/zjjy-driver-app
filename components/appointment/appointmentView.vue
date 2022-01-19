<template>
	<view>
		<view class="topAppointmentView">
			<view class="companyView">
				<image :src="companyIcon" style="width: 50rpx; height: 50rpx;"></image>
				<text class="companyText">山西华汇通商贸有限公司</text>
				<img :src="deleteIcon" class="deleteImg"></img>
			</view>
			<view class="divilerView">
				<view class="circle"></view>
				<view class="diviler"></view>
				<view class="circle"></view>
			</view>
			<view class="infoView">
				<text class="infoLabel">场站信息：</text>
				<text class="infoValue">山西五福洗煤厂 / 32 号堆</text>
			</view>
			<view class="infoView">
				<text class="infoLabel">货品类型：</text>
				<text class="infoValue">原煤</text>
			</view>
			<view class="infoView">
				<text class="infoLabel">总车次：</text>
				<text class="infoValue">32</text>
			</view>
			<view class="infoView">
				<text class="infoLabel">预约时段：</text>
				<text class="infoValue">2021-12-26 ~ 2021-12-26</text>
			</view>
			<view class="infoView">
				<text class="infoLabel">场站信息：</text>
				<view>
					<text class="infoValue">10</text>
					<text v-if="displayViewEnter" class="infoValueClick">(查看出入区)</text>
				</view>
			</view>
			<view v-if="displayTime" style="margin-top: 13rpx; display: flex; flex-direction: column;">
				<view class="divilerView">
					<view class="circle"></view>
					<view class="diviler"></view>
					<view class="circle"></view>
				</view>
				<text class="appointmentTimeView">场站现可预约时段</text>
				<radio-group class="radioGroup">
					<view v-for="(item,index) in timeData">
						<button :class="item.select?'timeSelectSelect':'timeSelectNormal'" :disabled="item.disabled"
							@click="timeClick(item,index)">
							{{item.time}}
						</button>
					</view>
				</radio-group>
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
			}
		},
		data() {
			return {
				companyIcon: "/static/appointment/appointment_company.png",
				deleteIcon: "/static/appointment/ic_close.png",
				timeData: [{
					time: "9:00",
					disabled: true,
					select: false
				}, {
					time: "10:00",
					disabled: false,
					select: false
				}, {
					time: "11:00",
					disabled: false,
					select: true
				}, {
					time: "12:00",
					disabled: false,
					select: false
				}, {
					time: "13:00",
					disabled: false,
				}, {
					time: "14:00",
					disabled: false,
					select: false
				}]
			}
		},
		methods: {
			timeClick(item, index) {
				this.timeData.map(item => {
					item.select = false
				})
				this.timeData[index].select = true
			}
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

	button::after {
		border: none
	}
</style>
