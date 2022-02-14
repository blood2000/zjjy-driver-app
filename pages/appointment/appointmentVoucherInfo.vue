<template>
	<view class="content-page">
		<appointmentView v-if="appointmentInfo" :displayTime="true" :displayViewEnter="true"
			:appointInfo="appointmentInfo" :subscribeRuleVoucherCode="subscribeRuleVoucherCode">
			<view slot="timePicker">
				<view style="margin-top: 13rpx; display: flex; flex-direction: column;">
					<view class="divilerView">
						<view class="circle"></view>
						<view class="diviler"></view>
						<view class="circle"></view>
					</view>
					<text class="appointmentTimeView">场站现可预约时段</text>
					<radio-group class="radioGroup" v-if="timeList && timeList.length > 0">
						<view v-for="(item,index) in timeList" :key="index" @click="timeClick(item,index)">
							<button :class="(item.select && item.isSelect === 0)?'timeSelectSelect':'timeSelectNormal'"
								:disabled='item.isSelect === 1'>
								{{item.startTime+'-'+item.endTime}}
							</button>
						</view>
					</radio-group>
					<view v-else class="info_noContentView">
						<image class="noContent_icon" src="/static/appointment/appointment_noContent.png"
							mode="aspectFill">
						</image>
						<text class="noContent_label">暂无可预约时段</text>
					</view>
				</view>
			</view>
		</appointmentView>
		<button v-if="appointmentInfo" :disabled="timeList === null || timeList.length === 0" class="appointBtn"
			@click="submitAppointment">立即预约</button>

		<uni-popup ref="reservationPopup" type="center" style="background-color: #FFFFFF;">
			<reservation-status :content='reservationTip' @closePopup="closePopup()">
				<view slot="customView" class="btnView">
					<button class="btnConfirm" @click="reservationDelete()">作废</button>
					<view class="verticalLine" />
					<button class="btnCancel" @click="reservationComplete()">完成</button>
				</view>
			</reservation-status>
		</uni-popup>
	</view>
</template>

<script>
	import appointmentView from "@/components/appointment/appointmentView.vue";
	import reservationStatus from "@/components/appointment/reservationStatus.vue";
	import {
		uniBadge
	} from '@dcloudio/uni-ui'
	import {
		mapState
	} from "vuex";

	import urlConfig from "../../config/urlConfig.js";
	import {
		uniRequest
	} from "../../config/request.js";

	export default {
		components: {
			appointmentView,
			reservationStatus,
			uniBadge
		},

		computed: {
			...mapState({
				vehicleMsg: (state) => state.user.vehicleMsg,
			}),
		},

		onLoad(option) {
			if (option.appointInfo) {
				this.subscribeRuleVoucherCode = option.appointInfo
				uni.showLoading({
					mask: true
				});
				this.getAppointmentDetail(option.appointInfo)
				this.getVoucherDetail(option.appointInfo)
				uni.hideLoading()
			}
		},
		data() {
			return {
				subscribeRuleVoucherCode: null,
				appointmentInfo: null,
				companyIcon: "/static/appointment/appointment_company.png",
				deleteIcon: "/static/appointment/ic_close.png",
				pointRed: "/static/appointment/ic_red_point.png",
				pointBlue: "/static/appointment/ic_blue_point.png",
				redImage: "url('/static/appointment/ic_red_bg.png')",
				blueImage: "url('/static/appointment/ic_blue_bg.png')",
				timeList: null,
				reservationTip: '存在未完成的预约单，请先标记凭证状态',
				reservationID: null,
			}
		},
		methods: {
			getVoucherDetail(code) {
				const config = {
					url: "getMakeAnAppointment",
					method: "GET",
					querys: {
						code: code,
					},
				};
				uniRequest(config).then((res) => {
					if (res.data.code === 200) {
						this.timeList = res.data.data
						this.timeList.map(item => {
							this.select = false
						})
						let index = this.timeList.findIndex(item => item.isSelect === 0)
						this.timeList[index].select = true
					} else {
						uni.showToast({
							title: res.data.msg ? res.data.msg : "数据请求失败,请稍后再试",
							icon: 'none',
							duration: 2000
						})
					}
				});
			},
			getAppointmentDetail(code) {
				const config = {
					url: "appointmentDetail",
					method: "GET",
					querys: {
						code: code,
					},
				};
				uniRequest(config).then((res) => {
					if (res.data.code === 200) {
						this.appointmentInfo = res.data.data
					}
				});
			},
			timeClick(item, index) {
				let temp = JSON.parse(JSON.stringify(this.timeList))
				temp.map(item => {
					item.select = false
				})
				temp[index].select = true
				this.timeList = temp
			},
			submitAppointment() {
				let vehicleCode = this.vehicleMsg.code
				if (!vehicleCode) {
					uni.showModal({
						title: "提示",
						content: "请绑定车辆后再进行预约",
						showCancel: false
					});
					return
				}
				if (this.getTime()) {
					uni.showModal({
						title: "提示",
						content: "确定要预约吗？",
						success: (res) => {
							if (res.confirm) {
								this.submitRequest(vehicleCode)
							}
						},
					});
				} else {
					uni.showToast({
						title: "预约时段不能为空",
						icon: "none",
						duration: 2000
					})
				}
			},
			submitRequest(vehicleCode) {
				let param = {
					ruleAdmissionTimeIntervalCode: "",
					subscribeRuleVoucherCode: "",
					vehicleCode: vehicleCode
				}
				param.subscribeRuleVoucherCode = this.appointmentInfo.code
				param.ruleAdmissionTimeIntervalCode = this.getTime()
				const config = {
					url: "insertAppointment",
					method: "POST",
					data: JSON.stringify(param),
				};
				uniRequest(config).then((res) => {
					if (res.data.code === 200) {
						//预约成功后返回上一级
						uni.navigateBack({
							delta: 1,
						});

						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							duration: 2000
						})
					} else if (res.data.code === 4000) {
						this.reservationID = res.data.data
						console.log("弹出popup", this.$refs);
						this.$refs.reservationPopup.open('center')
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							duration: 2000
						})
					}
				});
			},
			reservationDelete() {
				this.reservationStatus(this.reservationID, 1)
			},
			reservationComplete() {
				this.reservationStatus(this.reservationID, 0)
			},
			getTime() {
				let time = null
				this.timeList.map(item => {
					if (item.select) {
						time = item.ruleAdmissionTimeIntervalCode
					}
				})
				return time
			},
			//关闭popup
			closePopup() {
				console.log("关闭popup", this.$refs);
				this.$refs.reservationPopup.close()
			},
			//作废或完成
			reservationStatus(id, signStatus) {
				uni.showLoading({
					mask: true
				});
				let param = {
					id: id,
					signStatus: signStatus
				}
				const config = {
					url: "reservationStatus",
					method: "PUT",
					data: JSON.stringify(param),
				};
				uniRequest(config).then((res) => {
					if (res.data.code === 200) {
						this.closePopup()
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							duration: 2000
						})
					}
					uni.hideLoading()
				});
			}
		}
	}
