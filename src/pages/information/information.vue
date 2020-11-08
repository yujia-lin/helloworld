<template>
<view class="informationMain">
	<view class="informationMainlist">
		<view href="#notice" class="informationItem currentBtn">
			<view class="informationIcon informationIcon1"><image class="informationIconImg" src="../../static/informationIcon1.png" mode="widthFix"></image></view>
			<view class="informationText">物流通知</view>
		</view>
		<view href="#text" class="informationItem currentBtn">
			<view class="informationIcon informationIcon2"><image class="informationIconImg" src="../../static/informationIcon2.png" mode="widthFix"></image></view>
			<view class="informationText">站内消息</view>
		</view>
		<view href="./dialogue.html" class="informationItemDialogue f_flex">
			<view class="informationDialogueIcon ">
				<image class="informationImg" src="../../static/pic.jpg"></image>
			</view>
			<view class="informationTextMain z_flex">
				<view class="informationTextName">钢铁侠</view>
				<view class="informationTextD">您好</view>
			</view>
			<view class="informationtime">2020-7-16</view>
		</view>
	</view>
	<view class="informationNoticePopup informationPopup">
		<view class="alltop">
			<view href="#" class="popupReturn allReturn"></view>
			<view class="allTitle">物流通知</view>
		</view>
		<view class="informationTextList">
			<view class="informationTextItem">
				<view class="informationTextItemt">直播间西瓜币服务将于2020年4月20日下线，免费西瓜礼物将于5月20日下线，，下线后您所持有的西瓜币将全部无法继续使用。</view>
				<view class="informationTextItemtime">1个月前</view>
			</view>
			<view class="informationTextItem">
				<view class="informationTextItemt">恭喜你成为西瓜视频幸运用户!一大波福利在等你~</view>
				<view class="informationTextItemtime">1个月前</view>
			</view>
		</view>
	</view>
	<view class="informationTextPopup informationPopup">
		<view class="alltop">
			<view href="#" class="popupReturn allReturn"></view>
			<view class="allTitle">站内信</view>
		</view>
		<view class="informationTextList">
			<view class="informationTextItem">
				<view class="informationTextItemt">直播间西瓜币服务将于2020年4月20日下线，免费西瓜礼物将于5月20日下线，，下线后您所持有的西瓜币将全部无法继续使用。</view>
				<view class="informationTextItemtime">1个月前</view>
			</view>
			<view class="informationTextItem">
				<view class="informationTextItemt">恭喜你成为西瓜视频幸运用户!一大波福利在等你~</view>
				<view class="informationTextItemtime">1个月前</view>
			</view>
		</view>
	</view>
</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.informationMain {
	height: 100%;
	box-sizing: border-box;
	background: #f5f5f5;
	position: relative;
}

.informationItem {
	padding: 20rpx 40rpx;
	overflow: hidden;
	margin-bottom: 6rpx;
	background: #fff;
	display: block;
}

.informationIcon {
	width: 120rpx;
	height: 120rpx;
	border-radius: 50%;
	float: left;
	overflow: hidden;
	padding:32rpx;
	box-sizing: border-box;
}

.informationImg {
	display: block;
	width: 100%;
	height: 100%;
}

.informationIconImg{
	width: 100%;
}
.informationIcon1 {
	background-color: #FF545A;
}

.informationIcon2 {
	background-color: #FFBE00;
}

.informationText {
	padding-left: 30rpx;
	float: left;
	font-size: 36rpx;
	line-height: 120rpx;
}

.informationTextMain {
	padding-left: 30rpx;
}

.informationTextName {
	font-size: 36rpx;
	overflow: hidden;
	line-height: 1;
	padding-top: 8rpx;
	padding-bottom: 32rpx;
}

.informationTextD {
	font-size: 28rpx;
	line-height: 1;
	color: #9c9c9c;
	height: 40rpx;
	width: 260rpx;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}

.informationtime {
	color: #939393;
	font-size: 24rpx;
	width: 140rpx;
}

.informationImgB {
	float: initial;
}

.informationItemDialogue {
	padding: 20rpx 40rpx;
	overflow: hidden;
	margin-bottom: 6rpx;
	background: #fff;
}

.informationDialogueIcon {
	width: 120rpx;
	height: 120rpx;
	border-radius: 50%;
	background-repeat: no-repeat;
	background-position: center;
	background-size: 64rpx;
	overflow: hidden;
}

.informationNoticePopup {
	position: absolute;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	z-index: 101;
	background: #fff;
	display: none;
}

.informationTextPopup {
	position: absolute;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	z-index: 101;
	background: #fff;
	display: none;
}

.informationTextList {
	padding: 84rpx 30rpx 30rpx;
}

.informationTextItem {
	padding: 20rpx 0;
	border-bottom: 4rpx solid #fafafa;
}

.informationTextItemt {
	font-size: 28rpx;
	color: #333;
	margin-bottom: 10rpx;
}

.informationTextItemtime {
	color: #9c9c9c;
	font-size: 24rpx;
}
</style>
