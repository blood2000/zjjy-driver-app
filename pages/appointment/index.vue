<template>
	<view class="home-page">
		<div class="tab-header">
			<image src="../../static/appointment/appointment_banner.png" mode=""></image>
			<view class="musichead" @click="back">
				<view class="status_bar" :style="{'height':statusBarHeight+'px'}"></view>
				<!-- #ifdef MP-WEIXIN -->
				<view class="musicheadWEIXIN" :style="{
						'height':musicheadHeight+'px',
						'line-height': musicheadHeight+'px'
						}">
					<!-- 左边按钮 -->
					<view class="btn" :style="{
									'width':200+'px',
									'height':menuButtonInfo.height+'px',
									'line-height':menuButtonInfo.height+'px',
									'top':(menuButtonInfo.top)+'px'
									}">
						<uni-icons type="back" size="24" color="#333"></uni-icons>
						<view class="header-title">入场预约系统</view>
					</view>
				</view>
				<!--  #endif -->
			</view>
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
					<image class="scanView_icon" src="/static/appointment/appointment_scan.png" mode="aspectFit">
					</image>
				</view>
			</view>
		</div>
		<view class="info-container">
			<view v-if="appointmentInfo">
				<view class="info-container-top">
					<view class="info-container-top-left">
						<view class="info_station">
							<view class="info_station_content_name">预约场站</view>
							<view class="info_station_content_value">{{getStationName(appointmentInfo)}}
							</view>
						</view>
						<view class="info_company">
							<view class="info_station_content_name">货主名称</view>
							<view class="info_station_content_value">{{appointmentInfo.companyName}}</view>
						</view>
						<view class="info_date">
							<view class="info_station_content_name">预约时间</view>
							<view class="info_station_content_value">{{appointmentInfo.createTime}}
							</view>
						</view>
					</view>
					<view class="info-container-top-right">
						<hr class="line">
						<image class="info-container-top-right_close" src="/static/appointment/ic_close.png"
							@click="onClickClose()"></image>
						<image class="info-container-top-right_qr" src="/static/appointment/appointment_qr.png"
							@click="onClickQR()"></image>
					</view>
				</view>
				<view class="info_bottom">
					<view class="info_bottom_left">
						<image class="info_station_bottom_alert" src="/static/appointment/appointment_alert.png"
							mode="aspectFit">
						</image>
						<view class="info_station_bottom_carTime">还有{{appointmentInfo.notAdmittedNumber}}辆车未入场</view>
					</view>
					<view class="info_bottom_right">
						<!-- 						<hr class="info_bottom_right_line">
						<view class="info_bottom_right_view">
							<image class="info_station_bottom_navi" src="/static/appointment/appointment_navi.png"
								mode="aspectFit">
							</image>
							<view class="info_station_bottom_naviLabel">导航</view>
						</view> -->
					</view>
				</view>
			</view>
			<view v-else class="info_noContentView">
				<image class="noContent_icon" src="/static/appointment/appointment_noContent.png" mode="aspectFill">
				</image>
				<text class="noContent_label">暂无预约信息哦</text>
			</view>
		</view>
		<view class="switchHead">
			<button v-for="(item,index) in tabTitleData" class="boxList" :class="{activeCss:activeIndex==index}"
				:key="index" @click="clickTab(index)">
				<view class="boxList_item">{{item.name}}</view>
				<view v-if="activeIndex==index" class="switchLine"></view>
			</button>
		</view>
		<scroll-view class="scrollviewCss" :style="{'height':scrollHeight+'rpx'}" scroll-y="false"
			refresher-enabled="true" :refresher-triggered="triggered" :refresher-threshold="45"
			refresher-background="#F3F3F3" @refresherrefresh="onRefresh" @refresherrestore="onRestore"
			@refresherabort="onAbort" @scrolltolower="scrollBottem">
			<view class="canAppointView" v-for="(sub, index) in getListData()" v-bind:key="index">
				<view class="canAppointViewTop">
					<image class="canAppointViewTop_icon" src="../../static/appointment/appointment_station2.png">
					</image>
					<text class="canAppointViewTop_label">{{getStationName(sub)}}</text>
					<view v-if="activeIndex==0" class="canAppointViewTop_appointment"
						@click="onClickGotoAppointment(sub.code)">
						<view class="canAppointViewTop_appointment_label">预约</view>
					</view>
					<view v-else class="canAppointViewTop_appointment_detail" @click="onClickGotoDetail(sub.code)">
						<view class="canAppointViewTop_appointment_label_detail">详情</view>
					</view>

				</view>
				<image class="canAppointView_downArrow" src="../../static/appointment/appointment_downArrow.png">
				</image>
				<view class="canAppointView_company">
					<image class="canAppointView_company_icon" src="../../static/appointment/appointment_company2.png">
					</image>
					<view class="canAppointView_company_view">
						<view class="canAppointView_company_view_value">{{sub.companyName}}</view>
						<view class="canAppointView_company_view_name">货主名称</view>
					</view>
				</view>
				<view class="canAppointView_canAppointment">
					<view class="canAppointView_canAppointment_left">
						<image class="canAppointView_company_icon" src="../../static/appointment/appointment_ship2.png">
						</image>
						<view class="canAppointView_company_view">
							<view class="canAppointView_company_view_value">{{sub.reserveNumber}}</view>
							<view class="canAppointView_company_view_name">可预约数</view>
						</view>
					</view>
					<view class="canAppointView_canAppointment_right">
						<image class="canAppointView_company_icon" src="../../static/appointment/appointment_ship3.png">
						</image>
						<view class="canAppointView_company_view">
							<view class="canAppointView_company_view_value">{{sub.admissionNumber}}</view>
							<view class="canAppointView_company_view_name">已承运数</view>
						</view>
					</view>
				</view>
				<view class="canAppointView_date">
					<image class="canAppointView_company_icon" src="../../static/appointment/appointment_time2.png">
					</image>
					<view class="canAppointView_company_view">
						<view class="canAppointView_company_view_value">{{sub.effectiveDate}}-{{sub.expirationDate}}
						</view>
						<view class="canAppointView_company_view_name">预约时段</view>
					</view>
				</view>
			</view>
			<uLi-load-more status="loading"></uLi-load-more>	
			<view v-if="getListData().length == 0" class="info_noContentView_canAppointView">
				<image class="noContent_icon" src="/static/appointment/appointment_noContent.png" mode="aspectFill">
				</image>
				<text class="noContent_label">暂无数据</text>
			</view>
		</scroll-view>
		<div>
			<qrcode v-if="appointmentInfo" :showModal="showPickerModal" :appointInfo="appointmentInfo"
				@cancelModal="cancelPickerModal">
			</qrcode>
		</div>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	import urlConfig from "../../config/urlConfig.js";
	import qrcode from "@/pages/appointment/qrcode.vue";
	import {
		uniRequest
	} from "../../config/request.js";
	export default {
		name: 'appointment',
		components: {
			qrcode
		},
		computed: {
			...mapState({
				vehicleMsg: (state) => state.user.vehicleMsg,
			})
		},
		data() {
			return {
				scrollHeight: 300,
				menuButtonInfo: 0, //胶囊按钮信息
				statusBarHeight: 0, //状态栏高度
				musicheadHeight: 0,
				textLimit: 18,
				showPickerModal: false,
				avatar: "",
				appointmentInfo: null,
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
				triggered: true,
				status: 'loadmore',
				iconType: 'flower',
			}
		},
		onReady() {
			// #ifdef  MP-WEIXIN
			//获取状态栏高度
			const {
				statusBarHeight,
				windowHeight,
				screenHeight
			} = uni.getSystemInfoSync()
			this.statusBarHeight = statusBarHeight
			// 获取胶囊按钮信息（width、height、top等）
			const {
				width,
				height,
				top
			} = uni.getMenuButtonBoundingClientRect()
			this.menuButtonInfo = {
				width,
				height,
				top
			}
			// 胶囊按钮相对于离导航栏的上边距
			const topDistance = this.menuButtonInfo.top - this.statusBarHeight;
			// 计算导航栏高度
			this.musicheadHeight = this.menuButtonInfo.height + topDistance * 2;
			// #endif
		},
		onLoad() {
			this.getDriverRelationVoucher();
			this.getDriverRelationVoucherInvalid();

			uni.$on('reload', this.handleReload)
			
			let sys = uni.getSystemInfoSync();	
			let winWidth = sys.windowWidth;
			let winrate = 750 / winWidth;	
			let winHeight = parseInt(sys.windowHeight * winrate) - (this.appointmentInfo?900:930);
			this.scrollHeight = winHeight;
			console.log("lianfeng=====", winHeight);
		},
		onUnload() {
			// 移除监听事件    
			uni.$off('reload', this.handleReload);
		},
		onShow() {
			this.avatar = uni.getStorageSync("avatar") || "../../static/appointment/appointment_avatar.png";
			this.getDriverReservationInformation();
		},
		onPullDownRefresh() {
			if (this.activeIndex == 0) {
				this.isEnd_canAppointList = false;
				this.canAppointListQueryParams.pageNum = 1;
				this.canAppointList = [];
				this.getDriverRelationVoucher();
			} else {
				this.isEnd_invalidAppoint = false;
				this.invalidAppointListQueryParams.pageNum = 1;
				this.invalidAppointList = [];
				this.getDriverRelationVoucherInvalid();
			}
			this.getDriverReservationInformation();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
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
			getStationName(appointment) {
				console.log(appointment);
				var buildingInfoVos = appointment.buildingInfoVos;
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
				if (appointment && appointment.jyzName) {
					return appointment.jyzName + "/" + totalName;
				} else {
					return totalName;
				}
			},
			getDriverReservationInformation() { //司机预约信息
				const config = {
					url: "reservationInformation",
					method: "GET",
				};
				uniRequest(config).then((res) => {
					console.log("获取司机预约信息", res);
					if (res.data.code === 200 && res.data.data) {
						this.appointmentInfo = res.data.data;
					}
				});
			},
			getDriverRelationVoucher() { //获取司机关联预约凭证列表:可预约的
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
					console.log("获取司机关联预约凭证列表_可预约的", res);
					if (res.data.code === 200 && res.data.data) {
						if (this.canAppointListQueryParams.pageNum == 1) {
							this.canAppointList = [];
						}
						this.canAppointList = [...this.canAppointList, ...res.data.data.list];
						if (res.data.data.list.length < this.canAppointListQueryParams.pageSize) {
							this.isEnd_canAppointList = true;
						}
					}
				});
			},
			getDriverRelationVoucherInvalid() { //获取司机关联预约凭证列表:已失效的
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
					console.log("获取司机关联预约凭证列表_已失效的", res);
					if (res.data.code === 200 && res.data.data) {
						if (this.invalidAppointListQueryParams.pageNum == 1) {
							this.invalidAppointList = [];
						}
						this.invalidAppointList = [...this.invalidAppointList, ...res.data.data.list];
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
				// 允许从相机和相册扫码
				var that = this;
				uni.scanCode({
					fail: () => {
						that.showQRErrorTip();
					},
					success: function(res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						var subscribeRuleVoucherCode = null;
						if (res.result.length > 0 && res.result.search("http") != -1) {
							const q = decodeURIComponent(res.result); // 获取到二维码原始链接内容
							console.log("获取链接参数", q, typeof q);
							if (q !== "undefined") {
								const tmp = that.getlocationParams(q);
								console.log("tmp 解码对象", tmp);
								if (tmp && tmp.appointmentInfo) {
									subscribeRuleVoucherCode = tmp.appointmentInfo;
								}
							}
							if (subscribeRuleVoucherCode != null) {
								//新增司机关联凭证
								const config = {
									url: "insertVoucherRelation",
									method: "POST",
									data: {
										subscribeRuleVoucherCode: subscribeRuleVoucherCode,
									},
								};
								uniRequest(config).then((res) => {
									console.log("res", res);
									uni.$emit('reload', {
										msg: '页面更新'
									})
									//跳转到预约界面
									that.onClickGotoAppointment(subscribeRuleVoucherCode);
								});
							} else {
								that.showQRErrorTip();
							}
						} else {
							that.showQRErrorTip();
						}
					}
				});
			},
			clickTab(index) {
				this.activeIndex = index;
			},
			onClickQR() {
				this.showPickerModal = true;
			},
			onClickClose() {
				console.log("删除预约信息");
				uni.showModal({
					title: "提示",
					content: "确定要删除预约信息吗？",
					// showCancel: false,
					success: (res) => {
						if (res.confirm) {
							const config = {
								url: "delReservationRecord",
								method: "DELETE",
								params: {
									id: this.appointmentInfo.driverReservationRecordId
								},
							};

							uniRequest(config).then((res) => {
								console.log("删除", res);
								if (res.data.code === 200) {
									this.appointmentInfo = null;
								}
							});
						}
					},
				});
			},
			onClickGotoAppointment(code) {
				console.log("点击了去预约");
				uni.navigateTo({
					url: "./appointmentVoucherInfo?appointInfo=" + code,
				});
			},
			onClickGotoDetail(code) {
				console.log("点击了去详情");
				uni.navigateTo({
					url: "./appointmentVoucherDetail?appointInfo=" + code,
				});
			},
			getListData() {
				return this.activeIndex == 0 ? this.canAppointList : this.invalidAppointList
			},
			cancelPickerModal() {
				this.showPickerModal = false;
			},
			// 获取url地址上参数
			getlocationParams(docval) {
				if (!docval) return null;
				const valStr = docval.split("?")[1];
				if (!valStr) return null;
				console.log("valStr", valStr);
				const tmp = valStr.split("&");
				if (!tmp) return null;
				console.log("valStr", tmp);
				const obj = {};
				if (!tmp || tmp.length == 0) return obj;
				tmp.forEach((element) => {
					const tmp1 = element.split("=");
					obj[tmp1[0]] = tmp1[1];
				});
				console.log("obj", obj);
				return obj;
			},
			handleReload() {
				this.isEnd_canAppointList = false;
				this.canAppointListQueryParams.pageNum = 1;
				this.canAppointList = [];
				this.getDriverRelationVoucher();
				this.getDriverReservationInformation();
			},
			showQRErrorTip() {
				uni.showToast({
					title: "二维码有误",
					icon: 'none',
					duration: 2000
				})
			},
			/* 滚动到底部 */
			scrollBottem() {
				console.log("滚动到底部")
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
			onRefresh() {
				console.log("进入");
				setTimeout(() => {
					this.triggered = false;
				}, 500);
				if (this.activeIndex == 0) {
					this.isEnd_canAppointList = false;
					this.canAppointListQueryParams.pageNum = 1;
					this.getDriverRelationVoucher();
				} else {
					this.isEnd_invalidAppoint = false;
					this.invalidAppointListQueryParams.pageNum = 1;
					this.getDriverRelationVoucherInvalid();
				}
				this.getDriverReservationInformation();
			},
			/* 下拉被复位 */
			onRestore() {
				this.triggered = true; // 需要重置
				console.log(this.triggered);
				console.log("停止");
			},
			/* 下拉被中止，没下拉完就松手就会触发 */
			onAbort() {
				console.log("onAbort");
			},
		}
	}
