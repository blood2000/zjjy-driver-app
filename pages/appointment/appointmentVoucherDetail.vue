<template>
	<view class="content-page">

		<appointmentView :displayTime="false" :displayViewEnter="false" :appointInfo="appointInfo"
			:subscribeRuleVoucherCode="subscribeRuleVoucherCode" class="content" style="height: 500rpx">
		</appointmentView>
		<view style="height: 480rpx"></view>
		<view v-if="record && record.length > 0">
			<text class="recordLabel">承运记录列表</text>
			<view class="record">
				<view v-for="(item, index) in record" v-bind:key="item.title" class="recordItem">
					<view style="display: flex; flex-direction: column; width: 25%;">
						<view :class="index === 0?'recordTopEmptyLine':'recordTopLine'"></view>
						<view style="display: flex; align-items: center;">
							<image class="point" :src="item.reservationStatus <= 1?pointBlue:pointRed" />
							<text
								:class="item.reservationStatus <= 1?'stateBlue':'stateRed'">{{getAppointmentState(item)}}</text>
						</view>
						<view class="recordLine" />
					</view>
					<view :class="item.reservationStatus <= 1 ? 'blueImage':'redImage'">
						<text class="title">{{item.licenseNumber?item.licenseNumber:"暂无车辆"}}</text>
						<text class="desc">{{getAppointmentStateTimeText(item)}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import appointmentView from "@/components/appointment/appointmentView.vue";

	import urlConfig from "../../config/urlConfig.js";
	import {
		uniRequest
	} from "../../config/request.js";

	export default {
		components: {
			appointmentView
		},
		onLoad(option) {
			if (option.appointInfo) {
				this.subscribeRuleVoucherCode = option.appointInfo
				this.getAppointmentDetail(option.appointInfo)
				this.getVoucherDetail(option.appointInfo)
			}
		},
		data() {
			return {
				redImage: "url('/static/appointment/ic_red_bg.png')",
				blueImage: "url('/static/appointment/ic_blue_bg.png')",
				companyIcon: "/static/appointment/appointment_company.png",
				deleteIcon: "/static/appointment/ic_close.png",
				pointRed: "/static/appointment/ic_red_point.png",
				pointBlue: "/static/appointment/ic_blue_point.png",
				record: null,
				subscribeRuleVoucherCode: null,
				appointInfo: null,
			}
		},
		methods: {
			getVoucherDetail(code) {
				const config = {
					url: "voucherInfo",
					method: "GET",
					querys: {
						code: code,
					},
				};
				uniRequest(config).then((res) => {
					if (res.data.code === 200) {
						this.record = res.data.data
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
						this.appointInfo = res.data.data
					}
				});
			},

			getAppointmentState(item) {
				let stateStr = null //预约状态 0待入场；1已入场；2已出场
				if (item.reservationStatus === 0) {
					stateStr = "待入场"
				} else if (item.reservationStatus === 1) {
					stateStr = "已入场"
				} else if (item.reservationStatus === 2) {
					stateStr = "已出场"
				}
				return stateStr
			},

			getAppointmentStateTimeText(item) {
				let stateStr = null //预约状态 0待入场；1已入场；2已出场
				if (item.reservationStatus === 0) {
					stateStr = item.createTime
				} else if (item.reservationStatus === 1) {
					stateStr = item.admissionTime
				} else if (item.reservationStatus === 2) {
					stateStr = item.appearanceTime
				}
				return stateStr
			},
		}
	}
</script>

<style>
	.content-page {
		background: #F3F3F3;
		display: flex;
		flex-direction: column;
		margin: 32rpx;
	}

	.content {
		position: fixed;
		padding-top: 32rpx;
		background-color: #F3F3F3;
		top: 0rpx;
		left: 32rpx;
		right: 32rpx;
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

	.redImage {
		width: 75%;
		padding-left: 26rpx;
		display: flex;
		flex-direction: column;
		padding-top: 26rpx;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		-moz-background-size: 100% 100%;
		background-image: url(/static/appointment/ic_red_bg.png);
	}

	.blueImage {
		width: 75%;
		padding-left: 26rpx;
		display: flex;
		flex-direction: column;
		padding-top: 26rpx;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		-moz-background-size: 100% 100%;
		background-image: url(/static/appointment/ic_blue_bg.png);
	}

	.recordTopEmptyLine {
		height: 30%;
		width: 2rpx;
		border-left: 1rpx dashed #FFFFFF;
		margin-left: 15rpx;
	}

	.recordTopLine {
		height: 30%;
		width: 4rpx;
		border-left: 2rpx dashed #DDDDDD;
		margin-left: 15rpx;
	}

	.recordLine {
		height: 100%;
		width: 4rpx;
		border-left: 2rpx dashed #DDDDDD;
		margin-left: 15rpx;
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

	.appointBtn {
		background-color: #2366F2;
		color: #FFFFFF;
		font-size: 32rpx;
		margin-top: 32rpx;
		font-weight: bold;
	}
</style>
