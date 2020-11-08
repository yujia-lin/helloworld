<template>
<view class="dialogueMain" >
	<view class="dialoguecontent">
		<view class="dialogueItem ">
			<view class="dialogueItemTime">07-16 15:06</view>
			<view class="dialogueItemMain dialogueItemMainL f_flex">
				<image src="../../static/user_icon.png" class="dialogueItemImg "></image>
				<view class="z_flex">
					<view class="dialogueItemMainText">您好</view>
				</view>
			</view>
		</view>
		<view class="dialogueItem ">
			<view class="dialogueItemTime">07-16 16:06</view>
			<view class="dialogueItemMain dialogueItemMainR f_flex">

				<view class="z_flex">
					<view class="dialogueItemMainText">您好</view>
				</view>
				<image src="../../static/user_icon.png" class="dialogueItemImg "></image>
			</view>
		</view>
	</view>
	<view class="dialogueFoot f_flex">
		<input type="text"  class="dialogueInput"/>
		<view class="z_flex">
			<image src="../../static/dialogue_icon1.png" class="dialogue_icon1 "></image>
		</view>
		<view class="z_flex">
			<image src="../../static/dialogue_icon2.png" class="dialogue_icon2 " ></image>
		</view>
		<view class="z_flex">
			<view class="dialogue_Btn ">发送</view>
		</view>

	</view>
</view>
</template>

<script>
	import {mapState,mapMutations} from "vuex"
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			
		},
		methods: {
			
		}
	}
</script>

<style>
.dialogueMain {
	position: relative;
	height: 100%;
	width: 100%;
	background: #EFF2F9;
	box-sizing: border-box;

}

.dialogueInput {
	height: 64rpx;
	width: 400rpx;
	margin-top: 18rpx;
	box-sizing: border-box;
	padding-left: 24rpx;
	border-radius: 32rpx;
	border: 2rpx solid #ccc;
}

.dialogue_icon1 {
	width: 64rpx;
	height: 64rpx;
	display: block;
	margin: 18rpx auto 0;
}

.dialogue_icon2 {
	width: 52rpx;
	height: 52rpx;
	display: block;
	margin: 24rpx auto 0;
}

.dialogue_Btn {
	border-radius: 6rpx;
	text-align: center;
	line-height: 64rpx;
	font-size: 26rpx;
	height: 64rpx;
	color: #fff;
	margin-top: 18rpx;
	width: 100%;
	background: -webkit-linear-gradient(right, #FF444C, #fd9085);
	background: linear-gradient(90deg, #FF444C, #fd9085);
}

.dialogueFoot {
	height: 100rpx;
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	box-sizing: border-box;
	background: #fff;
	padding-left: 20rpx;
	padding-right: 32rpx;
	box-shadow: 0 6rpx 14rpx 4rpx rgba(102, 102, 102, .8);
}

.dialoguecontent {
	padding: 20rpx 44rpx 0;
}

.dialogueItemTime {
	text-align: center;
	font-size: 24rpx;
	line-height: 48rpx;
	color: #4d4d4d;
}

.dialogueItemMainL {
	width: 100%;
}

.dialogueItemImg {
	width: 100rpx;
	height: 100rpx;
	border-radius: 50%;
	display: block;
}

.dialogueItemMainText {
	font-size: 24rpx;
	padding: 20rpx;
	line-height: 1.2;
	margin: 0 24rpx;
	border-radius: 12rpx;
	position: relative;
	max-width: 100%;
	box-sizing: border-box;
	display: inline-block;
	float: left;
}

.dialogueItemMainText:after {
	content: "";
	border-top: 14rpx solid transparent;
	border-bottom: 14rpx solid transparent;
	position: absolute;
	top: 10rpx;
}

.dialogueItemMainL .dialogueItemMainText {
	background: #fff;
	max-width: 58%;
}

.dialogueItemMainR .dialogueItemMainText {
	background: #8bee00;
	max-width: 58%;
}

.dialogueItemMainL .dialogueItemMainText:after {
	border-right: 14rpx solid #fff;
	left: -14rpx;
}

.dialogueItemMainR .dialogueItemMainText:after {
	border-left: 14rpx solid #8bee00;
	right: -14rpx;
}

.dialogueItemMainR {
	text-align: right;
}

.dialogueItemMainR .dialogueItemMainText {
	float: right
}

.dialogueItem {
	overflow: hidden;
}
</style>