</script>

<style scoped>
	.content-page {
		background: #F3F3F3;
		margin-left: 32rpx;
		margin-right: 32rpx;
		padding-top: 32rpx;
	}

	.record {
		color: #333333;
		padding: 32rpx;
		display: flex;
		flex-direction: column;
		margin-top: 23rpx;
		background-color: #FFF;
		border-radius: 20rpx;
	}

	.recordItem {
		display: flex;
		height: 160rpx;
		flex-direction: row;
	}

	.recordLabel {
		font-size: 36rpx;
		font-weight: bold;
	}

	.point {
		width: 32rpx;
		height: 32rpx;
	}

	.recordTopEmptyLine {
		height: 30%;
		width: 1rpx;
		border-left: 1rpx dashed #FFFFFF;
		margin-left: 16rpx;
	}

	.recordTopLine {
		height: 30%;
		width: 1rpx;
		border-left: 2rpx dashed #DDDDDD;
		margin-left: 16rpx;
	}

	.recordLine {
		height: 100%;
		width: 1rpx;
		border-left: 2rpx dashed #DDDDDD;
		margin-left: 16rpx;
	}

	.stateRed {
		color: #E55E50;
		font-weight: bold;
		margin-left: 19rpx;
		font-size: 28rpx;
	}

	.stateBlue {
		color: #2366F2;
		font-weight: bold;
		margin-left: 19rpx;
		font-size: 28rpx;
	}

	.infoView {
		width: 75%;
		padding-left: 26rpx;
		display: flex;
		flex-direction: column;
		padding-top: 26rpx;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		-moz-background-size: 100% 100%;
	}

	.title {
		font-size: 28rpx;
		color: #333333;
		margin-top: 6rpx;
		font-weight: bold;
	}

	.desc {
		margin-top: 16rpx;
		font-size: 26rpx;
		color: #999999
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
		margin-top: 16rpx;
		margin-left: 17rpx;
		margin-right: 17rpx;
		justify-content: flex-start;
	}

	.timeSelectDisabled {
		padding-left: 16rpx;
		padding-right: 16rpx;
		margin-left: 15rpx;
		margin-top: 30rpx;
		margin-right: 15rpx;
		border-radius: 8rpx;
		font-size: 28rpx;
		color: #999999;
	}

	.timeSelectNormal {
		padding-left: 16rpx;
		padding-right: 16rpx;
		margin-left: 15rpx;
		margin-right: 15rpx;
		margin-top: 30rpx;
		border-radius: 8rpx;
		font-size: 28rpx;
		background-color: #FFF;
		border: 1rpx dashed #DDDDDD;
		color: #333333;
	}

	.timeSelectSelect {
		margin-left: 15rpx;
		border-radius: 8rpx;
		margin-right: 15rpx;
		margin-top: 30rpx;
		padding-left: 16rpx;
		padding-right: 16rpx;
		border: 1rpx solid #2366F2;
		font-size: 28rpx;
		background-color: #2366F2;
		color: #FFF;
	}

	.appointBtn {
		background-color: #2366F2;
		color: #FFFFFF;
		position: absolute;
		width: 90%;
		font-size: 32rpx;
		margin-top: 32rpx;
		position: absolute;
		bottom: 32rpx;
		right: 32rpx;
		font-weight: bold;
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

	.info_noContentView {
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: space-between;
		padding-top: 60upx;
		background-color: #FFFFFF;
		border-radius: 16upx;
	}

	.noContent_icon {
		width: 362upx;
		height: 203upx;
	}

	.noContent_label {
		font-size: 32upx;
		color: #999999;
		padding-top: 28upx;
		padding-bottom: 34upx;
	}

	.btnView {
		display: flex;
		background-color: #FFF;
		border-radius: 12rpx;
		align-items: center;
		width: 600rpx;
	}

	.btnCancel {
		width: 50%;
		background: #FFFFFF;
		font-size: 36rpx;
		color: #0A83FF;
	}

	.btnConfirm {
		width: 50%;
		background: #FFFFFF;
		font-size: 36rpx;
		color: #ff0000;
	}

	.verticalLine {
		border-right: 1rpx solid #F3F3F3;
		width: 1rpx;
		height: 117rpx;
	}

	button::after {
		border: none
	}
</style>
