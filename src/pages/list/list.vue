<template>
	<view class="goodsMain" id="goodsMain">
		<view class="listSearch">
			<view class="listInput search_input" @click="goSearch">请输入商品</view>
			<!--<input type="text" class="listInput" placeholder="请输入商品">-->
		</view>
		<view class="filter_box f_flex"  v-if="goodsList.length>1">
			<view class="filterItem z_flex" :class="filterMultipleFlag ? 'filterItemAct' : '' " @click="filterMultiple">综合</view>
			<view class="filterItem z_flex" :class="filterSalesFlag ? 'filterItemAct' : '' " @click="filterSales">销量</view>
			<view class="filterItem z_flex" :class="filterPriceFlag ? 'filterItemAct' : '' " @click="filterPrice">价格<view class="filterItemOrder"><view class="filterItemUp filterItemIcon" :class="filterPriceNum==1?'filterItemIconAct':''"></view><view class="filterItemDown filterItemIcon" :class="filterPriceNum==2?'filterItemIconAct':''"></view></view></view>
			<view class="filterItem z_flex">筛选<image class="screen_icon" src="../../static/screen_icon.png" mode=""></image></view>
		</view>
		<view class="goodsList"   v-if="goodsList.length>1">
			<view @click="toDetails(item.pid)" class="hotItem" v-for="item in goodsList">
				<view class="hotItemBorder">
					<img class="hotItemImg" :src="item.activity_img">
					<view class="hotItemText">
						<view class="hotItemTitle">{{item.title}}</view>
						<view class="hotItemTBox">
							<view class="hotItemPrice clear">￥{{item.sell_price}}</view>
							<view class="hotItemSmall clear">销量:{{item.sales}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="noRecords" v-if="goodsList.length<1 && listflag">
			<image src="../../static/noRecords.png" mode=""></image>
			<view class="noRecordsListT">暂无记录</view>
		</view>
	</view>
</template>

<script>
	var api = require('../../config/api.js')
	export default {
		data() {
			return {
				filterMultipleFlag:true,
				filterSalesFlag:false,
				filterPriceFlag:false,
				listflag:false,
				filterPriceNum:0,
				goodsList:[]
			}
		},
		onLoad(e) {
			var key=e.key;
			if(key){
				this.searchProductList(key);
			}else{
				var cid=e.cid;
				this.getCateProductList(cid);
			}
		},
		methods: {
			goSearch:function(){
				uni.navigateTo({
				    url: '../search/search'
				});
			},
			toDetails:function(pid){
				console.log(pid)
				uni.navigateTo({
				    url: '../details/details?id='+pid
				});
			},
			filterMultiple:function(){
				this.filterPriceFlag=false;
				this.filterMultipleFlag=true;
				this.filterSalesFlag=false;
				this.filterPriceNum=0;
			},
			filterSales:function(){
				this.filterPriceFlag=false;
				this.filterMultipleFlag=false;
				this.filterSalesFlag=true;
				this.filterPriceNum=0;
			},
			filterPrice:function(){
				this.filterPriceFlag=true;
				this.filterMultipleFlag=false;
				this.filterSalesFlag=false;
				if(this.filterPriceNum==0 || this.filterPriceNum==2){
					this.filterPriceNum=1;
				}else if(this.filterPriceNum==1){
					this.filterPriceNum=2;
				}
			},
			searchProductList:function(key){
				var _this=this;
				var data={
					keywords:key,
				}
				uni.request({
				    url: api.searchProductList,
					method:"GET",
					data:data,
				    success: (res) => {
						this.listflag=true;
						var e=res.data;
						_this.goodsList=e.data;
				    }
				});
			},
			getCateProductList:function(cid){
				var _this=this;
				var obj={
					cid:cid
				}
				uni.request({
				    url: api.getCateProductList,
					method:"GET",
					data:obj,
				    success: (res) => {
						this.listflag=true;
						var e=res.data;
						_this.goodsList=e.data;
				    }
				});
			}
		}
	}
</script>

<style>
.screen_icon{
	position: absolute;
	right: 10rpx;
	width: 48rpx;
	height: 48rpx;
	margin-top:  -20rpx;
	top: 50%;
}
.noRecords{
	color:#333 ;	
	font-size: 36rpx;
	padding-top: 160rpx;
}
.noRecords image{
	display: block;
	margin: 0 auto;
}
.noRecords .noRecordsListT{
	text-align: center;
	line-height:60rpx;
	font-size: 50rpx;
}
.listSearch {
	height: 88rpx;
	border-bottom: 1px solid #E5E5E5;
	padding: 14rpx 80rpx;
	box-sizing: border-box;
	width: 100%;
}

.listInput {
	width: 100%;
	height:60rpx;
	line-height:60rpx;
	display: block;
	box-sizing: border-box;
	padding-left: 24rpx;
	font-size: 24rpx;
	border: none;
	background: #f7f7f7;
	color: #757575;
	border-radius: 30rpx;
}
.filter_box {
	height: 72rpx;
	line-height: 72rpx;
	background: #f1f1f1;
}

.filterItem {
	font-size: 32rpx;
	line-height: 72rpx;
	text-align: center;
	position: relative;
}
.screen_icon{
	position: absolute;
	right: 10rpx;
	width: 48rpx;
	height: 48rpx;
	margin-top:  -20rpx;
	top: 50%;
}
.filterItemAct {
	color: #FF444C;
}

.filterItemOrder {
	display: inline-block;
	line-height: 72rpx;
	margin-left: 10rpx;
}

.filterItemIcon {
	width: 16rpx;
	height: 10rpx;
	/* background: url(../images/filterItemDown.png)no-repeat; */
	background-size: 16rpx;
}

.filterItemUp {
	transform: rotate(180deg);
	margin-bottom: 4rpx;
}

.filterItemIconAct {
	/* background-image: url(../images/filterItemDownAct.png); */
}
.goodsList{
	padding-top:20rpx;
	border-top: 2rpx solid #ccc;
	
	overflow: hidden;
	    background: #F4F4F4;
}
.hotItem {
	padding: 0 10rpx 20rpx 20rpx;
	width: 50%;
	box-sizing: border-box;
	float: left;
}
.hotItemBorder{
	background: #fff;
}
.hotItem:nth-child(2n) {
	padding: 0 20rpx 20rpx 10rpx;
}

.hotItemImg {
	width: 345rpx;
	height: 345rpx;
}

.hotItemText {
	padding: 10px 0;
}
.hotItemTBox{
	overflow: hidden;
}
.hotItemSales{
	font-size: 24rpx;
	float: right;
	line-height: 52rpx;
	color:#aeaeae;
}
.hotItemTitle {
	font-size: 28rpx;
	text-overflow: ellipsis;
	line-height: 40rpx;
	height: 80rpx;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	overflow: hidden;
	padding: 0 6rpx;
	-webkit-box-orient: vertical;
}

.hotItemPrice {
	font-size: 28rpx;
	float: left;
	line-height: 52rpx;
	height: 52rpx;
	color: #FF444C;
}

.hotItemSmall {
	font-size: 24rpx;
	color: #999;
	float: left;
	line-height: 52rpx;
	margin-left: 20rpx;
}
</style>
