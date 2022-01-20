<template>
	<view class="content-page">

		<appointmentView :displayTime="false" :displayViewEnter="false" :appointInfo="appointInfo">
		</appointmentView>
		<view style="margin-top: 32rpx;">
			<text class="recordLabel">承运记录列表</text>
			<view class="record">
				<view v-for="(item, index) in record" v-bind:key="item.title" class="recordItem">
					<view style="display: flex; flex-direction: column; width: 25%;">
						<view :class="index === 0?'recordTopEmptyLine':'recordTopLine'"></view>
						<view style="display: flex; align-items: center;">
							<image class="point" :src="item.state === 1?pointBlue:pointRed" />
							<text
								:class="item.state === 1?'stateBlue':'stateRed'">{{item.state === 1?"已完成":"未完成"}}</text>
						</view>
						<view class="recordLine" />
					</view>
					<view class="infoView" :style="{backgroundImage: item.state === 1?blueImage:redImage}">
						<text class="title">{{item.title}}</text>
						<text class="desc">{{item.desc}}</text>
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
				this.appointInfo = JSON.parse(option.appointInfo);
				this.getVoucherDetail(this.appointInfo.code)
			}
		},
		data() {
			return {
				appointInfo: null,
				companyIcon: "/static/appointment/appointment_company.png",
				deleteIcon: "/static/appointment/ic_close.png",
				pointRed: "/static/appointment/ic_red_point.png",
				pointBlue: "/static/appointment/ic_blue_point.png",
				redImage: "url('/static/appointment/ic_red_bg.png')",
				blueImage: "url('/static/appointment/ic_blue_bg.png')",
				record: [{
					title: "闽A12325",
					desc: "2021-12-13 12:08:04",
					state: 1,
				}, {
					title: "闽A12321",
					desc: "2021-12-13 12:08:04",
					state: 1,
				}, {
					title: "闽A123C5",
					desc: "2021-12-13 12:08:04",
					state: 2,
				}]
			}
		},
		methods: {
			getVoucherDetail() {
				const config = {
					url: "voucherInfo",
					method: "GET",
					querys: {
						code: "1",
					},
				};
				uniRequest(config).then((res) => {
					console.log("获取司机关联预约凭证列表", res);
				});
			},
		}
	}
</script>

<style>
	.content-page {
		background: #F3F3F3;
		margin: 32rpx;
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
		border-left: 1rpx dashed #DDDDDD;
		margin-left: 16rpx;
	}

	.recordLine {
		height: 100%;
		width: 1rpx;
		border-left: 1rpx dashed #DDDDDD;
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

	.appointBtn {
		background-color: #2366F2;
		color: #FFFFFF;
		font-size: 32rpx;
		margin-top: 32rpx;
		font-weight: bold;
	}
</style>