</script>

<style lang="scss">
	button::after {
		border: none;
	}

	button {
		margin-left: 0;
		margin-right: 0;
	}

	// page {
	// 	display: -webkit-box;
	// 	position: fixed;
	// 	left: 0rpx;
	// 	right: 0rpx;
	// 	top: 0rpx;
	// 	bottom: 0rpx;
	// }

	.home-page {
		// width: 100%;
		// padding: 0 0 30upx;
		// font-family: 'PingFang Regular';
		// display: flex;
		// min-height: 100vh;
		// flex-direction: column;
		// overflow: hidden;
		width: 100%;
		//overflow-y: hidden;
		position: fixed;
		overflow: hidden;
	}

	.header-container {
		margin-left: 20upx;
		margin-right: 20upx;
		margin-top: 0upx;
		height: 206rpx;
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: space-between;
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
		margin-bottom: 0upx;
		border-radius: 16upx;
		padding-top: 11rpx;
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
		opacity: 0.4;
	}

	.info_bottom_right_line {
		border: none;
		margin-left: 0upx;
		margin-top: 64upx;
		margin-bottom: 44upx;
		width: 1upx;
		height: 50%;
		border-left: 1rpx solid #709FFF;
	}

	.info-container-top-right_close {
		width: 23upx;
		height: 23upx;
		flex-shrink: 0;
		position: absolute;
		top: 25upx;
		right: 25upx;
	}

	.info-container-top-right_qr {
		width: 61upx;
		height: 61upx;
		flex-shrink: 0;
		position: absolute;
		bottom: 22upx;
		right: 55upx;
	}

	.info-container-top-right {
		width: 160upx;
		height: 100%;
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

	.info_station_content {
		display: flex;
		align-items: flex-start;
		flex-direction: row;
		justify-content: space-between;
		margin-left: 12upx;
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

	.info_noContentView_canAppointView {
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: space-between;
		padding-top: 60upx;
		background-color: #FFFFFF;
		border-radius: 16upx;
		margin-left: 24rpx;
		margin-right: 24rpx;
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
		position: relative;
	}

	.info_bottom_left {
		display: flex;
		align-items: flex-start;
		flex-direction: row;
		justify-content: flex-start;
		width: 70%;
	}

	.info_bottom_right {
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: space-between;

		//width: 180upx;
		width: 0upx;
		height: 100%;
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
	}

	.info_bottom_right_view {
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: center;
	}

	.info_station_bottom_alert {
		width: 28upx;
		height: 28upx;
		margin-top: 40upx;
		margin-left: 31upx;
		flex-shrink: 0;
	}

	.info_station_bottom_carTime {
		padding-left: 6upx;
		margin-top: 34upx;
		padding-right: 20upx;
		padding-bottom: 27upx;
		color: #DBE7FF;
		font-size: 26upx;
		text-align: left;
	}

	.info_station_bottom_navi {
		width: 30upx;
		height: 30upx;
		margin-top: 10upx;
		flex-shrink: 0;
	}

	.info_station_bottom_naviLabel {
		padding-left: 10upx;
		margin-top: 34upx;
		padding-right: 36upx;
		padding-bottom: 27upx;
		color: #FFFFFF;
		font-size: 26upx;
		text-align: left;
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

	.switchHead {
		height: 115rpx;
		display: flex;
		flex-direction: row;
		align-items: baseline;
		justify-content: flex-start;
		color: #333333;
		padding-top: 0upx;
		margin-bottom: 0rpx;
	}

	.boxList {
		height: 115rpx;
		font-size: 30rpx;
		margin-left: 17rpx;
		background: #00000000;
	}

	.boxList_item {
		padding-top: 10rpx;
	}

	.switchLine {
		width: 58upx;
		height: 6upx;
		margin-left: 16rpx;
		margin-top: -15rpx;
		border-top: solid #2366F2 6upx;
	}

	.activeCss {
		font-size: 32upx;
		font-weight: bold;
	}

	.canAppointView-container {
		height: 100%;
		overflow-y: scroll;
	}

	.canAppointView {
		border-radius: 15upx;
		margin-left: 32upx;
		margin-right: 32upx;
		margin-top: 0upx;
		margin-bottom: 19upx;
		display: flex;
		align-items: flex-start;
		flex-direction: column;
		justify-content: space-between;
		background-image: linear-gradient(#FFFFFF, #FFFFFF, #FFFFFF, #FFFFFF, #E8EFFE);
		border-radius: 16upx 16upx 0 0;
	}

	.canAppointViewTop {
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: flex-start;
		background-color: #E8EFFE;
		height: 88upx;
		width: 100%;
		position: relative;
		border-radius: 16upx 16upx 0 0;
	}

	.canAppointViewTop_icon {
		width: 50upx;
		height: 50upx;
		margin-left: 32upx;
		flex-shrink: 0;
	}

	.canAppointViewTop_label {
		font-size: 32upx;
		font-weight: bold;
		color: #333333;
		padding-left: 14upx;
		margin-top: -5upx;
	}

	.canAppointViewTop_appointment {
		width: 110upx;
		height: 50upx;
		color: #2366F2;
		background-color: #2366F2;
		border-radius: 25upx;
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: center;
		position: absolute;
		right: 24upx;
	}

	.canAppointViewTop_appointment_label {
		font-size: 28upx;
		font-weight: bold;
		color: #FFFFFF;
		margin-top: -5upx;
	}

	.canAppointViewTop_appointment_detail {
		width: 110upx;
		height: 50upx;
		color: #FFFFFF;
		background-color: #FFFFFF;
		border-radius: 25upx;
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: center;
		position: absolute;
		right: 24upx;
	}

	.canAppointViewTop_appointment_label_detail {
		font-size: 28upx;
		font-weight: bold;
		color: #2366F2;
		margin-top: -5upx;
	}

	.canAppointView_downArrow {
		width: 33upx;
		height: 16upx;
		margin-left: 41upx;
		margin-top: 0upx;
		flex-shrink: 0;
	}

	.canAppointView_company {
		display: flex;
		align-items: flex-start;
		flex-direction: row;
		justify-content: space-between;
	}

	.canAppointView_company_icon {
		width: 35upx;
		height: 35upx;
		margin-left: 32upx;
		margin-top: 35upx;
		flex-shrink: 0;
	}

	.canAppointView_company_view {
		display: flex;
		align-items: flex-start;
		flex-direction: column;
		justify-content: center;
		margin-top: 12upx;
		margin-left: 24upx;
	}

	.canAppointView_company_view_value {
		font-size: 28upx;
		color: #333333;
	}

	.canAppointView_company_view_name {
		font-size: 24upx;
		color: #999999;
	}

	.canAppointView_canAppointment {
		display: flex;
		align-items: flex-start;
		flex-direction: row;
		justify-content: space-between;
	}

	.canAppointView_canAppointment_left {
		display: flex;
		align-items: flex-start;
		flex-direction: row;
		justify-content: space-between;
	}

	.canAppointView_canAppointment_right {
		display: flex;
		align-items: flex-start;
		flex-direction: row;
		justify-content: space-between;
		margin-left: 160upx;
	}

	.canAppointView_date {
		display: flex;
		align-items: flex-start;
		flex-direction: row;
		justify-content: space-between;
		margin-bottom: 36upx;
	}

	.warp {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.rect {
		width: 120px;
		height: 120px;
		background-color: #fff;
	}

	.musicheadWEIXIN {
		width: 100%;
		padding: 0;
		margin: 0;
		text-align: center;
	}

	.status_bar {
		width: 100%;
	}

	.btn {
		position: absolute;
		display: flex;
		flex-direction: row;
		box-sizing: border-box;
		align-items: center;
		padding: 0;
		margin: 0;
		justify-content: flex-start;
		left: 10px;

		.header-title {
			position: absolute;
			font-size: 36rpx;
			font-weight: bold;
			color: #333333;
			left: 10px;
			top: 5px;
		}
	}

	.headerCss {
		margin-top: -12rpx;

		.sortCss {
			background-color: #f1f1f1f8;
			height: 80rpx;
		}
	}

	.scrollviewCss {
		overflow-y: hidden;

		.courseList {
			.courseOne {
				margin: 40rpx 35rpx 30rpx 35rpx;
				display: flex;

				image {
					width: 238rpx;
					height: 238rpx;
					border-radius: 6rpx;
				}

				.courseMsg {
					margin-left: 20rpx;

					.courseTitle {
						font-size: 28rpx;
						font-weight: bold;
						color: #333333;
						margin-bottom: 10rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						-webkit-box-orient: vertical;
						display: -webkit-box;
						-webkit-line-clamp: 2;
					}

					.courseTips {
						font-size: 24rpx;
						color: #999999;
						margin-bottom: 10rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						-webkit-box-orient: vertical;
						display: -webkit-box;
						-webkit-line-clamp: 2;
					}

					.courseTutor {
						font-size: 24rpx;
					}

					.courseLast {
						margin-top: 10rpx;
						display: flex;
						justify-content: space-between;

						.courseLastPrice {
							color: #E84A10;
							font-size: 32rpx;
						}

						.courseLastType {
							background-color: #848484;
							color: #dedede;
							padding: 8rpx;
							font-size: 26rpx;
						}
					}
				}
			}
		}
	}
</style>
