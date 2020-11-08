<template>
	<view class="indexContent">
		<div class="set_top" @click="gotop">
			<image src="../../static/arrowt.png"></image>
		</div>
		<view class="header searchNO_box">
			<view class="search">
				<image src="../../static/logo.png" mode=""  class="logo"></image>
				<view class="search_input" @click="goSearch">请输入商品</view>
				<view class="my_icons">
				</view>
			</view>
		</view>
		
		<view class="indexSearchBox">
		<scroll-view class="indexSearchBoxFind" >
			<view class="indexBanner">
				<indexBanner :list="bannerList"></indexBanner>
			</view>
			<view class="nav_BoxList">
				<view class="nav_BoxItem">
					<view class="nav_BoxItem_icon nav_BoxItem_icon4">
						<image src="../../static/nav_BoxItem_icon10.png"></image>
					</view>
					<view class="nav_BoxItem_text">零食食品</view>
				</view>
				<view class="nav_BoxItem">
					<view class="nav_BoxItem_icon nav_BoxItem_icon1">
						<image src="../../static/nav_BoxItem_icon1.png" ></image>
					</view>
					<view class="nav_BoxItem_text">女装</view>
				</view>
				<view class="nav_BoxItem">
					<view class="nav_BoxItem_icon nav_BoxItem_icon2">
						<image  src="../../static/nav_BoxItem_icon2.png" ></image>
					</view>
					<view class="nav_BoxItem_text">男装</view>
				</view>
				<view class="nav_BoxItem">
					<view class="nav_BoxItem_icon nav_BoxItem_icon3">
						<image src="../../static/nav_BoxItem_icon3.png"></image>
					</view>
					<view class="nav_BoxItem_text">母婴童装</view>
				</view>
				<view class="nav_BoxItem">
					<view class="nav_BoxItem_icon nav_BoxItem_icon4">
						<image src="../../static/nav_BoxItem_icon4.png" ></image>
					</view>
					<view class="nav_BoxItem_text">数码</view>
				</view>
				<view class="nav_BoxItem">
					<view class="nav_BoxItem_icon nav_BoxItem_icon5">
						<image src="../../static/nav_BoxItem_icon5.png"></image>
					</view>
					<view class="nav_BoxItem_text">钟表珠宝</view>
				</view>
				<view class="nav_BoxItem">
					<view class="nav_BoxItem_icon nav_BoxItem_icon6">
						<image src="../../static/nav_BoxItem_icon6.png"></image>
					</view>
					<view class="nav_BoxItem_text">美妆护肤</view>
				</view>
				<view class="nav_BoxItem">
					<view class="nav_BoxItem_icon nav_BoxItem_icon1">
						<image src="../../static/nav_BoxItem_icon7.png"></image>
					</view>
					<view class="nav_BoxItem_text">箱包手袋</view>
				</view>
				<view class="nav_BoxItem">
					<view class="nav_BoxItem_icon nav_BoxItem_icon2">
						<image src="../../static/nav_BoxItem_icon8.png"></image>
					</view>
					<view class="nav_BoxItem_text">鞋子</view>
				</view>
				<view class="nav_BoxItem">
					<view class="nav_BoxItem_icon nav_BoxItem_icon3">
						<image src="../../static/nav_BoxItem_icon9.png"></image>
					</view>
					<view class="nav_BoxItem_text">户外休闲</view>
				</view>
				
			</view>
			<view class="shopIndexList">
				<view class="hotTitle"><view class="hotTitleLine hTLineL"></view><view class="hotTitleCircular hTCircularL"></view>热卖商品<view class="hotTitleCircular hTCircularR"></view><view class="hotTitleLine hTLineR"></view></view>
				<view class="hotList clear">
					<view  class="hotItem" @click="toDetails(item.pid)" v-for="item in goodsList" v-if="item.product_type==0">
						<view class="hotItemBorder">
							<image class="hotItemImg" :src="item.activity_img"></image>
							<view class="hotItemText">
								<view class="hotItemTitle">{{item.title}}</view>
								<view class="hotItemTBox">
									<view class="hotItemPrice ">￥{{item.sell_price}} </view>
									<view class="hotItemSales ">销量：{{item.sales}} </view>
									<!--<a href="" class="goodItemBtn">立即购买</a>-->
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="tac">
					<view class="goodTitle"><image  class="goodTitleImg" src="../../static/goodIcon.png"></image>商品优选</view>
				</view>
				<view class="goodList">
					<view class="goodItem f_flex" v-for="item in goodsList" v-if="item.product_type==1">
						<image class="goodItemImg" :src="item.activity_img"/></image>
						<view class="z_flex goodItemText">
							<view class="goodItemTitle">{{item.title}}</view>
							
							<view class="goodItemTBox">
								<view class="goodItemPriceP">
									<view class="goodItemPrice clear">￥{{item.sell_price}}</view>
									<view class="goodItemSales">销量：{{item.sales}}</view>
								</view>
								<view  @click="toDetails(item.pid)" class="goodItemBtn">立即购买</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		</view>
	</view>
