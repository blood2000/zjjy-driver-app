<template>
	<view class="home-page">
		<div class="tab-header">
			<image src="../../static/appointment/appointment_banner.png" mode=""></image>
			<div class="tab-back" @click="back">
				<uni-icons type="back" size="24" color="#333"></uni-icons>
			</div>
			<view class="header-title">入场预约系统</view>
			<view class="header-container">
				<view class="headerView">
					<view class="top-avatar">
						<open-data type="userAvatarUrl" :default-avatar="avatar"></open-data>
					</view>
					<view class="margin-mleft">
						<view class="flex align-center">
							<view class="userNameLabel">{{ vehicleMsg.name }}</view>
						</view>
						<view class="licenseNumberBgView">
							<text class="licenseNumberLabel">{{ vehicleMsg.vehicleCode || "暂无车辆" }}</text>
						</view>
					</view>
				</view>
				<view class="scanView" @click="onClickScanAction()">
					<view class="scanView_title">
						<view class="scanView_label">扫码预约</view>
						<view class="scanView_arrow_right"></view>
					</view>
					<image class="scanView_icon" src="/static/appointment/appointment_scan.png" mode="aspectFit"
						@click="onClickQR()"></image>
				</view>
			</view>
		</div>
		<view class="info-container">
			<view v-if="appointmentInfo.station">
				<view class="info-container-top">
					<view class="info-container-top-left">
						<view class="info_station">
							<view class="info_station_content_name">预约场站</view>
							<view class="info_station_content_value">{{appointmentInfo.station}}</view>
						</view>
						<view class="info_company">
							<view class="info_station_content_name">货主名称</view>
							<view class="info_station_content_value">{{appointmentInfo.companyName}}</view>
						</view>
						<view class="info_date">
							<view class="info_station_content_name">预约时间</view>
							<view class="info_station_content_value">{{appointmentInfo.date}} {{appointmentInfo.time}}
							</view>
						</view>
					</view>
					
					<view class="info-container-top-right">
						<hr class="line">
					</view>
				</view>
				<view class="info_bottom">
					<view class="info_station_bottom_carTime">还有32辆车未入场，预计60分钟</view>
					<image class="info_station_bottom_qr" src="/static/appointment/appointment_qr.png" mode="aspectFit">
					</image>
				</view>
			</view>
			<view v-else class="info_noContentView">
				<image class="noContent_icon" src="/static/appointment/appointment_noContent.png" mode="aspectFill">
				</image>
				<text class="noContent_label">暂无预约信息哦</text>
			</view>
		</view>
		<view class="list-container">
			<view class="switchHead">
				<view v-for="(item,index) in tabTitleData" class="boxList" :class="{activeCss:activeIndex==index}"
					:key="index">
					<view @click="clickTab(index)">{{item.name}}</view>
					<view v-if="activeIndex==index" class="switchLine"></view>
				</view>
			</view>
			<view class="canAppointView" v-for="(sub, index) in activeIndex==0?canAppointList:invalidAppointList"
				v-bind:key="index">
				<view class="canAppointViewLeft">
					<text class="canAppointViewLeftLabel">预约场站：{{getStationName(sub.buildingInfoVos)}}</text>
					<text class="canAppointViewLeftLabel">货主名称：{{sub.companyName}}</text>
					<view class="canAppointViewLeft_canAppointCountAndHaveSendCount">
						<text class="canAppointViewLeftLabel">可预约数：{{sub.reserveNumber}}</text>
						<text class="canAppointViewLeft_haveSendCount">已承运数：{{sub.useNumber}}</text>
					</view>
					<text class="canAppointViewLeftLabel">预约时段：{{sub.effectiveDate}} - {{sub.expirationDate}}</text>
				</view>
				<view :class="activeIndex==0?'canAppointViewRight':'canAppointViewRight2'">
					<text v-if="activeIndex==0" class="canAppointViewRightLabel"
						@click="onClickGotoAppointment()">预约</text>
					<text v-else class="canAppointViewRightLabel">详情</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	import urlConfig from "../../config/urlConfig.js";
	import {
		uniRequest
	} from "../../config/request.js";
	export default {
		name: 'appointment',
		components: {},
		computed: {
			...mapState({
				vehicleMsg: (state) => state.user.vehicleMsg,
			})
		},
		onLoad() {
			this.avatar = uni.getStorageSync("avatar") || "../../static/appointment/appointment_avatar.png";
		},
		data() {
			return {
				avatar: "",
				userInfo: {
					avatar: '',
					userName: '张三',
					licenseNumber: '闽A*888SW'
				},
				appointmentInfo: {
					station: '五福洗煤厂/32号堆',
					companyName: '山西华汇通商贸无限公司',
					date: '2021/01/05',
					time: '08:00',

				},
				activeIndex: '0',
				tabTitleData: [{
						name: '可预约'
					},
					{
						name: '已失效'
					}
				],
				canAppointListQueryParams: { // 请求参数
					pageNum: 1,
					pageSize: 10,
				},
				invalidAppointListQueryParams: { // 请求参数
					pageNum: 1,
					pageSize: 10,
				},
				isEnd_canAppointList: false,
				isEnd_invalidAppoint: false,
				canAppointList: [],
				invalidAppointList: [],
			}
		},
		onLoad(option) {
			this.getDriverRelationVoucher();
			this.getDriverRelationVoucherInvalid();
		},
		onPullDownRefresh() {
			if (this.activeIndex == 0) {
				this.isEnd_canAppointList = false;
				this.getDriverRelationVoucher();
			} else {
				this.isEnd_invalidAppoint = false;
				this.getDriverRelationVoucherInvalid();
			}
		},
		// 触底加载
		onReachBottom() {
			if (this.activeIndex == 0) {
				if (!this.isEnd_canAppointList) {
					this.canAppointListQueryParams.pageNum++;
					this.getDriverRelationVoucher();
				}
			} else {
				if (!this.isEnd_invalidAppoint) {
					this.invalidAppointListQueryParams.pageNum++;
					this.getDriverRelationVoucherInvalid();
				}
			}
		},
		methods: {
			getStationName(buildingInfoVos) {
				var totalName = "";
				for (var i = 0; i < buildingInfoVos.length; i++) {
					var sub = buildingInfoVos[i]
					totalName += sub.buildingName;
					if (i < buildingInfoVos.length - 1) {
						totalName += ",";
					}
				}
				return totalName;
			},
			getDriverRelationVoucher() {
				const config = {
					url: "getDriverRelationVoucher",
					method: "GET",
					querys: {
						status: 0,
						pageNum: this.canAppointListQueryParams.pageNum,
						pageSize: this.canAppointListQueryParams.pageSize
					},
				};
				uniRequest(config).then((res) => {
					console.log("获取司机关联预约凭证列表", res);
					if (res.data.code === 200 && res.data.data) {
						this.canAppointList = res.data.data.list;
						if (res.data.data.list.length < this.canAppointListQueryParams.pageSize) {
							this.isEnd_canAppointList = true;
						}
					}
				});
			},
			getDriverRelationVoucherInvalid() {
				const config = {
					url: "getDriverRelationVoucher",
					method: "GET",
					querys: {
						status: 1,
						pageNum: this.invalidAppointListQueryParams.pageNum,
						pageSize: this.invalidAppointListQueryParams.pageSize
					},
				};
				uniRequest(config).then((res) => {
					console.log("获取司机关联预约凭证列表", res);
					if (res.data.code === 200 && res.data.data) {
						this.invalidAppointList = res.data.data.list;
						if (res.data.data.list.length < this.invalidAppointListQueryParams.pageSize) {
							this.isEnd_invalidAppoint = true;
						}
					}
				});
			},
			back() {
				uni.navigateBack({
					delta: 1,
				});
			},
			onClickScanAction() {
				console.log("点击了扫码");
			},
			clickTab(index) {
				this.activeIndex = index;
			},
			onClickQR() {

			},
			onClickGotoAppointment() {
				uni.navigateTo({
					url: "./makeAppointment",
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home-page {
		width: 100vw;
		height: 100vh;
		padding: 0 0 30upx;
		font-family: 'PingFang Regular';
		overflow: scroll;
	}

	.header-title {
		box-sizing: border-box;
		position: absolute;
		bottom: 294rpx;
		width: 100%;
		height: 40rpx;
		line-height: 20rpx;
		text-align: left;
		font-size: 36rpx;
		font-weight: bold;
		color: #333333;
		z-index: 1;
		margin-left: 30upx;
	}

	.header-container {
		margin-left: 20upx;
		margin-right: 20upx;
		margin-top: 0upx;
		height: 206upx;
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: space-between;
		/* 		position: absolute;
		bottom: 8upx; */
	}

	.headerView {
		background-image: linear-gradient(#283565, #4B528F);
		height: 183upx;
		border-radius: 20upx 0upx 0upx 20upx;
		width: calc(100% - 256upx);
		display: flex;
		align-items: center;
		position: absolute;
		bottom: 48upx;
	}

	.top-avatar {
		margin-left: 22upx;
		width: 120upx;
		height: 120upx;
		margin-right: 0upx;
		border-radius: 50%;
		background: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;

		open-data,
		img {
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}

		.avatar-btn {
			position: absolute;
			width: 100%;
			height: 100%;
			padding: 0;
			background: transparent;
		}
	}

	.userNameLabel {
		font-size: 36upx;
		font-weight: bold;
		color: #FFFFFF;
		padding-top: 7upx;
		padding-left: 29upx;
	}

	.licenseNumberBgView {
		background-image: linear-gradient(#FFF4DB, #FFDB8F);
		height: 47upx;
		border-radius: 22.5upx;
		width: 175upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 15upx;
		margin-left: 29upx;
	}

	.licenseNumberLabel {
		font-size: 24upx;
		font-weight: bold;
		color: #734100;
		padding-top: 7upx;
	}

	.scanView {
		background: #FFFFFF;
		width: 256upx;
		height: 206upx;
		border-radius: 20upx;
		display: flex;
		flex-direction: column;
		position: absolute;
		right: 22upx;
		bottom: 40upx;
	}

	.scanView_title {
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: flex-start;
	}

	.scanView_label {
		font-size: 28upx;
		font-weight: bold;
		color: #333333;
		padding-left: 16upx;
		padding-top: 10upx;
	}

	.scanView_arrow_right {
		width: 0;
		height: 0;
		border-left: 8.3upx solid transparent;
		border-right: 8.3upx solid transparent;
		border-bottom: 8.3upx solid #000000;
		font-size: 0;
		line-height: 0;
		transform: rotate(90deg);
		margin-top: 10upx;
	}

	.scanView_icon {
		height: 141upx;
		width: 100%;
		margin-top: 0upx;
		padding-left: 40upx;
	}

	.info-container {
		background: #E8EDF8;
		margin-left: 24upx;
		margin-right: 24upx;
		margin-top: 0upx;
		margin-bottom: 40upx;
		border-radius: 16upx;
	}

	.info-container-top {
		background-image: url('/static/appointment/appointment_infoTop.png');
		background-size: 100% 100%;
		margin-left: 24upx;
		margin-right: 24upx;
		margin-top: 0upx;
		margin-bottom: 0upx;
		display: flex;
		align-items: flex-start;
		flex-direction: row;
		justify-content: space-between;
		position: relative;
	}

	.info-container-top-left {
		margin-left: 24upx;
		margin-right: 24upx;
		margin-top: 39upx;
		margin-bottom: 0upx;
		display: flex;
		align-items: flex-start;
		flex-direction: column;
		justify-content: space-between;
		width: 70%;
	}

	.line {
		border: none;
		margin-left: 0upx;
		margin-top: 24upx;
		margin-bottom: 24upx;
		width: 1upx;
		height: 80%;
		border-left: 1rpx dashed #BBC8E3; 
		opacity:0.4;
	}

	.info-container-top-right {
		width: 160upx;
		height: 100%;
		background-color: #FFFFFF;
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
	}

	.info_station {
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: flex-start;
		margin-left: 28upx;
		margin-top: 0upx;
	}

	.info_company {
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: flex-start;
		margin-left: 28upx;
		margin-top: 29upx;
	}

	.info_date {
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: flex-start;
		margin-left: 28upx;
		margin-top: 32upx;
		margin-bottom: 25upx;
	}

	.info_icon_station {
		width: 58upx;
		height: 58upx;
		flex-shrink: 0;
	}

	.info_station_content_value {
		font-size: 26upx;
		font-weight: bold;
		color: #333333;
		margin-left: 24upx;
	}

	.info_station_content_name {
		font-size: 22upx;
		color: #999999;
		flex-shrink: 0;
	}

	.info_station_content_navigation {
		font-size: 24upx;
		color: #2366F2;
		border: solid #2366F2 1upx;
		padding-left: 9upx;
		padding-right: 9upx;
		border-radius: 4upx;
		margin-left: 14upx;
		flex-shrink: 0;
	}

	.info_station_content {
		display: flex;
		align-items: flex-start;
		flex-direction: row;
		justify-content: space-between;
		margin-left: 12upx;
	}

	.info_station_content_valueView {
		display: flex;
		align-items: flex-start;
		flex-direction: row;
		justify-content: space-between;
	}

	.info_icon_company {
		width: 58upx;
		height: 58upx;
		flex-shrink: 0;
	}

	.info_icon_time {
		width: 58upx;
		height: 58upx;
		flex-shrink: 0;
	}

	.info_noContentView {
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: space-between;
		padding-top: 60upx;
	}

	.info_bottom {
		width: calc(100vw - 48upx);
		margin-top: 0upx;
		border-radius: 0upx 0upx 16upx 16upx;
		display: flex;
		align-items: flex-start;
		flex-direction: row;
		justify-content: space-between;
		left: 0;
		right: 0;
		position: static;
		background-image: url('/static/appointment/appointment_infoBottom.png');
		background-size: 100% 100%;
	}

	.info_station_bottom_carTime {
		padding-left: 20upx;
		padding-top: 17upx;
		padding-right: 70upx;
		padding-bottom: 27upx;
		color: #FFFFFF;
	}

	.info_station_bottom_qr {
		width: 54upx;
		height: 54upx;
		margin-top: 14upx;
		margin-right: 23upx;
		flex-shrink: 0;
	}

	.noContent_icon {
		width: 362upx;
		height: 203upx;
	}

	.noContent_label {
		font-size: 32upx;
		color: #121212;
		padding-top: 70upx;
		opacity: 0.5;
	}

	.switchHead {
		height: 35px;
		display: flex;
		justify-content: flex-start;
		align-items: baseline;
		color: #333333;
		margin-left: 50upx;
	}

	.boxList {
		height: 100%;
		margin-right: 68upx;
		font-size: 30upx;
	}

	.switchLine {
		width: 58upx;
		height: 6upx;
		margin-left: 14upx;
		border-top: solid #2366F2 6upx;
	}

	.activeCss {
		font-size: 32upx;
		font-weight: bold;
	}

	.canAppointView {
		background-color: #FFFFFF;
		border-radius: 15upx;
		margin-left: 20upx;
		margin-right: 20upx;
		margin-top: 15upx;
		display: flex;
		align-items: flex-start;
		position: relative;
		flex-direction: row;
		justify-content: space-between;
	}

	.canAppointViewLeft {
		background-color: #FFFFFF;
		width: 70%;
		display: flex;
		flex-direction: column;
		border-radius: 15upx 0upx 0upx 15upx;
		margin-left: 24upx;
		margin-top: 25upx;
		margin-bottom: 25upx;
	}

	.canAppointViewLeftLabel {
		font-size: 28upx;
		color: #333333;
		padding-left: 15upx;
		padding-top: 11upx;
		/* 		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		word-break: break-all; */
	}

	.canAppointViewLeft_haveSendCount {
		font-size: 28upx;
		color: #333333;
		padding-left: 15upx;
		padding-top: 11upx;
		margin-left: 77upx;
	}

	.canAppointViewLeft_canAppointCountAndHaveSendCount {
		display: flex;
		flex-direction: row;
	}

	.canAppointViewRight {
		background-color: #2366F2;
		width: 138upx;
		height: 100%;
		display: flex;
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		align-items: center;
		flex-direction: row;
		justify-content: space-between;
		border-radius: 0upx 15upx 15upx 0upx;
	}

	.canAppointViewRight2 {
		background-color: #24B2B4;
		height: 100%;
		width: 138upx;
		display: flex;
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		align-items: center;
		flex-direction: row;
		justify-content: space-between;
		border-radius: 0upx 15upx 15upx 0upx;
		float: right;
	}

	.canAppointViewRightLabel {
		font-size: 32upx;
		font-weight: bold;
		color: #FFFFFF;
		padding-left: 30upx;
	}
</style>
