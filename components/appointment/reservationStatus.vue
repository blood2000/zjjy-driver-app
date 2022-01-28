<template>
	<div>
		<div class="root">
			<view class="titleView">
				<view class="title" v-if="title">{{title}}</view>
				<image class="close" src="/static/appointment/ic_close.png" @click="closePopup()"></image>
			</view>
			<view class="content" v-if="content">{{content}}</view>
			<view class="horizationLine" />
			<view>
				<slot name="customView"></slot>
			</view>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			showModel: {
				type: Boolean,
				default: true,
			},
			title: {
				type: String,
				default: "提示",
			},
			content: {
				type: String,
				default: null
			},
		},
		data() {
			return {

			}
		},
		methods:{
			closePopup(){
				this.$emit("closePopup")
			}
		}
	}
</script>

<style scoped>
	.root {
		display: flex;
		flex-direction: column;
		width: 600rpx;
		align-items: center;
		background-color: #FFFFFF;
		border-radius: 12rpx;
	}

	.titleView {
		display: flex;
		justify-content: center;
		width: 100%;
		align-items: center;
	}

	.close {
		width: 30rpx;
		height: 30rpx;
		position: absolute;
		top: 38rpx;
		right: 32rpx;
	}

	.title {
		font-weight: 600;
		color: #333333;
		font-size: 36rpx;
		margin-top: 32rpx;
		align-items: center;
	}

	.content {
		font-weight: 500;
		margin-top: 32rpx;
		margin-left: 32rpx;
		font-size: 34rpx;
		margin-right: 32rpx;
		text-align: center;
		color: #333333
	}

	.horizationLine {
		border-bottom: 1rpx solid #F3F3F3;
		height: 1rpx;
		width: 100%;
		padding-top: 32rpx;
	}
</style>
