<template>
<view class="orderDetails" id="orderDetails" >
<!--<view class="orderMain" id="orderMain" v-cloak>-->
	<view class="orderD_Head">
		<view class="orderD_Headt">交易成功</view>
		<view class="orderD_Headtime">还剩自动确认收货</view>
	</view>
	<view class="orderD_address">
		<view class="orderconfirmAddress f_flex">
			<view class="orderAddressIcon"><image src="../../static/subsidiary_icon2.png" mode="widthFix"></image></view>
			<view class="orderAddressText z_flex">
				<view class="orderAddressTextName">林语家<span class="orderAddressTextPhone">13433827184</span></view>
				<view class="orderAddressDetail">城北京市 市辖区 东城区 sas </view>
			</view>
		</view>
	</view>
	<view class="userColorBlock"></view>
	<view class="storeList">
		<view class="orderconfirmBaseBox" >
			<view class="orderconfirmGoods f_flex">
				<image class="orderconfirmImg" ></image>
				<view class="z_flex orderconfirmText">
					<view class="orderconfirmTitle">dsf</view>
			<!-- 		<view class="orderconfirmTitle">{{item.title}}</view>
					<view class="orderconfirmSpecs">{{item.symbol}}</view> -->
					<view class="orderconfirmSpecs">dasds</view>
				</view>
				<view class="orderconfirmDetaile">
					<view class="orderconfirmPrice">￥100</view>
					<view class="orderconfirmNumber">x1</view>
					<!-- <view class="orderconfirmPrice">￥{{item.sell_price}}</view>
					<view class="orderconfirmNumber">x{{item.product_num}}</view> -->
				</view>
			</view>
		</view>
		<view class=""></view>
	</view>
	<view class="userColorBlock"></view>
	<view class="orderD_data">
		<view class="orderD_dataTitle">订单信息</view>
		<view class="orderD_dataText f_flex">
			<view class="orderD_dataTextL">订单编号</view>
			<view class="orderD_dataTextR z_flex">123123</view>
		</view>
		<view class="orderD_dataText f_flex">
			<view class="orderD_dataTextL">创建时间</view>
			<view class="orderD_dataTextR z_flex">123123</view>
		</view>
		<view class="orderD_dataText f_flex">
			<view class="orderD_dataTextL">付款时间</view>
			<view class="orderD_dataTextR z_flex">123123</view>
		</view>
		<view class="orderD_dataText f_flex">
			<view class="orderD_dataTextL">发货时间</view>
			<view class="orderD_dataTextR z_flex">123123</view>
		</view>
	</view>
	<view class="orderD_Btnbox">
		<view class="orderListItemBtn">去支付</view>
		<view  class="orderListItemBtn" >取消订单</view>
	</view>
</view>
</template>

<script>
	var api = require('../../config/api.js')
	import {mapState,mapMutations} from "vuex"
	export default {
		data() {
			return {
				uid:null
			}
		},
		computed:{
			...mapState(["hasLogin"]),
			...mapState(["userInfo"]),
		},
		onBackPress(e) {
			uni.redirectTo({
			  url: '/pages/order/order'
			});
			return true
		},
		onLoad(e) {
			console.log(this.userInfo.uid)
			console.log(this.hasLogin)
			if(!this.hasLogin){
				uni.reLaunch({
				    url: '/pages/usercentre/usercentre'
				});
			}
			if(this.userInfo.uid){
				this.uid=this.userInfo.uid;
				console.log(this.userInfo)
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.orderconfirmAddress {
	padding: 30rpx 40rpx 30rpx 0;
	background: #fff;
}

	.orderDetails{
		padding-bottom: 114rpx;
	}
.orderListItemBtn {
	color: #6e6e6e;
	font-size: 32rpx;
	height: 68rpx;
	line-height: 68rpx;
	padding: 0 20rpx;
	border: 2rpx solid #cacaca;
	float: right;
	border-radius: 40rpx;
	margin-right: 20rpx;
}

.orderD_Head {
	background: -webkit-linear-gradient(bottom, #FF444C, #fd9085);
	background: linear-gradient(180deg, #FF444C, #fd9085);
	height: 140rpx;
	padding: 20rpx 40rpx 0;
	box-sizing: border-box;
	font-size: 28rpx;
}
.orderD_Headt{
	font-size: 32rpx;
	color: #fff;
	text-align: center;
	margin-bottom: 10rpx;
}
.orderD_Headtime{
	text-align: center;
	color: #fff;
	font-size: 28rpx;
}
.orderD_Btnbox{
	position: fixed;
	bottom: 0;
	right: 0;
	left: 0;
	padding: 20rpx 0;
	background: #fff;
	border-top: 2rpx solid #ccc
}
.orderD_data{
	padding: 0 20rpx;
}
.orderD_dataTitle{
	font-size: 36rpx;
	line-height: 1;
	padding-bottom: 30rpx;
	padding-top: 20rpx;
	color: #333;
}
.orderD_dataText{
	line-height: 72rpx;
}
.orderD_dataTextL{
	font-size: 28rpx;
	width:200rpx;
	color: #333;
}
.orderD_dataTextR{
	color: #333;
	font-size: 26rpx;
}
.orderD_address{
	padding: 0 20rpx;
}
.orderD_address .orderAddressIcon{
	width: 98rpx;
	height: 98rpx;
	background: -webkit-linear-gradient(bottom, #FF444C, #fd9085);
	background: linear-gradient(180deg, #FF444C, #fd9085);
	border-radius:50% ;
	box-sizing: border-box;
	padding: 20rpx;
	margin-right: 16rpx;
}
.orderD_address .orderAddressIcon image{
	display: block;
	width: 100%;
}
.orderD_address .orderAddressText{
	background: none;
}
.orderconfirmImg {
    width: 172rpx;
    height: 172rpx;
    float: left;
}
.orderconfirmGoods {
	padding-top: 20rpx;
}
.orderconfirmText{
	font-size: 28rpx;
	padding-left: 20rpx;
}
.orderconfirmDetaile{
	width: 120rpx;
}
.orderconfirmTitle{
	font-size:36rpx;
	line-height: 44rpx;
	height: 88rpx;
	overflow: hidden;
}
.orderconfirmSpecs{
	background: #FAFAFA;
	font-size: 28rpx;
	color: #AFAFAF;
	display: inline-block;
	padding: 6rpx;
	line-height:36rpx;
	max-height: 72rpx;
	overflow: hidden;
}
.orderconfirmPrice{
	font-size: 28rpx;
	text-align: right;
	line-height: 48rpx;
	
} 
.orderconfirmNumber{
	text-align: right;
	font-size: 28rpx;
	line-height:36rpx;
	
	
}
.orderconfirmBaseBox {
	background: #fff;
	padding: 0 30rpx;
}

</style>
