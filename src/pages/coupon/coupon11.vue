<template>
	<view class="orderMain" id="orderMain">
		<view class="orderNotHave" v-if="couponList.length<1">
			<image class="orderNotImg" src="../../static/orderno.png"></image>
			<view class="orderNotText">您暂时没有优惠券</view>
		</view>
		<view class="couponList"  v-if="couponList.length>0">
			<view class="couponNav f_flex">
				<view href="#notused" class="z_flex couponItem" :class="couponStatus==0?'couponItemAct':''" @click="couponItemChange(0)">
					<text class="couponItem_decorate">未使用</text>
				</view> 
				<view href="#used" class="z_flex couponItem" :class="couponStatus==1?'couponItemAct':''" @click="couponItemChange(1)">
					<text class="couponItem_decorate">已使用</text>
				</view>
				<view href="#overdue" class="z_flex couponItem" :class="couponStatus==2?'couponItemAct':''" @click="couponItemChange(2)">
					<text class="couponItem_decorate">已过期</text>
				</view>
			</view>
			<view class="couponListItemBox">
				<view class="couponListItem f_flex" v-for="item in couponList" v-if="couponStatus==item.status" :class="item.status!=0?'couponListItemNo':''">
					<view class="couponListItemL z_flex">
						<view class="couponListItem_rt couponListItem_Radio"></view> 
						<view class="couponListItem_rb couponListItem_Radio"></view> 
						<view class="couponListItemRText">{{item.title}}</view> 
						<view class="couponListItemRTime">{{item.end_time}}到期</view>
					</view> 
					<view class="couponListItemR">
						<view class="couponListItem_lt couponListItem_Radio"></view> 
						<view class="couponListItem_lb couponListItem_Radio"></view> 
						<view class="couponPrice">￥{{item.quota}}</view> 
						<view class="couponCondition">满{{item.condition}}使用</view> 
						<view href="./list.html" class="couponListItemRBtn" >使用</view>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	var api = require('../../config/api.js')
	import qs from 'qs'
	import {mapState,mapMutations} from "vuex"
	export default {
		data() {
			return {
				addressFlag:false,
				couponList:0,
				couponStatus:0,
				uid:1
			}
		},
		computed:{
			...mapState(["hasLogin"]),
			...mapState(["userInfo"]),
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
		onShow() {
			this.getUsersCouponList();
		},
		methods: {
			couponItemChange:function(index){
				this.couponStatus=index;
			},
			getUsersCouponList:function(){
				var _this=this;
				var obj={
					uid:this.uid,
				}
				obj = qs.stringify(obj);
				uni.request({
					url:api.getUsersCouponList,
					method:"POST",
					data:obj,
					header:{
					    'content-type':'application/x-www-form-urlencoded',
					},
				    success: (res) => {
						var e=res.data;
						if(e.code==0){
							_this.couponList=e.data;
						}
				    }
				});
			}
		}
	}
</script>

<style>
.orderMain {
    min-height: 100%;
    background: #f5f5f5;
    box-sizing: border-box;
}
.orderNotText {
    text-align: center;
    line-height: 100rpx;
    font-size: 40rpx;
    color: #333;
}
.couponNav {
	box-shadow: 0 6rpx 14rpx 4rpx rgba(226, 226, 226, .5);
	background: #fff;
}

.couponItem {
	font-size: 28rpx;
	text-align: center;
	height: 88rpx;
	line-height: 88rpx;
	color: #333;
}

.couponItem_decorate {
	display: inline-block;
	height: 84rpx;
}

.couponItemAct .couponItem_decorate {
	color: #FF444C;
	font-weight: 600;
	border-bottom: 4rpx solid #FF444C;
}
.couponTitle{
	padding-left: 20rpx;
	font-size: 32rpx;
	color: #999;
}
.couponListDetails{
	padding-top: 40rpx;
}
.couponListItem{
	/*box-shadow: -5px 2px 1px 1px rgba(0,0,0,0.3);*/
	margin-bottom: 30rpx;
}
.detailsMain .couponMainDetails{
	background: #f5f5f5;
}
.couponMainDetails .couponListItemRBtn{
	color: #FF444C;
}
.couponListItemRText {
	font-size: 40rpx;
	line-height: 1;
	padding-top: 20rpx;
	padding-bottom: 20rpx;
	color: #333;
}

.couponListItemL {
	font-size: 44rpx;
	background: #fff;
	border-radius: 20rpx 0 0 20rpx;
	padding-left: 30rpx;
	padding-top: 30rpx;
	position: relative;
}

.couponListItemRTime {
	font-size: 24rpx;
	color: #b3b0b0;
}

.couponListItemR {
	width: 240rpx;
	font-size: 44rpx;
	background: #FF444C;
	padding: 30rpx 0;
	border-radius: 0 20rpx 20rpx 0;
	position: relative;
}

.couponPrice {
	font-size: 36rpx;
	text-align: center;
	color: #fff;
	line-height: 1;
}

.couponCondition {
	color: #fff;
	font-size: 24rpx;
	text-align: center;
	line-height: 40rpx;
	margin-bottom: .05rem;
}

.couponListItemRBtn {
	font-size: 28rpx;
	padding:  10rpx 0;
	background: #fff;
	text-align: center;
	display: block;
	width: 120rpx;
	margin: 0 auto;
	color: #999;
	line-height: 1;
	border-radius: 12rpx;
}

.couponListItem_lt {
	left: 0;
	top: 0;
	border-radius: 0 0 30rpx 0;
}

.couponListItem_Radio {
	background: #f5f5f5;
	position: absolute;
	width: 20rpx;
	height: 20rpx;
}

.couponListItem_lb {
	bottom: 0;
	left: 0;
	border-radius: 0 30rpx 0 0;
}

.couponListItem_rt {
	border-radius: 0 0 0 30rpx;
	top: 0;
	right: 0;
}

.couponListItem_rb {
	bottom: 0;
	right: 0;
	border-radius: 30rpx 0 0 0;
}

.couponListItemBox {
	padding: 20rpx;
}

.couponListItemNo .couponListItemR {
	background: #777;
}
.couponListItemNo .couponListItemR .couponListItemRBtn{
	color: #777;
}
</style>