</template>

<script>
	import indexBanner from "@/components/indexBanner.vue"
	var api = require('../../config/api.js')
	export default {
		data() {
			return {
				bannerList:[],
				fineGoodsList:[],
				hotGoodsList:[],
				goodsList:[],
				scrollTop:0,
				ciImg:""
			}
		},
		components:{
			indexBanner
		},
		onLoad() {
			console.log(api)
		},
		onShow() {
			this.getAdList();
			this.getProductList();
		},
		methods: {
			// indexScroll:function(e){
			// 	console.log(e)
			// },
			gotop:function(){
				uni.pageScrollTo({
				    scrollTop: 0,
					selector:".indexSearchBoxFind",
				    duration: 300
				});
				// uni.createSelectorQuery().select('.indexSearchBox' ).boundingClientRect(data=>{//目标节点
				// 　　uni.createSelectorQuery().select('.indexContent').boundingClientRect((res)=>{//最外层盒子节点 　　　　
				// 　　　　uni.pageScrollTo({ 　　　　　　
				// 　　　　　　duration: 0,//过渡时间必须为0，否则运行到手机会报错
				// 　　　　　　scrollTop: 0 //滚动到实际距离是元素距离顶部的距离减去最外层盒子的滚动距离（如res.top - data.top）
				// 　　　　})
				// 　　}).exec()
				// }).exec()
			},
			goSearch:function(){
				uni.navigateTo({
				    url: '../search/search'
				});
			},
			getAdList:function(){
				var _this=this;
				uni.request({
				    url: api.getAdList,
				    success: (res) => {
						_this.bannerList=null;
						_this.bannerList=res.data;
				    }
				});
			},
			getProductList:function(){
				var _this=this;
				uni.request({
				    url: api.getProductList,
				    success: (e) => {
					   _this.goodsList=e.data.data
				    }
				});
			},
			toDetails:function(pid){
				console.log(pid)
				uni.redirectTo({
					url: '../details/details?id='+pid
				});
				
			},
		}
	}
</script>

<style>
	.set_top{
		width: 80rpx;
		height: 80rpx;
		background: rgba(0,0,0,0.5);
		box-sizing: border-box;
		padding: 10rpx;
		position: fixed;
		bottom:120rpx;
		right:20rpx;
		border-radius:50% ;
		display: block;
		z-index: 15;
	}
	.set_top image{
		width: 100%;
		height: 100%;
		display: block;
	}
	.searchNO_box{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 140rpx;
		z-index: 10;
		background: #ff444c;
	}
	.indexContent {
		height: 100%;
		position: relative;
	}
	.indexSearchBox{
		height: 100%;
		padding-top: 140rpx;
	}
	
	.search {
		padding: 30rpx 30rpx 30rpx 130rpx;
		background: #FF444C;
	}
	.shopIndexList{
		
		background: #F4F4F4;
	}
	.logo {
		display: block;
		width: 80rpx;
		height: 80rpx;
		background-color: #fff;
		background-size: 100% 100%;
		background-position: center;
		background-repeat: no-repeat;
		position: absolute;
		top: 30rpx;
		left: 30rpx;
		/* background-image: url(../images/logo.png); */
		border-radius: 5rpx;
	}
	
	.search_input {
		width: 100%;
		height:80rpx;
		line-height:80rpx;
		border: 1px solid #e5e5e5;
		display: block;
		box-sizing: border-box;
		padding-left: 24rpx;
		font-size: 28rpx;
		color: #757575;
		background: #fff;
	}
	.nav_BoxList{
		overflow: hidden;
		padding-top: 30rpx;
	}
	.nav_BoxItem{
		width: 20%;
		float: left;
		margin-bottom: 20rpx;
	}
	.nav_BoxItem_icon{
		width: 100rpx;
		height: 100rpx;
		display: block;
		box-sizing: border-box;
		padding: 20rpx;
		margin: 0 auto;
		border-radius:50% ;
	}
	.nav_BoxItem_text{
		font-size: 24rpx;
		text-align: center;
		margin-top: 12rpx;
		
	}
	.nav_BoxItem_icon image{
		display: block;
		width: 100%;
		height: 100%;
	}
	.nav_BoxItem_icon1{
	background-image: linear-gradient(to bottom,#FBE5A8, #F8BA14);
	}
	.nav_BoxItem_icon2{
	background-image: linear-gradient(to bottom,#9BD4FE, #1A9EFF);
	}
	.nav_BoxItem_icon3{
	background-image: linear-gradient(to bottom,#7CF3B1, #2FCB78);
	}
	.nav_BoxItem_icon4{
	background-image: linear-gradient(to bottom,#C599FB, #7E6DF0);
	}
	.nav_BoxItem_icon5{
	background-image: linear-gradient(to bottom,#96D2FF, #169FFF);
	}
	.nav_BoxItem_icon6{
	background-image: linear-gradient(to bottom,#FBAB8D, #EE6761);
	}
	.indexBanner {
		width: 100%;
		height: 360rpx;
		overflow: hidden;
		box-sizing: border-box;
		padding: 0 20rpx;
		background: linear-gradient(180deg,#FF444C,#F48373,#fafafa,#fafafa);
	}
	.goodTitle{
		font-size: 44rpx;
	    padding-left: 20rpx;
	    background-repeat:  no-repeat;
	    background-position: 10rpx center;
	    background-size: 60rpx;
	    color: #FF444C;
	    line-height: 96rpx;
	    height: 96rpx;
		display: inline-block;
	}
	.goodTitleImg{
	width: 60rpx;
	height: 60rpx;
	margin-top: 20rpx;
	float: left;
	margin-right: 10rpx;

	}
	.hotTitle {
		position: relative;
		text-align: center;
		color: #FF444C;
		font-size: 44rpx;
		margin-top: 40rpx;
		height: 80rpx;
		line-height: 80rpx;
	}
	
	.hotTitleCircular {
		position: absolute;
		width: 20rpx;
		height: 20rpx;
		background: #FF444C;
		border-radius: 50px;
		left: 50%;
		top: 50%;
		margin-top: -10rpx;
		margin-left: -10rpx;
	}
	
	.hTCircularL {
		margin-left: -130rpx;
	}
	
	.hTCircularR {
		margin-left: 110rpx;
	}
	
	.hotTitleLine {
		width: 120rpx;
		height: 6rpx;
		position: absolute;
		left: 50%;
		top: 50%;
		margin-top: -3rpx;
		margin-left: -60rpx;
	}
	
	.hTLineL {
		background-image: linear-gradient(to right, #fff, #FF444C);
		margin-left:-270rpx;
	}
	
	.hTLineR {
		background-image: linear-gradient(to right, #FF444C, #fff);
		margin-left: 150rpx;
	}
	
	.goodItem {
		padding: 20rpx;
		margin-bottom: 20rpx;
	}
	
	.goodItemImg {
		width:220rpx;
		height: 220rpx;
		float: left;
	}
	
	.goodItemTitle {
		font-size: 28rpx;
		text-overflow: ellipsis;
		line-height: 52rpx;
		height: 104rpx;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		overflow: hidden;
		-webkit-box-orient: vertical;
	}
	
	.goodItemText {
		padding-left: 20rpx;
	}
	
	.goodItemPriceP {
		height: 72rpx;
		float: left;
	
	}
	.goodItemPrice {
		font-size: 36rpx;
		line-height: 40rpx;
		color: #FF444C;
	}
	.goodItemSales{
		font-size: 24rpx;
		line-height: 32rpx;
		color:#aeaeae;
	
	}
	.goodItemTBox {
		overflow: hidden;
		padding-top: 40rpx;
	}
	
	.goodItemBtn {
		width:240rpx;
		height: 72rpx;
		line-height: 72rpx;
		text-align: center;
		color: #fff;
		font-size: 32rpx;
		float: right;
		background: #FF444C;
		border-radius: 10rpx;
	}
	
	.goodList {
		padding-bottom: 40rpx;
	}
	
	.hotList {
		padding-top: 40rpx;
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
		padding: 0 6rpx;
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
